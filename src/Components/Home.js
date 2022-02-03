import React, { useContext, useEffect, useState, useRef } from "react";
import NoteCard from "./NoteCard";
import noteContext from "../context/Notes/noteContext";
import { Row, Button, Modal, Form, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Home() {
    //for modal open and closing
    let navigate = useNavigate();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const context = useContext(noteContext);
    const { notes, getNotes, updateNote } = context;

    useEffect(() => {
        if (localStorage.getItem("token")) {
            getNotes();
        } else {
            navigate("/login");
        }
    }, [show]);
    const [form, setForm] = useState({
        utitle: "",
        udescription: "",
        utag: "",
        id: "",
    });

    const ref = useRef(null);
    const uN = (currentNoteId) => {
        const currentNote = notes.filter((note) => {
            if (note._id === currentNoteId) {
                return note;
            }
        });

        form.utitle = currentNote[0].title;
        form.udescription = currentNote[0].description;
        form.utag = currentNote[0].tag;
        form.id = currentNoteId;

        ref.current.click();
    };

    const setField = (field, value) => {
        setForm({
            ...form,
            [field]: value,
        });
    };

    const handleSubmit = (e) => {
        updateNote(form.id, form.utitle, form.udescription, form.utag);

        handleClose();
    };

    return (
        <div className="container">
            <Button
                ref={ref}
                variant="primary"
                className="d-none"
                onClick={handleShow}>
                Launch demo modal
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Update note</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <div>
                            <Row className="align-items-center">
                                <Col sm={9}>
                                    <Form.Group
                                        className="mb-3"
                                        controlId="formText">
                                        <Form.Label>Edit title</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={form.utitle}
                                            // placeholder="Enter your note title"
                                            onChange={(e) =>
                                                setField(
                                                    "utitle",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </Form.Group>
                                </Col>
                                <Col sm={3}>
                                    <Form.Select
                                        aria-label="Default select example"
                                        onChange={(e) =>
                                            setField("utag", e.target.value)
                                        }>
                                        {/* <option>Edit note category</option> */}
                                        <option>{`${form.utag}`}</option>
                                        <option value="Personal">
                                            Personal
                                        </option>
                                        <option value="Office">Office</option>
                                        <option value="Study">Study</option>
                                        <option value="Health">Health</option>
                                        <option value="Financial">
                                            Financial
                                        </option>
                                        <option value="Other">Other</option>
                                    </Form.Select>
                                </Col>
                            </Row>
                        </div>

                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Edit description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={form.udescription}
                                onChange={(e) =>
                                    setField("udescription", e.target.value)
                                }
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button
                        // refClose={refClose}
                        variant="primary"
                        onClick={handleSubmit}>
                        Update
                    </Button>
                </Modal.Footer>
            </Modal>
            <h3>Your notes</h3>
            <Row xs={1} md={2} className="g-4">
                {notes.length !== 0 ? (
                    notes.map((note) => {
                        return (
                            <NoteCard
                                title={note.title}
                                description={note.description}
                                tag={note.tag}
                                date={note.date}
                                id={note._id}
                                key={note._id}
                                uN={uN}
                            />
                        );
                    })
                ) : (
                    <h6>Oposs!You have no notes.</h6>
                )}
            </Row>
        </div>
    );
}

export default Home;
