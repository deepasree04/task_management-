from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from .models import Task


class TaskAPITests(APITestCase):

    def setUp(self):
        self.list_create_url = reverse('task-list-create')
        self.task1 = Task.objects.create(
            title='Initial Task 1',
            description='First task description',
            status=Task.STATUS_PENDING,
            due_date='2026-12-31'
        )
        self.task2 = Task.objects.create(
            title='Initial Task 2',
            description='Second task description',
            status=Task.STATUS_IN_PROGRESS
        )
        self.detail_url = reverse('task-detail', kwargs={'pk': self.task1.pk})

    def test_list_tasks(self):
        """Test retrieving list of all tasks (GET /api/tasks/)"""
        response = self.client.get(self.list_create_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)
        titles = [t['title'] for t in response.data]
        self.assertIn('Initial Task 1', titles)
        self.assertIn('Initial Task 2', titles)

    def test_create_valid_task(self):
        """Test creating a valid task (POST /api/tasks/)"""
        payload = {
            'title': 'New Test Task',
            'description': 'A new task for testing creation',
            'status': Task.STATUS_PENDING,
            'due_date': '2026-11-15'
        }
        response = self.client.post(self.list_create_url, payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['title'], 'New Test Task')
        self.assertEqual(response.data['status'], Task.STATUS_PENDING)
        self.assertEqual(Task.objects.count(), 3)

    def test_create_task_with_empty_due_date_and_description(self):
        """Test creating a task with empty description and empty due_date string"""
        payload = {
            'title': 'Task with optional empty fields',
            'description': '',
            'status': Task.STATUS_PENDING,
            'due_date': ''
        }
        response = self.client.post(self.list_create_url, payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIsNone(response.data['due_date'])
        self.assertEqual(response.data['description'], '')

    def test_reject_empty_title(self):
        """Test creating a task with empty title fails (400 Bad Request)"""
        payload = {
            'title': '   ',
            'description': 'Description without title',
            'status': Task.STATUS_PENDING
        }
        response = self.client.post(self.list_create_url, payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('title', response.data)

    def test_reject_invalid_status(self):
        """Test creating a task with invalid status fails (400 Bad Request)"""
        payload = {
            'title': 'Valid Title',
            'status': 'InvalidStatusName'
        }
        response = self.client.post(self.list_create_url, payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('status', response.data)

    def test_retrieve_task(self):
        """Test retrieving a single task by ID (GET /api/tasks/{id}/)"""
        response = self.client.get(self.detail_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['id'], self.task1.id)
        self.assertEqual(response.data['title'], 'Initial Task 1')

    def test_update_task(self):
        """Test full update of an existing task (PUT /api/tasks/{id}/)"""
        payload = {
            'title': 'Updated Task 1 Title',
            'description': 'Updated description',
            'status': Task.STATUS_COMPLETED,
            'due_date': '2026-10-20'
        }
        response = self.client.put(self.detail_url, payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['title'], 'Updated Task 1 Title')
        self.assertEqual(response.data['status'], Task.STATUS_COMPLETED)

        self.task1.refresh_from_db()
        self.assertEqual(self.task1.title, 'Updated Task 1 Title')

    def test_partial_update_task_status(self):
        """Test partial status update (PATCH /api/tasks/{id}/)"""
        payload = {
            'status': Task.STATUS_COMPLETED
        }
        response = self.client.patch(self.detail_url, payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['status'], Task.STATUS_COMPLETED)

        self.task1.refresh_from_db()
        self.assertEqual(self.task1.status, Task.STATUS_COMPLETED)
        self.assertEqual(self.task1.title, 'Initial Task 1')

    def test_delete_task(self):
        """Test deleting a task (DELETE /api/tasks/{id}/)"""
        response = self.client.delete(self.detail_url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(Task.objects.filter(pk=self.task1.pk).exists())

    def test_return_404_for_nonexistent_task(self):
        """Test retrieving a non-existent task returns 404 Not Found"""
        non_existent_url = reverse('task-detail', kwargs={'pk': 99999})
        response = self.client.get(non_existent_url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
