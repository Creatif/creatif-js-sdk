import { parseQuery } from '@app/parseQuery';
import { determineResult } from '@app/determineResult';
import { tryHttp } from '@lib/http/tryHttp';
import { Routes } from '@lib/http/routes';
import type { GetListItemByID, ListItem } from '@appTypes/Lists';
import type { Result } from '@appTypes/Http';

export async function getListItemById<Value>(blueprint: GetListItemByID): Promise<Result<ListItem<Value>>> {
    const httpResult = await tryHttp<ListItem<Value>>(
        'get',
        `${Routes.GET_LIST_ITEM_BY_ID}/${blueprint.id}${parseQuery(blueprint.options, undefined)}`,
        null,
        {},
    );

    return determineResult<ListItem<Value>>(httpResult);
}
