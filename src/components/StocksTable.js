import React from 'react';
import Table from 'react-bootstrap/Table';
import WarningButton from './WarningButton';
import StocksForm from './StocksForm';
import Stock from '../utility/Stock';
// eslint-disable-next-line
import Profession from '../utility/Profession';

export default class StocksTable extends React.Component {
    constructor(props) {
        super(props);

        this.handleYesButton = this.handleYesButton.bind(this);
        this.handleFormUpdate = this.handleFormUpdate.bind(this);

        /** @type {function(): Profession} */
        this.getProfession = props.getProfession;
        this.formData = null;
    }

    handleFormUpdate(data) {
        this.formData = data;
    }

    handleYesButton() {
        if (this.formData === null) return;

        var stock = new Stock({
            name: this.formData.name,
            cost: this.formData.cost,
            units: this.formData.units
        });

        var profession = this.getProfession();
        profession.savings -= stock.cost * stock.units;
        profession.stocks.push(stock);
        this.forceUpdate();
    }

    render() {
        var profession = this.getProfession();
        var stocks = profession.stocks.map((stock) => (
            <tr key={stock.key}>
                <td>{stock.name}</td>
                <td className="money">${stock.cost.toLocaleString()}</td>
                <td>{stock.units}</td>
                <td className="money">${stock.income.toLocaleString()}</td>
            </tr>
        ));

        return (
            <>
                <WarningButton
                    buttonText="Buy"
                    title="Buy Stocks / Mutal's / CDs"
                    details="Would you like to buy?"
                    form={<StocksForm getProfession={this.getProfession} dataUpdate={this.handleFormUpdate} />}
                    callback={this.handleYesButton}
                />

                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Price per Share</th>
                            <th>Units</th>
                            <th>Income</th>
                        </tr>
                    </thead>
                    <tbody>{stocks}</tbody>
                </Table>
            </>
        );
    }
}