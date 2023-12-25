<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <router-link class="navbar-brand" v-if="isLoggedIn" to="/tasks">Task Manager</router-link>

        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item" v-if="!isLoggedIn">
              <router-link class="nav-link" to="/">Login</router-link>
            </li>
            <li class="nav-item" v-if="isLoggedIn">
              <button class="btn btn-link nav-link" @click="logout">Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>


<script>
export default {
  data() {
    return {
      isLoggedIn: false,
    };
  },
  mounted() {
    this.isLoggedIn = !!localStorage.getItem('token');
  },
  methods: {
    logout() {
      localStorage.removeItem('token');
      this.isLoggedIn = false;
      this.$router.push('/');
    },
  },
};
</script>

<style scoped>
header {
  margin-bottom: 20px;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1000;
}

.navbar-brand {
  font-size: 1.5rem;
  font-weight: bold;
}

.navbar-nav .nav-item {
  margin-right: 15px;
}
</style>