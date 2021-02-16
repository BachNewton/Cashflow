export default class Profession {
    static ENGINEER = new Profession({
        title: 'Engineer',
        salary: 4900,
        savings: 400,
        perChildExpense: 250,
        expenses: {
            tax: 1050,
            housing: 700,
            school: 60,
            car: 140,
            creditCard: 120,
            retail: 50,
            other: 1090
        },
        liabilities: {
            housing: 75000,
            school: 12000,
            car: 7000,
            creditCard: 4000,
            retail: 1000
        }
    });

    /**
     * @typedef {{tax: number, housing: number, school: number, car: number, creditCard: number, retail: number, other: number}} Expenses
     * @typedef {{housing: number, school: number, car: number, creditCard: number, retail: number}} Liabilities
     * 
     * @param {{
     * title: string, salary: number, savings: number, perChildExpense: number,
     * expenses: Expenses, liabilities: Liabilities
     * }} data 
     */
    constructor(data) {
        this.title = data.title || '';
        this.salary = data.salary || 0;
        this.savings = data.savings || 0;
        this.perChildExpense = data.perChildExpense || 0;

        /** @type {Expenses} */
        var dataExpenses = data.expenses || {};
        this.expenses = {
            tax: dataExpenses.tax || 0,
            housing: dataExpenses.housing || 0,
            school: dataExpenses.school || 0,
            car: dataExpenses.car || 0,
            creditCard: dataExpenses.creditCard || 0,
            retail: dataExpenses.retail || 0,
            other: dataExpenses.other || 0
        };

        /** @type {Liabilities} */
        var dataLiabilities = data.liabilities || {};
        this.liabilities = {
            housing: dataLiabilities.housing || 0,
            school: dataLiabilities.school || 0,
            car: dataLiabilities.car || 0,
            creditCard: dataLiabilities.creditCard || 0,
            retail: dataLiabilities.retail || 0
        };
    }
}