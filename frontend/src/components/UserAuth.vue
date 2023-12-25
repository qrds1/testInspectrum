<template>
  <div class="auth-container">
    <form @submit.prevent="submitForm" class="auth-form">
      <div v-if="formType === 'signup'" class="mb-3">
        <label for="email" class="form-label">Email:</label>
        <input v-model="email" id="email" class="auth-input" required>
      </div>

      <label for="username" class="auth-label">Username:</label>
      <input v-model="username" id="loginUsername" class="auth-input" required>

      <label for="password" class="auth-label">Password:</label>
      <input v-model="password" type="password" id="loginPassword" class="auth-input" required>

      <div v-if="formType === 'signup'" class="mb-3">
        <label for="confirmPassword" class="form-label">Confirm Password:</label>
        <input type="password" v-model="confirmPassword" id="confirmPassword" class="auth-input" required>
      </div>

      <button type="submit" class="btn btn-primary auth-button me-2">{{ formType === 'login' ? 'Login' : 'Signup' }}</button>
      <button @click="toggleFormType" class="btn btn-primary auth-button me-2">{{ formType === 'login' ? 'Switch to Signup' : 'Switch to Login' }}</button>
    </form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      formType: 'login',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    };
  },
  methods: {
    async submitForm() {
      if (this.formType === 'signup') {
        try {
          if (this.password !== this.confirmPassword) {
            console.error('Passwords do not match');
            alert('Passwords do not match');
            return;
          }

          const response = await this.axios.post('/signup', {
            username: this.username,
            email: this.email,
            password: this.password,
          });
          console.log(response)
          this.formType = 'login'
        } catch (error) {
          console.error('Error during signup:', error);
          alert(error)
        }
      } else {
        try {
          const response = await this.axios.post('/login', {
            username: this.username,
            password: this.password,
          });

          const token = response.data.token;

          localStorage.setItem('token', token);

          this.$router.push('/tasks');
        } catch (error) {
          console.error('Error during login:', error);
        }
      }
    },
    toggleFormType() {
      this.formType = this.formType === 'login' ? 'signup' : 'login';
    },
  }
};
</script>
<style scoped>
.auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.auth-form {
  max-width: 300px;
  width: 100%;
}

.auth-label {
  display: block;
  margin-bottom: 4px;
}

.auth-input {
  width: 100%;
  padding: 8px;
  margin-bottom: 16px;
}

.auth-button {
  background-color: #007bff;
  color: #fff;
  padding: 10px;
  border: none;
  cursor: pointer;
}
</style>