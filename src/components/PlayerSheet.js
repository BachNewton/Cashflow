import React from 'react';
import Table from 'react-bootstrap/Table';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Profession from '../utility/Profession';
import Jumbotron from 'react-bootstrap/Jumbotron';
import './PlayerSheet.css';
import LiabilitiesTable from './LiabilitiesTable';
import ActionsTab from './ActionsTab';
import StocksTable from './StocksTable';

export default class PlayerSheet extends React.Component {
    constructor(props) {
        super(props);

        this.handleActionTaken = this.handleActionTaken.bind(this);

        this.state = {
            tab: 'info'
        };

        this.getProfession = props.getProfession || function () { return new Profession(); };
    }

    handleActionTaken() {
        this.setState({ tab: 'info' });
    }

    renderInfo(/** @type {Profession} */ profession) {
        return (
            <Jumbotron>
                <h1>{profession.title}</h1>
                <Table striped bordered hover variant="dark">
                    <tbody>
                        <tr>
                            <td>Cashflow</td>
                            <td className="money">${profession.getCashflow().toLocaleString()}</td>
                        </tr>
                        <tr>
                            <td>Savings</td>
                            <td className="money">${profession.savings.toLocaleString()}</td>
                        </tr>
                        <tr>
                            <td>Children</td>
                            <td>{profession.children}</td>
                        </tr>
                        <tr>
                            <td>Per Child Expense</td>
                            <td className="money">${profession.perChildExpense.toLocaleString()}</td>
                        </tr>
                    </tbody>
                </Table>
                <img src={profession.image} alt="Profession" style={{ maxWidth: "25rem", width: "100%", marginLeft: "auto", marginRight: "auto", display: "block" }} />
            </Jumbotron>
        );
    }

    renderIncome(/** @type {Profession} */ profession) {
        return (
            <>
                <Table striped bordered hover variant="dark">
                    <tbody>
                        <tr>
                            <td>Salary</td>
                            <td className="money">${profession.salary.toLocaleString()}</td>
                        </tr>
                        <tr>
                            <td>Dividends / Interest Income</td>
                            <td className="money">${profession.getTotalStockIncome().toLocaleString()}</td>
                        </tr>
                        <tr>
                            <td>Real Estate Total</td>
                            <td className="money">${profession.getTotalRealEstateIncome().toLocaleString()}</td>
                        </tr>
                        <tr>
                            <td>Business Total</td>
                            <td className="money">${profession.getTotalBusinessIncome().toLocaleString()}</td>
                        </tr>
                    </tbody>
                </Table >
                <Table striped bordered hover variant="dark">
                    <tbody>
                        <tr>
                            <td>Passive Income</td>
                            <td className="money">${profession.getPassiveIncome().toLocaleString()}</td>
                        </tr>
                        <tr>
                            <td>Total Income</td>
                            <td className="money">${profession.getTotalIncome().toLocaleString()}</td>
                        </tr>
                    </tbody>
                </Table >
            </>
        );
    }

    renderExpenses(/** @type {Profession} */ profession) {
        return (
            <>
                <Table striped bordered hover variant="dark">
                    <tbody>
                        <tr>
                            <td>Taxes</td>
                            <td className="money">${profession.expenses.tax.toLocaleString()}</td>
                        </tr>
                        <tr>
                            <td>Home Mortgage</td>
                            <td className="money">${profession.expenses.housing.toLocaleString()}</td>
                        </tr>
                        <tr>
                            <td>School Loan Payment</td>
                            <td className="money">${profession.expenses.school.toLocaleString()}</td>
                        </tr>
                        <tr>
                            <td>Car Payment</td>
                            <td className="money">${profession.expenses.car.toLocaleString()}</td>
                        </tr>
                        <tr>
                            <td>Credit Card Payment</td>
                            <td className="money">${profession.expenses.creditCard.toLocaleString()}</td>
                        </tr>
                        <tr>
                            <td>Retail Payment</td>
                            <td className="money">${profession.expenses.retail.toLocaleString()}</td>
                        </tr>
                        <tr>
                            <td>Other Expenses</td>
                            <td className="money">${profession.expenses.other.toLocaleString()}</td>
                        </tr>
                        <tr>
                            <td>Child Expenses (x{profession.children})</td>
                            <td className="money">${profession.getChildExpenses().toLocaleString()}</td>
                        </tr>
                        <tr>
                            <td>Bank Loan Payment</td>
                            <td className="money">${profession.expenses.bankLoan.toLocaleString()}</td>
                        </tr>
                    </tbody>
                </Table >
                <Table striped bordered hover variant="dark">
                    <tbody>
                        <tr>
                            <td>Total Expenses</td>
                            <td className="money">${profession.getTotalExpenses().toLocaleString()}</td>
                        </tr>
                    </tbody>
                </Table>
            </>
        );
    }

    renderRealEstate() {
        return (
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>Type</th>
                        <th>Cost</th>
                        <th>Mortgage</th>
                        <th>Cash Flow</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </Table>
        );
    }

    renderBusinesses() {
        return (
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Income</th>
                        <th>Liability</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </Table>
        );
    }

    handleChangeTab(key) {
        this.setState({ tab: key });
    }

    render() {
        var profession = this.getProfession();

        return (
            <Tabs fill variant="tabs" activeKey={this.state.tab} onSelect={(k) => this.handleChangeTab(k)}>
                <Tab eventKey="info" title="Info">
                    {this.renderInfo(profession)}
                </Tab>
                <Tab eventKey="income" title="Income">
                    {this.renderIncome(profession)}
                </Tab>
                <Tab eventKey="expenses" title="Expenses">
                    {this.renderExpenses(profession)}
                </Tab>
                <Tab eventKey="liabilities" title="Liabilities">
                    <LiabilitiesTable getProfession={this.getProfession} />
                </Tab>
                <Tab eventKey="realEstate" title="Real Estate">
                    {this.renderRealEstate()}
                </Tab>
                <Tab eventKey="stocksMutalsCDs" title="Stocks / Mutal's / CDs">
                    <StocksTable getProfession={this.getProfession} />
                </Tab>
                <Tab eventKey="businesses" title="Businesses">
                    {this.renderBusinesses()}
                </Tab>
                <Tab eventKey="actions" title="Actions">
                    <ActionsTab actionTaken={this.handleActionTaken} getProfession={this.getProfession} />
                </Tab>
            </Tabs>
        );
    }
}