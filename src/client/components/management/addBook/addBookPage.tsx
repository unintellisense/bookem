import * as React from 'react'
import * as Redux from 'redux';
import { connect } from 'react-redux';
import { Alert, Form, FormGroup, Button, InputGroup, ControlLabel, FormControl, FormControlProps, Checkbox, CheckboxProps } from 'react-bootstrap'
import { toastr } from 'react-redux-toastr'

import { BookLookupModal } from './addBookModal'
import { RouteComponentWrapper } from '../../index'
import { postBookAction, saveAddBookFieldsAction } from '../../../state/manage/addBook/action'
import { getBooksByIsbn } from '../../../services/googleBookService'
import { IBook } from '../../../../shared/dto/ibook'
import { AppState } from '../../../state'
type AddBooksProps = {
  postBook: (book: IBook) => any
  saveBookFields: (book: IBook) => any
  book: IBook
}

type AddBooksState = {
  book: IBook
  isbnSearchModal: boolean
}

const defaultIsbnText = 'Enter a 10 digit or 13 digit isbn.';

const numberRegex = /^(\d+-?)+\d+$/

class AddBookPage extends React.Component<AddBooksProps, AddBooksState> {

  constructor(props: AddBooksProps) {
    super(props);
    this.state = { book: props.book, isbnSearchModal: false };
  }



  private handleIsbnSearchClick = async (isbn?: string) => {
    if (isbn && isbn.match(numberRegex)) {
      let isbnString = isbn.match(/\d/g)!.join(''); // strip out digits and join them back together
      let searchResult = await getBooksByIsbn(isbnString);
      console.log(`result size: ${searchResult.data.items ? searchResult.data.items.length : 0}`);
    } else {
      toastr.error('ISBN search failed', 'Please enter a ISBN number');
    }

  }

  private handleChangeForBook = (propName: keyof IBook) => (e: React.FormEvent<FormControlProps>) => {
    var baseState = { ...this.state };
    baseState.book[propName] = e.currentTarget.value as any;
    this.setState({ ...this.state, [propName]: e.currentTarget.value });
  }

  private handleCheckboxForBook = (propName: keyof IBook) => (e: React.FormEvent<CheckboxProps>) => {
    var baseState = { ...this.state };
    baseState.book[propName] = e.currentTarget.checked as any;
    this.setState({ ...this.state, [propName]: e.currentTarget.value });
  }

  // private validateIsbnValue() {
  //   const length = this.state.book && this.state.book.isbn && this.state.book.isbn.length ? this.state.book.isbn.length : 0;
  //   if (length == 10 || length == 13) return 'success';
  //   if (length > 0) return 'error';
  //   return null;
  // }

  public componentWillUnmount() {
    this.props.saveBookFields(this.state.book);
  }

  public componentWillReceiveProps(nextProps) {
    this.state = { book: nextProps.book, isbnSearchModal: false };
  }

  private onOpenModal = () => {
    this.setState({ ...this.state, isbnSearchModal: true });
  }

  private onCloseModal = () => {
    this.setState({ ...this.state, isbnSearchModal: false });
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
          <div className="well">
            <Button block type="submit">Submit</Button>
          </div>
        </FormGroup>
        <BookLookupModal modalOpen={this.state.isbnSearchModal} onClose={this.onCloseModal} searchedBooks={[{ title: 'some book', description: 'really exciting stuff!!!!really exciting stuff!!!!really exciting stuff!!!!really exciting stuff!!!!' }]} />
      </Form >
    )
  }

}

const mapStateToProps = (state: AppState) => ({
  book: state.manage.addBook.book
})

const mapDispatchToProps = (dispatch) => ({
  postBook: (book: IBook) => dispatch(postBookAction(book)),
  saveBookFields: (book: IBook) => dispatch(saveAddBookFieldsAction(book))
});

const connectedAddBookPage = connect(mapStateToProps, mapDispatchToProps)(AddBookPage);

const wrapper: RouteComponentWrapper = {
  component: connectedAddBookPage,
  routeLabel: 'Add Books',
  routePath: 'addBooks'
}

export default wrapper;