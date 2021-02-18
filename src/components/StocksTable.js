import React from 'react';
import Table from 'react-bootstrap/Table';
import WarningButton from './WarningButton';
import StocksForm from './StocksForm';

export default class StocksTable extends React.Component {
    constructor(props) {
        super(props);

        this.getProfession = props.getProfession;
    }

    handleFormUpdate(data) {
        console.log(data);
    }

    render() {
        return (
            <>
                <WarningButton buttonText="Buy" title="Buy Stocks / Mutal's / CDs" details="Would you like to buy?" form={<StocksForm getProfession={this.getProfession} dataUpdate={this.handleFormUpdate} />} />
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Amount</th>
                            <th>Income / Splits</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </Table>
            </>
        );
    }
}