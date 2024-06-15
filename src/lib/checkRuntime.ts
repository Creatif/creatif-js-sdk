import { Runtime } from '@lib/runtime';

export function checkRuntime() {
    if (!Runtime.instance)
        throw new Error('You haven\'t initialized the SDK. Use initialze(projectId: string) to initialize the SDK. ');
}
