import type { LogicalOperator, ObjectConvertable } from '@appTypes/Queries';

export function and(comparisons: ObjectConvertable[]) {
    return new Logical(comparisons, 'and');
}

export function or(comparisons: ObjectConvertable[]) {
    return new Logical(comparisons, 'or');
}

class Logical implements ObjectConvertable {
    constructor(
        private readonly comparisons: ObjectConvertable[],
        private readonly operator: LogicalOperator,
    ) {}

    toObject(): unknown {
        return {
            comparisons: this.comparisons,
            operator: this.operator,
        };
    }
}
