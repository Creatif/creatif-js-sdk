import { determineResult } from '@app/determineResult';
import { tryHttp } from '@lib/http/tryHttp';
import { Routes } from '@lib/http/routes';
import type { Structure } from '@appTypes/Structures';
import type { Result } from '@appTypes/Http';

export async function getStructures(): Promise<Result<{ maps: Structure[]; lists: Structure[] }>> {
    const httpResult = await tryHttp<{ maps: Structure[]; lists: Structure[] }>(
        'get',
        `${Routes.GET_STRUCTURES}`,
        null,
        {},
    );

    return determineResult<{ maps: Structure[]; lists: Structure[] }>(httpResult);
}
