import * as React from 'react'
import { Table, Button } from 'react-bootstrap'
import Modal from 'react-responsive-modal';
import { SearchResultBook } from '../../../../shared/dto/googleBook'
import ModalStyle from '../../common/modalStyle'

const TextTruncate = require('react-text-truncate');

type BookLookupModalProps = {
  onClose: () => void
  searchedBooks?: SearchResultBook[]
  applyBook: (searchedBook: SearchResultBook) => void
}

export class AddBookModal extends React.Component<BookLookupModalProps> {

  render() {
    return (
      <Modal open={!!(this.props.searchedBooks && this.props.searchedBooks.length)} onClose={this.props.onClose} styles={ModalStyle}>
        <h2>Select the book to apply or return</h2>
        {
          /** need to modify custom.css if adding more columns */
          <div className="well">
            <Table bordered className='books-modal-table'>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Description</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {
                  this.props.searchedBooks && this.props.searchedBooks.map((book, idx) => {
                    return (
                      <tr key={idx}>
                        <td>
                          <TextTruncate
                            line={4}
                            truncateText="…"
                            text={book.title}
                          /></td>
                        <td>
                          <TextTruncate
                            line={4}
                            truncateText="…"
                            text={book.description}
                          /></td>
                        <td>
                          <Button onClick={() => { this.props.applyBook(book) }}>Apply</Button>
                        </td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </Table>
          </div>
        }
      </Modal>
    )
  }
}