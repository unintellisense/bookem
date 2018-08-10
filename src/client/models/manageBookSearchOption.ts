import { IBook } from '../../shared/dto/ibook'

export enum ViewBookSearchType {
  String,
  Number,
  Bool
}

//defines a specific entity to search against, i.e
// a given field
export type BookSearchDetail = {
  shortName: keyof IBook, descName: string, type: ViewBookSearchType
}

// defines a specific search option selected,
// meaning a given field and the user inputed value to search against
export type BookSearchDetailOption = BookSearchDetail & { curValue: string }