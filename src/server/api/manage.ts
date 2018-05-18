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
    res.send('GET BOOK');
  }

  @Post("/book")
  async postBook(@Required() @BodyParams("book") book: Book) {
    console.log(`title: ${book.title}`);
    console.log(`isFiction: ${book.isFiction}`)
    // let newBook: Book = {
    //   title: req.query.title,
    //   isbn: req.query.isbn

    // }
    // let book = Book.query()
    //   .insert({
    //     isbn: ''
    //   })
    return '!';

  }


}