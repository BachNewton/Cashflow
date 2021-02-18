import React from 'react';
import Form from 'react-bootstrap/Form';
import RangeSlider from 'react-bootstrap-range-slider';
import Profession from '../utility/Profession';

export default class StocksForm extends React.Component {
    constructor(props) {
        super(props);

        this.handleCostChange = this.handleCostChange.bind(this);
        this.handleUnitsChange = this.handleUnitsChange.bind(this);

        /** @type {function(): Profession} */
        this.getProfession = props.getProfession || function () { return new Profession(); };
        this.dataUpdate = props.dataUpdate;

        this.state = {
            cost: 0,
            units: 0
        };

        this.name = '';
    }

    getMaxUnits(profession) {
        if (this.state.cost === '' || isNaN(this.state.cost) || this.state.cost === 0) return 0;
        return Math.floor(profession.savings / this.state.cost);
    }

    handleCostChange(e) {
        this.setState({ cost: e.target.value, units: 0 });
        this.dataUpdate({
            name: this.name,
            cost: 0,
            units: 0
        });
    }

    handleUnitsChange(e) {
        this.setState({ units: e.target.value });
        this.dataUpdate({
            name: this.name,
            cost: 0,
            units: 0
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
                    <Form.Control type="text" placeholder="ABC" onChange={e => this.name = e.target.value} />
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
                        tooltipPlacement="top"
                        tooltip="on"
                        min={0}
                        max={this.getMaxUnits(profession)}
                    />
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