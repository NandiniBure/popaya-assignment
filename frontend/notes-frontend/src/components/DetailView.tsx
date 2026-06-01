import React from "react";

interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

interface DetailViewProps {
  note: Note | null;
  onEdit: (note: Note) => void;
  onDelete: (id: string) => void;
  onClose: () => void;
}

const DetailView: React.FC<DetailViewProps> = ({ note, onEdit, onDelete, onClose }) => {
  if (!note) {
    return (
      <div className="flex flex-col items-center justify-center p-10 text-gray-500">
        <span className="text-2xl font-bold">No Note Selected</span>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-xl shadow-2xl w-[95vw] max-w-lg p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 rounded-full p-2 hover:bg-gray-200 transition"
          aria-label="Close"
        >
          <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
            <path stroke="#d946ef" strokeWidth="2" strokeLinecap="round" d="M6 6l12 12M18 6l-12 12"/>
          </svg>
        </button>
        <h2 className="text-3xl font-extrabold text-purple-700 mb-4 break-words">{note.title}</h2>
        <div className="text-gray-700 text-base leading-relaxed whitespace-pre-line mb-6 overflow-y-auto max-h-60">
          {note.content ? note.content : <span className="text-gray-400 italic">No content...</span>}
        </div>
        <div className="text-xs text-gray-400 flex flex-col gap-1 mb-6">
          <span>
            <strong>Created:</strong> {new Date(note.createdAt).toLocaleString()}
          </span>
          <span>
            <strong>Last Updated:</strong> {new Date(note.updatedAt).toLocaleString()}
          </span>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => onEdit(note)}
            className="px-5  z-99 py-2 rounded-lg font-semibold bg-purple-200 hover:bg-purple-400 text-purple-700 hover:text-white shadow transition-colors"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(note.id)}
            className="px-5 z-99 py-2 rounded-lg font-semibold bg-pink-200 hover:bg-pink-400 text-pink-700 hover:text-white shadow transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailView;