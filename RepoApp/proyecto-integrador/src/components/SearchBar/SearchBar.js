import React, { useState } from 'react';
import './SearchBar.css';
import { Search } from '@carbon/icons-react';

function SearchBar(props) {
  const [searchTerm, setSearchTerm] = useState('');

  function handleInputChange(event) {
    setSearchTerm(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    props.onSearch(searchTerm);
  }

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <div className="search-container">
      <button type="submit" className="search-button">
        <Search className="search-icon"/>
        </button>
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder="Search employee or certification"
          className="search-input"
        />
        <div className="search-line"></div>
      </div>
    </form>
  );
}

export default SearchBar;
