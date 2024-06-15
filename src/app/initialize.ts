import { Runtime } from '@lib/runtime';
import type { Initialize } from '@appTypes/Initialize';

export function initialize(blueprint: Initialize) {
    Runtime.init(blueprint.projectId, blueprint?.baseUrl);
}
