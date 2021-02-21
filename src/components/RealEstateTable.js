import React from 'react';
import Table from 'react-bootstrap/Table';
import WarningButton from './WarningButton';
// eslint-disable-next-line
import Profession from '../utility/Profession';
import Form from 'react-bootstrap/Form';
import RealEstate from '../utility/RealEstate';
import MultiButton from './MultiButton';
import RealEstateForm from './RealEstateForm';

export default class RealEstateTable extends React.Component {
    constructor(props) {
        super(props);

        this.handleYesButton = this.handleYesButton.bind(this);
        this.handleSellRealEstate = this.handleSellRealEstate.bind(this);
        this.handleForecloseRealEstate = this.handleForecloseRealEstate.bind(this);
        this.getBuyButtonDetails = this.getBuyButtonDetails.bind(this);
        this.handleFormUpdate = this.handleFormUpdate.bind(this);

        /** @type {function(): Profession} */
        this.getProfession = props.getProfession;
        this.lastClickedRealEstate = null;

        this.formData = null;

        this.sellPricePerUnit = 0;
        this.sellForm = (
            <Form onSubmit={(e) => e.preventDefault()}>
                <Form.Group>
                    <Form.Label>Selling Price per Unit</Form.Label>
                    <Form.Control type="number" placeholder="0" onChange={e => this.sellPricePerUnit = e.target.value} />
                </Form.Group>
            </Form>
        );
    }

    handleFormUpdate(data) {
        this.formData = data;
    }

    handleYesButton() {
        if (this.formData === null) return;

        var realEstate = new RealEstate({
            type: this.formData.type.split(',')[0],
            units: parseInt(this.formData.type.split(',')[1]),
            cost: this.formData.cost,
            mortgage: this.formData.cost - this.formData.downPayment,
            cashflow: this.formData.cashflow
        });

        var profession = this.getProfession();
        profession.savings -= realEstate.cost - realEstate.mortgage;
        profession.realEstate.push(realEstate);

        this.forceUpdate();
    }

    handleSellRealEstate() {
        if (this.sellPricePerUnit === '') return;

        this.sellPricePerUnit = parseInt(this.sellPricePerUnit);
        var profession = this.getProfession();
        var proceeds = this.lastClickedRealEstate.units * this.sellPricePerUnit;
        profession.savings += proceeds - this.lastClickedRealEstate.mortgage;
        var index = profession.realEstate.indexOf(this.lastClickedRealEstate);
        profession.realEstate.splice(index, 1);

        this.sellPricePerUnit = 0;

        this.forceUpdate();
    }

    handleForecloseRealEstate() {
        var profession = this.getProfession();
        var index = profession.realEstate.indexOf(this.lastClickedRealEstate);
        profession.realEstate.splice(index, 1);
        this.forceUpdate();
    }

    getBuyButtonDetails() {
        var profession = this.getProfession();
        return "Would you like to buy? You have $" + profession.savings.toLocaleString() + " in savings.";
    }

    render() {
        var profession = this.getProfession();
        var realEstate = profession.realEstate.map((realEstate) => (
            <tr key={realEstate.key}>
                <td>{realEstate.type}</td>
                <td className="money">${realEstate.cost.toLocaleString()}</td>
                <td className="money">${realEstate.cashflow.toLocaleString()}</td>
                <td onClick={() => this.lastClickedRealEstate = realEstate}>
                    <MultiButton
                        buttonText="Actions"
                        title={"Your " + realEstate.type}
                        details={"What woud you like to do with your " + realEstate.type + "? Your originally purchased it at $" + realEstate.cost.toLocaleString() + ". With a down payment of $" + (realEstate.cost - realEstate.mortgage).toLocaleString() + ". You have a morgage of $" + realEstate.mortgage.toLocaleString() + "."}
                        buttons={[
                            <WarningButton
                                key="1"
                                buttonText="Sell"
                                title={"Sell " + realEstate.type}
                                details={"Would you like to sell your " + realEstate.type + "?"}
                                callback={this.handleSellRealEstate}
                                form={this.sellForm}
                            />,
                            <WarningButton
                                key="2"
                                buttonText="Foreclose"
                                title={"Foreclosure on your " + realEstate.type}
                                details={"Would you like to foreclose your " + realEstate.type + "? The bank will claim this property for $" + realEstate.mortgage.toLocaleString() + "."}
                                callback={this.handleForecloseRealEstate}
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
                    title="Buy Real Estate"
                    details={this.getBuyButtonDetails}
                    form={<RealEstateForm getProfession={this.getProfession} dataUpdate={this.handleFormUpdate} />}
                    callback={this.handleYesButton}
                />

                <Table striped bordered hover variant="dark" size="sm">
                    <thead>
                        <tr>
                            <th>Type</th>
                            <th>Cost</th>
                            <th>Cashflow</th>
                        </tr>
                    </thead>
                    <tbody>{realEstate}</tbody>
                </Table>
            </>
        );
    }
}