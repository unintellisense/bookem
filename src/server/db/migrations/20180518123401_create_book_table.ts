import * as Knex from "knex";

exports.up = function (knex: Knex): PromiseLike<any> {
  return knex.schema.createTable('book', table => {
    // unique autoincrementing id
    table.increments('id').primary().unique();
    //required fields
    table.string('title').notNullable();
    table.boolean('isFiction').notNullable();
    // optional
    table.string('isbn');
    table.json('authors');
    table.string('description');
    table.string('location');
    table.string('libraryIdentifier');
    table.integer('bookNumber');
    table.integer('yearPublished');
    table.json('keyWords');
    table.string('category');
  });
};

exports.down = function (knex: Knex): PromiseLike<any> {
  return knex.schema.dropTable('book');
};
