export interface QueryResult {
    column: string;
    value: string;
    operator: ComparisonOperator;
    type: 'int' | 'float' | 'string';
}

export type QueryDataType = 'int' | 'float' | 'string';

export interface ObjectConvertable {
    toObject(): QueryResult;
}

export type ComparisonOperator =
    | 'equal'
    | 'unequal'
    | 'greaterThan'
    | 'lessThan'
    | 'greaterThanOrEqual'
    | 'lessThanOrEqual';
