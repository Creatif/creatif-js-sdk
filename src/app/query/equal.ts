import { ComparisonImplementation } from '@app/query/comparison';

export function equal(column: string, value: string) {
    return new ComparisonImplementation(column, value, 'equal');
}
