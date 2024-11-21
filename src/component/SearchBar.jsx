import React from 'react';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { IoMdClose } from 'react-icons/io';

const SearchBar = ({ value, onChange, handleSearch, onClearSearch }) => {
  return (
    <div className="flex items-center px-4  rounded-md w-full sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4">
      <input
        type="text"
        placeholder="Search Notes"
        className="w-full text-xs sm:text-sm bg-transparent py-2 sm:py-3 outline-none"
        value={value}
        onChange={onChange}
      />
      {value && (
        <IoMdClose
          className="text-xl sm:text-2xl text-slate-500 cursor-pointer hover:text-black mr-3"
          onClick={onClearSearch}
        />
      )}
      <FaMagnifyingGlass
        className="text-slate-400 cursor-pointer hover:text-black sm:text-lg"
        onClick={handleSearch}
      />
    </div>
  );
};

export default SearchBar;
