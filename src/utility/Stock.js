export default class Stock {
    /**
     * @param {{
     * name: string, shares: number, income: number
     * }} data 
     */
    constructor(data) {
        this.name = data.name || 'No Name';
        this.shares = data.shares || 0;
        this.income = data.income || 0;
    }
}