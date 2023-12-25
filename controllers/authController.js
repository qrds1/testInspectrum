const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

function generateToken(userId) {
    const payload = { userId };
    const secret = config.secret;
    const options = { expiresIn: '1h' };

    return jwt.sign(payload, secret, options);
}

exports.signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const [existingUser] = await db.promise().query('SELECT * FROM users WHERE username=? OR email=?', [username, email]);

        if (existingUser.length > 0) {
            return res.status(400).json({ error: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await db.promise().query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hashedPassword]);

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const [result] = await db.promise().query('SELECT * FROM users WHERE username=?', [username]);
        const user = result[0];

        if (!user) {
            res.status(401).json({ error: 'Invalid credentials' });
            return;
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            res.status(401).json({ error: 'Invalid credentials' });
            return;
        }

        const token = generateToken(user.id);

        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};