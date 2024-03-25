import { determineResult } from '@app/determineResult';
import { tryHttp } from '@lib/http/tryHttp';
import { queryConstructor } from '@lib/queryConstructor';
import { Routes } from '@lib/http/routes';
import type { ListItem, PaginateListItems } from '@appTypes/Lists';
import type { Result } from '@appTypes/Http';

export async function paginateListItems<Value>(blueprint: PaginateListItems): Promise<Result<ListItem<Value>[]>> {
    const httpResult = await tryHttp<ListItem<Value>[]>(
        'get',
        `${Routes.GET_LIST_ITEMS}/${blueprint.structureName}${queryConstructor(
            blueprint.page,
            blueprint.groups,
            blueprint.orderBy,
            blueprint.orderDirection,
            blueprint.search,
            blueprint.locales,
        )}`,
        null,
        {},
    );

    return determineResult<ListItem<Value>[]>(httpResult);
}
