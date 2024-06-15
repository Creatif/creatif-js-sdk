import type { Result } from '@appTypes/Http';
import type { ListItem } from '@appTypes/Lists';
import { tryHttp } from '@lib/http/tryHttp';
import { Routes } from '@lib/http/routes';
import { determineResult } from '@app/determineResult';
import { checkRuntime } from '@lib/checkRuntime';

export async function getListItemByNameAndLocale<Value>(
    name: string,
    locale: string,
): Promise<Result<ListItem<Value>>> {
    checkRuntime();

    const httpResult = await tryHttp<ListItem<Value>>(
        'get',
        `${Routes.GET_LISTS_ITEMS_BY_NAME}/${name}/${locale}`,
        null,
        {},
    );

    return determineResult<ListItem<Value>>(httpResult);
}
