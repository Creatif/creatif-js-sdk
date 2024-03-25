import type { TryHttpResult } from '@appTypes/Http';
import { isError } from '@lib/http/tryHttp';

export function determineResult<T>(httpResult: TryHttpResult<T>) {
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
