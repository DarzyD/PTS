'use client';
import react, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.css';

export const SearchPatient = () => {
  // State to manage the selected search category
  const [selectedCategory, setSelectedCategory] = useState('All');
  // Handler for search button click
  const handleSearchClick = () => {
    // You can add search functionality here
    console.log(`Searching for "${selectedCategory}" in the input field.`);
  };
    return (
    <div className="container">
    <div className="row">
      <div className="col-xs-8 col-xs-offset-2">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            name="x"
            id="search"
            placeholder="Search for patients..."
          />
          <span className="input-group-btn">
            <button
              className="btn-primary btn"
              type="button"
              onClick={handleSearchClick}
            >
              Search
            </button>
          </span>
        </div>
      </div>
    </div>
  </div>
    )
}