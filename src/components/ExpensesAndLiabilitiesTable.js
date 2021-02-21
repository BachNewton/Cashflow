import React from 'react';
import Table from 'react-bootstrap/Table';
import Profession from '../utility/Profession';
import WarningButton from './WarningButton';

export default class ExpensesAndLiabilitiesTable extends React.Component {
    constructor(props) {
        super(props);

        this.handlePayBankLoan = this.handlePayBankLoan.bind(this);

        this.getProfession = props.getProfession || function () { };

        this.keys = ['housing', 'school', 'car', 'creditCard', 'retail'];
        this.names = ['Home Mortgage', 'School Loans', 'Car Loans', 'Credit Cards', 'Retail Debt'];
        this.canPay = this.keys.map((key) => {
            return () => {
                /** @type {Profession} */
                var profession = this.getProfession();
                return profession.inRatRace && profession.liabilities[key] > 0 && profession.savings >= profession.liabilities[key];
            };
        });
        this.handlePay = this.keys.map((key) => {
            return () => {
                /** @type {Profession} */
                var profession = this.getProfession();
                profession.savings -= profession.liabilities[key];
                profession.expenses[key] = 0;
                profession.liabilities[key] = 0;
                this.forceUpdate();
            };
        });
    }

    handlePayBankLoan() {
        /** @type {Profession} */
        var profession = this.getProfession();
        profession.savings -= 1000;
        profession.expenses.bankLoan -= 100;
        profession.liabilities.bankLoan -= 1000;
        this.forceUpdate();
    }

    render() {
        /** @type {Profession} */
        var profession = this.getProfession() || new Profession();

        var rows = [];

        for (var i = 0; i < this.keys.length; i++) {
            rows.push(
                <tr key={i}>
                    <td>{this.names[i]}</td>
                    <td className="money">${profession.expenses[this.keys[i]].toLocaleString()}</td>
                    <td className="money">${profession.liabilities[this.keys[i]].toLocaleString()}</td>
                    <td>
                        <WarningButton
                            getEnabled={this.canPay[i]}
                            buttonText="Pay"
                            title={"Pay " + this.names[i]}
                            details={"Are you sure you want to pay off the " + this.names[i] + "?"}
                            callback={this.handlePay[i]}
                        />
                    </td>
                </tr>
            );
        }

        // Bank Loan special case
        rows.push(
            <tr key={this.keys.length}>
                <td>Bank Loan</td>
                <td className="money">${profession.expenses.bankLoan.toLocaleString()}</td>
                <td className="money">${profession.liabilities.bankLoan.toLocaleString()}</td>
                <td>
                    <WarningButton
                        getEnabled={() => profession.inRatRace && profession.liabilities.bankLoan > 0 && profession.savings >= 1000}
                        buttonText="Pay"
                        title="Pay Bank Loan"
                        details="Are you sure you want to pay off $1,000 of your bank loan?"
                        callback={this.handlePayBankLoan}
                    />
                </td>
            </tr>
        );

        var fastTrackRow = <></>;
        if (!profession.inRatRace) {
            fastTrackRow = (
                <div style={{ textAlign: "center", fontWeight: "bold", marginTop: "1rem", marginBottom: "1rem", fontSize: "1.5rem" }}>
                    Expenses and Liabilities are Ignored in the <span style={{ color: "lime" }}>Fast Track</span>!
                </div>
            );
        }

        return (
            <>
                {fastTrackRow}

                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>Debt</th>
                            <th>Monthly Payment</th>
                            <th>Liability</th>
                        </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                </Table >

                <Table striped bordered hover variant="dark">
                    <tbody>
                        <tr>
                            <td>Taxes</td>
                            <td className="money">${profession.expenses.tax.toLocaleString()}</td>
                        </tr>
                        <tr>
                            <td>Other Expenses</td>
                            <td className="money">${profession.expenses.other.toLocaleString()}</td>
                        </tr>
                        <tr>
                            <td>Child Expenses (x{profession.children})</td>
                            <td className="money">${profession.getChildExpenses().toLocaleString()}</td>
                        </tr>
                    </tbody>
                </Table>

                <Table striped bordered hover variant="dark">
                    <tbody>
                        <tr>
                            <th>Total Expenses</th>
                            <th className="money">${profession.getTotalExpenses().toLocaleString()}</th>
                        </tr>
                    </tbody>
                </Table>
            </>
        );
    }
}