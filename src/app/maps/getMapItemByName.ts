import { tryHttp } from '@lib/http/tryHttp';
import type { Result } from '@appTypes/Http';
import { determineResult } from '@app/determineResult';
import { Routes } from '@lib/http/routes';
import type { GetMapItemByName, MapItem } from '@appTypes/Maps';
import { parseQuery } from '@app/parseQuery';
import { checkRuntime } from '@lib/checkRuntime';

export async function getMapItemByName<Value>(blueprint: GetMapItemByName): Promise<Result<MapItem<Value>>> {
    checkRuntime();

    const httpResult = await tryHttp<MapItem<Value>>(
        'get',
        `${Routes.GET_MAP_ITEM_BY_NAME}/${blueprint.structureName}/${blueprint.name}${parseQuery(
            blueprint.options,
            blueprint.locale,
        )}`,
        null,
        {
            'Creatif-Version': blueprint.versionName || '',
        },
    );

    return determineResult<MapItem<Value>>(httpResult);
}
