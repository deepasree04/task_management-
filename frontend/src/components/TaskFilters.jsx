import React from 'react';

export function TaskFilters({ activeFilter, onFilterChange, searchTerm, onSearchChange }) {
  const filters = [
    { id: 'All', label: 'All Tasks' },
    { id: 'Pending', label: 'Pending' },
    { id: 'In Progress', label: 'In Progress' },
    { id: 'Completed', label: 'Completed' },
  ];

  return (
    <div className="controls-bar">
      <div className="filter-tabs">
        {filters.map((filter) => (
          <button
            key={filter.id}
            className={`tab-btn ${activeFilter === filter.id ? 'active' : ''}`}
            onClick={() => onFilterChange(filter.id)}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <div style={{ position: 'relative', width: '240px' }}>
        <input
          type="text"
          className="form-input"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          style={{ paddingLeft: '2.2rem', padding: '0.5rem 1rem 0.5rem 2.2rem' }}
        />
        <span
          style={{
            position: 'absolute',
            left: '0.75rem',
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'var(--text-muted)',
            fontSize: '0.9rem',
          }}
        >
          🔍
        </span>
      </div>
    </div>
  );
}

export default TaskFilters;
