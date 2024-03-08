import type { Behaviour, ConnectionItem } from '@appTypes/Shared';

export interface MapItem<Value> {
    structureId: string;
    structureShortId: string;
    structureName: string;

    name: string;
    id: string;
    shortId: string;
    projectId: string;
    locale: string;
    index: number;
    groups: string[];
    behaviour: Behaviour;
    value: Value | null;
    connections: ConnectionItem<Value>[];

    createdAt: string;
    updatedAt: string | null;
}