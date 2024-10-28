import type { ListItem, PaginateListItems } from '@appTypes/Lists';
import { tryHttp } from '@lib/http/tryHttp';
import type { Result } from '@appTypes/Http';
import { determineResult } from '@app/determineResult';
import { Routes } from '@lib/http/routes';
import { queryConstructor } from '@lib/queryConstructor';
import { checkRuntime } from '@lib/checkRuntime';
import { validatePaginationBlueprint } from '@lib/validatePaginationBlueprint';

export async function paginateListItems<Value>(blueprint: PaginateListItems): Promise<Result<ListItem<Value>[]>> {
    checkRuntime();

    const errors = validatePaginationBlueprint('paginateListItems', blueprint);
    if (Object.values(errors).length !== 0) {
        return {
            result: undefined,
            error: {
                call: 'paginateListItems',
                messages: errors,
                status: 400,
            },
        };
    }

    const httpResult = await tryHttp<ListItem<Value>[]>(
        'get',
        `${Routes.GET_LIST_ITEMS}/${blueprint.structureName}${queryConstructor(
            blueprint.page,
            blueprint.limit,
            blueprint.groups,
            blueprint.orderBy,
            blueprint.orderDirection,
            blueprint.search,
            blueprint.locales,
            blueprint.options,
            blueprint.query,
        )}`,
        null,
        {
            'Creatif-Version': blueprint.versionName || '',
        },
    );

    return determineResult<ListItem<Value>[]>(httpResult);
}
