import { tryHttp } from '@lib/http/tryHttp';
import type { Result } from '@appTypes/Http';
import { determineResult } from '@app/determineResult';
import { Routes } from '@lib/http/routes';
import type { GetMapItemByID, MapItem } from '@appTypes/Maps';
import { parseQuery } from '@app/parseQuery';
import { checkRuntime } from '@lib/checkRuntime';

export async function getMapItemById<Value>(blueprint: GetMapItemByID): Promise<Result<MapItem<Value>>> {
    checkRuntime();

    const httpResult = await tryHttp<MapItem<Value>>(
        'get',
        `${Routes.GET_MAP_ITEM_BY_ID}/${blueprint.id}${parseQuery(blueprint.options, undefined)}`,
        null,
        {
            'Creatif-Version': blueprint.versionName || '',
        },
    );

    return determineResult<MapItem<Value>>(httpResult);
}
