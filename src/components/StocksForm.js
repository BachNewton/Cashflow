import React from 'react';
import Form from 'react-bootstrap/Form';
import RangeSlider from 'react-bootstrap-range-slider';
import Profession from '../utility/Profession';

export default class StocksForm extends React.Component {
    constructor(props) {
        super(props);

        this.handleCostChange = this.handleCostChange.bind(this);
        this.handleUnitsChange = this.handleUnitsChange.bind(this);
        this.handleFinalUnitsChange = this.handleFinalUnitsChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleIncomeChange = this.handleIncomeChange.bind(this);

        /** @type {function(): Profession} */
        this.getProfession = props.getProfession || function () { return new Profession(); };
        this.dataUpdate = props.dataUpdate;

        this.state = {
            cost: 0,
            units: 0
        };

        this.name = 'NO NAME';
        this.income = 0;
    }

    isCostValid() {
        return this.state.cost !== '' && !isNaN(this.state.cost) && parseInt(this.state.cost) !== 0;
    }

    getMaxUnits(profession) {
        return this.isCostValid() ? Math.floor(profession.savings / this.state.cost) : 0;
    }

    handleNameChange(e) {
        this.name = e.target.value;
        this.sendUpdate();
    }

    handleIncomeChange(e) {
        this.income = e.target.value;
        this.sendUpdate();
    }

    handleCostChange(e) {
        this.setState({ cost: e.target.value, units: 0 });
        this.sendUpdate();
    }

    handleUnitsChange(e) {
        this.setState({ units: e.target.value });
        this.sendUpdate();
    }

    handleFinalUnitsChange(e) {
        this.setState({ units: e.target.value });
        this.sendUpdate();
    }

    sendUpdate() {
        this.dataUpdate({
            name: this.name,
            cost: parseInt(this.state.cost),
            units: parseInt(this.state.units),
            income: this.income === '' ? 0 : parseInt(this.income)
        });
    }

    getTotalCost() {
        return this.state.cost * this.state.units;
    }

    render() {
        var profession = this.getProfession();

        return (
            <Form>
                <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="ABC" onChange={this.handleNameChange} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Cost per Unit</Form.Label>
                    <Form.Control type="number" placeholder="0" onChange={this.handleCostChange} />
                </Form.Group>
                <Form.Group>
                    <Form.Label style={{ marginBottom: "1.75rem" }}>Units</Form.Label>
                    <RangeSlider
                        value={this.state.units}
                        onChange={this.handleUnitsChange}
                        onAfterChange={this.handleFinalUnitsChange}
                        tooltipPlacement="top"
                        tooltip={this.isCostValid() ? "on" : "off"}
                        min={0}
                        max={this.getMaxUnits(profession)}
                        disabled={!this.isCostValid()}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Income</Form.Label>
                    <Form.Control type="number" placeholder="0" onChange={this.handleIncomeChange} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Total Cost: ${this.getTotalCost().toLocaleString()}</Form.Label>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Savings After Purchase: ${(profession.savings - this.getTotalCost()).toLocaleString()}</Form.Label>
                </Form.Group>
            </Form >
        );
    }
}