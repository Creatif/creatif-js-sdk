import type { GetListItemByID, ListItem } from '@appTypes/Lists';
import { tryHttp } from '@lib/http/tryHttp';
import type { Result } from '@appTypes/Http';
import { determineResult } from '@app/determineResult';
import { Routes } from '@lib/http/routes';
import { parseQuery } from '@app/parseQuery';
import { checkRuntime } from '@lib/checkRuntime';

export async function getListItemById<Value>(blueprint: GetListItemByID): Promise<Result<ListItem<Value>>> {
    checkRuntime();

    const httpResult = await tryHttp<ListItem<Value>>(
        'get',
        `${Routes.GET_LIST_ITEM_BY_ID}/${blueprint.id}${parseQuery(blueprint.options, undefined)}`,
        null,
        {
            'Creatif-Version': blueprint.versionName || '',
        },
    );

    return determineResult<ListItem<Value>>(httpResult);
}
