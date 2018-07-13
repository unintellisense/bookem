import * as React from 'react';
import { connect } from 'react-redux';
import { Table } from 'react-bootstrap'
import { Book } from '../../../models/book'
import { AppState } from '../../../state'
import { RouteComponentWrapper } from '../../index'
import { getSearchedBooksAction, updateLocalEditedBookAction, updateLocalEditedBookPartialCategory, updateBookAction, deleteBookAction } from '../../../state/manage/viewBook/action'
import { ViewBookModal } from './viewBookModal'

const TextTruncate = require('react-text-truncate');

type ViewStateProps = {
  searchedBooks: Book[]
  currentEditedBook: Book | null
  currentEditedPartialCategory: string
  lastRefreshedBooks: number
}

type ViewDispatchProps = {
  getBookView: () => Book[]
  updateLocalBook: (book: Book | null) => any
  updateLocalPartialCategory: (tag: string) => any
  updatePostBook: (book: Book) => any
  deleteBook: (book: Book) => any
}

const staleRefreshTimeoutMillis = 1000 * 60; // 1 minute

class viewBookPage extends React.Component<ViewStateProps & ViewDispatchProps> {

  componentDidMount() {
    this.refreshStaleBooks();
  }

  componentDidUpdate() {
    this.refreshStaleBooks();
  }

  clearCurrentEditedBook = () => {
    this.props.updateLocalBook(null);
    this.props.updateLocalPartialCategory('');
  }

  refreshStaleBooks() {
    if (Date.now() - this.props.lastRefreshedBooks > staleRefreshTimeoutMillis) {
      this.props.getBookView();
    }
  }

  render() {
    return <div className="container-fluid">
      <Table striped bordered condensed hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Categories</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {this.props.searchedBooks.map(book => {
            return <tr
              onClick={() => { this.props.updateLocalBook(book) }}
              key={book.id}>
              <td>{book.title}</td>
              <td>{book.categories.join(', ')}</td>
              <td><TextTruncate
                line={3}
                truncateText="…"
                text={book.description} />
              </td>
            </tr>
          })}
        </tbody>
      </Table>
      <ViewBookModal
        onClose={this.clearCurrentEditedBook}
        updateLocalBook={this.props.updateLocalBook}
        updatePostBook={this.props.updatePostBook}
        deleteBook={this.props.deleteBook}
        book={this.props.currentEditedBook}
        partialCategoryTag={this.props.currentEditedPartialCategory}
        partialCategoryTagUpdated={this.props.updateLocalPartialCategory}
      />
    </div>
  }
}

const mapStateToProps = (state: AppState) => ({
  searchedBooks: state.manage.viewBook.page.searchedBooks,
  lastRefreshedBooks: state.manage.viewBook.page.lastRefreshedBooks,
  currentEditedBook: state.manage.viewBook.modal.editedBook,
  currentEditedPartialCategory: state.manage.viewBook.modal.editedBookPartialCategory
})

const mapDispatchToProps: (dispatch: Function) => ViewDispatchProps
  = (dispatch) => ({
    getBookView: () => dispatch(getSearchedBooksAction()),
    updateLocalBook: (book: Book) => dispatch(updateLocalEditedBookAction(book)),
    updateLocalPartialCategory: (tag: string) => dispatch(updateLocalEditedBookPartialCategory(tag)),
    updatePostBook: (book: Book) => dispatch(updateBookAction(book)),
    deleteBook: (book: Book) => dispatch(deleteBookAction(book))
  });

const connectedViewBookPage = connect<ViewStateProps, ViewDispatchProps>(mapStateToProps, mapDispatchToProps)(viewBookPage);

const wrapper: RouteComponentWrapper = {
  component: connectedViewBookPage,
  routeLabel: 'View Books',
  routePath: 'viewBooks'
}

export default wrapper;