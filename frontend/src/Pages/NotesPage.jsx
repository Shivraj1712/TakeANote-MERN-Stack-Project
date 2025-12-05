import React, { useEffect, useState } from "react"
import api from "../api/axios"
import { toast } from "react-toastify"
import Loader from "../components/Loader"
import { PlusCircle, Pencil, Trash2, Eye } from "lucide-react"

export default function NotesPage() {
    const [notes, setNotes] = useState([])
    const [loading, setLoading] = useState(true)

    const [showCreateModal, setShowCreateModal] = useState(false)
    const [showUpdateModal, setShowUpdateModal] = useState(false)
    const [showViewModal, setShowViewModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)

    const [currentNote, setCurrentNote] = useState(null)

    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")

    const fetchNotes = async () => {
        try {
            setLoading(true)
            const { data } = await api.get("/notes")
            if (Array.isArray(data)) {
                setNotes(data)
            } else {
                setNotes([])
            }
        } catch {
            toast.error("Failed to load notes")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchNotes()
    }, [])

    const handleCreate = async () => {
        if (!title.trim() || !content.trim()) {
            toast.error("Title and content required")
            return
        }
        try {
            setLoading(true)
            await api.post("/notes", { title, content })
            setShowCreateModal(false)
            setTitle("")
            setContent("")
            toast.success("Note created successfully")
            await fetchNotes()
        } catch {
            toast.error("Failed to create note")
        } finally {
            setLoading(false)
        }
    }

    const handleUpdate = async () => {
        if (!title.trim() || !content.trim()) {
            toast.error("Fields cannot be empty")
            return
        }
        try {
            setLoading(true)
            await api.put(`/notes/${currentNote._id}`, { title, content })
            setShowUpdateModal(false)
            setTitle("")
            setContent("")
            setCurrentNote(null)
            toast.success("Note updated successfully")
            await fetchNotes()
        } catch {
            toast.error("Failed to update note")
        } finally {
            setLoading(false)
        }
    }

    const confirmDelete = async () => {
        try {
            setLoading(true)
            await api.delete(`/notes/${currentNote._id}`)
            setShowDeleteModal(false)
            setCurrentNote(null)
            toast.success("Note deleted successfully")
            await fetchNotes()
        } catch {
            toast.error("Failed to delete note")
        } finally {
            setLoading(false)
        }
    }

    if (loading) return <Loader fullscreen />

    return (
        <section className="min-h-screen bg-gray-800 p-8 text-white">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-blue-400">My Notes</h1>

                <button
                    onClick={() => {
                        setTitle("")
                        setContent("")
                        setShowCreateModal(true)
                    }}
                    className="bg-blue-400 py-2 px-4 text-white rounded-lg hover:bg-blue-600 transition flex items-center gap-2"
                >
                    <PlusCircle className="w-5 h-5" />
                    Create Note
                </button>
            </div>

            {notes.length === 0 && (
                <p className="text-center mt-20 font-semibold">No notes yet. Create one!</p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {notes.map((note) => (
                    <div
                        key={note._id}
                        className="bg-gray-900 p-4 rounded-lg shadow-lg border border-gray-700 flex flex-col justify-between"
                    >
                        <div>
                            <h2 className="font-bold text-lg mb-2">{note.title}</h2>
                            <p className="text-gray-300 text-sm line-clamp-3 whitespace-pre-line">
                                {note.content}
                            </p>
                        </div>

                        <div className="flex justify-end items-center gap-4 mt-4">
                            <button
                                onClick={() => {
                                    setCurrentNote(note)
                                    setShowViewModal(true)
                                }}
                                className="text-green-400 hover:text-green-600 transition"
                            >
                                <Eye className="w-5 h-5" />
                            </button>

                            <button
                                onClick={() => {
                                    setCurrentNote(note)
                                    setTitle(note.title)
                                    setContent(note.content)
                                    setShowUpdateModal(true)
                                }}
                                className="text-blue-400 hover:text-blue-600 transition"
                            >
                                <Pencil className="w-5 h-5" />
                            </button>

                            <button
                                onClick={() => {
                                    setCurrentNote(note)
                                    setShowDeleteModal(true)
                                }}
                                className="text-red-400 hover:text-red-600 transition"
                            >
                                <Trash2 className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {showCreateModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-gray-900 p-8 rounded-lg w-11/12 sm:w-9/12 lg:w-8/12 xl:w-6/12 shadow-lg">
                        <h3 className="text-blue-400 font-bold text-xl mb-4">Create Note</h3>

                        <input
                            type="text"
                            placeholder="Title"
                            className="w-full h-12 px-3 py-2 text-white rounded-lg bg-gray-800 border border-blue-400 mb-4"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />

                        <textarea
                            placeholder="Content"
                            className="w-full h-48 px-3 py-2 text-white rounded-lg bg-gray-800 border border-blue-400"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />

                        <div className="flex justify-between items-center mt-6">
                            <button
                                onClick={() => {
                                    setShowCreateModal(false)
                                }}
                                className="bg-red-400 py-2 px-4 rounded-lg hover:bg-red-500"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={handleCreate}
                                className="bg-blue-400 py-2 px-4 rounded-lg hover:bg-blue-600"
                            >
                                Create
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showUpdateModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-gray-900 p-8 rounded-lg w-11/12 sm:w-9/12 lg:w-8/12 xl:w-6/12 shadow-lg">
                        <h3 className="text-blue-400 font-bold text-xl mb-4">Update Note</h3>

                        <input
                            type="text"
                            className="w-full h-12 px-3 py-2 text-white rounded-lg bg-gray-800 border border-blue-400 mb-4"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />

                        <textarea
                            className="w-full h-48 px-3 py-2 text-white rounded-lg bg-gray-800 border border-blue-400"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />

                        <div className="flex justify-between items-center mt-6">
                            <button
                                onClick={() => {
                                    setShowUpdateModal(false)
                                    setCurrentNote(null)
                                }}
                                className="bg-red-400 py-2 px-4 rounded-lg hover:bg-red-500"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={handleUpdate}
                                className="bg-blue-400 py-2 px-4 rounded-lg hover:bg-blue-600"
                            >
                                Update
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showViewModal && currentNote && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-gray-900 p-8 rounded-lg text-center w-11/12 sm:w-9/12 lg:w-8/12 xl:w-6/12 shadow-lg">
                        <h3 className="text-blue-400 font-bold text-2xl mb-3">
                            {currentNote.title}
                        </h3>

                        <p className="text-white text-base whitespace-pre-line mb-6">
                            {currentNote.content}
                        </p>

                        <button
                            onClick={() => {
                                setShowViewModal(false)
                                setCurrentNote(null)
                            }}
                            className="bg-blue-400 py-2 px-4 rounded-lg hover:bg-blue-600"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            {showDeleteModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-gray-900 p-8 rounded-lg w-11/12 sm:w-7/12 lg:w-5/12 xl:w-4/12 shadow-lg text-center">
                        <h3 className="text-red-400 font-bold text-xl mb-4">
                            Delete this note?
                        </h3>

                        <div className="flex justify-between mt-6">
                            <button
                                onClick={() => {
                                    setShowDeleteModal(false)
                                    setCurrentNote(null)
                                }}
                                className="bg-gray-600 py-2 px-4 rounded-lg hover:bg-gray-700"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={confirmDelete}
                                className="bg-red-500 py-2 px-4 rounded-lg hover:bg-red-600"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    )
}
