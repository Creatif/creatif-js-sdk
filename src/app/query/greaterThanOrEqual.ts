import { ComparisonImplementation } from '@app/query/comparison';

export function greaterThanOrEqual(column: string, value: string) {
    return new ComparisonImplementation(column, value, 'greaterThanOrEqual');
}
