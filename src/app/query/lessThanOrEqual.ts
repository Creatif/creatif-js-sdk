import { ComparisonImplementation } from '@app/query/comparison';

export function lessThanOrEqual(column: string, value: string) {
    return new ComparisonImplementation(column, value, 'lessThanOrEqual');
}
