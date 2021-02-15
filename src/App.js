import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import './App.css';

export default class App extends React.Component {
    renderHeader() {
        return (
            <Navbar bg="dark" variant="dark" className="mb-1">
                <Navbar.Brand>
                    <img
                        alt="Cashflow Icon"
                        src="/icon.jpeg"
                        width="30"
                        className="d-inline-block align-top"
                    />{' '}
                    Cashflow Player Sheet
                </Navbar.Brand>
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

    renderBody() {
        return (
            <Container fluid>
                <Tabs defaultActiveKey="income">
                    <Tab eventKey="income" title="Income">
                        {this.renderIncome()}
                    </Tab>
                    <Tab eventKey="expenses" title="Expenses">
                        {this.renderExpenses()}
                    </Tab>
                </Tabs>
            </Container>
        );
    }

    render() {
        return (
            <>
                {this.renderHeader()}
                {this.renderBody()}
            </>
        );
    }
}