import React from 'react';

export function DeleteConfirmModal({ isOpen, onClose, onConfirm, task, isDeleting }) {
  if (!isOpen || !task) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" style={{ maxWidth: '440px' }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Delete Task</h2>
          <button className="btn-icon" onClick={onClose}>✕</button>
        </div>

        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
          Are you sure you want to delete <strong style={{ color: 'var(--text-primary)' }}>"{task.title}"</strong>? This action cannot be undone.
        </p>

        <div className="form-actions">
          <button
            className="btn btn-secondary"
            onClick={onClose}
            disabled={isDeleting}
          >
            Cancel
          </button>
          <button
            className="btn btn-danger"
            onClick={onConfirm}
            disabled={isDeleting}
          >
            {isDeleting ? 'Deleting...' : 'Confirm Delete'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmModal;
