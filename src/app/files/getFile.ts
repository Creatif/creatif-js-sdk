import type { ListItem } from '@appTypes/Lists';
import { tryHttp } from '@lib/http/tryHttp';
import type { Result } from '@appTypes/Http';
import { determineResult } from '@app/determineResult';
import { Routes } from '@lib/http/routes';
import { checkRuntime } from '@lib/checkRuntime';
import type { GetFile } from '@appTypes/Files';

export async function getFile<Value>(blueprint: GetFile): Promise<Result<ListItem<Value>>> {
    checkRuntime();

    const httpResult = await tryHttp<ListItem<Value>>(
        'get',
        `${Routes.GET_FILE}/${blueprint.version}${blueprint.id}`,
        null,
    );

    return determineResult<ListItem<Value>>(httpResult);
}
