import * as React from 'react';
import { Table, Button } from 'react-bootstrap'
import { IBook } from '../../../../../shared/dto/ibook'

const BookFieldNames: (keyof IBook)[] = [
  "authors",
  "bookSeriesNumber",
  "categories",
  "description",
  "isbn",
  "isFiction",
  "libraryIdentifier",
  "title",
  "yearPublished"
]

const BookFieldDescriptiveNames: { [key in keyof IBook]: string } = {
  title: 'Title', // str
  authors: 'Authors', // str
  bookSeriesNumber: 'Book Series Number', // num
  categories: 'Categories', // str
  description: 'Description', // str
  isbn: 'ISBN', // str
  isFiction: 'Fiction?', // bool
  libraryIdentifier: 'Identifier', // str
  yearPublished: 'Year Published' // num

}

class ViewBookSearchOption extends React.Component {

}

type ViewBookSearchOptionlistProps = {

}

export class ViewBookSearchOptionlist extends React.Component {

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
              <select>
                {
                  BookFieldNames.map(name => {
                    return <option>{BookFieldDescriptiveNames[name]}</option>
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