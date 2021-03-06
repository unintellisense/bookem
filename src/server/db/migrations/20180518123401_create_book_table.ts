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
    table.string('authors');
    table.string('description');    
    table.string('libraryIdentifier');
    table.integer('bookSeriesNumber');
    table.integer('yearPublished');    
    table.json('categories');
  });
};

exports.down = function (knex: Knex): PromiseLike<any> {
  return knex.schema.dropTable('book');
};
