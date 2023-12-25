const faker = require('faker');
const bcrypt = require('bcrypt');

/**
 * @param { import("knex").Knex } knex
 * @returns {Knex.SchemaBuilder}
 */
exports.up = function(knex) {
    return knex.schema.createTable('users', function (table) {
        table.increments('id').primary();
        table.string('username').notNullable();
        table.string('email').notNullable().unique();
        table.string('password').notNullable();
        table.timestamps(true, true);
    }).then(async function () {
        const users = Array.from({ length: 5 }, () => {
            const email = faker.internet.email();
            const password = bcrypt.hashSync(faker.internet.password(), 10);
            return {
                username: faker.internet.userName(),
                email,
                password,
            };
        });
        await knex('users').insert(users);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns {Knex.SchemaBuilder}
 */
exports.down = function(knex) {
    return knex.schema.dropTable('users');
};
