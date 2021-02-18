import React from 'react';
import WarningButton from './WarningButton';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Profession from '../utility/Profession';
import Form from 'react-bootstrap/Form';

export default class ActionsTab extends React.Component {
    constructor(props) {
        super(props);

        this.handlePaycheck = this.handlePaycheck.bind(this);
        this.handleDoodad = this.handleDoodad.bind(this);

        this.getProfession = props.getProfession || function () { return new Profession(); };
        this.actionTaken = props.actionTaken || function () { };

        this.doodadForm = 0;
    }

    handlePaycheck() {
        var profession = this.getProfession();
        profession.savings += profession.getCashflow();
        this.actionTaken();
    }

    handleDoodad() {
        if (this.doodadForm === '' || isNaN(this.doodadForm)) return;

        var profession = this.getProfession();
        profession.savings -= parseInt(this.doodadForm);
        this.actionTaken();
    }

    getDoodadForm() {
        return (
            <Form>
                <Form.Group>
                    <Form.Label>Cost</Form.Label>
                    <Form.Control type="number" placeholder="0" onChange={e => this.doodadForm = e.target.value} />
                </Form.Group>
            </Form>
        );
    }

    render() {
        return (
            <Jumbotron>
                <WarningButton buttonText="Paycheck" title="Payday!" details="Are you sure you want to collect your paycheck?" callback={this.handlePaycheck} />
                <WarningButton buttonText="Doodad" title="Buy a Doodad" details="Would you like to purchase a doodad?" form={this.getDoodadForm()} callback={this.handleDoodad} />
            </Jumbotron>
        );
    }
}