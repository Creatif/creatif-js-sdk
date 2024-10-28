import type { ComparisonOperator, ObjectConvertable, QueryDataType } from '@appTypes/Queries';
import type { ErrorCalls } from '@appTypes/Http';

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

export function validateQuery(call: ErrorCalls, errors: Record<string, string>, queries: ObjectConvertable[] = []) {
    for (const q of queries) {
        if (!q.toObject) {
            errors['invalidColumn'] =
                'Invalid usage. You must always use the provided functions like equal(), unequal() etc...';
        }
        const obj = q.toObject();

        let v = validateColumn(obj.column);
        if (v !== '') {
            errors['invalidColumn'] = v;
        }

        v = validateOperators(obj.operator);
        if (v !== '') {
            errors['invalidOperator'] = v;
        }

        v = validateDataType(obj.type);
        if (v !== '') {
            errors['invalidDataType'] = v;
        }
    }

    return errors;
}
