export default class Stock {
    /**
     * @param {{
     * name: string, cost: number, units: number, income: number
     * }} data 
     */
    constructor(data) {
        this.name = data.name || 'No Name';
        this.cost = data.cost || 0;
        this.units = data.units || 0;
        this.income = data.income || 0;
        this.key = Math.random();
    }
}