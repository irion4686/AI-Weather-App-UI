import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Container } from 'react-bootstrap';

const ErrorModal = (props) => {
    console.log(props)
    return (
        <Modal {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
            <Modal.Dialog>
                <Modal.Header closeButton>
                    <Modal.Title>Error</Modal.Title>
                </Modal.Header>
            </Modal.Dialog>
            <Modal.Body>
                <p>An error occurred</p>
                <p>{props.error.message}</p>
                {props.statusCode !== undefined && <p>{'Code: ' + props.statusCode}</p>}
            </Modal.Body>
            <Modal.Footer>
                <Button variant='primary' onClick={props.onHide}>OK</Button>
            </Modal.Footer>
        </Modal>
        
    )
}
export default ErrorModal