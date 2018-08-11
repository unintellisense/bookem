import { IBook } from '../../shared/dto/ibook'

export enum ViewBookSearchType {
  String = 0,
  Number = 1,
  Bool = 2
}

//defines a specific entity to search against, i.e
// a given field
export type BookSearchDetailNoType = { shortName: keyof IBook, descName: string }

type BookDetailString = { type: ViewBookSearchType.String }
type BookDetailNumber = { type: ViewBookSearchType.Number }
type BookDetailBool = { type: ViewBookSearchType.Bool }

type AllDetailTypes = BookDetailString | BookDetailNumber | BookDetailBool

export type BookSearchDetail = BookSearchDetailNoType & AllDetailTypes

// defines a specific search option selected,
// meaning a given field and the user inputed value to search against

type OptionStringType = BookDetailString & { curValue: string }
type OptionNumberType = BookDetailNumber & { curValue: string }
type OptionBoolType = BookDetailBool & { curValue: boolean }

type AllOptionType = OptionStringType | OptionNumberType | OptionBoolType

export type BookSearchDetailOption = BookSearchDetail & AllOptionType