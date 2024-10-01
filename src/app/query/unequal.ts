import { ComparisonImplementation } from '@app/query/comparison';

export function unequal(column: string, value: string) {
    return new ComparisonImplementation(column, value, 'unequal');
}
