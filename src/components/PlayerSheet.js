import React from 'react';
import Table from 'react-bootstrap/Table';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Profession from '../utility/Profession';
import Jumbotron from 'react-bootstrap/Jumbotron';
import ActionsTab from './ActionsTab';
import StocksTable from './StocksTable';
import RealEstateTable from './RealEstateTable';
import BusinessesTable from './BusinessesTable';
import ExpensesAndLiabilitiesTable from './ExpensesAndLiabilitiesTable';

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

    renderPassiveIncomeUntilFastTrackCol(/** @type {Profession} */ profession) {
        var passiveIncomeUntilFastTrack = profession.getPassiveIncomeUntilFastTrack();

        if (passiveIncomeUntilFastTrack < 0) {
            return <td style={{ color: "lime", textAlign: "center" }}>FAST TRACK</td>
        }

        return <td className="money">${passiveIncomeUntilFastTrack.toLocaleString()}</td>;
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
                            <td>Additional Passive Income required until Fast Track</td>
                            {this.renderPassiveIncomeUntilFastTrackCol(profession)}
                        </tr>
                        <tr>
                            <td>Children</td>
                            <td className="align-right">{profession.children}</td>
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
                <Tab eventKey="expensesAndLiabilities" title="Expenses / Labilities">
                    <ExpensesAndLiabilitiesTable getProfession={this.getProfession} />
                </Tab>
                <Tab eventKey="realEstate" title="Real Estate">
                    <RealEstateTable getProfession={this.getProfession} />
                </Tab>
                <Tab eventKey="stocksMutalsCDs" title="Stocks / Mutal's / CDs">
                    <StocksTable getProfession={this.getProfession} />
                </Tab>
                <Tab eventKey="businesses" title="Businesses">
                    <BusinessesTable getProfession={this.getProfession} />
                </Tab>
                <Tab eventKey="actions" title="Actions">
                    <ActionsTab actionTaken={this.handleActionTaken} getProfession={this.getProfession} />
                </Tab>
            </Tabs>
        );
    }
}