const db = require('../config/db');

exports.users = async (req, res) => {
    try {
        const users = await db.promise().query('SELECT id, email, username FROM users');
        res.json(users[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const userId = req.params.id;
        await db.promise().query(
            'UPDATE tasks SET username=?, email=?, password=? WHERE id=?',
            [username, email, password, userId]
        );

        res.json({ message: 'User updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        await db.promise().query('DELETE FROM users WHERE id=?', [userId]);

        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};