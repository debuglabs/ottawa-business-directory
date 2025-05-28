
import React from 'react';

interface SearchBarProps {
  searchTerm: string;
  onSearchTermChange: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, onSearchTermChange }) => {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search by name or description..."
        value={searchTerm}
        onChange={(e) => onSearchTermChange(e.target.value)}
        className="w-full px-4 py-3 pr-10 border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-300"
      />
      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
        <svg className="h-5 w-5 text-slate-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
        </svg>
      </div>
    </div>
  );
};

export default SearchBar;
