export default class RealEstate {
    /**
     * @param {{
     * type: string, cost: number, mortgage: number, cashflow: number
     * }} data 
     */
    constructor(data) {
        this.type = data.type || 'Unknown';
        this.cost = data.cost || 0;
        this.mortgage = data.mortgage || 0;
        this.cashflow = data.cashflow || 0;
    }
}