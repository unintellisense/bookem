import {
  Controller, Get, Render, Post,
  Authenticated, Required, BodyParams,
  Delete, Request
} from "@tsed/common";
import * as Express from "express";
import Book from '../db/book'
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


}