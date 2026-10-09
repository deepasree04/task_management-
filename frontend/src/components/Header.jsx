import React from 'react';

export function Header({ onOpenNewTaskModal }) {
  return (
    <header className="app-header">
      <div className="brand">
        <div className="brand-icon">✓</div>
        <div className="brand-text">
          <h1>Task Manager</h1>
          <p>Organize, track, and accomplish your work</p>
        </div>
      </div>
      <button className="btn btn-primary" onClick={onOpenNewTaskModal}>
        <span>+</span> Create Task
      </button>
    </header>
  );
}

export default Header;
