import * as React from 'react';
import { connect } from 'react-redux';
import { Table } from 'react-bootstrap'
import { style, media } from 'typestyle';
import { Book } from '../../../models/book'
import { AppState } from '../../../state'
import { StandardRouteItem } from '../../../route';
import { updateLocalEditedBookAction, updateLocalEditedBookPartialCategory, updateBookAction, deleteBookAction } from '../../../state/manage/viewBook/action'
import { ViewBookModal } from './viewBookModal'
import ViewBookSearchControl from './viewBookSearchControl/viewBookSearchControl'

const tableCss = style({
  tableLayout: "fixed",
  wordWrap: "break-word",
  $nest: {
    '&>thead>tr>th': {
      textAlign: "center"
    },
    '&>tbody>tr>td': {
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap"
    }
  }
});

const categoryColCss = style(
  media({ maxWidth: 1023 }, {
    display: "none"
  }),
  media({ minWidth: 1024 }, {
    width: "20%"
  })
);

const otherColCss = style(
  media({ maxWidth: 1023 }, {
    width: "50%"
  }),
  media({ minWidth: 1024 }, {
    width: "40%"
  })
);


type ViewBookProps = {
  searchedBooks: Book[]
  currentFocusedBook: Book | null
  currentFocusedPartialCategory: string
}

type ViewBookDispatch = {
  updateFocusedBook: (book: Book | null) => any
  updateFocusedPartialCategory: (tag: string) => any
  updatePostBook: (book: Book) => any
  deleteBook: (book: Book) => any
}

class ViewBookPage extends React.Component<ViewBookProps & ViewBookDispatch> {

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
            <th className={otherColCss} >Title</th>
            <th className={categoryColCss} >Categories</th>
            <th className={otherColCss} >Description</th>
          </tr>
        </thead>
        <tbody>
          {this.props.searchedBooks.map && this.props.searchedBooks.map(book => {
            return <tr
              onClick={() => { this.props.updateFocusedBook(book) }}
              key={book.id}>
              <td className={otherColCss}>{book.title}</td>
              <td className={categoryColCss}>{book.categories.join(', ')}</td>
              <td className={otherColCss} >{book.description}</td>
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

const connectedViewBookPage = connect<ViewBookProps, ViewBookDispatch>(mapStateToProps, mapDispatchToProps)(ViewBookPage);

const routeItem = new StandardRouteItem('View Books', 'viewBooks', connectedViewBookPage);

export default routeItem;