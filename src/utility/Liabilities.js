export default class Liabilities {
    /**
     * @param {{
     * housing: number, school: number, car: number, creditCard: number, retail: number
     * }} data 
     */
    constructor(data) {
        data = data || {};

        this.housing = data.housing || 0;
        this.school = data.school || 0;
        this.car = data.car || 0;
        this.creditCard = data.creditCard || 0;
        this.retail = data.retail || 0;
    }

    clone() {
        return new Liabilities({
            housing: this.housing,
            school: this.school,
            car: this.car,
            creditCard: this.creditCard,
            retail: this.retail
        });
    }
}