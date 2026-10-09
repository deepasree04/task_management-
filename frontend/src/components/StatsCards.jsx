import React from 'react';

export function StatsCards({ tasks }) {
  const total = tasks.length;
  const pending = tasks.filter((t) => t.status === 'Pending').length;
  const inProgress = tasks.filter((t) => t.status === 'In Progress').length;
  const completed = tasks.filter((t) => t.status === 'Completed').length;

  return (
    <div className="stats-grid">
      <div className="glass-card stat-card">
        <div className="stat-info">
          <span className="stat-label">Total Tasks</span>
          <span className="stat-value">{total}</span>
        </div>
        <div className="stat-icon total">📋</div>
      </div>

      <div className="glass-card stat-card">
        <div className="stat-info">
          <span className="stat-label">Pending</span>
          <span className="stat-value">{pending}</span>
        </div>
        <div className="stat-icon pending">⏳</div>
      </div>

      <div className="glass-card stat-card">
        <div className="stat-info">
          <span className="stat-label">In Progress</span>
          <span className="stat-value">{inProgress}</span>
        </div>
        <div className="stat-icon in-progress">⚡</div>
      </div>

      <div className="glass-card stat-card">
        <div className="stat-info">
          <span className="stat-label">Completed</span>
          <span className="stat-value">{completed}</span>
        </div>
        <div className="stat-icon completed">🎉</div>
      </div>
    </div>
  );
}

export default StatsCards;
