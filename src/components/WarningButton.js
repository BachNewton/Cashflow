import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export default class WarningButton extends React.Component {
    constructor(props) {
        super(props);

        this.handleClose = this.handleClose.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleConfirm = this.handleConfirm.bind(this);

        this.state = {
            show: false
        };

        this.buttonText = props.buttonText || 'Button Text';
        this.title = props.title || 'Title';
        this.details = props.details || 'Details';
        this.form = props.form || null;
        this.callback = props.callback || function () { };
        this.getEnabled = props.getEnabled || function () { return true; };
    }

    handleClose() {
        this.setState({ show: false });
    }

    handleOpen() {
        this.setState({ show: true });
    }

    handleConfirm() {
        this.handleClose();
        this.callback();
    }

    render() {
        return (
            <>
                <Button onClick={this.handleOpen} style={{ width: "100%", marginBottom: "0.5rem" }} disabled={!this.getEnabled()}>{this.buttonText}</Button>

                <Modal centered show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>{this.details instanceof Function ? this.details() : this.details}</p>
                        {this.form instanceof Function ? this.form() : this.form}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.handleClose} variant="danger">No</Button>
                        <Button onClick={this.handleConfirm} variant="success">Yes</Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}