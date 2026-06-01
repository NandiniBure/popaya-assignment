import React from "react";

interface SearchBarProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
    return (
        <input
            type="text"
            placeholder="Search notes..."
            value={value}
            onChange={onChange}
            className="w-full p-3 rounded-xl border border-gray-300 focus:border-purple-400 focus:ring-2 focus:ring-purple-200 transition-colors outline-none text-lg bg-white/70 shadow-md"
            spellCheck={true}
            maxLength={100}
            aria-label="Search notes"
            autoComplete="off"
        />
    );
};

export default SearchBar;