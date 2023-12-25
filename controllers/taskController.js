const db = require('../config/db');

exports.getAllTasks = async (req, res) => {
    try {
        const tasks = await db.promise().query('SELECT * FROM tasks');
        res.json(tasks[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.createTask = async (req, res) => {
    try {
        const { title, description, dueDate, priority, userId, completed } = req.body;
        const result = await db.promise().query(
            'INSERT INTO tasks (title, description, due_date, priority, user_id, completed) VALUES (?, ?, ?, ?, ?, ?)',
            [title, description, dueDate, priority, userId, completed]
        );

        res.status(201).json({ taskId: result[0].insertId, message: 'Task created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.updateTask = async (req, res) => {
    try {
        const { title, description, dueDate, priority, userId, completed } = req.body;
        const taskId = req.params.id;
        await db.promise().query(
            'UPDATE tasks SET title=?, description=?, due_date=?, priority=?, user_id=?, completed=? WHERE id=?',
            [title, description, dueDate, priority, userId, completed, taskId]
        );

        res.json({ message: 'Task updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.changeTaskStatus = async (req, res) => {
    try {
        const { completed } = req.body;
        const taskId = req.params.id;
        await db.promise().query(
            'UPDATE tasks SET completed=? WHERE id=?',
            [completed, taskId]
        );

        res.json({ message: 'Task updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.deleteTask = async (req, res) => {
    try {
        const taskId = req.params.id;
        await db.promise().query('DELETE FROM tasks WHERE id=?', [taskId]);

        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getTask = async (req, res) => {
    try {
        const taskId = req.params.id;
        const task = await db.promise().query('SELECT * FROM tasks WHERE id=?', [taskId]);
        res.json(task[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};