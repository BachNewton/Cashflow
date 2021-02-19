import professionImage from '../images/profession.png';
import engineerImage from '../images/engineer.png';
import janitorImage from '../images/janitor.png';
import mechanicImage from '../images/mechanic.png';
import nurseImage from '../images/nurse.png';
import pilotImage from '../images/pilot.png';
import Expenses from './Expenses';
import Liabilities from './Liabilities';
// eslint-disable-next-line
import RealEstate from './RealEstate';
// eslint-disable-next-line
import Business from './Business';
// eslint-disable-next-line
import Stock from './Stock';

export default class Profession {
    static ENGINEER = new Profession({
        title: 'Engineer',
        salary: 4900,
        savings: 400,
        perChildExpense: 250,
        expenses: new Expenses({
            tax: 1050,
            housing: 700,
            school: 60,
            car: 140,
            creditCard: 120,
            retail: 50,
            other: 1090
        }),
        liabilities: new Liabilities({
            housing: 75000,
            school: 12000,
            car: 7000,
            creditCard: 4000,
            retail: 1000
        }),
        image: engineerImage
    });

    static AIRLINE_PIOLT = new Profession({
        title: 'Airline Pilot',
        salary: 9500,
        savings: 400,
        perChildExpense: 480,
        expenses: new Expenses({
            tax: 2350,
            housing: 1330,
            car: 300,
            creditCard: 660,
            retail: 50,
            other: 2210
        }),
        liabilities: new Liabilities({
            housing: 143000,
            car: 15000,
            creditCard: 22000,
            retail: 1000
        }),
        image: pilotImage
    });

    static MECHANIC = new Profession({
        title: 'Mechanic',
        salary: 2000,
        savings: 670,
        perChildExpense: 110,
        expenses: new Expenses({
            tax: 360,
            housing: 300,
            car: 60,
            creditCard: 60,
            retail: 50,
            other: 450
        }),
        liabilities: new Liabilities({
            housing: 31000,
            car: 3000,
            creditCard: 2000,
            retail: 1000
        }),
        image: mechanicImage
    });

    static JANITOR = new Profession({
        title: 'Janitor',
        salary: 1600,
        savings: 560,
        perChildExpense: 70,
        expenses: new Expenses({
            tax: 280,
            housing: 200,
            car: 60,
            creditCard: 60,
            retail: 50,
            other: 300
        }),
        liabilities: new Liabilities({
            housing: 20000,
            car: 4000,
            creditCard: 2000,
            retail: 1000
        }),
        image: janitorImage
    });

    static NURSE = new Profession({
        title: 'Nurse',
        salary: 3100,
        savings: 480,
        perChildExpense: 170,
        expenses: new Expenses({
            tax: 600,
            housing: 400,
            school: 30,
            car: 100,
            creditCard: 90,
            retail: 50,
            other: 710
        }),
        liabilities: new Liabilities({
            housing: 47000,
            school: 6000,
            car: 5000,
            creditCard: 3000,
            retail: 1000
        }),
        image: nurseImage
    });

    static ALL = [
        Profession.ENGINEER,
        Profession.AIRLINE_PIOLT,
        Profession.MECHANIC,
        Profession.JANITOR,
        Profession.NURSE
    ];

    /**
     * @param {{
     * title: string, salary: number, savings: number, perChildExpense: number,
     * expenses: Expenses, liabilities: Liabilities,
     * image: string, children: number
     * }} data 
     */
    constructor(data) {
        data = data || {};

        this.title = data.title || 'Unemployed';
        this.salary = data.salary || 0;
        this.savings = data.savings || 0;
        this.perChildExpense = data.perChildExpense || 0;
        this.expenses = data.expenses || new Expenses();
        this.liabilities = data.liabilities || new Liabilities();
        this.image = data.image || professionImage;
        this.children = data.children || 0;

        /** @type {Array<RealEstate>} */
        this.realEstate = [];
        /** @type {Array<Business>} */
        this.businesses = [];
        /** @type {Array<Stock>} */
        this.stocks = [];
    }

    getChildExpenses() {
        return this.children * this.perChildExpense;
    }

    getTotalExpenses() {
        return this.expenses.tax + this.expenses.housing + this.expenses.car + this.expenses.creditCard + this.expenses.retail + this.expenses.other + this.getChildExpenses() + this.expenses.bankLoan;
    }

    getTotalStockIncome() {
        return this.stocks.reduce((sum, stock) => sum + (stock.income * stock.units), 0);
    }

    getTotalBusinessIncome() {
        return this.businesses.reduce((sum, business) => sum + business.income, 0);
    }

    getTotalRealEstateIncome() {
        return this.realEstate.reduce((sum, realEstate) => sum + realEstate.cashflow, 0);
    }

    getPassiveIncome() {
        return this.getTotalBusinessIncome() + this.getTotalRealEstateIncome() + this.getTotalStockIncome();
    }

    getTotalIncome() {
        return this.salary + this.getPassiveIncome();
    }

    getCashflow() {
        return this.getTotalIncome() - this.getTotalExpenses();
    }

    clone() {
        return new Profession({
            title: this.title,
            salary: this.salary,
            savings: this.savings,
            perChildExpense: this.perChildExpense,
            expenses: this.expenses.clone(),
            liabilities: this.liabilities.clone(),
            image: this.image,
            children: this.children
        });
    }
}