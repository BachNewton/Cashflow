export default class Expenses {
    /**
     * @param {{
     * tax: number, housing: number, school: number, car: number, creditCard: number, retail: number, other: number
     * }} data 
     */
    constructor(data) {
        data = data || {};

        this.tax = data.tax || 0;
        this.housing = data.housing || 0;
        this.school = data.school || 0;
        this.car = data.car || 0;
        this.creditCard = data.creditCard || 0;
        this.retail = data.retail || 0;
        this.other = data.other || 0;
    }

    clone() {
        return new Expenses({
            tax: this.tax,
            housing: this.housing,
            school: this.school,
            car: this.car,
            creditCard: this.creditCard,
            retail: this.retail,
            other: this.other
        });
    }
}