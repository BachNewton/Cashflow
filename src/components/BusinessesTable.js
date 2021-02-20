import React from 'react';
import Table from 'react-bootstrap/Table';
import WarningButton from './WarningButton';
// eslint-disable-next-line
import Profession from '../utility/Profession';
import Form from 'react-bootstrap/Form';
import Business from '../utility/Business';

export default class BusinessesTable extends React.Component {
    constructor(props) {
        super(props);

        this.handleYesButton = this.handleYesButton.bind(this);
        this.handleSellBusiness = this.handleSellBusiness.bind(this);

        /** @type {function(): Profession} */
        this.getProfession = props.getProfession;
        this.lastClickedBusiness = null;

        this.sellPrice = 0;
        this.sellForm = (
            <Form>
                <Form.Group>
                    <Form.Label>Selling Price</Form.Label>
                    <Form.Control type="number" placeholder="0" onChange={e => this.sellPrice = e.target.value} />
                </Form.Group>
            </Form>
        );

        this.buyName = '';
        this.buyDownPayment = 0;
        this.buyLiability = 0;
        this.buyIncome = 0;
        this.buyForm = (
            <Form>
                <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Widgets Factory" onChange={e => this.buyName = e.target.value} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Down Payment</Form.Label>
                    <Form.Control type="number" placeholder="0" onChange={e => this.buyDownPayment = e.target.value} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Liability</Form.Label>
                    <Form.Control type="number" placeholder="0" onChange={e => this.buyLiability = e.target.value} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Income</Form.Label>
                    <Form.Control type="number" placeholder="0" onChange={e => this.buyIncome = e.target.value} />
                </Form.Group>
            </Form >
        );
    }

    handleYesButton() {
        var business = new Business({
            name: this.buyName,
            downPayment: this.buyDownPayment === '' ? 0 : parseInt(this.buyDownPayment),
            liability: this.buyLiability === '' ? 0 : parseInt(this.buyLiability),
            income: this.buyIncome === '' ? 0 : parseInt(this.buyIncome)
        });

        var profession = this.getProfession();
        profession.savings -= business.downPayment;
        profession.businesses.push(business);

        this.buyName = '';
        this.buyDownPayment = 0;
        this.buyLiability = 0;
        this.buyIncome = 0;

        this.forceUpdate();
    }

    handleSellBusiness() {
        if (this.sellPrice === '') return;

        this.sellPrice = parseInt(this.sellPrice);
        var profession = this.getProfession();
        profession.savings += this.sellPrice - this.lastClickedBusiness.liability;
        var index = profession.businesses.indexOf(this.lastClickedBusiness);
        profession.businesses.splice(index, 1);

        this.sellPrice = 0;

        this.forceUpdate();
    }

    render() {
        var profession = this.getProfession();
        var businesses = profession.businesses.map((business) => (
            <tr key={business.key}>
                <td>{business.name}</td>
                <td className="money">${business.income.toLocaleString()}</td>
                <td className="money">${business.liability.toLocaleString()}</td>
                <td onClick={() => this.lastClickedBusiness = business}>
                    <WarningButton
                        buttonText="Sell"
                        title={"Sell " + business.name}
                        details={"Would you like to sell " + business.name + "?"}
                        callback={this.handleSellBusiness}
                        form={this.sellForm}
                    />
                </td>
            </tr>
        ));

        return (
            <>
                <WarningButton
                    buttonText="Buy"
                    title="Buy Business"
                    details={"Would you like to buy? You have $" + profession.savings.toLocaleString() + " in savings."}
                    form={this.buyForm}
                    callback={this.handleYesButton}
                />

                <Table striped bordered hover variant="dark" size="sm">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Income</th>
                            <th>Liability</th>
                        </tr>
                    </thead>
                    <tbody>{businesses}</tbody>
                </Table>
            </>
        );
    }
}