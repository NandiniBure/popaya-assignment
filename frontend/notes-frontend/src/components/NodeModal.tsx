import React, { useState, useEffect } from "react";

interface NoteModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: { title: string; content: string }) => void;
    selectedNote: { title: string; content: string } | null;
}

const NoteModal: React.FC<NoteModalProps> = ({
    isOpen,
    onClose,
    onSave,
    selectedNote,
}) => {
    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");

    useEffect(() => {
        if (selectedNote) {
            setTitle(selectedNote.title || "");
            setContent(selectedNote.content || "");
        } else {
            setTitle("");
            setContent("");
        }
    }, [selectedNote]);

    if (!isOpen) return null;

    // Extra: prevent empty title submit and allow Enter for submit in title
    const handleSave = () => {
        if (!title.trim()) {
            alert("Title is required.");
            return;
        }
        onSave({ title, content });
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-40">
            <div className="relative bg-white p-6 rounded-xl w-[90%] md:w-[500px] shadow-lg animate-fadeIn">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-2xl font-bold"
                    aria-label="Close"
                >
                    &times;
                </button>
                <h2 className="font-extrabold text-2xl mb-5 text-center text-purple-600">
                    {selectedNote ? "Edit Note" : "Create Note"}
                </h2>
                <input
                    className="w-full border-2 border-purple-200 focus:border-purple-400 p-3 rounded-lg mb-4 font-semibold transition-colors outline-none"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    onKeyDown={e => {
                        if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            handleSave();
                        }
                    }}
                    maxLength={80}
                    required
                    spellCheck={true}
                />
                <textarea
                    className="w-full border-2 border-purple-200 focus:border-purple-400 p-3 rounded-lg h-40 resize-none mb-1 transition-colors outline-none"
                    placeholder="Content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    maxLength={2000}
                    spellCheck={true}
                />
                <div className="flex justify-end gap-2 mt-6">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-5 py-2 border border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors font-medium text-gray-700"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={handleSave}
                        className="px-6 py-2 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 text-white font-bold rounded-lg shadow hover:scale-105 transition-transform"
                    >
                        Save
                    </button>
                </div>
            </div>
            {/* Simple fadeIn animation */}
            <style>
                {`
                    .animate-fadeIn {
                        animation: fadeIn .22s cubic-bezier(.32,.72,.62,1.1);
                    }
                    @keyframes fadeIn {
                        from { opacity: 0; transform: scale(.96) translateY(16px);}
                        to   { opacity: 1; transform: scale(1) translateY(0);}
                    }
                `}
            </style>
        </div>
    );
};

export default NoteModal;