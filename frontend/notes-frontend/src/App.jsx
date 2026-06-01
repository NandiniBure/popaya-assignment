import { useEffect, useState } from "react";
import {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
  searchNotes,
} from "./services/noteService";

import NoteCard from "./components/NoteCart";
import NoteModal from "./components/NodeModal";
import SearchBar from "./components/Searchbar";
import DetailView from "./components/DetailView";

const GRADIENTS = [
  "from-pink-500 via-red-500 to-yellow-500",
  "from-blue-500 via-purple-500 to-pink-500",
  "from-green-400 via-blue-500 to-purple-600",
  "from-yellow-400 via-orange-500 to-pink-600",
  "from-cyan-400 via-teal-500 to-green-500",
  "from-indigo-500 via-blue-400 to-cyan-300",
];

function getRandomGradient(index) {
  return GRADIENTS[index % GRADIENTS.length];
}

function App() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [open, setOpen] = useState(false);

  const [selectedNote, setSelectedNote] = useState(null);

  const [detailNote, setDetailNote] = useState(null);

  const fetchNotes = async () => {
    try {
      setLoading(true);

      const res = await getNotes();

      setNotes(res.data.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleSave = async (data) => {
    if (!data.title.trim()) {
      alert("Title required");
      return;
    }

    if (selectedNote) {
      await updateNote(selectedNote.id, data);
    } else {
      await createNote(data);
    }

    setOpen(false);
    setSelectedNote(null);
    fetchNotes();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this note?")) return;

    await deleteNote(id);

    fetchNotes();

    // If deleting from detail view, close it.
    if (detailNote && detailNote.id === id) {
      setDetailNote(null);
    }
  };

  const handleSearch = async (value) => {
    setSearch(value);

    if (!value.trim()) {
      fetchNotes();
      return;
    }

    const res = await searchNotes(value);

    setNotes(res.data.data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 py-10 via-pink-100 to-yellow-100 w-full">
      <div className=" w-full max-w-6xl  h-screen mx-auto p-7 rounded-xl shadow-xl  bg-white/80 backdrop-blur-md border border-pink-200">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
          <h1 className="text-5xl md:text-6xl bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent font-extrabold tracking-wide drop-shadow-lg">
            Notes{" "}
            <span className="inline-block text-pink-50 animate-wiggle">
              App
            </span>
          </h1>
          <button
            onClick={() => {
              setSelectedNote(null);
              setOpen(true);
            }}
            className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 text-white px-7 py-3 rounded-2xl font-semibold shadow-lg hover:scale-105 transition-transform ring-2 ring-pink-200"
          >
            <span className="text-xl mr-1 align-middle">+</span> New Note
          </button>
        </div>

        <div className="mb-6">
          <SearchBar
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>

        {loading ? (
          <div className="text-center mt-16">
            <div className="inline-block rounded-full border-4 border-pink-300 border-t-blue-400 animate-spin h-14 w-14 mb-3"></div>
            <div className="text-lg font-medium text-purple-600">
              Loading...
            </div>
          </div>
        ) : notes.length === 0 ? (
          <div className="text-center mt-16 text-gray-500 text-xl flex flex-col items-center">
            <svg
              width="50"
              height="50"
              viewBox="0 0 32 32"
              fill="none"
              className="mb-3"
            >
              <circle
                cx="16"
                cy="16"
                r="14"
                stroke="pink"
                strokeWidth="2.5"
                fill="#fdf2f8"
              />
              <rect
                x="11"
                y="11"
                width="10"
                height="8"
                rx="2"
                fill="white"
                stroke="#959cef"
                strokeWidth="2"
              />
              <rect x="11" y="20" width="10" height="2" rx="1" fill="pink" />
            </svg>
            No Notes Found
          </div>
        ) : (
          <div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6 overflow-y-auto"
            style={{
              maxHeight: "60vh",
              paddingRight: "4px", // space for scrollbar
            }}
          >
            {notes.map((note, idx) => (
              <div
                key={note.id}
                className="rounded-xl p-0 border-none transition-all hover:scale-[1] cursor-pointer relative"
                // Only open detail view when clicking on the card itself, not its child buttons
                onClick={(e) => {
                  // If a button was the actual click target, let its own event handler run; else open detail.
                  const isButton =
                    e.target.tagName === "BUTTON" ||
                    e.target.closest("button");
                  if (!isButton) {
                    setDetailNote(note);
                  }
                }}
                tabIndex={0}
                aria-label={`Open details of note titled ${note.title}`}
              >
                <NoteCard
                  note={note}
                  // Now these callbacks don't take an event (ev), just call, since NoteCard uses onClick's note/onDelete/note.id directly
                  onDelete={() => {
                    handleDelete(note.id);
                  }}
                  onEdit={() => {
                    setSelectedNote(note);
                    setOpen(true);
                  }}
                  customChildren={
                    <div className="absolute inset-0 bg-white/60 rounded-xl pointer-events-none" />
                  }
                />
              </div>
            ))}
          </div>
        )}

        <NoteModal
          isOpen={open}
          selectedNote={selectedNote}
          onClose={() => setOpen(false)}
          onSave={handleSave}
        />

        {detailNote && (
          <DetailView
            note={detailNote}
            onClose={() => setDetailNote(null)}
            onDelete={handleDelete}
            onEdit={(n) => {
              setSelectedNote(n);
              setOpen(true);
              setDetailNote(null);
            }}
          />
        )}
      </div>
      {/* Soft decorative background blobs */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-20 left-[-10vw] w-[400px] h-[400px] bg-pink-300 opacity-40 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute top-2/3 right-0 w-[350px] h-[350px] bg-indigo-300 opacity-35 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute top-20 right-1/4 w-[230px] h-[230px] bg-amber-200 opacity-30 rounded-full blur-2xl animate-blob animation-delay-4000"></div>
      </div>
      {/* Animation keyframes for blob */}
      <style>
        {`
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes blob {
          0%, 100% {
            transform: translateY(0px) scale(1) rotate(0deg);
          }
          33% {
            transform: translateY(-20px) scale(1.07) rotate(6deg);
          }
          66% {
            transform: translateY(24px) scale(0.95) rotate(-3deg);
          }
        }
        .animate-wiggle {
          animation: wiggle 1.3s infinite alternate;
        }
        @keyframes wiggle {
          30% { transform: rotate(-5deg) scale(1.05);}
          60% { transform: rotate(5deg) scale(1.13);}
          100% { transform: rotate(-4deg) scale(1);}
        }
        `}
      </style>
    </div>
  );
}

export default App;
