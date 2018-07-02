import * as React from 'react'
import { Table, Button } from 'react-bootstrap'
import { Book } from '../../../models/book'
import { BookDetail } from '../common/bookDetail'
import Modal from 'react-responsive-modal';

const TextTruncate = require('react-text-truncate');

type BookLookupModalProps = {
  onClose: () => void
  book?: Book
  updateBook: (book: Book) => void
  deleteBook: (book: Book) => void
}

export class BookLookupModal extends React.Component<BookLookupModalProps> {

  render() {
    return (
      <Modal open={!!(this.props.book)} onClose={this.props.onClose}>
        <h2>Select the book to apply or return</h2>
        {

          <div className="well">
            <BookDetail
              book={this.props.book || {}}
              bookUpdated={this.updateBook}
              updateSearchedBooks={this.updateSearchedBooks}
              
              partialCategoryTag={this.props.partialCategoryTag}              
              partialCategoryTagUpdated={this.updatePartialCategoryTag}              
            />
          </div>
        }
      </Modal>
    )
  }
}