import * as React from 'react'
import { Table, Button, Form, Col } from 'react-bootstrap'
import Modal from 'react-responsive-modal';
import { Book } from '../../../models/book'
import { BookDetail } from '../common/bookDetail'
import { ConfirmButton } from '../../common/confirmButton'
import ModalStyle from '../../common/modalStyle'

type BookLookupModalProps = {
  onClose: () => void
  book: Book | null
  updateLocalBook: (book: Book) => void
  updatePostBook: (book: Book) => void
  deleteBook: (book: Book) => void
  partialCategoryTag: BookDetail['props']['partialCategoryTag']
  partialCategoryTagUpdated: BookDetail['props']['partialCategoryTagUpdated']
}

export class ViewBookModal extends React.Component<BookLookupModalProps> {

  updatePostBook = (e: React.FormEvent<Form>) => {
    e.preventDefault();
    if (this.props.book) {
      let payload = { ...this.props.book };
      if (this.props.partialCategoryTag) {
        if ((payload.categories.indexOf(this.props.partialCategoryTag) == -1)) {
          payload.categories.push(this.props.partialCategoryTag);
        }
      }
      this.props.updatePostBook(payload);
    }
  }
  
  render() {
    return (
      <Modal open={!!(this.props.book)} onClose={this.props.onClose} styles={ModalStyle} >
        <Form horizontal className="container-fluid" onSubmit={this.updatePostBook}>
          <Col>
            <h2>Select the book to apply or return</h2>
          </Col>
          <BookDetail
            book={this.props.book || Book.GetDefaultBook()}
            bookUpdated={this.props.updateLocalBook}
            updateSearchedBooks={() => { }}
            partialCategoryTag={this.props.partialCategoryTag}
            partialCategoryTagUpdated={this.props.partialCategoryTagUpdated}
          />
          <Col md={9} className='mobile-vert-spacing' >
            <Button block type="submit">Save</Button>
          </Col>
          <ConfirmButton
            cancelLabel='Cancel'
            unconfirmedLabel='Delete'
            confirmedLabel='Confirm Delete'
            onConfirm={() => { if (this.props.book) this.props.deleteBook(this.props.book) }}
          />
        </Form>
      </Modal >
    )
  }
}