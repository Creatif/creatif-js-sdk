import { tryHttp } from '@lib/http/tryHttp';
import type { Result } from '@appTypes/Http';
import { determineResult } from '@app/determineResult';
import { Routes } from '@lib/http/routes';
import type { Version } from '@appTypes/Version';
import { checkRuntime } from '@lib/checkRuntime';

export async function getVersions(): Promise<Result<Version[]>> {
    checkRuntime();

    const httpResult = await tryHttp<Version[]>('get', `${Routes.GET_VERSIONS}`, null, {});

    return determineResult<Version[]>(httpResult);
}
