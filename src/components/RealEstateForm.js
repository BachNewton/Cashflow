import React from 'react';
import Form from 'react-bootstrap/Form';
import Profession from '../utility/Profession';

export default class RealEstateForm extends React.Component {
    constructor(props) {
        super(props);

        this.handleTypeChange = this.handleTypeChange.bind(this);
        this.handleDownPaymentChange = this.handleDownPaymentChange.bind(this);
        this.handleCostChange = this.handleCostChange.bind(this);
        this.handleCashflowChange = this.handleCashflowChange.bind(this);

        /** @type {function(): Profession} */
        this.getProfession = props.getProfession || function () { return new Profession(); };
        this.dataUpdate = props.dataUpdate;

        this.buyType = 'House 3Br/2Ba,1';
        this.buyDownPayment = 0;
        this.buyCost = 0;
        this.buyCashflow = 0;
    }

    handleTypeChange(e) {
        this.buyType = e.target.value;
        this.sendUpdate();
    }

    handleDownPaymentChange(e) {
        this.buyDownPayment = e.target.value === '' ? 0 : parseInt(e.target.value);
        this.sendUpdate();
        this.forceUpdate();
    }

    handleCostChange(e) {
        this.buyCost = e.target.value === '' ? 0 : parseInt(e.target.value);
        this.sendUpdate();
        this.forceUpdate();
    }

    handleCashflowChange(e) {
        this.buyCashflow = e.target.value === '' ? 0 : parseInt(e.target.value);
        this.sendUpdate();
    }

    sendUpdate() {
        this.dataUpdate({
            type: this.buyType,
            downPayment: this.buyDownPayment,
            cost: this.buyCost,
            cashflow: this.buyCashflow
        });
    }

    render() {
        var profession = this.getProfession();

        return (
            <Form onSubmit={(e) => e.preventDefault()}>
                <Form.Group>
                    <Form.Label>Type</Form.Label>
                    <Form.Control as="select" onChange={this.handleTypeChange}>
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
                    <Form.Label>Down Payment</Form.Label>
                    <Form.Control type="number" placeholder="0" onChange={this.handleDownPaymentChange} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Cost</Form.Label>
                    <Form.Control type="number" placeholder="0" onChange={this.handleCostChange} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Mortgage: ${(this.buyCost - this.buyDownPayment).toLocaleString()}</Form.Label>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Cashflow</Form.Label>
                    <Form.Control type="number" placeholder="0" onChange={this.handleCashflowChange} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Savings After Purchase: ${(profession.savings - this.buyDownPayment).toLocaleString()}</Form.Label>
                </Form.Group>
            </Form>
        );
    }
}