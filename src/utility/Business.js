export default class Business {
    /**
     * @param {{
     * name: string, income: number, liability: number, downPayment: number
     * }} data 
     */
    constructor(data) {
        this.name = data.name || 'Unnamed';
        this.income = data.income || 0;
        this.liability = data.liability || 0;
        this.downPayment = data.downPayment || 0;
    }
}