import * as React from 'react';
import { connect } from 'react-redux';
import { Form } from 'react-bootstrap'
import { RouteComponentWrapper } from '../../index'
import { postBookAction, saveAddBookFieldsAction, saveAddBookPartialTagAction } from '../../../state/manage/addBook/action'
import { Book } from '../../../models/book'
import { AppState } from '../../../state'
import { SearchResultBook } from '../../../../shared/dto/googleBook';
import { BookDetail } from './bookDetail'

type AddBooksProps = {
  postBook: (book: Book) => any
  book: Book
  updateBookFields: (book: Book) => any
  partialCategoryTag: string
  updatePartialCategoryTag: (partial: string) => any
}

type AddBooksState = {
  searchedBooks?: SearchResultBook[]
}

const numberRegex = /^[0-9\-]*$/

class AddBookPage extends React.Component<AddBooksProps, AddBooksState> {

  handleSubmit = (e: React.FormEvent<any>) => {
    e.preventDefault();

    let categories = this.props.book.categories;
    // add any pending categories to the existing book categories
    if (this.props.partialCategoryTag) categories.push(this.props.partialCategoryTag);

    this.props.postBook({ ...this.props.book, categories });
  }

  private updatePartialCategoryTag = (partialCategoryTag: string) => {
    this.props.updatePartialCategoryTag(partialCategoryTag);
  }

  private updateBook = (book: Book) => {
    this.props.updateBookFields(book);
  }

  render() {
    return (
      <Form horizontal className="container-fluid" onSubmit={this.handleSubmit}>
        <BookDetail
          book={this.props.book}
          bookUpdated={this.updateBook}
          partialCategoryTag={this.props.partialCategoryTag}
          partialCategoryTagUpdated={this.updatePartialCategoryTag}
        />
      </Form >
    )
  }
}

const mapStateToProps = (state: AppState) => ({
  book: state.manage.addBook.book,
  partialCategoryTag: state.manage.addBook.partialCategoryTag
})

const mapDispatchToProps = (dispatch) => ({
  postBook: (book: Book) => dispatch(postBookAction(book)),
  updateBookFields: (book: Book) => dispatch(saveAddBookFieldsAction(book)),
  updatePartialCategoryTag: (partial: string) => dispatch(saveAddBookPartialTagAction(partial))
});

const connectedAddBookPage = connect(mapStateToProps, mapDispatchToProps)(AddBookPage);

const wrapper: RouteComponentWrapper = {
  component: connectedAddBookPage,
  routeLabel: 'Add Books',
  routePath: 'addBooks'
}

export default wrapper;