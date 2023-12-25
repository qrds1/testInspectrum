const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config/config');
const cors = require('cors');
const taskRoutes = require('./routes/router');

const corsOptions = {
    origin: 'http://localhost:8080',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
};

const app = express();
const port = process.env.PORT || config.server.port;

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use('/api', taskRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});