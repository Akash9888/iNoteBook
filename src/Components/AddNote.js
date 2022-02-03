import Alert from "./AlertMsg";

import FormNote from "./FormNote";

function AddNote() {
    return (
        <>
            <div className="container">
                <Alert />
                <h3 className="pt-2 pb-2">Add your new note...</h3>
                <FormNote />
            </div>
        </>
    );
}

export default AddNote;
