import type {PaginateMapItems} from '@appTypes/Maps';
import {validateQuery} from '@app/query/validation';
import type {PaginateListItems} from '@appTypes/Lists';

export function validatePaginationBlueprint(blueprint: PaginateMapItems | PaginateListItems): Record<string, string> {
    const errors: Record<string, string> = {};
    if (!blueprint.structureName) {
        errors['structureName'] = '\'structureName\' argument is required and must be a string';
    }

    if (blueprint.structureName && typeof blueprint.structureName !== 'string') {
        errors['structureName'] = '\'structureName\' argument is required and must be a string';
    }

    if (!blueprint.versionName) {
        errors['versionName'] = '\'versionName\' argument is required and must be a string';
    }

    if (blueprint.versionName && typeof blueprint.versionName !== 'string') {
        errors['versionName'] = '\'versionName\' argument is required and must be a string';
    }

    if (blueprint.page !== 0 && !Number.isInteger(blueprint.page)) {
        errors['page'] = '\'page\' argument must be in integer and must be more than one';
    }

    if (blueprint.page < 1) {
        errors['page'] = '\'page\' argument must be in integer and must be more than 1';
    }

    if (blueprint.groups && !Array.isArray(blueprint.groups)) {
        errors['groups'] = '\'groups\' argument must be an array of strings';
    }

    if (blueprint.locales && !Array.isArray(blueprint.locales)) {
        errors['locales'] = '\'locales\' argument must be an array of strings';
    }

    if (blueprint.orderBy && typeof blueprint.orderBy !== 'string') {
        errors['orderBy'] = '\'orderBy\' argument must be a string';
    }

    if (blueprint.orderDirection && blueprint.orderDirection !== 'desc' && blueprint.orderDirection !== 'asc') {
        errors['orderDirection'] = '\'orderDirection\' argument must be either \'desc\' or \'asc\'';
    }

    if (blueprint.search && typeof blueprint.search !== 'string') {
        errors['search'] = '\'search\' argument must be a string';
    }

    validateQuery('paginateMapItems', errors, blueprint.query);

    return errors;
}
