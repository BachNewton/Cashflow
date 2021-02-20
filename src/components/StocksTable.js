import React from 'react';
import Table from 'react-bootstrap/Table';
import WarningButton from './WarningButton';
import StocksForm from './StocksForm';
import Stock from '../utility/Stock';
// eslint-disable-next-line
import Profession from '../utility/Profession';
import Form from 'react-bootstrap/Form';

export default class StocksTable extends React.Component {
    constructor(props) {
        super(props);

        this.handleYesButton = this.handleYesButton.bind(this);
        this.handleFormUpdate = this.handleFormUpdate.bind(this);
        this.handleSellStock = this.handleSellStock.bind(this);

        /** @type {function(): Profession} */
        this.getProfession = props.getProfession;
        this.formData = null;
        this.lastClickedStock = null;

        this.sellCost = 0;
        this.sellForm = (
            <Form>
                <Form.Group>
                    <Form.Label>Selling Price</Form.Label>
                    <Form.Control type="number" placeholder="0" onChange={e => this.sellCost = e.target.value} />
                </Form.Group>
            </Form>
        );
    }

    handleFormUpdate(data) {
        this.formData = data;
    }

    handleYesButton() {
        if (this.formData === null || this.formData.units === 0) return;

        var stock = new Stock({
            name: this.formData.name,
            cost: this.formData.cost,
            units: this.formData.units,
            income: this.formData.income
        });

        var profession = this.getProfession();
        profession.savings -= stock.cost * stock.units;
        profession.stocks.push(stock);
        this.forceUpdate();
    }

    handleSellStock() {
        if (this.sellCost === '') return;

        this.sellCost = parseInt(this.sellCost);
        var profession = this.getProfession();
        profession.savings += this.sellCost * this.lastClickedStock.units;
        var index = profession.stocks.indexOf(this.lastClickedStock);
        profession.stocks.splice(index, 1);
        this.forceUpdate();
    }

    render() {
        var profession = this.getProfession();
        var stocks = profession.stocks.map((stock) => (
            <tr key={stock.key}>
                <td>{stock.name}</td>
                <td className="align-right">{stock.units.toLocaleString()}</td>
                <td className="money">${stock.income.toLocaleString()}</td>
                <td onClick={() => this.lastClickedStock = stock}>
                    <WarningButton
                        buttonText="Sell"
                        title={"Sell " + stock.name}
                        details={"Would you like to sell your " + stock.units + " units of " + stock.name + "? You originally purchased them for $" + stock.cost.toLocaleString() + " per unit."}
                        callback={this.handleSellStock}
                        form={this.sellForm}
                    />
                </td>
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

                <Table striped bordered hover variant="dark" size="sm">
                    <thead>
                        <tr>
                            <th>Name</th>
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