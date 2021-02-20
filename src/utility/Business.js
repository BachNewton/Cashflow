export default class Business {
    /**
     * @param {{
     * name: string, downPayment: number, liability: number, income: number
     * }} data 
     */
    constructor(data) {
        this.name = data.name || 'Unnamed';
        this.income = data.income || 0;
        this.liability = data.liability || 0;
        this.downPayment = data.downPayment || 0;
        this.key = Math.random()
    }
}