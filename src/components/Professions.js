import React from 'react';
import Card from 'react-bootstrap/Card';
import Profession from '../utility/Profession';
import WarningButton from './WarningButton';

export default class Professions extends React.Component {
    constructor(props) {
        super(props);

        this.getRandomProfession = this.getRandomProfession.bind(this);

        this.handleNewProfession = props.handleNewProfession || function () { };
    }

    getRandomProfession() {
        var index = Math.floor(Math.random() * Profession.ALL.length);
        var profession = Profession.ALL[index];
        this.handleNewProfession(profession);
    }

    render() {
        var cards = Profession.ALL.map((profession) => {
            return (
                <Card style={{ width: '10rem', margin: '0.25rem' }} key={profession.title}>
                    <Card.Img variant="top" src={profession.image} />
                    <Card.Body>
                        <Card.Title>{profession.title}</Card.Title>
                        <Card.Text>
                            Salary: ${profession.salary.toLocaleString()}
                        </Card.Text>
                    </Card.Body>
                </Card>
            );
        });

        return (
            <>
                <WarningButton buttonText="Get Random Profession" title="Get a new Profession?" details="Are you sure you want to get a new Profession? This will reset your Player Sheet." callback={this.getRandomProfession} />
                <div className="center">
                    {cards}
                </div>
            </>
        );
    }
}