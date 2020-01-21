import React from 'react';

import './search-panel.css';

const SearchPanel = (props) => {
  const onSearch = (e) => {
    props.onSearch(e.target.value)
  };
  return (
    <input type="text"
              className="form-control search-input"
              placeholder="type to search"
    onChange={onSearch}/>
  );
};

export default SearchPanel;
