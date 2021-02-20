import React from 'react';
import Table from 'react-bootstrap/Table';
import WarningButton from './WarningButton';
import StocksForm from './StocksForm';
import Stock from '../utility/Stock';
// eslint-disable-next-line
import Profession from '../utility/Profession';
import Form from 'react-bootstrap/Form';
import MultiButton from './MultiButton';

export default class StocksTable extends React.Component {
    constructor(props) {
        super(props);

        this.handleYesButton = this.handleYesButton.bind(this);
        this.handleFormUpdate = this.handleFormUpdate.bind(this);
        this.handleSellStock = this.handleSellStock.bind(this);
        this.handleReverseSplit = this.handleReverseSplit.bind(this);
        this.handleSplit = this.handleSplit.bind(this);

        /** @type {function(): Profession} */
        this.getProfession = props.getProfession;
        this.formData = null;
        this.lastClickedStock = null;

        this.sellCost = 0;
        this.sellForm = (
            <Form onSubmit={(e) => e.preventDefault()}>
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

    handleReverseSplit() {
        this.lastClickedStock.units = Math.floor(this.lastClickedStock.units / 2);
        this.forceUpdate();
    }

    handleSplit() {
        this.lastClickedStock.units *= 2;
        this.forceUpdate();
    }

    getSellButtonDetails(stock) {
        return () => {
            return "Would you like to sell your " + stock.units.toLocaleString() + " units of " + stock.name + "? You originally purchased them for $" + stock.cost.toLocaleString() + " per unit.";
        };
    }

    getReverseSplitButtonDetails(stock) {
        return () => {
            return "Would you like to reverse split your shares of " + stock.name + "? Your shares after a reverse split will be " + (Math.floor(stock.units / 2)).toLocaleString() + ".";
        };
    }

    getSplitButtonDetails(stock) {
        return () => {
            return "Would you like to split your shares of " + stock.name + "? Your shares after a split will be " + (stock.units * 2).toLocaleString() + ".";
        };
    }

    getActionsButtonDetails(stock) {
        return () => {
            return "You own " + stock.units.toLocaleString() + " units of " + stock.name + " at $" + stock.cost.toLocaleString() + " per unit.";
        };
    }

    render() {
        var profession = this.getProfession();
        var stocks = profession.stocks.map((stock) => (
            <tr key={stock.key}>
                <td>{stock.name}</td>
                <td className="align-right">{stock.units.toLocaleString()}</td>
                <td className="money">${stock.income.toLocaleString()}</td>
                <td onClick={() => this.lastClickedStock = stock}>
                    <MultiButton
                        buttonText="Actions"
                        title={stock.name + "'s Actions and Info"}
                        details={this.getActionsButtonDetails(stock)}
                        buttons={[
                            <WarningButton
                                key="1"
                                buttonText="Sell"
                                title={"Sell " + stock.name}
                                details={this.getSellButtonDetails(stock)}
                                callback={this.handleSellStock}
                                form={this.sellForm}
                            />,
                            <WarningButton
                                key="2"
                                buttonText="Reverse Split (1 for 2)"
                                title={"Reverse Split " + stock.name}
                                details={this.getReverseSplitButtonDetails(stock)}
                                callback={this.handleReverseSplit}
                            />,
                            <WarningButton
                                key="3"
                                buttonText="Split (2 for 1)"
                                title={"Split " + stock.name}
                                details={this.getSplitButtonDetails(stock)}
                                callback={this.handleSplit}
                            />
                        ]}
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