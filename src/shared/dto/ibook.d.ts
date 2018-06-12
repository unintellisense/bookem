export interface IBook {
  title: string
  isFiction: boolean
  isbn: string
  authors: string
  description: string
  libraryIdentifier: string
  bookSeriesNumber: number | null
  yearPublished: number | null
  categories: string[]
} 