import React from 'react';
import WarningButton from './WarningButton';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Profession from '../utility/Profession';
import Form from 'react-bootstrap/Form';

export default class ActionsTab extends React.Component {
    constructor(props) {
        super(props);

        this.handlePaycheck = this.handlePaycheck.bind(this);
        this.handleDoodad = this.handleDoodad.bind(this);
        this.handleBankLoan = this.handleBankLoan.bind(this);
        this.handleBaby = this.handleBaby.bind(this);
        this.handleCharity = this.handleCharity.bind(this);
        this.handleDownsize = this.handleDownsize.bind(this);
        this.getCharityButtonDetails = this.getCharityButtonDetails.bind(this);
        this.getDownsizeButtonDetails = this.getDownsizeButtonDetails.bind(this);
        this.getBankLoanButtonDetails = this.getBankLoanButtonDetails.bind(this);
        this.getRequiredBankLoan = this.getRequiredBankLoan.bind(this);

        /** @type {function(): Profession} */
        this.getProfession = props.getProfession || function () { return new Profession(); };
        this.actionTaken = props.actionTaken || function () { };

        this.doodadCost = 0;
        this.doodadForm = (
            <Form onSubmit={(e) => e.preventDefault()}>
                <Form.Group>
                    <Form.Label>Cost</Form.Label>
                    <Form.Control type="number" placeholder="0" onChange={e => this.doodadCost = e.target.value} />
                </Form.Group>
            </Form>
        );
    }

    handlePaycheck() {
        var profession = this.getProfession();
        profession.savings += profession.getCashflow();
        this.actionTaken();
    }

    handleDoodad() {
        if (this.doodadCost === '') return;

        var profession = this.getProfession();
        profession.savings -= parseInt(this.doodadCost);
        this.doodadCost = 0;
        this.actionTaken();
    }

    getRequiredBankLoan() {
        var profession = this.getProfession();

        var bankLoans = 1;
        if (profession.savings < 0) {
            bankLoans = Math.trunc(profession.savings / -1000);
            bankLoans += profession.savings % 1000 === 0 ? 0 : 1;
        }

        return 1000 * bankLoans;
    }

    handleBankLoan() {
        var profession = this.getProfession();
        var bankLoan = this.getRequiredBankLoan();
        profession.expenses.bankLoan += 0.1 * bankLoan;
        profession.liabilities.bankLoan += bankLoan;
        profession.savings += bankLoan;
        this.actionTaken();
    }

    handleBaby() {
        var profession = this.getProfession();
        profession.children++;
        this.actionTaken();
    }

    getCostOfCharity() {
        var profession = this.getProfession();
        return Math.floor(0.1 * profession.getTotalIncome());
    }

    handleCharity() {
        var profession = this.getProfession();
        profession.savings -= this.getCostOfCharity();
        this.actionTaken();
    }

    getCostOfDownsize() {
        var profession = this.getProfession();
        return profession.getTotalExpenses();
    }

    handleDownsize() {
        var profession = this.getProfession();
        profession.savings -= this.getCostOfDownsize();
        this.actionTaken();
    }

    getCharityButtonDetails() {
        var profession = this.getProfession();
        return "Are you sure want to give 10% of your income to charity? That will cost $" + this.getCostOfCharity().toLocaleString() + ". You currently have $" + profession.savings.toLocaleString() + " in savings.";
    }

    getDownsizeButtonDetails() {
        return "Are you sure you want to pay for an entire month of expenses? It will cost $" + this.getCostOfDownsize().toLocaleString() + ".";
    }

    getBankLoanButtonDetails() {
        return "Would you like to take a $" + this.getRequiredBankLoan().toLocaleString() + " bank loan?";
    }

    render() {
        var profession = this.getProfession();

        return (
            <Jumbotron>
                <WarningButton buttonText="Paycheck" title="Payday!" details="Are you sure you want to collect your paycheck?" callback={this.handlePaycheck} />
                <WarningButton buttonText="Doodad" title="Buy a Doodad" details="Would you like to purchase a doodad?" form={this.doodadForm} callback={this.handleDoodad} />
                <WarningButton buttonText="Bank Loan" title="Take a Bank Loan" details={this.getBankLoanButtonDetails} callback={this.handleBankLoan} />
                <WarningButton buttonText="Baby" title="Have a Baby" details="Are you sure you want to have a baby?" callback={this.handleBaby} getEnabled={() => profession.children < 3} />
                <WarningButton buttonText="Charity" title="Give to Charity" details={this.getCharityButtonDetails} callback={this.handleCharity} />
                <WarningButton buttonText="Downsized" title="Downsize" details={this.getDownsizeButtonDetails} callback={this.handleDownsize} />
            </Jumbotron>
        );
    }
}