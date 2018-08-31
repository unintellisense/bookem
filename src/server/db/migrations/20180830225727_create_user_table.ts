import * as Knex from "knex";

exports.up = function (knex: Knex): PromiseLike<any> {
  return knex.schema.createTable('user', table => {
    // unique autoincrementing id
    table.increments('id').primary().unique();

    table.string('firstName').notNullable();
    table.string('lastName').notNullable();
    table.string('email').notNullable();

    table.string('externalIdentifier').notNullable();
    table.string('externalProvider').notNullable();

    table.date('creationDate').notNullable();
    table.dateTime('lastLogin').notNullable();

    table.boolean('enabled').notNullable();
    table.enum('type', ['user', 'admin']);
  });
};

exports.down = function (knex: Knex): PromiseLike<any> {
  return knex.schema.dropTable('user');
};
