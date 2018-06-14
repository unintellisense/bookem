import * as React from 'react';
import { connect } from 'react-redux';
import { Form, FormControlProps, CheckboxProps } from 'react-bootstrap'
import { toastError } from '../../../services/toastService';
import { RouteComponentWrapper } from '../../index'
import { postBookAction, saveAddBookFieldsAction } from '../../../state/manage/addBook/action'
import { getBooksByIsbn } from '../../../services/googleBookService'
import { Book } from '../../../models/book'
import { AppState } from '../../../state'
import { SearchResultBook } from '../../../../shared/dto/googleBook';
import { BookDetail } from './bookDetail'
type AddBooksProps = {
  postBook: (book: Book) => any
  saveBookFields: (book: Book) => any
  book: Book
}

type AddBooksState = {
  book: Book
  searchedBooks?: SearchResultBook[]
}

const numberRegex = /^[0-9\-]*$/

class AddBookPage extends React.Component<AddBooksProps, AddBooksState> {

  constructor(props: AddBooksProps) {
    super(props);
    this.state = { book: props.book };
  }

  public componentWillUnmount() {
    this.props.saveBookFields(this.state.book);
  }

  public componentWillReceiveProps(nextProps) {
    this.setState({ ...this.state, book: nextProps.book });
  }

  render() {
    return (
      <Form horizontal className="container-fluid" onSubmit={(e) => { e.preventDefault(); this.props.postBook(this.state.book) }}>
        <BookDetail
          book={this.state.book}
          bookUpdated={book => { this.setState({ ...this.state, book }) }}
        />
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