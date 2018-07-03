import * as React from 'react';
import { connect } from 'react-redux';
import { Table } from 'react-bootstrap'
import { Book } from '../../../models/book'
import { AppState } from '../../../state'
import { RouteComponentWrapper } from '../../index'
import { getSearchedBooksAction } from '../../../state/manage/viewBook/action'
import { ViewBookModal } from './viewBookModal'

const TextTruncate = require('react-text-truncate');

type ViewStateProps = {
  searchedBooks: Book[]
  lastRefreshedBooks: number
}

type ViewDispatchProps = {
  getBookView: () => Book[]
}

type ViewBookState = {
  currenteditedBook: Book | null
}

const staleRefreshTimeoutMillis = 1000 * 60; // 1 minute

class viewBookPage extends React.Component<ViewStateProps & ViewDispatchProps, ViewBookState> {

  constructor(props) {
    super(props);
    this.state = { currenteditedBook: null };
  }

  componentDidMount() {
    this.refreshStaleBooks();
  }

  updateCurrentEditedBook = (book: Book) => {
    this.setState({ ...this.state, currenteditedBook: book })
  }

  clearCurrentEditedBook = () => {
    this.setState({ ...this.state, currenteditedBook: null })
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
              onClick={() => { this.updateCurrentEditedBook(book) }}
              key={book.id}
            >
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
        updateBook={this.updateCurrentEditedBook}
        deleteBook={(() => { })}
        book={this.state.currenteditedBook}
      />
    </div>
  }
}

const mapStateToProps = (state: AppState) => ({
  searchedBooks: state.manage.viewBook.searchedBooks,
  lastRefreshedBooks: state.manage.viewBook.lastRefreshedBooks
})

const mapDispatchToProps = (dispatch) => ({
  getBookView: () => dispatch(getSearchedBooksAction())
});

const connectedViewBookPage = connect<ViewStateProps, ViewDispatchProps>(mapStateToProps, mapDispatchToProps)(viewBookPage);

const wrapper: RouteComponentWrapper = {
  component: connectedViewBookPage,
  routeLabel: 'View Books',
  routePath: 'viewBooks'
}

export default wrapper;