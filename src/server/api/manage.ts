import {
  Controller, Get, Post,
  Required, BodyParams, PathParams,
  Delete, QueryParams, Authenticated
} from "@tsed/common";
import * as qs from 'qs';
import Book from '../db/book'
import { NotFound } from 'ts-httpexceptions';
//import DtoBook from '../dto/dtoBook'

@Controller("/manage")
export class ManageController {

  @Get("/book")
  @Authenticated({ role: 'admin' })
  async getBook(@QueryParams('page') page?: number, @QueryParams('count') count?: number, @QueryParams('qry') qryStr?: string) {

    let qry = Book.query();
    if (qryStr) {
      let qryObj = qs.parse(qryStr);
      for (let field in qryObj) {
        let val = qryObj[field];
        if (field === 'isFiction') // convert isFiction to boolean
          val = (val === 'true');
        qry = qry.where(field, 'like', `%${val}%`);
      }
    }
    return await qry
      .page(page, count)
      .select();
  }

  @Post("/book")
  async postBook(@Required() @BodyParams("book") book: Book) {

    let insertedBook = await Book.query().insert(book);
    return insertedBook;
  }

  @Post("/book/:id")
  async updateBookById(@PathParams('id') id: string, @Required() @BodyParams("book") book: Book) {
    let updatedBook = await Book.query().updateAndFetchById(id, book);
    return updatedBook;
  }

  @Delete("/book/:id")
  async deleteBookById(@PathParams('id') id: string) {

    let delResult = await Book.query().delete().where('id', '=', id);
    if (delResult)
      return `deleted count: ${delResult}`;
    throw new NotFound('no records deleted.');
  }


}