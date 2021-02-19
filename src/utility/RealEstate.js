export default class RealEstate {
    /**
     * @param {{
     * type: string, units: number, cost: number, mortgage: number, cashflow: number
     * }} data 
     */
    constructor(data) {
        this.type = data.type || 'Unknown';
        this.units = data.units || 0;
        this.cost = data.cost || 0;
        this.mortgage = data.mortgage || 0;
        this.cashflow = data.cashflow || 0;
        this.key = Math.random();
    }
}