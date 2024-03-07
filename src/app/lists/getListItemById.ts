import type { Result } from '@appTypes/Http.ts';
import type { ListItem } from '@appTypes/ListItem.ts';
import { isError, tryHttp } from '@lib/http/tryHttp';
import { Routes } from '@lib/http/routes';

export async function getListItemById<Value>(id: string): Promise<Result<ListItem<Value>>> {
    const httpResult = await tryHttp<ListItem<Value>>('get', `${Routes.GET_LIST_ITEM_BY_ID}/${id}`, null, {});

    const result = httpResult.result;
    if (isError(result)) {
        return {
            result: undefined,
            error: result,
        };
    }

    return {
        result: result,
        error: undefined,
    };
}
