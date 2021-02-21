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
import WarningButton from './WarningButton';
import fastTrackImage from '../images/fastTrack.webp';

export default class PlayerSheet extends React.Component {
    constructor(props) {
        super(props);

        this.handleActionTaken = this.handleActionTaken.bind(this);
        this.handleEnterFastTrack = this.handleEnterFastTrack.bind(this);

        this.state = {
            tab: 'info'
        };

        /** @type {function(): Profession} */
        this.getProfession = props.getProfession || function () { return new Profession(); };
    }

    handleActionTaken() {
        this.setState({ tab: 'info' });
    }

    handleEnterFastTrack() {
        var profession = this.getProfession();

        profession.inRatRace = false;

        profession.realEstate.forEach((realEstate) => realEstate.cashflow *= 100);
        profession.stocks.forEach((stock) => stock.income *= 100);
        profession.businesses.forEach((business) => business.income *= 100);
        var passiveIncome = profession.getPassiveIncome();
        profession.cashflowGoal = passiveIncome + 50000;
        profession.savings += passiveIncome;
        profession.salary = 0;
        profession.image = fastTrackImage;
        profession.title = 'Fast Track!';

        this.forceUpdate();
    }

    renderFastTrackStatusRow(/** @type {Profession} */ profession) {
        if (profession.inRatRace) {
            var passiveIncomeUntilFastTrack = profession.getPassiveIncomeUntilFastTrack();

            if (passiveIncomeUntilFastTrack >= 0) {
                return (
                    <tr>
                        <td>Additional Passive Income required to leave <span style={{ color: "red" }}>Rat Race</span></td>
                        <td className="money">${passiveIncomeUntilFastTrack.toLocaleString()}</td>
                    </tr>
                );
            }

            return (
                <tr>
                    <td>Ready for <span style={{ color: "lime" }}>Fast Track</span>!</td>
                    <td><WarningButton
                        buttonText="START!"
                        title="Fast Track!"
                        details="Are you sure you want to leave the Rat Race and enter the Fast Track? You will quit your job, all your Expenses and Liabilities will be ignored, and all your Passive Income will be multipled by 100! You will also receive your Cashflow Day Income right now!"
                        callback={this.handleEnterFastTrack}
                    /></td>
                </tr>
            );
        }

        var cashflowRequiredToWin = profession.cashflowGoal - profession.getCashflow();

        if (cashflowRequiredToWin > 0) {
            return (
                <tr>
                    <td>Additional Cashflow required to win</td>
                    <td className="money">${cashflowRequiredToWin.toLocaleString()}</td>
                </tr>
            );
        }

        return (
            <tr>
                <td colSpan="2" style={{ textAlign: "center" }}><span style={{ color: "lime" }}>YOU WIN!!</span></td>
            </tr>
        );
    }

    renderInfo(/** @type {Profession} */ profession) {
        var childrenRows = <></>;
        if (profession.inRatRace) {
            childrenRows = (
                <>
                    <tr>
                        <td>Children</td>
                        <td className="align-right">{profession.children}</td>
                    </tr>
                    <tr>
                        <td>Per Child Expense</td>
                        <td className="money">${profession.perChildExpense.toLocaleString()}</td>
                    </tr>
                </>
            );
        }

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
                        {this.renderFastTrackStatusRow(profession)}
                        {childrenRows}
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
                <Tab eventKey="expensesAndLiabilities" title="Expenses / Liabilities">
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