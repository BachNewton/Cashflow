import React from 'react';
import Table from 'react-bootstrap/Table';
import Profession from '../utility/Profession';
import WarningButton from './WarningButton';

export default class LiabilitiesTable extends React.Component {
    constructor(props) {
        super(props);

        this.getProfession = props.getProfession || function () { };

        this.keys = ['housing', 'school', 'car', 'creditCard', 'retail'];
        this.names = ['Home Mortgage', 'School Loans', 'Car Loans', 'Credit Cards', 'Retail Debt'];
        this.canPay = this.keys.map((key) => {
            return () => {
                /** @type {Profession} */
                var profession = this.getProfession();
                return profession.liabilities[key] > 0 && profession.savings >= profession.liabilities[key];
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

    render() {
        /** @type {Profession} */
        var profession = this.getProfession() || new Profession();

        var rows = [];

        for (var i = 0; i < this.keys.length; i++) {
            rows.push(
                <tr key={i}>
                    <td>{this.names[i]}</td>
                    <td><WarningButton getEnabled={this.canPay[i]} buttonText="Pay" title={"Pay " + this.names[i]} details={"Are you sure you want to pay off the " + this.names[i] + "?"} callback={this.handlePay[i]} /></td>
                    <td className="money">${profession.liabilities[this.keys[i]].toLocaleString()}</td>
                </tr>
            );
        }

        return (
            <Table striped bordered hover variant="dark">
                <tbody>{rows}</tbody>
            </Table >
        );
    }
}