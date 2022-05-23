import React,  { useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import  '../../assets/css/students/Modal.css';



export default function MyModal(props) {  

    return (
      <>
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
          <Modal.Title>{props.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group
              className="mb-3"
              controlId="thesisTopic.ControlTextarea1"
            >
              <Form.Label>Explain the topic of your thesis</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="motivateProfessor.ControlTextarea2"
            >
              <Form.Label>Why have you chosen this professor?</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
          </Form>
        </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>Close</Button>
        <Button variant="primary" onClick={props.onRequest }>Request</Button>
      </Modal.Footer>
    </Modal>
      </>
    );
  }
  
