import type { ComparisonOperator, ObjectConvertable, QueryDataType, QueryResult } from '@appTypes/Queries';

export class ComparisonImplementation implements ObjectConvertable {
    constructor(
        private readonly column: string,
        private readonly value: string,
        private readonly operator: ComparisonOperator,
    ) {}

    toObject(): QueryResult {
        let t: QueryDataType = 'string';
        if (Number.isInteger(this.value)) {
            t = 'int';
        } else if (!isNaN(parseFloat(this.value))) {
            t = 'float';
        }

        return {
            type: t,
            column: this.column,
            value: this.value + '',
            operator: this.operator,
        };
    }
}
