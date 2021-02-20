import React from 'react';
import Table from 'react-bootstrap/Table';
import WarningButton from './WarningButton';
// eslint-disable-next-line
import Profession from '../utility/Profession';
import Form from 'react-bootstrap/Form';
import RealEstate from '../utility/RealEstate';
import MultiButton from './MultiButton';

export default class RealEstateTable extends React.Component {
    constructor(props) {
        super(props);

        this.handleYesButton = this.handleYesButton.bind(this);
        this.handleSellRealEstate = this.handleSellRealEstate.bind(this);
        this.handleForecloseRealEstate = this.handleForecloseRealEstate.bind(this);
        this.getBuyButtonDetails = this.getBuyButtonDetails.bind(this);

        /** @type {function(): Profession} */
        this.getProfession = props.getProfession;
        this.lastClickedRealEstate = null;

        this.sellPricePerUnit = 0;
        this.sellForm = (
            <Form onSubmit={(e) => e.preventDefault()}>
                <Form.Group>
                    <Form.Label>Selling Price per Unit</Form.Label>
                    <Form.Control type="number" placeholder="0" onChange={e => this.sellPricePerUnit = e.target.value} />
                </Form.Group>
            </Form>
        );

        this.buyType = 'House 3Br/2Ba,1';
        this.buyCost = 0;
        this.buyMortgage = 0;
        this.buyCashflow = 0;
        this.buyForm = (
            <Form onSubmit={(e) => e.preventDefault()}>
                <Form.Group>
                    <Form.Label>Type</Form.Label>
                    <Form.Control as="select" onChange={e => this.buyType = e.target.value}>
                        <option value={'House 3Br/2Ba,1'}>House 3Br/2Ba</option>
                        <option value={'Condo 2Br/1Ba,1'}>Condo 2Br/1Ba</option>
                        <option value={'10 Acres Land,1'}>10 Acres Land</option>
                        <option value={'20 Acres Land,1'}>20 Acres Land</option>
                        <option value={'Duplex,2'}>Duplex</option>
                        <option value={'4-Plex,4'}>4-Plex</option>
                        <option value={'8-Plex,8'}>8-Plex</option>
                        <option value={'Apartment 12 Units,12'}>Apartment 12 Units</option>
                        <option value={'Apartment 24 Units,24'}>Apartment 24 Units</option>
                        <option value={'Apartment 60 Units,60'}>Apartment 60 Units</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Cost</Form.Label>
                    <Form.Control type="number" placeholder="0" onChange={e => this.buyCost = e.target.value} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Mortgage</Form.Label>
                    <Form.Control type="number" placeholder="0" onChange={e => this.buyMortgage = e.target.value} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Cashflow</Form.Label>
                    <Form.Control type="number" placeholder="0" onChange={e => this.buyCashflow = e.target.value} />
                </Form.Group>
            </Form >
        );
    }

    handleYesButton() {
        var realEstate = new RealEstate({
            type: this.buyType.split(',')[0],
            units: parseInt(this.buyType.split(',')[1]),
            cost: parseInt(this.buyCost),
            mortgage: parseInt(this.buyMortgage),
            cashflow: parseInt(this.buyCashflow)
        });

        var profession = this.getProfession();
        profession.savings -= realEstate.cost - realEstate.mortgage;
        profession.realEstate.push(realEstate);

        this.buyType = 'House 3Br/2Ba,1';
        this.buyCost = 0;
        this.buyMortgage = 0;
        this.buyCashflow = 0;

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
                    form={this.buyForm}
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