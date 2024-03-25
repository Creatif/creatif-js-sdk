import type { GetMapItemByName, MapItem } from '@appTypes/Maps';
import { parseQuery } from '@app/parseQuery';
import { determineResult } from '@app/determineResult';
import { tryHttp } from '@lib/http/tryHttp';
import { Routes } from '@lib/http/routes';
import type { Result } from '@appTypes/Http';

export async function getMapItemByName<Value>(blueprint: GetMapItemByName): Promise<Result<MapItem<Value>>> {
    const httpResult = await tryHttp<MapItem<Value>>(
        'get',
        `${Routes.GET_MAP_ITEM_BY_NAME}/${blueprint.structureName}/${blueprint.name}${parseQuery(
            blueprint.options,
            blueprint.locale,
        )}`,
        null,
        {},
    );

    return determineResult<MapItem<Value>>(httpResult);
}
