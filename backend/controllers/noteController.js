import Note from '../models/noteModel.js'
import asyncHandler from 'express-async-handler'
// @desc   Get all Notes
// @route  Get /api/notes
// @access Private 
const getAllNotes = asyncHandler(async (req,res) => {
    const notes = await Note.find({user : req.user._id})
    if(notes.length === 0){
        return res.status(200).json({
            message : 'No notes yet. Create one!'
        })
    }
    res.status(200).json(notes)
})

// @desc   Get A single note 
// @route  GET /api/notes/:id
// @access Private
const getNote = asyncHandler(async (req,res) => {
    const note = await Note.findOne({_id : req.params.id,user : req.user._id})
    if(!note){
        res.status(404)
        throw new Error('No Note found')
    }
    res.status(200).json(note)
})

// @desc   Create A new note
// @route  /api/notes
// @access Private
const createNote = asyncHandler(async(req,res)=>{
    const { title , content } = req.body
    if(!title || !content){
        res.status(400)
        throw new Error('Title and Content are required!')
    }
    const titleExists = await Note.findOne({title,user : req.user._id})
    if(titleExists){
        res.status(400)
        throw new Error('A note with that title already exists')
    }
    const note = await Note.create({
        user : req.user._id,
        title,
        content 
    })
    res.status(201).json(note)
})

// @desc   Update a note 
// @route  PUT /api/notes/:id
// @access Private
const updateNote = asyncHandler(async (req,res) => {
    const { title , content } = req.body
    const note = await Note.findOne({_id : req.params.id,user : req.user._id})
    if(!note){
        res.status(404)
        throw new Error('No note found')
    }
    note.title = title || note.title
    note.content = content || note.content
    const updatedNote = await note.save()
    res.status(200).json(updatedNote)
})

// @desc   Delete a note 
// @route  DELETE /api/notes/:id
// @access Private 
const deleteNote = asyncHandler(async (req,res) => {
    const deletedNote = await Note.findOneAndDelete({_id : req.params.id,user : req.user._id})
    if(!deletedNote){
        res.status(404)
        throw new Error('Note not found')
    }
    res.status(200).json({
        message : 'Note deleted successfully'
    })
})

export {
    getAllNotes,
    getNote,
    createNote,
    updateNote,
    deleteNote
}