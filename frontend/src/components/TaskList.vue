<template>
  <div>
    <h1 class="mb-4">Task List</h1>

    <div class="mb-3">
      <label for="search" class="form-label">Search:</label>
      <input v-model="searchQuery" id="search" class="form-control">
    </div>
    <button class="btn btn-success mb-4" @click="createTask">Create New Task</button>
    <div class="mb-3">
      <button class="btn btn-primary me-2" @click="sortByDueDate">
        Sort by Due Date
        <i v-if="sortBy === 'dueDate'" :class="sortDueDateDesc ? 'bi bi-arrow-down' : 'bi bi-arrow-up'"></i>
      </button>
      <button class="btn btn-primary me-2" @click="sortByPriority">
        Sort by Priority
        <i v-if="sortBy === 'priority'" :class="sortPriorityDesc ? 'bi bi-arrow-down' : 'bi bi-arrow-up'"></i>
      </button>
      <button class="btn btn-secondary me-2" @click="toggleHideCompleted">
        {{ hideCompleted ? 'Show Completed' : 'Hide Completed' }}
      </button>
      <button v-if="sortBy || hideCompleted || searchQuery" class="btn btn-secondary me-2" @click="clearFilters">
        Clear Filters
      </button>
    </div>

    <ul class="list-group">
      <li v-for="task in paginatedTasks" :key="task.id" :class="taskRowClass(task)" class="list-group-item d-flex justify-content-between align-items-center">
        <div class="d-flex flex-row">
          <div class="me-2">
            <strong>Title:</strong><span class="fw-bold"> {{ task.title }}</span>
          </div>
          <div class="me-2">
            <span><strong>User:</strong> {{ getUserById(task.user_id) }}</span>
          </div>
          <div>
            <span><strong>Due Date:</strong> {{ task.due_date.split('T')[0] }}</span>
          </div>
        </div>

        <div>
          <button class="btn btn-sm btn-primary me-2" @click="changeTaskStatus(task)">
            <span v-html="!task.completed ? '<i class=\'bi bi-check\'></i>' : '<i class=\'bi bi-x-circle\'></i>'"></span>
          </button>
          <button class="btn btn-sm btn-warning me-2" @click="editTask(task)">
            <i class="bi bi-pen"></i>
          </button>
          <button class="btn btn-sm btn-dark" @click="deleteTask(task.id)">
            <i class="bi bi-trash"></i>
          </button>
        </div>
      </li>
    </ul>

    <div v-if="totalPages > 1" class="mt-3">
      <nav aria-label="Page navigation">
        <ul class="pagination">
          <li class="page-item" :class="{ disabled: currentPage === 1 }">
            <button class="page-link" @click="prevPage" :disabled="currentPage === 1">&laquo;</button>
          </li>

          <li v-for="page in totalPages" :key="page" class="page-item" :class="{ active: page === currentPage }">
            <button class="page-link" @click="goToPage(page)">{{ page }}</button>
          </li>

          <li class="page-item" :class="{ disabled: currentPage === totalPages }">
            <button class="page-link" @click="nextPage" :disabled="currentPage === totalPages">&raquo;</button>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tasks: [],
      users: [],
      sortBy: 'priority',
      sortDueDateDesc: true,
      sortPriorityDesc: true,
      hideCompleted: false,
      searchQuery: '',
      itemsPerPage: 10,
      currentPage: 1,
    };
  },
  mounted() {
    this.fetchTasks();
    this.fetchUsers();
  },
  computed: {
    filteredAndSortedTasks() {
      let filteredTasks = this.hideCompleted ? this.tasks.filter(task => !task.completed) : this.tasks;

      if (this.searchQuery) {
        const lowerCaseQuery = this.searchQuery.toLowerCase();
        filteredTasks = filteredTasks.filter(task =>
            task.title.toLowerCase().includes(lowerCaseQuery) ||
            this.getUserById(task.user_id).toLowerCase().includes(lowerCaseQuery)
        );
      }

      return this.sortTasks(filteredTasks);
    },
    paginatedTasks() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.filteredAndSortedTasks.slice(startIndex, endIndex);
    },
    totalPages() {
      return Math.ceil(this.filteredAndSortedTasks.length / this.itemsPerPage);
    },
  },
  methods: {
    goToPage(page) {
      this.currentPage = page;
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    toggleHideCompleted() {
      this.hideCompleted = !this.hideCompleted;
    },
    clearFilters() {
      this.sortDueDateDesc = true;
      this.sortPriorityDesc = true;
      this.sortBy = null;
      this.searchQuery = '';
    },
    sortByDueDate() {
      this.sortBy = 'dueDate';
      this.sortPriorityDesc = false;
      this.sortDueDateDesc = !this.sortDueDateDesc;
    },
    sortByPriority() {
      this.sortBy = 'priority';
      this.sortDueDateDesc = true;
      this.sortPriorityDesc = !this.sortPriorityDesc;
    },
    sortTasks(tasks) {
      const compareFunction = (a, b, desc) => (desc ? b - a : a - b);

      return tasks.sort((task1, task2) => {
        if (this.sortBy === 'dueDate') {
          return compareFunction(new Date(task1.due_date), new Date(task2.due_date), this.sortDueDateDesc);
        } else {
          return compareFunction(task1.priority, task2.priority, this.sortPriorityDesc);
        }
      });
    },
    taskRowClass(task) {
      if (task.completed) {
        return 'bg-success';
      } else if (task.priority === 1) {
        return 'bg-warning';
      } else if (task.priority === 2) {
        return 'bg-danger';
      } else {
        return ''; // White for priority 0
      }
    },
    async fetchTasks() {
      try {
        const response = await this.axios.get('/tasks');
        this.tasks = response.data;
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    },
    async fetchUsers() {
      try {
        const response = await this.axios.get('/users');
        this.users = response.data;
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    },
    async changeTaskStatus(task) {
      try {
        await this.axios.post(`/tasks/${task.id}`, { completed: !task.completed });
        await this.fetchTasks();
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    },
    getUserById(userId) {
      const user = this.users.find(u => u.id === userId);
      return user ? user.username : 'Not set';
    },
    createTask() {
      this.$router.push({ name: 'newTask' });
    },
    editTask(task) {
      this.$router.push({ name: 'editTask', params: { id: task.id } });
    },
    async deleteTask(taskId) {
      try {
        await this.axios.delete(`/tasks/${taskId}`);
        await this.fetchTasks();
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    },
  },
};
</script>