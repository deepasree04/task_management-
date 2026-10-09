import React from 'react';

export function NotificationBanner({ notification, onClose }) {
  if (!notification) return null;

  const { type, message } = notification;

  return (
    <div
      className={`notification ${
        type === 'error' ? 'notification-error' : 'notification-success'
      }`}
    >
      <span>
        {type === 'error' ? '⚠️' : '✅'} {message}
      </span>
      {onClose && (
        <button
          className="btn-icon"
          onClick={onClose}
          style={{ color: 'inherit', padding: '0 0.2rem' }}
        >
          ✕
        </button>
      )}
    </div>
  );
}

export default NotificationBanner;
