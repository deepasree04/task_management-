import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import StatsCards from './components/StatsCards';
import TaskFilters from './components/TaskFilters';
import TaskList from './components/TaskList';
import TaskModal from './components/TaskModal';
import DeleteConfirmModal from './components/DeleteConfirmModal';
import NotificationBanner from './components/NotificationBanner';
import { taskService } from './services/taskService';

export function App() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [notification, setNotification] = useState(null);

  // Filters & Search
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  // Modals state
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const showNotification = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  const fetchTasks = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await taskService.getAllTasks();
      setTasks(data);
    } catch (err) {
      console.error('Error fetching tasks:', err);
      showNotification('error', 'Failed to connect to backend server. Make sure Django API is running.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // Handle Save (Create / Update)
  const handleSaveTask = async (formData) => {
    setIsSubmitting(true);
    try {
      if (taskToEdit) {
        await taskService.updateTask(taskToEdit.id, formData);
        showNotification('success', 'Task updated successfully!');
      } else {
        await taskService.createTask(formData);
        showNotification('success', 'New task created successfully!');
      }
      setIsTaskModalOpen(false);
      setTaskToEdit(null);
      await fetchTasks();
    } catch (err) {
      console.error('Error saving task:', err);
      const errMsg = err.response?.data?.title?.[0] || err.response?.data?.detail || 'Failed to save task.';
      showNotification('error', errMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Status Update (PATCH)
  const handleStatusChange = async (taskId, newStatus) => {
    try {
      await taskService.patchTask(taskId, { status: newStatus });
      showNotification('success', `Task status updated to "${newStatus}"`);
      await fetchTasks();
    } catch (err) {
      console.error('Error updating status:', err);
      showNotification('error', 'Failed to update task status.');
    }
  };

  // Handle Delete Confirmation
  const handleConfirmDelete = async () => {
    if (!taskToDelete) return;
    setIsDeleting(true);
    try {
      await taskService.deleteTask(taskToDelete.id);
      showNotification('success', 'Task deleted successfully!');
      setIsDeleteModalOpen(false);
      setTaskToDelete(null);
      await fetchTasks();
    } catch (err) {
      console.error('Error deleting task:', err);
      showNotification('error', 'Failed to delete task.');
    } finally {
      setIsDeleting(false);
    }
  };

  // Open Edit Modal
  const handleOpenEditModal = (task) => {
    setTaskToEdit(task);
    setIsTaskModalOpen(true);
  };

  // Open Create Modal
  const handleOpenCreateModal = () => {
    setTaskToEdit(null);
    setIsTaskModalOpen(true);
  };

  // Open Delete Modal
  const handleOpenDeleteModal = (task) => {
    setTaskToDelete(task);
    setIsDeleteModalOpen(true);
  };

  // Filter and Search logic
  const filteredTasks = tasks.filter((task) => {
    const matchesFilter = activeFilter === 'All' || task.status === activeFilter;
    const matchesSearch =
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (task.description && task.description.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="app-container">
      <Header onOpenNewTaskModal={handleOpenCreateModal} />

      <NotificationBanner
        notification={notification}
        onClose={() => setNotification(null)}
      />

      <StatsCards tasks={tasks} />

      <TaskFilters
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      <TaskList
        tasks={filteredTasks}
        isLoading={isLoading}
        onStatusChange={handleStatusChange}
        onEdit={handleOpenEditModal}
        onDelete={handleOpenDeleteModal}
        onOpenNewTaskModal={handleOpenCreateModal}
      />

      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={() => {
          setIsTaskModalOpen(false);
          setTaskToEdit(null);
        }}
        onSave={handleSaveTask}
        taskToEdit={taskToEdit}
        isSubmitting={isSubmitting}
      />

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setTaskToDelete(null);
        }}
        onConfirm={handleConfirmDelete}
        task={taskToDelete}
        isDeleting={isDeleting}
      />
    </div>
  );
}

export default App;
