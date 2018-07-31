import * as React from 'react';
import { Table, Button } from 'react-bootstrap'
import { IBook } from '../../../../../../shared/dto/ibook'
import { ViewBookSearchOption } from './viewBookSearchOption'

enum ViewBookSearchType {
  String,
  Number,
  Bool
}

type BookSearchDetail = {
  shortName: keyof IBook, descName: string, type: ViewBookSearchType
}

const BookSearchField: BookSearchDetail[] = [
  { shortName: 'title', descName: 'Title', type: ViewBookSearchType.String }, // str
  { shortName: 'authors', descName: 'Authors', type: ViewBookSearchType.String }, // str
  { shortName: 'bookSeriesNumber', descName: 'Book Series Number', type: ViewBookSearchType.String }, // num
  { shortName: 'categories', descName: 'Categories', type: ViewBookSearchType.String }, // str
  { shortName: 'description', descName: 'Description', type: ViewBookSearchType.String }, // str
  { shortName: 'isbn', descName: 'ISBN', type: ViewBookSearchType.String }, // str
  { shortName: 'isFiction', descName: 'Fiction?', type: ViewBookSearchType.String }, // bool
  { shortName: 'libraryIdentifier', descName: 'Identifier', type: ViewBookSearchType.String }, // str
  { shortName: 'yearPublished', descName: 'Year Published', type: ViewBookSearchType.String } // num
]

export const BookFieldNames = BookSearchField.map(d => d.shortName);

type ViewBookSearchOptionlistState = {
  bookSearchFieldList: (BookSearchDetail & { curValue: string })[]
}

export class ViewBookSearchOptions extends React.Component<{}, ViewBookSearchOptionlistState> {

  constructor(props) {
    super(props);
    this.state = { bookSearchFieldList: [] }
  }

  getSearchOptionFields = (currentField: string) => {
    this.state.bookSearchFieldList
  }


  render() {
    return <div>

      <Table condensed bordered striped>
        <thead>
          <tr>
            <th className={"col-xs-4"}>Field</th>
            <th className={"col-xs-6"}>Value</th>
            <th className={"col-xs-2"}><Button block>Add</Button></th>
          </tr>
        </thead>
        <tbody>
          {
            this.state.bookSearchFieldList.map(opt => {
              return <ViewBookSearchOption
                field={opt.shortName}
                allFields={[]}
              />
            })
          }
        </tbody>
      </Table>
    </div>

  }
}