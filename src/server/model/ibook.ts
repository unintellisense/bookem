import { Property } from "@tsed/common";

export default class IBook {

  /** Title */
  @Property()
  title: string
  /** fiction or nonFiction */
  @Property()
  isFiction: boolean
  /** ISBN */
  isbn?: string
  /** Author */
  authors?: string[]
  /**description of the book */
  description?: string
  /** box #, shelf, etc */
  location?: string
  /** local identifier */
  libraryIdentifier?: string
  /** order of book in series */
  bookNumber?: number
  /** year the book was published */
  yearPublished?: number
  /** key word identifiers for this book */
  keyWords?: string[] | null
  /**category of this book */
  category?: string

}