import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import React, { useState } from 'react'
import { Select } from '@material-ui/core';

export default function CoordinatorModal(props) {
    const [selectedCoordinator, setSelectedCoordinator] = useState("");
  
    const handleChangeSelect = (e) => {
        const prof = e.target.value;
        setSelectedCoordinator(prof);
        props.onSelectCoordinator(prof);
    }

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
                controlId="coordinator.selectArea"
                >
                    <Form.Label>Assign coordinator to student</Form.Label>
                    <Select onChange={(e) => handleChangeSelect(e)} value={selectedCoordinator}>
                        {props.professors.map((prof) => <option value={prof.name}>{prof.name}</option>)}
                    </Select>
                </Form.Group>
            </Form>
            </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={props.onHide}>Close</Button>
            <Button variant="primary" onClick={props.onHide}>Add coordinator</Button>
        </Modal.Footer>
        </Modal>
    </>
  )
}
