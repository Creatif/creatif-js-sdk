import { determineResult } from '@app/determineResult';
import type { Version } from '@appTypes/Version';
import { tryHttp } from '@lib/http/tryHttp';
import { Routes } from '@lib/http/routes';
import type { Result } from '@appTypes/Http';

export async function getVersions(): Promise<Result<Version[]>> {
    const httpResult = await tryHttp<Version[]>('get', `${Routes.GET_VERSIONS}`, null, {});

    return determineResult<Version[]>(httpResult);
}
