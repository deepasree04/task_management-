import React from 'react';
import TaskItem from './TaskItem';

export function TaskList({ tasks, isLoading, onStatusChange, onEdit, onDelete, onOpenNewTaskModal }) {
  if (isLoading) {
    return <div className="spinner"></div>;
  }

  if (tasks.length === 0) {
    return (
      <div className="glass-card empty-state">
        <div className="empty-icon">📂</div>
        <h3>No tasks found</h3>
        <p style={{ marginTop: '0.5rem', marginBottom: '1.5rem' }}>
          You don't have any tasks matching this view. Get started by creating one!
        </p>
        <button className="btn btn-primary" onClick={onOpenNewTaskModal}>
          + Create First Task
        </button>
      </div>
    );
  }

  return (
    <div className="task-grid">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onStatusChange={onStatusChange}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default TaskList;
