import type { Result } from '@appTypes/Http.ts';
import type { Version } from '@appTypes/Version';
import { Routes } from '@lib/http/routes';
import { isError, tryHttp } from '@lib/http/tryHttp';
import { Runtime } from '@lib/runtime';

export async function getVersions(): Promise<Result<Version>> {
    const httpResult = await tryHttp<Version>('get', `${Routes.GET_VERSIONS}/${Runtime.instance.projectId}`, null, {});

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
