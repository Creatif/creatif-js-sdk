import type { Result } from '@appTypes/Http';
import type { ListItem } from '@appTypes/Lists';
import { tryHttp } from '@lib/http/tryHttp';
import { Routes } from '@lib/http/routes';
import { determineResult } from '@app/determineResult';

export async function getListItemById<Value>(id: string): Promise<Result<ListItem<Value>>> {
    const httpResult = await tryHttp<ListItem<Value>>('get', `${Routes.GET_LIST_ITEM_BY_ID}/${id}`, null, {});

    return determineResult<ListItem<Value>>(httpResult);
}
