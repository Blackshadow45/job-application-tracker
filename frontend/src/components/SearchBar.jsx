import React, { memo } from 'react';
import { Search, Plus } from 'lucide-react';

const SearchBar = memo(({ 
  searchTerm, 
  setSearchTerm, 
  filterStatus, 
  setFilterStatus, 
  onAddClick 
}) => {
  return (
    <div className="search-card">
      <div className="search-content">
        <div className="search-input-wrapper">
          <Search className="search-icon" />
          <input
            type="text"
            placeholder="Search by company or position..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="filter-select"
        >
          <option>All</option>
          <option>Applied</option>
          <option>Interview</option>
          <option>Offer</option>
          <option>Rejected</option>
        </select>
        
        <button
          onClick={onAddClick}
          className="add-button"
        >
          <Plus size={20} />
          Add Application
        </button>
      </div>
    </div>
  );
});

SearchBar.displayName = 'SearchBar';

export default SearchBar;