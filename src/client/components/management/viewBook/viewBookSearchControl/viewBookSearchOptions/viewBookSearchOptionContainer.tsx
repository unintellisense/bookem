import * as React from 'react';
import { Table, Button } from 'react-bootstrap'
import { IBook } from '../../../../../../shared/dto/ibook'
import { ViewBookSearchOption } from './viewBookSearchOption'

enum ViewBookSearchType {
  String,
  Number,
  Bool
}

export type BookSearchDetail = {
  shortName: keyof IBook, descName: string, type: ViewBookSearchType
}

type BookSearchDetailOption = BookSearchDetail & { curValue: string }

const BookSearchFields: BookSearchDetail[] = [
  { shortName: 'title', descName: 'Title', type: ViewBookSearchType.String }, // str
  { shortName: 'authors', descName: 'Authors', type: ViewBookSearchType.String }, // str
  { shortName: 'bookSeriesNumber', descName: 'Book Series #', type: ViewBookSearchType.String }, // num
  { shortName: 'categories', descName: 'Categories', type: ViewBookSearchType.String }, // str
  { shortName: 'description', descName: 'Description', type: ViewBookSearchType.String }, // str
  { shortName: 'isbn', descName: 'ISBN', type: ViewBookSearchType.String }, // str
  { shortName: 'isFiction', descName: 'Fiction?', type: ViewBookSearchType.String }, // bool
  { shortName: 'libraryIdentifier', descName: 'Identifier', type: ViewBookSearchType.String }, // str
  { shortName: 'yearPublished', descName: 'Year Published', type: ViewBookSearchType.String } // num
]

type ViewBookSearchOptionlistState = {
  bookSearchFieldList: BookSearchDetailOption[]
}

export class ViewBookSearchOptions extends React.Component<{}, ViewBookSearchOptionlistState> {

  constructor(props) {
    super(props);
    this.state = { bookSearchFieldList: [] }
  }

  addSearchOption = () => {
    // get first available field
    var newOption = { ...this.getSearchOptionFields()[0], curValue: '' };
    let newList = this.state.bookSearchFieldList.concat([newOption]);
    this.setState({ ...this.state, bookSearchFieldList: newList });
  }

  removeSearchOption = (idx: number) => {
    let newList = [...this.state.bookSearchFieldList];
    newList.splice(idx, 1);
    this.setState({ ...this.state, bookSearchFieldList: newList });
  }

  changeSearchOptionField = (newFieldName: string, idx: number) => {
    var newSearchList = [...this.state.bookSearchFieldList];
    var newOpt = BookSearchFields.find(field => field.shortName === newFieldName);
    if (!newOpt) return;
    newSearchList[idx] = { ...newOpt, curValue: '' };
    this.setState({ ...this.state, bookSearchFieldList: newSearchList })
  }

  getSearchOptionFields = (currentFieldName?: string) => {
    return BookSearchFields.filter(field => {
      return field.shortName === currentFieldName || // always return current field
        !this.state.bookSearchFieldList.some(listField => listField.shortName === field.shortName) // and any fields not being used
    })
  }

  render() {
    return <div>

      <Table condensed bordered striped>
        <thead>
          <tr>
            <th className={"col-xs-4"}>Field</th>
            <th className={"col-xs-6"}>Value</th>
            <th className={"col-xs-2"}><Button block onClick={this.addSearchOption} disabled={this.state.bookSearchFieldList.length === BookSearchFields.length}>Add</Button></th>
          </tr>
        </thead>
        <tbody>
          {
            this.state.bookSearchFieldList.map((opt, idx) => {
              return <ViewBookSearchOption
                key={opt.shortName}
                field={opt.shortName}
                allFields={this.getSearchOptionFields(opt.shortName)}
                onChangeValue={this.changeSearchOptionField}
                onRemove={this.removeSearchOption}
                idx={idx}
              />
            })
          }
        </tbody>
      </Table>
    </div>

  }
}