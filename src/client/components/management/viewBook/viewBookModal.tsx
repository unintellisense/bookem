import * as React from 'react'
import { Table, Button } from 'react-bootstrap'
import { Book } from '../../../models/book'
import { BookDetail } from '../common/bookDetail'
import Modal from 'react-responsive-modal';

const TextTruncate = require('react-text-truncate');

type BookLookupModalProps = {
  onClose: () => void
  book: Book | null
  updateBook: (book: Book) => void
  deleteBook: (book: Book) => void
}

export class ViewBookModal extends React.Component<BookLookupModalProps> {

  render() {
    return (
      <Modal open={!!(this.props.book)} onClose={this.props.onClose}>
        <h2>Select the book to apply or return</h2>
        {

          <div className="well">
            <BookDetail
              book={this.props.book || {}}
              bookUpdated={this.props.updateBook}
              updateSearchedBooks={() => { }}
            />
          </div>
        }
      </Modal>
    )
  }
}