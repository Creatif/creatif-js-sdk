import { determineResult } from '@app/determineResult';
import { tryHttp } from '@lib/http/tryHttp';
import { queryConstructor } from '@lib/queryConstructor';
import { Routes } from '@lib/http/routes';
import type { MapItem, PaginateMapItems } from '@appTypes/Maps';
import type { Result } from '@appTypes/Http';

export async function paginateMapItems<Value>(blueprint: PaginateMapItems): Promise<Result<MapItem<Value>[]>> {
    const httpResult = await tryHttp<MapItem<Value>[]>(
        'get',
        `${Routes.GET_MAP_ITEMS}/${blueprint.structureName}${queryConstructor(
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

    return determineResult<MapItem<Value>[]>(httpResult);
}
