import type { Options } from '@appTypes/Shared';
import type { ObjectConvertable } from '@appTypes/Queries';

export function queryConstructor(
    page = 1,
    groups: string[] = [],
    orderBy = 'created_at',
    direction = 'desc',
    search = '',
    locales: string[] = [],
    options?: Options,
    queries: ObjectConvertable[] = [],
) {
    let base = `?page=${page}&orderBy=${orderBy}&direction=${direction}&search=${search}`;

    if (groups.length > 0) {
        const newGroups: string[] = [];
        for (const group of groups) {
            newGroups.push(group.trim());
        }

        base += '&groups=' + newGroups.join(',');
    }

    if (locales.length > 0) {
        const newLocales: string[] = [];
        for (const locale of locales) {
            newLocales.push(locale.trim());
        }

        base += '&locales=' + newLocales.join(',');
    }

    if (options) {
        const valueOnly = options.valueOnly;

        base += `&options=valueOnly:${valueOnly ? 'true' : 'false'}`;
    }

    if (queries && queries.length !== 0) {
        base += `&query=${JSON.stringify(queries.map((t) => t.toObject()))}`;
    }

    return base;
}
