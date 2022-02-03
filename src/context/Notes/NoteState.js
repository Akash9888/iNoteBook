import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
    const host = "http://localhost:5000";
    const noteInitial = [];
    const [notes, setNotes] = useState(noteInitial);

    //fetch all notes from mongoDb
    const getNotes = async () => {
        //call api
        const response = await fetch(`${host}/api/note/fetchallnotes`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token"),
            },
        });
        const json = await response.json();

        setNotes(json);
    };

    //add note
    const addNote = async (title, description, tag) => {
        //call api
        const response = await fetch(`${host}/api/note/addnote`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token"),
            },
            body: JSON.stringify({ title, description, tag }),
        });
    };

    //delete notes
    const deleteNote = async (id) => {
        const newNotes = notes.filter((note) => {
            return note._id !== id;
        });
        setNotes(newNotes);

        //call api
        const response = await fetch(`${host}/api/note/deletenote/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token"),
            },
        });

        // const json = await response.json();
    };

    //update notes
    const updateNote = async (id, title, description, tag) => {
        console.log(
            "update note" + id + " " + title + " " + description + " " + tag
        );
        //call api
        const response = await fetch(`${host}/api/note/updatenote/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token"),
            },
            body: JSON.stringify({ title, description, tag }),
        });
        // const json = await response.json();
    };

    return (
        <NoteContext.Provider
            value={{
                notes,
                addNote,
                deleteNote,
                getNotes,
                updateNote,
            }}>
            {props.children}
        </NoteContext.Provider>
    );
};
export default NoteState;
