import React from 'react';

export function TaskItem({ task, onStatusChange, onEdit, onDelete }) {
  const getBadgeClass = (status) => {
    switch (status) {
      case 'Completed':
        return 'badge-completed';
      case 'In Progress':
        return 'badge-in-progress';
      case 'Pending':
      default:
        return 'badge-pending';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'No due date';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  };

  return (
    <div className="glass-card task-card">
      <div className="task-main">
        <div className="task-header-line">
          <h3 className="task-title">{task.title}</h3>
          <span className={`badge ${getBadgeClass(task.status)}`}>
            {task.status}
          </span>
        </div>

        {task.description && (
          <p className="task-description">{task.description}</p>
        )}

        <div className="task-meta">
          <div className="task-meta-item">
            <span>📅</span> Due: {formatDate(task.due_date)}
          </div>
          <div className="task-meta-item">
            <span>🕒</span> Created: {formatDate(task.created_at)}
          </div>
        </div>
      </div>

      <div className="task-actions">
        <select
          className="status-select"
          value={task.status}
          onChange={(e) => onStatusChange(task.id, e.target.value)}
        >
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>

        <button
          className="btn-icon"
          title="Edit Task"
          onClick={() => onEdit(task)}
        >
          ✏️
        </button>

        <button
          className="btn-icon"
          title="Delete Task"
          onClick={() => onDelete(task)}
          style={{ color: 'var(--danger)' }}
        >
          🗑️
        </button>
      </div>
    </div>
  );
}

export default TaskItem;
