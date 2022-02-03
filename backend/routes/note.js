const express = require("express");
const router = express.Router();
const Note = require("../Models/Note");
const fetchUser = require("../MIddleware/fetchUser");
const { body, validationResult } = require("express-validator");

// ROUTE 1: Get All the Notes using: GET "/api/note/getuser". Login required
router.get("/fetchallnotes", fetchUser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error occurred");
    }
});

// ROUTE 2: Add a new Note using: POST "/api/notes/addnote". Login required
router.post(
    "/addnote",
    fetchUser,
    [
        body("Title", "Enter valid Title of minimum length is "),
        body(
            "description",
            "Enter a valid description which length is minimum 5"
        ).isLength({ min: 5 }),
    ],
    async (req, res) => {
        try {
            const { title, description, tag } = req.body;
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const note = new Note({
                title,
                description,
                tag,
                user: req.user.id,
            });
            const saveNote = await note.save();
            res.json(saveNote);
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Some Error occurred");
        }
    }
);

// ROUTE 3: Update Note using: PUT "/api/notes/updatenote:id". Login required
router.put(
    "/updatenote/:id",
    fetchUser,

    async (req, res) => {
        const { title, description, tag } = req.body;

        try {
            const newNote = {};
            if (title) {
                newNote.title = title;
            }
            if (description) {
                newNote.description = description;
            }
            if (tag) {
                newNote.tag = tag;
            }

            let note = await Note.findById(req.params.id);

            if (!note) {
                return res.status(404).send("Not Found");
            }
            if (note.user.toString() !== req.user.id) {
                return res.status(401).send("Not Allowed");
            }
            note = await Note.findByIdAndUpdate(
                req.params.id,
                { $set: newNote },
                { new: true }
            );
            res.json({ note });
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Some Error occurred----");
        }
    }
);
// ROUTE 4: Deleet Note using: PUT "/api/notes/deletenote:id". Login required
router.delete(
    "/deletenote/:id",
    fetchUser,

    async (req, res) => {
        try {
            let note = await Note.findById(req.params.id);

            if (!note) {
                return res.status(404).send("Not Found");
            }
            if (note.user.toString() !== req.user.id) {
                return res.status(401).send("Not Allowed");
            }
            note = await Note.findByIdAndDelete(req.params.id);
            res.json({ Success: "Note deleted successfully", note: note });
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Some Error occurred----");
        }
    }
);

// ROUTE 5: Display Note using: GET "/api/note/display:id". Login required
router.get(
    "/displaynote/:id",
    fetchUser,

    async (req, res) => {
        try {
            let note = await Note.findById(req.params.id);

            if (!note) {
                return res.status(404).send("Not Found");
            }
            if (note.user.toString() !== req.user.id) {
                return res.status(401).send("Not Allowed");
            }
            res.json({ note });
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Some Error occurred----");
        }
    }
);

module.exports = router;
