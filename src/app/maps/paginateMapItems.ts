import { tryHttp } from '@lib/http/tryHttp';
import type { Result } from '@appTypes/Http';
import { determineResult } from '@app/determineResult';
import { Routes } from '@lib/http/routes';
import { queryConstructor } from '@lib/queryConstructor';
import type { MapItem, PaginateMapItems } from '@appTypes/Maps';
import { checkRuntime } from '@lib/checkRuntime';
import { validateQuery } from '@app/query/validation';

export async function paginateMapItems<Value>(blueprint: PaginateMapItems): Promise<Result<MapItem<Value>[]>> {
    checkRuntime();
    const error = validateQuery(blueprint.query);

    if (error !== '') {
        return {
            error: {
                call: 'paginateMapItems',
                messages: {
                    unexpectedError: 'An unexpected error occurred',
                },
                status: 400,
            },
            result: undefined,
        };
    }

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
            blueprint.query,
        )}`,
        null,
        {
            'Creatif-Version': blueprint.versionName || '',
        },
    );

    return determineResult<MapItem<Value>[]>(httpResult);
}
