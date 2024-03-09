const express = require('express');
const router = express.Router();
const fetchUser = require('../middleware/fetchUser');
const Notes = require('../models/Notes');
const { check, validationResult } = require('express-validator');

// ------------ Route-1 : Get all the notes using GET (Login Required)           -- Read operation of C'R'UD
router.get('/api/notes/fetchnotes', fetchUser, async (req, res) => {
    const notes = await Notes.find({ user: req.user.id });           // find - bcz retriveing all notes. 'req.user' coming from fetchUser Middleware
    res.json(notes);
})

module.exports = router;

// ------------ Route-2 : Add notes using POST  (Login Required)                 -- Create operation of 'C'RUD
router.post('/api/notes/addnotes', fetchUser,[
    check('title', 'Name length should be greater than 3 character').isLength({ min: 3 }),
    check('description', 'Email length should be greater than 5 character').isLength({ min: 5 }),
], async (req, res) => {

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json(errors);
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Some error occured");
    }

    try {
        const {title,description,tag} = req.body;
        const notes = new Notes({
            user: req.user.id,
            title,description,tag
        });
        const saveNote = await notes.save();
        res.status(200).json(saveNote);
    } catch (err) {
        console.error(err);
        res.status(500).send("Some error occured");
    }

})


// -------------- Route-3: Update an existing notes using PUT (Login Required)     CWH-53        -- Update operation of CR'U'D

router.put('/api/notes/updatenote/:id', fetchUser , [
    // check('title', 'Name length should be greater than 3 character').isLength({ min: 3 }),
    // check('description', 'Email length should be greater than 5 character').isLength({ min: 5 }),
], async (req,res)=>{

    // try {
    //     const errors = validationResult(req);
    //     if(!errors.isEmpty()){
    //         res.status(400).json(errors);
    //     }
    // } catch (err) {
    //     console.error(err);
    //     res.status(500).send("Some error occured");
    // }

    try {
        const {title,description,tag} = req.body;
        // Create a new note object
        const newNote = {};
        // below 'if' shows if the values of corresponding keys are updates, if so then add it to newNote
        if(title){newNote.title = title};
        if(description){newNote.description = description};
        if(tag){newNote.tag = tag};

        // To check if it is a same user and not hacker by verifying its id.
        let note = await Notes.findById(req.params.id);
        if(!note){
            return res.status(404).send("Not found")
        }

        // Allow Updation only if user owns this note
        if(note.user.toString() !== req.user.id){       // toString: Converts the id into a 24 character hex string for printing
            return res.status(401).send("Not Allowed");
        }

        note = await Notes.findByIdAndUpdate(req.params.id,
            {$set:newNote},{new:true}
            );
        res.status(200).json(note);

    }  catch (err) {
        console.error(err);
        res.status(500).send("Some error occured");
    }
})

// -------------- Route-4: Delete an existing note using DELETE (Login Required)     CWH-54        -- Delete operation of CRU'D'

router.delete('/api/notes/deletenote/:id', fetchUser, async (req,res)=>{
    try {
        // Find the note to be deleted and delete it
        let note = await Notes.findById(req.params.id);
        if(!note){
            return res.status(404).send("Not found");
        }

        // Allow deletion only if user owns this note
        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not Allowed");
        }

        note = await Notes.findByIdAndDelete(req.params.id);
        res.status(201).send({messsage:"note has been successfully deleted",note:note});
    }  catch (err) {
        console.error(err);
        res.status(500).send("Some error occured");
    }
})
 