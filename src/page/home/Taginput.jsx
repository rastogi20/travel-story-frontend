import React, { useState } from 'react';
import { MdAdd, MdClose } from 'react-icons/md';
import { GrLocation } from 'react-icons/gr';

const Taginput = ({ tags, setTags }) => {
  const [inputValue, setInputValue] = useState('');

  const addNewTag = () => {
    if (inputValue) {
      setTags([...tags, inputValue]);
      setInputValue('');
    }
  };
  const handleRemoveTag=(tagremove) => {
    setTags(tags.filter((tag) => tag!== tagremove));
  }
  const handleInputChange=(e)=>{setInputValue(e.target.value)};
  const handlekeydown=(e)=>{
    if(e.key === 'Enter'){
      addNewTag();
    }
  };

  return (
    <div >
        {JSON.stringify(tags)}
        {tags.length > 0 && (
  <div className="flex items-center gap-2 flex-wrap mt-2">
    {tags.map((tag, index) => (
      <span key={index} className="flex items-center gap-2 text-sm text-cyan-600 bg-cyan-200/48 px-3 py-1 rounded-full">
        <GrLocation className="text-sm" />
        {tag}
        <button onClick={() => handleRemoveTag(tag)}>
          <MdClose />
        </button>
      </span>
    ))}
  </div>
)}

        <div className="flex items-center gap-4 mt-3">
    <input
      type="text"
      value={inputValue}
      className="text-sm bg-transparent border px-3 py-2 rounded outline-none"
      placeholder="Add Location"
      onChange={handleInputChange}
      onKeyDown={handlekeydown}
    />
    <button
      className="w-8 h-8 flex items-center justify-center rounded border border-cyan-500 hover:bg-cyan-500"
      onClick={addNewTag}
    >
      <MdAdd className="text-2xl text-cyan-500 hover:text-white" />
    </button>
  </div></div>
  );
};

export default Taginput;