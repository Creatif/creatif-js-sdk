import type { CreatifError, TryHttpResult } from '@appTypes/Http';
import { Api } from '@lib/http/api';

export function isError(val: unknown): val is CreatifError {
    const a = val as CreatifError;
    return a && 'call' in a && 'messages' in a;
}

export async function tryHttp<ReturnType, Body = unknown>(
    method: 'get' | 'post' | 'put' | 'delete',
    path: string,
    body?: Body,
    headers: Record<string, string> = {},
): Promise<TryHttpResult<ReturnType>> {
    try {
        const res = await Api[method](path, body, headers);

        if (res.ok) {
            return {
                result: (await res.json()) as ReturnType,
                status: res.status,
                response: res,
            };
        }

        if (res.status === 422) {
            return {
                result: (await res.json()) as ReturnType,
                status: res.status,
                response: res,
            };
        }

        if (res.status === 400 || res.status === 404) {
            return {
                result: (await res.json()) as ReturnType,
                status: res.status,
                response: res,
            };
        }

        return {
            result: {
                call: 'unknown',
                messages: {
                    unexpectedError: 'An unexpected error occurred',
                },
            } as ReturnType,
            status: 500,
            response: res,
        };
    } catch (e) {
        return {
            result: {
                call: 'unknown',
                messages: {
                    unexpectedError: 'An unexpected error occurred',
                },
            } as ReturnType,
            status: 500,
            response: undefined,
        };
    }
}
