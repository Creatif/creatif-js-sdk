import type { Result } from '@appTypes/Http';
import { tryHttp } from '@lib/http/tryHttp';
import { Routes } from '@lib/http/routes';
import type { MapItem } from '@appTypes/Maps';
import { determineResult } from '@app/determineResult';

export async function getMapItemById<Value>(id: string): Promise<Result<MapItem<Value>>> {
    const httpResult = await tryHttp<MapItem<Value>>('get', `${Routes.GET_MAP_ITEM_BY_ID}/${id}`, null, {});

    return determineResult<MapItem<Value>>(httpResult);
}
