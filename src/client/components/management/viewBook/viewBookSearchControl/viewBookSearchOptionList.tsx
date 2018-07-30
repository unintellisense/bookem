import * as React from 'react';
import { Table, Button } from 'react-bootstrap'
import { IBook } from '../../../../../shared/dto/ibook'

enum ViewBookSearchType {
  String,
  Number,
  Bool
}

const BookFieldDescriptiveNames: { [key in keyof IBook]: { descName: string, type: ViewBookSearchType } } = {
  title: { descName: 'Title', type: ViewBookSearchType.String }, // str
  authors: { descName: 'Authors', type: ViewBookSearchType.String }, // str
  bookSeriesNumber: { descName: 'Book Series Number', type: ViewBookSearchType.String }, // num
  categories: { descName: 'Categories', type: ViewBookSearchType.String }, // str
  description: { descName: 'Description', type: ViewBookSearchType.String }, // str
  isbn: { descName: 'ISBN', type: ViewBookSearchType.String }, // str
  isFiction: { descName: 'Fiction?', type: ViewBookSearchType.String }, // bool
  libraryIdentifier: { descName: 'Identifier', type: ViewBookSearchType.String }, // str
  yearPublished: { descName: 'Year Published', type: ViewBookSearchType.String } // num
}

const BookFieldNames = Object.keys(BookFieldDescriptiveNames) as (keyof IBook)[];

type ViewBookSearchOptionlistState = {

}

export class ViewBookSearchOptionlist extends React.Component<{}, ViewBookSearchOptionlistState> {



  
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
          <tr>
            <td className={"col-xs-4"}>
              <select >
                {
                  BookFieldNames.map(name => {
                    return <option>{BookFieldDescriptiveNames[name].descName}</option>
                  })
                }
              </select></td>
            <td className={"col-xs-6"}><text /></td>
            <td className={"col-xs-2"}><Button block>Remove</Button></td>
          </tr>
        </tbody>
      </Table>
    </div>

  }
}