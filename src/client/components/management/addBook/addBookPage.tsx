import * as React from 'react';
import { connect } from 'react-redux';
import { Form, Col, Button } from 'react-bootstrap'
import { RouteItem } from '../../../route'
import { postBookAction, saveAddBookFieldsAction, saveAddBookPartialTagAction } from '../../../state/manage/addBook/action'
import { Book } from '../../../models/book'
import { AppState } from '../../../state'
import { SearchResultBook } from '../../../../shared/dto/googleBook';
import { BookDetail } from '../common/bookDetail'
import { AddBookModal } from './addBookModal';

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

class AddBookPage extends React.Component<AddBooksProps, AddBooksState> {

  constructor(props: AddBooksProps) {
    super(props);
    this.state = {};
  }

  handleSubmit = (e: React.FormEvent<any>) => {
    e.preventDefault();

    let categories = this.props.book.categories;
    // add any pending categories to the existing book categories, unless it exists
    if (this.props.partialCategoryTag && categories.indexOf(this.props.partialCategoryTag) == -1) {
      if (this.props.partialCategoryTag) categories.push(this.props.partialCategoryTag);
    }
    this.props.postBook({ ...this.props.book, categories });
  }

  private updatePartialCategoryTag = (partialCategoryTag: string) => {
    this.props.updatePartialCategoryTag(partialCategoryTag);
  }

  private updateBook = (book: Book) => {
    this.props.updateBookFields(book);
  }

  private clearBookInputs = () => {
    this.updateBook(Book.GetDefaultBook());
    this.updatePartialCategoryTag('');
  }

  private applyBookState = (searchedBook: SearchResultBook) => {
    let newBook: Book = {
      title: searchedBook.title || '',
      description: searchedBook.description || '',
      authors: searchedBook.authors || '',
      yearPublished: searchedBook.yearPublished,
      categories: searchedBook.categories || [],
      bookSeriesNumber: this.props.book.bookSeriesNumber, // preserve
      libraryIdentifier: this.props.book.libraryIdentifier, // preserve
      isbn: this.props.book.isbn, // preserve
      isFiction: this.props.book.isFiction // not sure how to calculate this from API, preserve
    }
    this.updateBook(newBook);
    this.setState({ searchedBooks: [] });
  }

  private updateSearchedBooks = (searchedBooks: SearchResultBook[]) => {
    this.setState({ ...this.state, searchedBooks: searchedBooks })
  }

  private clearSearchedBooks = () => {
    this.setState({ ...this.state, searchedBooks: undefined });
  }

  render() {
    return (
      <Form horizontal className="container-fluid" onSubmit={this.handleSubmit}>
        <BookDetail
          book={this.props.book}
          partialCategoryTag={this.props.partialCategoryTag}
          bookUpdated={this.updateBook}
          partialCategoryTagUpdated={this.updatePartialCategoryTag}
          updateSearchedBooks={this.updateSearchedBooks}
        />
        <div>
          <Col md={9} className='mobile-vert-spacing' >
            <Button block type="submit">Submit</Button>
          </Col>
          <Col mdOffset={1} md={2} className='mobile-vert-spacing'>
            <Button block type="button" onClick={this.clearBookInputs}>Reset</Button>
          </Col>
        </div>
        <AddBookModal onClose={this.clearSearchedBooks} searchedBooks={this.state.searchedBooks} applyBook={this.applyBookState} />
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

const routeItem = new RouteItem('Add Books', 'addBooks', connectedAddBookPage);

export default routeItem;