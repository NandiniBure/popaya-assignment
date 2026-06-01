import { FaEdit, FaTrash } from "react-icons/fa";

export default function NoteCard({ note, onEdit, onDelete, customChildren }) {
  return (
    <div className="relative h-[200px] bg-gradient-to-br from-pink-100 via-purple-100 to-yellow-50 rounded-xl shadow-xl p-0 transition hover:scale-[1.03] hover:shadow-2xl overflow-hidden group">
      {/* Decorative bubble */}
      <div className="absolute -top-4 -left-10 z-0 opacity-50">
        <svg width="80" height="80" viewBox="0 0 100 100" fill="none">
          <ellipse cx="50" cy="40" rx="50" ry="30" fill="#c084fc" />
        </svg>
      </div>
      {/* Custom overlay for text readability (if provided) */}
      {customChildren}
      <div className="relative z-10 p-5">
        <div className="flex items-start justify-between mb-2">
          <h2 className="font-extrabold text-xl text-purple-700 tracking-tight drop-shadow">
            {note.title.length > 20 ? note.title.slice(0, 20) + '...' : note.title}
          </h2>
     
          <div className="flex gap-2">
            <button
              onClick={() => onEdit(note)}
              className="p-2 bg-purple-200 hover:bg-purple-400 text-purple-700 hover:text-white rounded-lg transition-colors shadow active:scale-95 outline-none"
              title="Edit"
            >
              <FaEdit className="inline text-lg" />
            </button>
            <button
              onClick={() => onDelete(note.id)}
              className="p-2 bg-pink-200 hover:bg-pink-400 text-pink-700 hover:text-white rounded-lg transition-colors shadow active:scale-95 outline-none"
              title="Delete"
            >
              <FaTrash className="inline text-lg" />
            </button>
          </div>
        </div>
        <p className="text-gray-700 text-[1rem] leading-relaxed line-clamp-3 mb-3 min-h-[3.4em]">
          {note.content ? note.content : <span className="text-gray-400 italic">No content...</span>}
        </p>
        <div className="mt-3 text-xs flex items-center gap-2 text-gray-500">
          <svg width="16" height="16" fill="#a78bfa" className="inline"><circle cx="8" cy="8" r="8" /></svg>
          <span>
            <strong className="font-medium text-purple-700">Updated:</strong>{" "}
            {new Date(note.updatedAt).toLocaleString()}
          </span>
        </div>
      </div>
      {/* Extra accent band at the bottom */}
      <div className="absolute left-0 right-0 bottom-0 h-2 bg-gradient-to-r from-yellow-300 via-pink-200 to-purple-300 opacity-70" />
    </div>
  );
}
