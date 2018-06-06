import * as React from 'react'
import { Table, Button } from 'react-bootstrap'
import { SearchResultBook } from '../../../../shared/dto/googleBook'

declare const require: any;
const Modal = require('react-responsive-modal').default; // temp till typings are fixed

type BookLookupModalProps = {
  modalOpen: boolean
  onClose: Function
  searchedBooks: SearchResultBook[] | null

}

export class BookLookupModal extends React.Component<BookLookupModalProps> {

  private onCloseModal = () => {
    this.setState({ ...this.state, modalOpen: false });
  }

  render() {
    return (
      <Modal open={this.props.modalOpen} onClose={this.props.onClose} center>
        <h2>Select the book to apply, or cancel</h2>
        {
          <div className="well">
            <Table responsive>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th></th>
                </tr>
              </thead>
              {
                this.props.searchedBooks && this.props.searchedBooks.map((book, idx) => {
                  return (
                    <tr>
                      <td>{idx + 1}</td>
                      <td>{book.title}</td>
                      <td>{book.description && book.description.length > 80 ? book.description.substring(0, 80) : book.description}</td>
                      <td><Button>Apply</Button></td>
                    </tr>
                  )
                })
              }
            </Table>
          </div>
        }
      </Modal>
    )
  }
}