import intl from 'react-intl-universal';

export class FilterHelper {
    static getOperators(operators: string[], local_pagination?) {
        let response = [];
        for (let operator of operators) {
            if (operator == 'string') {
                if (local_pagination) {
                    response.push(this.getStringOperators(local_pagination));
                } else {
                    response.push(this.getStringOperators());
                }
            } else if (operator == 'picklist') {
                response.push(this.getPickListOperators());
            } else if (operator == 'number' || operator == 'percentage' || operator == 'currency') {
                response.push(this.getNumericOperators(operator));
            } else if (operator == 'date') {
                response.push(this.getDateOperators(operator));
            }
        }
        return response;
    }

    private static getStringOperators(local_pagination?: boolean) {
        return {
            type: 'string',
            options: [
                {
                    key: local_pagination ? 'like' : 'ilike',
                    value: intl.get('application.generic.contains'),
                },
                {
                    key: 'notLike',
                    value: intl.get('filter.operator.string.does_not_contain'),
                },
                {
                    key: '=',
                    value: intl.get('application.generic.equal'),
                },
                {
                    key: '!=',
                    value: intl.get('application.generic.not_equal'),
                },
            ],
        };
    }

    private static getNumericOperators(type: string) {
        return {
            type: type,
            options: [
                {
                    key: '=',
                    value: intl.get('application.generic.equal'),
                },
                {
                    key: '<',
                    value: intl.get('application.generic.less_than'),
                },
                {
                    key: '<=',
                    value: intl.get('application.generic.less_than_or_qeual'),
                },
                {
                    key: '>',
                    value: intl.get('application.generic.greater_than'),
                },
                {
                    key: '>=',
                    value: intl.get('application.generic.greater_than_or_qeual'),
                },
            ],
        };
    }

    private static getPickListOperators() {
        return {
            type: 'picklist',
            options: [
                {
                    key: 'in',
                    value: intl.get('application.generic.equal'),
                },
                {
                    key: 'notIn',
                    value: intl.get('application.generic.not_equal'),
                },
            ],
        };
    }

    private static getDateOperators(type: string) {
        return {
            type: type,
            options: [
                {
                    key: '=',
                    value: intl.get('application.generic.equal'),
                },
                {
                    key: '<=',
                    value: intl.get('application.generic.less_than_or_qeual'),
                },
                {
                    key: '>=',
                    value: intl.get('application.generic.greater_than_or_qeual'),
                },
            ],
        };
    }
}
