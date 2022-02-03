import React, { useContext, useState } from "react";
import noteContext from "../context/Notes/noteContext";

import { Form, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function FormNote() {
    let navigate = useNavigate();

    const context = useContext(noteContext);
    const { addNote } = context;

    const [form, setForm] = useState({
        title: "",
        description: "",
        tag: "",
    });
    const setField = (field, value) => {
        setForm({
            ...form,
            [field]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addNote(form.title, form.description, form.tag);
        navigate("/");
    };

    return (
        <Form>
            <div>
                <Row className="align-items-center">
                    <Col sm={9}>
                        <Form.Group className="mb-3" controlId="formText">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                required
                                placeholder="Enter your note title"
                                onChange={(e) =>
                                    setField("title", e.target.value)
                                }
                            />
                        </Form.Group>
                    </Col>
                    <Col sm={3}>
                        <Form.Select
                            required
                            aria-label="Default select example"
                            onChange={(e) => setField("tag", e.target.value)}>
                            <option>Select note category</option>
                            <option value="Personal">Personal</option>
                            <option value="Office">Office</option>
                            <option value="Study">Study</option>
                            <option value="Health">Health</option>
                            <option value="Financial">Financial</option>
                            <option value="Other">Other</option>
                        </Form.Select>
                    </Col>
                </Row>
            </div>

            <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1">
                <Form.Label>Enter description</Form.Label>
                <Form.Control
                    as="textarea"
                    required
                    rows={3}
                    onChange={(e) => setField("description", e.target.value)}
                />
            </Form.Group>

            <Button variant="primary" type="submit" onClick={handleSubmit}>
                Save
            </Button>
        </Form>
    );
}

export default FormNote;
