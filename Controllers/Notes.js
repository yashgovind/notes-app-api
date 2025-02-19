const model = require("../models/Notes");
//TODO: Create a controller for add note, delete note , delete all notes, update note by something,
// filter notes by date...///

async function addNotes(req, res) {
    try {
        const { title, timeStamp, description } = req.body;
        const newNote = await model.create({
            title: title,
           timeStamp:timeStamp,
            description: description
        },);
        // add checks here ...../
        newNote.save();
        return res.status(201).json(newNote);
    } catch (error) {
        console.error(error.message);
    }
}


async function getAllNotes(req, res) {
    try {
        const { title, description} = req.body;
        console.log("before call", title);
        console.log("before call", description);
        const getNotes = await model.find({
            title,
            description,
        });

        // checks here.
        res.status(200).json(getNotes);
    } catch (error) {
        console.error(error.message);
    }
}


async function deleteNotesById(req, res) {
    // get the note by _id from request parameters. . if the note exists , delete it, if it doesnt throw error.
    try {
        const id = parseInt(req.params.id);
        console.log(typeof id);
        const getNotesByid = await model.findByIdAndDelete(id);
        return res.status(202).json(getNotesByid);
    } catch (error) {
        console.error(error.message);
    }
}

async function deleteAllNotes(req, res) {
    try {
        const { title,description } = req.body;
        const getNotes = await model.deleteMany({
            title,
            description
        });
        console.log(getNotes)
        // checks here.
        res.status(200).json(`successfully deleted all notes: ${getNotes}`);
    } catch (error) {
        console.error(error.message);
    }
}





module.exports = {
    addNotes,
    getAllNotes,
    deleteNotesById,
    deleteAllNotes
}