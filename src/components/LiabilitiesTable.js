import React from 'react';
import Table from 'react-bootstrap/Table';
import Profession from '../utility/Profession';
import WarningButton from './WarningButton';

export default class LiabilitiesTable extends React.Component {
    constructor(props) {
        super(props);

        this.handlePayHome = this.handlePayHome.bind(this);

        this.getProfession = props.getProfession || function () { };
    }

    handlePayHome() {
        /** @type {Profession} */
        var profession = this.getProfession();

        profession.savings -= profession.liabilities.housing;
        profession.expenses.housing = 0;
        profession.liabilities.housing = 0;
        this.forceUpdate();
    }

    handlePaySchool() { }

    handlePayCar() { }

    handlePayCreditCards() { }

    handlePayRetail() { }

    render() {
        /** @type {Profession} */
        var profession = this.getProfession() || new Profession();

        return (
            <Table striped bordered hover variant="dark">
                <tbody>
                    <tr>
                        <td>Home Mortgage</td>
                        <td><WarningButton enabled={profession.liabilities.housing > 0 && profession.savings >= profession.liabilities.housing} buttonText="Pay" title="Pay Home Mortgage" details="Are you sure you want to pay off the Home Mortgage?" callback={this.handlePayHome} /></td>
                        <td className="money">${profession.liabilities.housing.toLocaleString()}</td>
                    </tr>
                    <tr>
                        <td>School Loans</td>
                        <td><WarningButton buttonText="Pay" title="Pay Home Mortgage" details="Are you sure you want to pay off the Home Mortgage?" /></td>
                        <td className="money">${profession.liabilities.school.toLocaleString()}</td>
                    </tr>
                    <tr>
                        <td>Car Loans</td>
                        <td><WarningButton buttonText="Pay" title="Pay Home Mortgage" details="Are you sure you want to pay off the Home Mortgage?" /></td>
                        <td className="money">${profession.liabilities.car.toLocaleString()}</td>
                    </tr>
                    <tr>
                        <td>Credit Cards</td>
                        <td><WarningButton buttonText="Pay" title="Pay Home Mortgage" details="Are you sure you want to pay off the Home Mortgage?" /></td>
                        <td className="money">${profession.liabilities.creditCard.toLocaleString()}</td>
                    </tr>
                    <tr>
                        <td>Retail Debt</td>
                        <td><WarningButton buttonText="Pay" title="Pay Home Mortgage" details="Are you sure you want to pay off the Home Mortgage?" /></td>
                        <td className="money">${profession.liabilities.retail.toLocaleString()}</td>
                    </tr>
                    <tr>
                        <td>Bank Loan</td>
                        <td><WarningButton buttonText="Pay" title="Pay Home Mortgage" details="Are you sure you want to pay off the Home Mortgage?" /></td>
                        <td className="money">$ TODO</td>
                    </tr>
                </tbody>
            </Table >
        );
    }
}