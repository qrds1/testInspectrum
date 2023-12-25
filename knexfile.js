const config = require('./config/config');

module.exports = {
    client: 'mysql2',
    connection: config.mysql,
    migrations: {
        tableName: 'knex_migrations',
        directory: './migrations',
    }
};