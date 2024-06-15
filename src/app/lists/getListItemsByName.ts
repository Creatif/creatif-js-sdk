import type { GetListItemsByName, ListItem } from '@appTypes/Lists';
import { tryHttp } from '@lib/http/tryHttp';
import type { Result } from '@appTypes/Http';
import { determineResult } from '@app/determineResult';
import { Routes } from '@lib/http/routes';
import { parseQuery } from '@app/parseQuery';
import { checkRuntime } from '@lib/checkRuntime';

export async function getListItemsByName<Value>(blueprint: GetListItemsByName): Promise<Result<ListItem<Value>[]>> {
    checkRuntime();

    const httpResult = await tryHttp<ListItem<Value>[]>(
        'get',
        `${Routes.GET_LISTS_ITEMS_BY_NAME}/${blueprint.structureName}/${blueprint.name}${parseQuery(
            blueprint.options,
            blueprint.locale,
        )}`,
        null,
        {
            'Creatif-Version': blueprint.versionName || '',
        },
    );

    return determineResult<ListItem<Value>[]>(httpResult);
}
