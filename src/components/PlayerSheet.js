import React from 'react';
import Table from 'react-bootstrap/Table';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Profession from '../utility/Profession';
import Jumbotron from 'react-bootstrap/Jumbotron';
import './PlayerSheet.css';
import WarningButton from './WarningButton';
import Form from 'react-bootstrap/Form';
import LiabilitiesTable from './LiabilitiesTable';

export default class PlayerSheet extends React.Component {
    constructor(props) {
        super(props);

        this.handlePaycheck = this.handlePaycheck.bind(this);
        this.handleDoodad = this.handleDoodad.bind(this);

        this.state = {
            tab: 'info'
        };

        this.getProfession = props.getProfession || function () { };

        this.doodadForm = 0;
    }

    getTotalStockIncome(/** @type {Profession} */ profession) {
        return profession.stocks.reduce((sum, stock) => sum + (stock.income * stock.shares), 0);
    }

    getTotalBusinessIncome(/** @type {Profession} */ profession) {
        return profession.businesses.reduce((sum, business) => sum + business.income, 0);
    }

    getTotalRealEstateIncome(/** @type {Profession} */ profession) {
        return profession.realEstate.reduce((sum, realEstate) => sum + realEstate.cashflow, 0);
    }

    getTotalIncome(/** @type {Profession} */ profession) {
        return profession.salary + this.getTotalBusinessIncome(profession) + this.getTotalRealEstateIncome(profession) + this.getTotalStockIncome(profession);
    }

    getChildExpenses(/** @type {Profession} */ profession) {
        return profession.children * profession.perChildExpense;
    }

    getTotalExpenses(/** @type {Profession} */ profession) {
        return profession.expenses.tax + profession.expenses.housing + profession.expenses.car + profession.expenses.creditCard + profession.expenses.retail + profession.expenses.other + this.getChildExpenses(profession);
    }

    getCashflow(/** @type {Profession} */ profession) {
        return this.getTotalIncome(profession) - this.getTotalExpenses(profession);
    }

    renderInfo(/** @type {Profession} */ profession) {
        return (
            <Jumbotron>
                <h1>{profession.title}</h1>
                <Table striped bordered hover variant="dark">
                    <tbody>
                        <tr>
                            <td>Cashflow</td>
                            <td className="money">${this.getCashflow(profession).toLocaleString()}</td>
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
                            <td className="money">${this.getTotalStockIncome(profession).toLocaleString()}</td>
                        </tr>
                        <tr>
                            <td>Real Estate Total</td>
                            <td className="money">${this.getTotalRealEstateIncome(profession).toLocaleString()}</td>
                        </tr>
                        <tr>
                            <td>Business Total</td>
                            <td className="money">${this.getTotalBusinessIncome(profession).toLocaleString()}</td>
                        </tr>
                    </tbody>
                </Table >
                <Table striped bordered hover variant="dark">
                    <tbody>
                        <tr>
                            <td>Passive Income</td>
                            <td className="money">$ TODO</td>
                        </tr>
                        <tr>
                            <td>Total Income</td>
                            <td className="money">${this.getTotalIncome(profession).toLocaleString()}</td>
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
                            <td className="money">${this.getChildExpenses(profession).toLocaleString()}</td>
                        </tr>
                        <tr>
                            <td>Bank Loan Payment</td>
                            <td className="money">$ TODO</td>
                        </tr>
                    </tbody>
                </Table >
                <Table striped bordered hover variant="dark">
                    <tbody>
                        <tr>
                            <td>Total Expenses</td>
                            <td className="money">${this.getTotalExpenses(profession).toLocaleString()}</td>
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

    renderStocksMutalsCDs() {
        return (
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Amount</th>
                        <th>Income / Splits</th>
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

    handlePaycheck() {
        var profession = this.getProfession();
        profession.savings += this.getCashflow(profession);
        this.setState({ tab: 'info' });
    }

    handleDoodad() {
        if (this.doodadForm === '' || isNaN(this.doodadForm)) return;

        var profession = this.getProfession();
        profession.savings -= parseInt(this.doodadForm);
        this.setState({ tab: 'info' });
    }

    getDoodadForm() {
        return (
            <Form>
                <Form.Group>
                    <Form.Label>Cost</Form.Label>
                    <Form.Control type="number" placeholder="0" onChange={e => this.doodadForm = e.target.value} />
                </Form.Group>
            </Form>
        );
    }

    renderActions() {
        return (
            <Jumbotron>
                <WarningButton buttonText="Paycheck" title="Payday!" details="Are you sure you want to collect your paycheck?" callback={this.handlePaycheck} />
                <WarningButton buttonText="Doodad" title="Buy a Doodad" details="Would you like to purchase a doodad?" form={this.getDoodadForm()} callback={this.handleDoodad} />
                <WarningButton />
                <WarningButton />
                <WarningButton />
            </Jumbotron>
        );
    }

    handleChangeTab(key) {
        this.setState({ tab: key });
    }

    render() {
        var profession = this.getProfession() || new Profession();

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
                    {this.renderStocksMutalsCDs()}
                </Tab>
                <Tab eventKey="businesses" title="Businesses">
                    {this.renderBusinesses()}
                </Tab>
                <Tab eventKey="actions" title="Actions">
                    {this.renderActions()}
                </Tab>
            </Tabs>
        );
    }
}