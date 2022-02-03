import React, { useContext } from "react";
import noteContext from "../context/Notes/noteContext";
import { Card, Badge } from "react-bootstrap";

export default function NoteCard(props) {
    const context = useContext(noteContext);
    const { deleteNote } = context;

    const myFunction = () => {
        props.uN(props.id);
    };

    return (
        <>
            <Card>
                <Card.Body>
                    <Badge pill bg="info">
                        {props.tag}
                    </Badge>
                    <Card.Title>{props.title}</Card.Title>
                    <img
                        src="https://img.icons8.com/wired/30/000000/filled-trash.png"
                        onClick={() => {
                            deleteNote(props.id);
                            console.log("delete icon clicked");
                        }}
                    />
                    <img
                        src="https://img.icons8.com/external-kiranshastry-lineal-kiranshastry/30/000000/external-edit-delivery-kiranshastry-lineal-kiranshastry.png"
                        onClick={myFunction}
                    />
                    <Card.Text>{props.description}</Card.Text>
                </Card.Body>
                <Card.Footer>
                    <small className="text-muted">
                        <div>Last modified {props.date}</div>
                        <div>Created {props.date}</div>
                    </small>
                </Card.Footer>
            </Card>
        </>
    );
}
