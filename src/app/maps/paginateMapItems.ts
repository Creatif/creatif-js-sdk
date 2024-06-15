import { tryHttp } from '@lib/http/tryHttp';
import type { Result } from '@appTypes/Http';
import { determineResult } from '@app/determineResult';
import { Routes } from '@lib/http/routes';
import { queryConstructor } from '@lib/queryConstructor';
import type { MapItem, PaginateMapItems } from '@appTypes/Maps';
import { checkRuntime } from '@lib/checkRuntime';

export async function paginateMapItems<Value>(blueprint: PaginateMapItems): Promise<Result<MapItem<Value>[]>> {
    checkRuntime();

    const httpResult = await tryHttp<MapItem<Value>[]>(
        'get',
        `${Routes.GET_MAP_ITEMS}/${blueprint.structureName}${queryConstructor(
            blueprint.page,
            blueprint.groups,
            blueprint.orderBy,
            blueprint.orderDirection,
            blueprint.search,
            blueprint.locales,
            blueprint.options,
        )}`,
        null,
        {
            'Creatif-Version': blueprint.versionName || '',
        },
    );

    return determineResult<MapItem<Value>[]>(httpResult);
}
