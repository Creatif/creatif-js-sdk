import type { ComparisonOperator, ObjectConvertable, QueryDataType } from '@appTypes/Queries';

function validateOperators(operator: ComparisonOperator): string {
    const operators = ['equal', 'unequal', 'greaterThan', 'greaterThanOrEqual', 'lessThan', 'lessThanOrEqual'];
    let found = false;
    for (const op of operators) {
        if (operator === op) {
            found = true;
            break;
        }
    }

    if (!found) {
        return `Invalid operator. Operators can be only ${operators.join(', ')}`;
    }

    return '';
}

function validateDataType(t: QueryDataType) {
    const types = ['int', 'float', 'string'];
    let found = false;
    for (const op of types) {
        if (t === op) {
            found = true;
            break;
        }
    }

    if (!found) {
        return `Invalid operator. Operators can be only ${types.join(', ')}`;
    }

    return '';
}

function validateColumn(column: string): string {
    if (column == '') {
        return 'Query \'column\' cannot be empty';
    }

    return '';
}

export function validateQuery(queries: ObjectConvertable[]) {
    for (const q of queries) {
        const obj = q.toObject();

        let v = validateColumn(obj.column);
        if (v !== '') {
            return v;
        }

        v = validateOperators(obj.operator);
        if (v !== '') {
            return v;
        }

        v = validateDataType(obj.type);
        if (v !== '') {
            return v;
        }
    }
}
