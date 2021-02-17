import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import './App.css';
import Professions from './Professions';

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            hash: window.location.hash
        };
    }

    componentDidMount() {
        window.addEventListener('hashchange', () => {
            this.setState({ hash: window.location.hash });
        });
    }

    handleNewProfession(profession) {
        console.log(profession);
    }

    renderHeader() {
        return (
            <Navbar bg="dark" variant="dark" className="mb-1" expand="sm">
                <Navbar.Brand>
                    <img
                        alt="Cashflow Icon"
                        src="/icon.jpeg"
                        width="30"
                        className="d-inline-block align-top"
                    />{' '}
                    Cashflow
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav>
                        <Nav.Link href="#playerSheet">Player Sheet</Nav.Link>
                        <Nav.Link href="#professions">Professions</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }

    renderIncome() {
        return (
            <>
                <Table striped bordered hover variant="dark">
                    <tbody>
                        <tr>
                            <td>Salary</td>
                            <td className="money">$32.00</td>
                        </tr>
                        <tr>
                            <td>Dividends / Interest Income</td>
                            <td className="money">$0.00</td>
                        </tr>
                        <tr>
                            <td>Real Estate Total</td>
                            <td className="money">$0.00</td>
                        </tr>
                    </tbody>
                </Table >
                <Table striped bordered hover variant="dark">
                    <tbody>
                        <tr>
                            <td>Passive Income</td>
                            <td className="money">$0.00</td>
                        </tr>
                        <tr>
                            <td>Total Income</td>
                            <td className="money">$0.00</td>
                        </tr>
                    </tbody>
                </Table >
            </>
        );
    }

    renderExpenses() {
        return (
            <>
                <Table striped bordered hover variant="dark">
                    <tbody>
                        <tr>
                            <td>Taxes</td>
                            <td className="money">$0</td>
                        </tr>
                        <tr>
                            <td>Home Mortgage</td>
                            <td className="money">$0</td>
                        </tr>
                        <tr>
                            <td>School Loan Payment</td>
                            <td className="money">$0</td>
                        </tr>
                        <tr>
                            <td>Car Payment</td>
                            <td className="money">$0</td>
                        </tr>
                        <tr>
                            <td>Credit Card Payment</td>
                            <td className="money">$0</td>
                        </tr>
                        <tr>
                            <td>Retail Payment</td>
                            <td className="money">$0</td>
                        </tr>
                        <tr>
                            <td>Other Expenses</td>
                            <td className="money">$0</td>
                        </tr>
                        <tr>
                            <td>Child Expenses</td>
                            <td className="money">$0</td>
                        </tr>
                        <tr>
                            <td>Bank Loan Payment</td>
                            <td className="money">$0</td>
                        </tr>
                    </tbody>
                </Table >
                <Table striped bordered hover variant="dark">
                    <tbody>
                        <tr>
                            <td>Total Expenses</td>
                            <td className="money">$0</td>
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

    renderLiabilities() {
        return (
            <Table striped bordered hover variant="dark">
                <tbody>
                    <tr>
                        <td>Home Mortgage</td>
                        <td className="money">$32.00</td>
                    </tr>
                    <tr>
                        <td>School Loans</td>
                        <td className="money">$0.00</td>
                    </tr>
                    <tr>
                        <td>Car Loans</td>
                        <td className="money">$0.00</td>
                    </tr>
                    <tr>
                        <td>Credit Cards</td>
                        <td className="money">$0.00</td>
                    </tr>
                    <tr>
                        <td>Retail Debt</td>
                        <td className="money">$0.00</td>
                    </tr>
                    <tr>
                        <td>Bank Loan</td>
                        <td className="money">$0.00</td>
                    </tr>
                </tbody>
            </Table >
        );
    }

    renderBody() {
        if (this.state.hash === '' || this.state.hash === '#playerSheet') {
            return (
                <Tabs defaultActiveKey="income" variant="tabs">
                    <Tab eventKey="income" title="Income">
                        {this.renderIncome()}
                    </Tab>
                    <Tab eventKey="expenses" title="Expenses">
                        {this.renderExpenses()}
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
                    <Tab eventKey="liabilities" title="Liabilities">
                        {this.renderLiabilities()}
                    </Tab>
                </Tabs>
            );
        } else {
            return <Professions handleNewProfession={this.handleNewProfession} />;
        }
    }

    render() {
        return (
            <>
                {this.renderHeader()}

                <Container fluid>
                    {this.renderBody()}
                </Container>
            </>
        );
    }
}