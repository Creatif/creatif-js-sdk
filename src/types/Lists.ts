import type { Behaviour, ConnectionItem, Options, OrderBy, OrderDirection } from './Shared';
import type { ObjectConvertable } from '@appTypes/Queries';

export interface ListItem<Value> {
    structureId: string;
    structureShortId: string;
    structureName: string;

    itemName: string;
    itemId: string;
    itemShortId: string;
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

export interface GetListItemByID {
    id: string;
    options?: Options;
    versionName?: string;
}

export interface GetListItemsByName {
    structureName: string;
    name: string;
    locale: string;
    options?: Options;
    versionName?: string;
}

export interface PaginateListItems {
    structureName: string;
    page: number;
    limit: number;
    search?: string;
    orderBy?: OrderBy;
    orderDirection?: OrderDirection;
    locales?: string[];
    groups?: string[];
    versionName?: string;
    options?: Options;
    query: ObjectConvertable[];
}
