import React, { useState } from 'react';

const SearchBar = ({ searchBooks }) => {
  const [searchString, setSearchString] = useState('');

  const onHandleClick = () => {
    searchBooks(searchString);
  };

  return (
    <div className="search-bar">
      <input
        placeholder="Search..."
        onChange={(e) => setSearchString(e.target.value)}
      />
      <button onClick={() => onHandleClick()}> Search</button>
    </div>
  );
};

export default SearchBar;
