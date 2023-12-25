<template>
  <form @submit.prevent="submitForm" class="my-4">
    <div class="mb-3">
      <button type="button" class="btn btn-secondary" @click="goBack">Back</button>
    </div>

    <div class="mb-3">
      <label for="title" class="form-label">Title:</label>
      <input v-model="task.title" id="title" class="form-control" required>
    </div>

    <div class="mb-3">
      <label for="description" class="form-label">Description:</label>
      <textarea v-model="task.description" id="description" class="form-control" required></textarea>
    </div>

    <div class="mb-3">
      <label for="dueDate" class="form-label">Due Date:</label>
      <input type="date" v-model="task.dueDate" id="dueDate" class="form-control" required>
    </div>

    <div class="mb-3">
      <label for="userId" class="form-label">User:</label>
      <select v-model="task.userId" id="userId" class="form-select">
        <option v-for="user in users" :key="user.id" :value="user.id">{{ user.username }}</option>
      </select>
    </div>

    <div class="mb-3">
      <label for="priority" class="form-label">Priority:</label>
      <select v-model="task.priority" id="priority" class="form-select" required>
        <option value="0">Low</option>
        <option value="1">Medium</option>
        <option value="2">High</option>
      </select>
    </div>

    <div class="mb-3 d-flex justify-content-center">
      <button
          type="button"
          class="btn"
          :class="{ 'btn-success': !task.completed, 'btn-danger': task.completed }"
          @click="toggleCompletion"
      >
        {{ task.completed ? 'Mark Uncomplete' : 'Complete!' }}
      </button>
    </div>

    <button type="submit" class="btn btn-primary">{{ isEditing ? 'Update Task' : 'Create Task' }}</button>
  </form>
</template>

<script>
export default {
  props: ['id'],
  data() {
    return {
      task: {
        title: '',
        description: '',
        dueDate: '',
        priority: 0,
        userId: null,
        completed: false,
      },
      users: [],
    };
  },
  computed: {
    isEditing() {
      return !!this.id;
    },
  },
  mounted() {
    this.fetchUsers();
  },
  watch: {
    id: {
      immediate: true,
      handler(newId) {
        if (newId) {
          this.fetchTaskDetails(newId);
        }
      },
    },
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    toggleCompletion() {
      this.task.completed = !this.task.completed;
    },
    async fetchUsers() {
      try {
        const response = await this.axios.get('/users');
        this.users = response.data;
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    },
    async fetchTaskDetails(taskId) {
      try {
        const response = await this.axios.get(`/tasks/${taskId}`);
        this.task = response.data[0];
        this.task.dueDate = response.data[0].due_date.split('T')[0];
        this.task.userId = response.data[0].user_id;
      } catch (error) {
        console.error('Error fetching task details:', error);
      }
    },
    async submitForm() {
      try {
        if (this.isEditing) {
          // Update task
          await this.axios.put(`/tasks/${this.id}`, this.task);
        } else {
          // Create Task
          await this.axios.post('/tasks', this.task);
        }
        this.$router.push({ name: 'tasks' });
        console.log('Task saved successfully');
      } catch (error) {
        console.error('Error saving task:', error);
      }
    },
  },
};
</script>