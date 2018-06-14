import * as React from 'react';
import { connect } from 'react-redux';
import {
  Form, FormGroup, Button, InputGroup, ControlLabel,
  FormControl, FormControlProps, CheckboxProps, Col
} from 'react-bootstrap'
import { BookCategoryTags } from './bookCategoryTags'
import { toastError, toastSuccess } from '../../../services/toastService';
import { BookLookupModal } from './addBookModal'
import { RouteComponentWrapper } from '../../index'
import { postBookAction, saveAddBookFieldsAction } from '../../../state/manage/addBook/action'
import { getBooksByIsbn } from '../../../services/googleBookService'
import { Book } from '../../../models/book'
import { AppState } from '../../../state'
import { SearchResultBook } from '../../../../shared/dto/googleBook';

type AddBooksProps = {
  postBook: (book: Book) => any
  saveBookFields: (book: Book) => any
  book: Book
}

type AddBooksState = {
  book: Book
  searchedBooks?: SearchResultBook[]
}

const defaultIsbnText = 'Enter a 10 digit or 13 digit isbn.';

const numberRegex = /^[0-9\-]*$/

class AddBookPage extends React.Component<AddBooksProps, AddBooksState> {

  constructor(props: AddBooksProps) {
    super(props);
    this.state = { book: props.book };
  }

  private handleIsbnSearchClick = async (isbn?: string) => {
    if (isbn && isbn.match(numberRegex)) {
      let isbnString = isbn.match(/\d/g)!.join(''); // strip out digits and join them back together
      let searchResult = await getBooksByIsbn(isbnString);
      if (searchResult.length) {
        // setting searchedBooks will open the modal
        this.setState({ ...this.state, searchedBooks: searchResult })
      } else {
        toastError('ISBN search failed', 'no results found.');
      }
    } else {
      toastError('Invalid ISBN number', 'Please enter numbers and dashes only.');
    }
  }

  private handleChangeForBook = (propName: keyof Book) => (e: React.FormEvent<FormControlProps>) => {
    this.setState({ ...this.state, book: { ...this.state.book, [propName]: e.currentTarget.value } });
  }

  private handleNumberChangeForBook = (propName: keyof Book) => (e: React.FormEvent<FormControlProps>) => {
    let value = Number.parseInt(e.currentTarget.value as string);
    this.setState({ ...this.state, book: { ...this.state.book, [propName]: value } });
  }

  private handleBooleanSelectForBook = (propName: keyof Book) => (e: React.FormEvent<CheckboxProps>) => {
    this.setState({ ...this.state, book: { ...this.state.book, [propName]: e.currentTarget.value === 'true' } });
  }

  private handleCategoriesUpdateForBook = (tags: string[]) => {
    this.setState({ ...this.state, book: { ...this.state.book, categories: tags } })
  }

  public componentWillUnmount() {
    this.props.saveBookFields(this.state.book);
  }

  public componentWillReceiveProps(nextProps) {
    this.setState({ ...this.state, book: nextProps.book });
  }

  private clearSearchedBooks = () => {
    this.setState({ ...this.state, searchedBooks: undefined });
  }

  private clearBookInputs = () => {
    this.setState({ ...this.state, book: Book.GetDefaultBook() });
  }

  private applyBookState = (searchedBook: SearchResultBook) => {
    let newBook: Book = {
      title: searchedBook.title,
      description: searchedBook.description,
      authors: searchedBook.authors,
      yearPublished: searchedBook.yearPublished,
      categories: searchedBook.categories,
      bookSeriesNumber: this.state.book.bookSeriesNumber, // preserve
      libraryIdentifier: this.state.book.libraryIdentifier, // preserve
      isbn: this.state.book.isbn, // preserve
      isFiction: this.state.book.isFiction // not sure how to calculate this from API, preserve
    }
    this.setState({ ...this.state, book: newBook, searchedBooks: undefined });
  }

  render() {
    return (
      <Form horizontal className="container-fluid" onSubmit={(e) => { e.preventDefault(); this.props.postBook(this.state.book) }}>

        <Col sm={12} >
          <InputGroup>
            <InputGroup.Addon>Isbn</InputGroup.Addon>
            <FormControl type="text" value={this.state.book.isbn} placeholder={defaultIsbnText} onChange={this.handleChangeForBook('isbn')} />
            <InputGroup.Button>
              <Button onClick={(e) => { this.handleIsbnSearchClick(this.state.book.isbn) }}>Search</Button>
            </InputGroup.Button>
          </InputGroup>
        </Col>


        <Col sm={12} >
          <ControlLabel>Title</ControlLabel>
          <FormControl type="text" value={this.state.book.title} placeholder="Enter title" onChange={this.handleChangeForBook('title')} />
        </Col>


        <Col sm={2} className='mobile-vert-spacing' >
          <ControlLabel>Fiction?</ControlLabel>
          <FormControl componentClass="select" value={this.state.book.isFiction ? 'true' : 'false'} onChange={this.handleBooleanSelectForBook('isFiction')}>
            <option value={'false'}>Non Fiction</option>
            <option value={'true'}>Fiction</option>
          </FormControl>
        </Col>

        <Col sm={8} className='mobile-vert-spacing' >
          <ControlLabel>Authors</ControlLabel>
          <FormControl type="text" value={this.state.book.authors} onChange={this.handleChangeForBook('authors')} />
        </Col>

        <Col sm={2} className='mobile-vert-spacing' >
          <ControlLabel>Year Published</ControlLabel>
          <FormControl type="number" value={this.state.book.yearPublished || ''} onChange={this.handleNumberChangeForBook('yearPublished')} />
        </Col>

        <Col sm={3} className='mobile-vert-spacing' >
          <ControlLabel>Library Id</ControlLabel>
          <FormControl type="text" value={this.state.book.libraryIdentifier} onChange={this.handleChangeForBook('libraryIdentifier')} />
        </Col>

        <Col sm={3} className='mobile-vert-spacing' >
          <ControlLabel>Book Series Number</ControlLabel>
          <FormControl type="number" value={this.state.book.bookSeriesNumber || ''} onChange={this.handleNumberChangeForBook('bookSeriesNumber')} />
        </Col>

        <Col md={6} >
          <ControlLabel>Categories</ControlLabel>
          <BookCategoryTags
            tags={this.state.book.categories}
            updateTags={this.handleCategoriesUpdateForBook} />
        </Col>

        <Col sm={12}>
          <ControlLabel>Description</ControlLabel>
          <FormControl componentClass="textarea" rows={3} value={this.state.book.description} placeholder="Enter Description" onChange={this.handleChangeForBook('description')} />
        </Col>

        <Col md={9} className='mobile-vert-spacing' >
          <Button block type="submit">Submit</Button>
        </Col>
        <Col mdOffset={1} md={2} className='mobile-vert-spacing'>
          <Button block type="button" onClick={this.clearBookInputs}>Reset</Button>
        </Col>

        <BookLookupModal onClose={this.clearSearchedBooks} searchedBooks={this.state.searchedBooks} applyBook={this.applyBookState} />
      </Form >
    )
  }

}

const mapStateToProps = (state: AppState) => ({
  book: state.manage.addBook.book
})

const mapDispatchToProps = (dispatch) => ({
  postBook: (book: Book) => dispatch(postBookAction(book)),
  saveBookFields: (book: Book) => dispatch(saveAddBookFieldsAction(book))
});

const connectedAddBookPage = connect(mapStateToProps, mapDispatchToProps)(AddBookPage);

const wrapper: RouteComponentWrapper = {
  component: connectedAddBookPage,
  routeLabel: 'Add Books',
  routePath: 'addBooks'
}

export default wrapper;