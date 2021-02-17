import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import './App.css';
import Professions from './Professions';
import PlayerSheet from './PlayerSheet';
import Profession from '../utility/Profession';
import Expenses from '../utility/Expenses';
import Liabilities from '../utility/Liabilities';

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.handleNewProfession = this.handleNewProfession.bind(this);
        this.getProfession = this.getProfession.bind(this);

        this.state = {
            hash: window.location.hash,
            profession: new Profession(),
            expenses: new Expenses(),
            liabilities: new Liabilities(),
            savings: 0
        };
    }

    componentDidMount() {
        window.addEventListener('hashchange', () => {
            this.setState({ hash: window.location.hash });
        });
    }

    handleNewProfession(/** @type {Profession} */ profession) {
        var hash = '#playerSheet';
        window.history.pushState(null, '', '#playerSheet');

        var savings = profession.savings;
        // var expenses = Object.assign({}, profession.expenses);
        // var liabilities = Object.assign({}, profession.liabilities);
        this.setState({
            profession: profession,
            hash: hash,
            // expenses: expenses,
            // liabilities: liabilities,
            savings: savings
        });
    }

    getProfession() {
        return this.state.profession;
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

    renderBody() {
        if (this.state.hash === '' || this.state.hash === '#playerSheet') {
            return <PlayerSheet getProfession={this.getProfession} />;
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