import React, { useState, useEffect } from 'react';

export function TaskModal({ isOpen, onClose, onSave, taskToEdit, isSubmitting }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'Pending',
    due_date: '',
  });

  const [validationError, setValidationError] = useState('');

  useEffect(() => {
    if (taskToEdit) {
      setFormData({
        title: taskToEdit.title || '',
        description: taskToEdit.description || '',
        status: taskToEdit.status || 'Pending',
        due_date: taskToEdit.due_date || '',
      });
    } else {
      setFormData({
        title: '',
        description: '',
        status: 'Pending',
        due_date: '',
      });
    }
    setValidationError('');
  }, [taskToEdit, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === 'title' && value.trim()) {
      setValidationError('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      setValidationError('Task title is required.');
      return;
    }
    onSave(formData);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{taskToEdit ? 'Edit Task' : 'Create New Task'}</h2>
          <button className="btn-icon" onClick={onClose}>✕</button>
        </div>

        {validationError && (
          <div className="notification notification-error" style={{ marginBottom: '1rem' }}>
            <span>⚠️ {validationError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Task Title *</label>
            <input
              id="title"
              name="title"
              type="text"
              className="form-input"
              placeholder="e.g. Prepare DRF backend documentation"
              value={formData.title}
              onChange={handleChange}
              autoFocus
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              rows="3"
              className="form-textarea"
              placeholder="Add details, notes, or subtasks..."
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label htmlFor="status">Status</label>
              <select
                id="status"
                name="status"
                className="form-select"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="due_date">Due Date</label>
              <input
                id="due_date"
                name="due_date"
                type="date"
                className="form-input"
                value={formData.due_date}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving...' : taskToEdit ? 'Update Task' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TaskModal;
