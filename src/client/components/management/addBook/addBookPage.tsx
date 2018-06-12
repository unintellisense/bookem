import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';
import { Alert, Form, FormGroup, Button, InputGroup, ControlLabel, FormControl, FormControlProps, Checkbox, CheckboxProps, Col } from 'react-bootstrap'
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

  private handleCheckboxForBook = (propName: keyof Book) => (e: React.FormEvent<CheckboxProps>) => {
    this.setState({ ...this.state, book: { ...this.state.book, [propName]: e.currentTarget.checked } });
  }

  public componentWillUnmount() {
    this.props.saveBookFields(this.state.book);
  }

  public componentWillReceiveProps(nextProps) {
    this.state = { book: nextProps.book };
  }

  private clearSearchedBooks = () => {
    this.setState({ ...this.state, searchedBooks: undefined });
  }

  private clearBookInputs = () => {
    this.setState({ ...this.state, book: Book.GetDefaultBook() });
  }

  private applyBookState = (searchedBook: SearchResultBook) => {
    this.setState({ ...this.state, book: Book.GetDefaultBook(), searchedBooks: undefined });
  }

  render() {
    return (
      <Form horizontal className="container-fluid" onSubmit={(e) => { e.preventDefault(); this.props.postBook(this.state.book) }}>
        <FormGroup controlId="isbnInput" /** validationState={this.validateIsbnValue()} */>
          <InputGroup>
            <InputGroup.Addon>Isbn</InputGroup.Addon>
            <FormControl type="text" value={this.state.book.isbn} placeholder={defaultIsbnText} onChange={this.handleChangeForBook('isbn')} />
            <InputGroup.Button>
              <Button onClick={(e) => { this.handleIsbnSearchClick(this.state.book.isbn) }}>Search</Button>
            </InputGroup.Button>
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <ControlLabel>Title</ControlLabel>
          <FormControl type="text" value={this.state.book.title} placeholder="Enter title" onChange={this.handleChangeForBook('title')} />
        </FormGroup>
        <FormGroup>
          <ControlLabel>Fiction?</ControlLabel>
          <Checkbox checked={this.state.book.isFiction} onChange={this.handleCheckboxForBook('isFiction')} >Fiction?</Checkbox>
        </FormGroup>
        <FormGroup>
          <ControlLabel>Description</ControlLabel>
          <FormControl componentClass="textarea" value={this.state.book.description} placeholder="Enter Description" onChange={this.handleChangeForBook('description')} />
        </FormGroup>
        <FormGroup>
          <Col mdOffset={1} md={8} className='mobile-vert-spacing' >
            <Button block type="submit">Submit</Button>
          </Col>
          <Col mdOffset={1} md={2} className='mobile-vert-spacing'>
            <Button block type="button" onClick={this.clearBookInputs}>Reset</Button>
          </Col>
        </FormGroup>
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