import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export default class MultiButton extends React.Component {
    constructor(props) {
        super(props);

        this.handleClose = this.handleClose.bind(this);
        this.handleOpen = this.handleOpen.bind(this);

        this.state = {
            show: false
        };

        /** @type {Array} */
        this.buttons = props.buttons || [];
        this.buttonText = props.buttonText || 'Button Text';
        this.title = props.title || 'Title';
        this.details = props.details || 'Details';
    }

    handleClose() {
        this.setState({ show: false });
    }

    handleOpen() {
        this.setState({ show: true });
    }

    render() {
        return (
            <>
                <Button onClick={this.handleOpen} style={{ width: "100%" }}>{this.buttonText}</Button>

                <Modal centered show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>{this.details instanceof Function ? this.details() : this.details}</p>
                        {this.buttons}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.handleClose} variant="secondary">Close</Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}