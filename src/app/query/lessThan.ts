import { ComparisonImplementation } from '@app/query/comparison';

export function lessThan(column: string, value: string) {
    return new ComparisonImplementation(column, value, 'lessThan');
}
