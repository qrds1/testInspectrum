# Task Management App

A simple web-based task management application built with Node.js and Vue.js.

## Description

This project is a task management application that allows users to create, read, update, and delete tasks. The backend is built with Node.js and uses MySQL to store tasks. The frontend is developed using Vue.js, providing a user-friendly interface for managing tasks.

## Features

- Create, read, update, and delete tasks.
- Task prioritization (low, medium, high).
- User-friendly interface with responsive design.
- Task sorting and filtering (by date, priority).
- Task search functionality.
- Pagination for task list.
- User authentication (signup, login).

## Requirements

- Node.js
- MySQL

## Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/qrds1/testInspectrum.git
    ```

2. **Navigate to the project directory:**
    ```bash
    cd testInspectrum
    ```

3. **Install dependencies for both the backend and frontend:**

    ```bash
    npm install
    knex migrate:latest
   
    cd frontend
    npm install
    ```

## Usage

1. **Start the backend server:**

    ```bash
    cd ../
    npm start
    ```

2. **Start the frontend development server:**

    ```bash
    cd frontend
    npm run serve
    ```

3. **Open your browser and go to [http://localhost:8080](http://localhost:8080) to access the task management app.**

## API Endpoints

### User Authentication

- `POST /api/login`: Log in user
- `POST /api/signup`: Sign up user

### User Management

- `GET /api/users`: Get all users
- `PUT /api/users/:id`: Update user
- `DELETE /api/users/:id`: Delete user

### Task Management

- `GET /api/tasks`: Get all tasks
- `POST /api/tasks`: Create a new task
- `PUT /api/tasks/:id`: Update an existing task
- `POST /api/tasks/:id`: Change status of a task
- `DELETE /api/tasks/:id`: Delete a task