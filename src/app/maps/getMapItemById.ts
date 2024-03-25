import { parseQuery } from '@app/parseQuery';
import { determineResult } from '@app/determineResult';
import { tryHttp } from '@lib/http/tryHttp';
import { GetMapItemByID, MapItem } from '@appTypes/Maps';
import { Routes } from '@lib/http/routes';
import { Result } from '@appTypes/Http';

export async function getMapItemById<Value>(blueprint: GetMapItemByID): Promise<Result<MapItem<Value>>> {
    const httpResult = await tryHttp<MapItem<Value>>(
        'get',
        `${Routes.GET_MAP_ITEM_BY_ID}/${blueprint.id}${parseQuery(blueprint.options, undefined)}`,
        null,
        {},
    );

    return determineResult<MapItem<Value>>(httpResult);
}
