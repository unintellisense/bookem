import * as React from 'react';
import { connect } from 'react-redux';
import { Form } from 'react-bootstrap'
import { RouteComponentWrapper } from '../../index'
import { postBookAction, saveAddBookFieldsAction } from '../../../state/manage/addBook/action'
import { Book } from '../../../models/book'
import { AppState } from '../../../state'
import { SearchResultBook } from '../../../../shared/dto/googleBook';
import { BookDetail } from './bookDetail'

type AddBooksProps = {
  postBook: (book: Book) => any
  book: Book
  saveBookFields: (book: Book) => any
  partialCategoryTag: string
  savePartialCategoryTag: (partial: string) => any
}

type AddBooksState = {
  book: Book
  partialCategoryTag: string
  searchedBooks?: SearchResultBook[]
}

const numberRegex = /^[0-9\-]*$/

class AddBookPage extends React.Component<AddBooksProps, AddBooksState> {

  constructor(props: AddBooksProps) {
    super(props);
    this.state = { book: props.book, partialCategoryTag: props.partialCategoryTag };
  }

  handleSubmit = (e: React.FormEvent<any>) => {
    e.preventDefault();
    this.props.postBook(this.state.book);;
  }

  public componentWillUnmount() {
    this.props.saveBookFields(this.state.book);
  }

  public componentWillReceiveProps(nextProps) {
    this.setState({ ...this.state, book: nextProps.book, partialCategoryTag: nextProps.partialCategoryTag });
  }

  private updatePartialCategoryTag = (partialCategoryTag: string) => {
    this.setState({ ...this.state, partialCategoryTag });
  }

  render() {
    return (
      <Form horizontal className="container-fluid" onSubmit={this.handleSubmit}>
        <BookDetail
          book={this.state.book}
          bookUpdated={book => { this.setState({ ...this.state, book }) }}
          partialCategoryTag={this.state.partialCategoryTag}
          partialCategoryTagUpdated={this.updatePartialCategoryTag}
        />
      </Form >
    )
  }
}

const mapStateToProps = (state: AppState) => ({
  book: state.manage.addBook.book,
  partialCategoryTag: ''
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