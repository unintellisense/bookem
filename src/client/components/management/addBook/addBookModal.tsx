import * as React from 'react'
import { Table, Button } from 'react-bootstrap'
import { SearchResultBook } from '../../../../shared/dto/googleBook'
import Modal from 'react-responsive-modal';

declare const require: any;

type BookLookupModalProps = {
  onClose: () => void
  searchedBooks?: SearchResultBook[]
  applyBook: (searchedBook: SearchResultBook) => void
}

export class BookLookupModal extends React.Component<BookLookupModalProps> {

  private onCloseModal = () => {
    this.setState({ ...this.state, modalOpen: false });
  }

  render() {
    return (
      <Modal open={!!(this.props.searchedBooks && this.props.searchedBooks.length)} onClose={this.props.onClose} center>
        <h2>Select the book to apply or return</h2>
        {
          /** need to modify custom.css if adding more columns */
          <div className="well">
            <Table responsive className='books-modal-table'>
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
                      <tr key={idx}>
                        <td>{idx + 1}</td>
                        <td>{book.title}</td>
                        <td>{book.description}</td>
                        <td><Button onClick={() => { this.props.applyBook(book) }}>Apply</Button></td>
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