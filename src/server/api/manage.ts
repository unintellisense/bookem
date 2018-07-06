import {
  Controller, Get, Render, Post,
  Authenticated, Required, BodyParams, PathParams,
  Delete, Request
} from "@tsed/common";
import * as Express from "express";
import Book from '../db/book'
import { NotFound } from 'ts-httpexceptions';
//import DtoBook from '../dto/dtoBook'

@Controller("/manage")
export class ManageController {

  @Get("/book")
  async getBook(req: Express.Request, res: Express.Response) {
    return await Book.query().select();
  }

  @Post("/book")
  async postBook(@Required() @BodyParams("book") book: Book) {

    let insertedBook = await Book.query().insert(book);
    return insertedBook;
  }

  @Post("/book/:id")
  async updateBookById(@PathParams('id') id: string, @Required() @BodyParams("book") book: Book) {

    console.log(`updated this book with id: ${id}`)
    return 'ok';
  }

  @Delete("/book/:id")
  async deleteBookById(@PathParams('id') id: string) {

    let delResult = await Book.query().delete().where('id', '=', id);
    if (delResult)
      return `deleted count: ${delResult}`;
    throw new NotFound('no records deleted.');
  }


}