import {
  Controller, Get, Render, Post,
  Authenticated, Required, BodyParams,
  Delete
} from "@tsed/common";
import * as Express from "express";
import Book from '../db/book'

@Controller("/manage")
export class ManageController {

  @Get("/book")
  async getBook(req: Express.Request, res: Express.Response) {
    res.send('GET BOOK');
  }

  @Post("/book")
  async postBook(req: Express.Request, res: Express.Response) {

    // let newBook: Book = {
    //   title: req.query.title,
    //   isbn: req.query.isbn

    // }
    // let book = Book.query()
    //   .insert({
    //     isbn: ''
    //   })

    res.send('POST BOOK');
  }


}