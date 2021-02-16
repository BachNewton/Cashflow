import React from 'react';
import Card from 'react-bootstrap/Card';
import Profession from './Profession';

export default class Professions extends React.Component {
    render() {
        var cards = Profession.ALL.map((profession) => {
            return (
                <Card style={{ width: '10rem', display: 'inline-block', margin: '0.25rem' }}>
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
                { cards}
            </>
        );
    }
}