import { ComparisonImplementation } from '@app/query/comparison';

export function greaterThan(column: string, value: string) {
    return new ComparisonImplementation(column, value, 'greaterThan');
}
