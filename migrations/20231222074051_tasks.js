const faker = require('faker');

/**
 * @param { import("knex").Knex } knex
 * @returns {Knex.SchemaBuilder}
 */
exports.up = function(knex) {
    return knex.schema.createTable('tasks', function (table) {
        table.increments('id').primary();
        table.string('title').notNullable();
        table.text('description');
        table.integer('user_id');
        table.integer('priority').defaultTo(0); // 0 - low, 1 - medium, 2 - high
        table.date('due_date');
        table.boolean('completed').defaultTo(false);
    }).then(async function () {
        const tasks = Array.from({ length: 10 }, () => ({
            title: faker.lorem.words(),
            description: faker.lorem.sentence(),
            due_date: faker.date.future(),
            priority: faker.datatype.number({ min: 0, max: 2 }),
            completed: faker.datatype.boolean(),
            user_id: faker.datatype.number({ min: 1, max: 5 }),
        }));
        await knex('tasks').insert(tasks);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns {Knex.SchemaBuilder}
 */
exports.down = function(knex) {
    return knex.schema.dropTable('tasks');
};
