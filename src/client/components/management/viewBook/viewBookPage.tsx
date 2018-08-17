import * as React from 'react';
import { connect } from 'react-redux';
import { Table } from 'react-bootstrap'
import { style } from 'typestyle';
import { Book } from '../../../models/book'
import { AppState } from '../../../state'
import { RouteComponentWrapper } from '../..'
import { updateLocalEditedBookAction, updateLocalEditedBookPartialCategory, updateBookAction, deleteBookAction } from '../../../state/manage/viewBook/action'
import { ViewBookModal } from './viewBookModal'
import ViewBookSearchControl from './viewBookSearchControl/viewBookSearchControl'

const tableCss = style({
  tableLayout: "fixed",
  wordWrap: "break-word",
  $nest: {
    '&>thead>tr>th': {
      width: "33%"
    },
    '&>tbody>tr>td': {
      width: "33%",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap"
    }
  }
});

type ViewBookProps = {
  searchedBooks: Book[]
  currentFocusedBook: Book | null
  currentFocusedPartialCategory: string
  lastRefreshedBooks: number
}

type ViewBookDispatch = {
  updateFocusedBook: (book: Book | null) => any
  updateFocusedPartialCategory: (tag: string) => any
  updatePostBook: (book: Book) => any
  deleteBook: (book: Book) => any
}

class viewBookPage extends React.Component<ViewBookProps & ViewBookDispatch> {

  clearCurrentEditedBook = () => {
    this.props.updateFocusedBook(null);
    this.props.updateFocusedPartialCategory('');
  }

  render() {
    return <div className="container-fluid">
      <div>
        <ViewBookSearchControl />
      </div>
      <Table striped bordered condensed hover className={tableCss}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Categories</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {this.props.searchedBooks.map && this.props.searchedBooks.map(book => {
            return <tr
              onClick={() => { this.props.updateFocusedBook(book) }}
              key={book.id}>
              <td>{book.title}</td>
              <td>{book.categories.join(', ')}</td>
              <td>{book.description}</td>
            </tr>
          })}
        </tbody>
      </Table>
      <ViewBookModal
        onClose={this.clearCurrentEditedBook}
        updateLocalBook={this.props.updateFocusedBook}
        updatePostBook={this.props.updatePostBook}
        deleteBook={this.props.deleteBook}
        book={this.props.currentFocusedBook}
        partialCategoryTag={this.props.currentFocusedPartialCategory}
        partialCategoryTagUpdated={this.props.updateFocusedPartialCategory}
      />
    </div>
  }
}

const mapStateToProps: (state: AppState) => ViewBookProps
  = (state) => ({
    searchedBooks: state.manage.viewBook.page.searchedBooks,
    lastRefreshedBooks: state.manage.viewBook.page.lastRefreshedBooks,
    currentFocusedBook: state.manage.viewBook.modal.editedBook,
    currentFocusedPartialCategory: state.manage.viewBook.modal.editedBookPartialCategory
  })

const mapDispatchToProps: (dispatch: Function) => ViewBookDispatch
  = (dispatch) => ({
    updateFocusedBook: (book: Book) => dispatch(updateLocalEditedBookAction(book)),
    updateFocusedPartialCategory: (tag: string) => dispatch(updateLocalEditedBookPartialCategory(tag)),
    updatePostBook: (book: Book) => dispatch(updateBookAction(book)),
    deleteBook: (book: Book) => dispatch(deleteBookAction(book))
  });

const connectedViewBookPage = connect<ViewBookProps, ViewBookDispatch>(mapStateToProps, mapDispatchToProps)(viewBookPage);

const wrapper: RouteComponentWrapper = {
  component: connectedViewBookPage,
  routeLabel: 'View Books',
  routePath: 'viewBooks'
}

export default wrapper;