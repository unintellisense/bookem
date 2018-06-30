import * as React from 'react';
import { connect } from 'react-redux';
import { Table } from 'react-bootstrap'
import { Book } from '../../../models/book'
import { AppState } from '../../../state'
import { RouteComponentWrapper } from '../../index'
import { getSearchedBooksAction } from '../../../state/manage/viewBook/action'

const TextTruncate = require('react-text-truncate');

type ViewBookProps = {
  searchedBooks: Book[]
  lastRefreshedBooks: number
  getSearchedBooks: () => Book[]
}

const staleRefreshTimeoutMillis = 1000 * 60; // 1 minute

class viewBookPage extends React.Component<ViewBookProps> {

  refreshStaleBooks() {
    if (Date.now() - this.props.lastRefreshedBooks > staleRefreshTimeoutMillis) {
      this.props.getSearchedBooks();
    }
  }

  componentDidMount() {
    console.log('did mount!!');
    this.refreshStaleBooks();
  }

  componentWillUnmount() {
    console.log('will unmount!!');
  }

  render() {
    let contents = this.props.searchedBooks.map(book => {
      return <tr key={book.id}>
        <td>{book.title}</td>
        <td>{book.categories.join(', ')}</td>
        <td><TextTruncate
          line={3}
          truncateText="…"
          text={book.description}
        /></td>
      </tr>
    });
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
          {contents}
        </tbody>
      </Table>
    </div>
  }

}

const mapStateToProps = (state: AppState) => ({
  searchedBooks: state.manage.viewBook.searchedBooks,
  lastRefreshedBooks: state.manage.viewBook.lastRefreshedBooks
})

const mapDispatchToProps = (dispatch) => ({
  getSearchedBooks: () => dispatch(getSearchedBooksAction())
});

const connectedViewBookPage = connect(mapStateToProps, mapDispatchToProps)(viewBookPage);

const wrapper: RouteComponentWrapper = {
  component: connectedViewBookPage,
  routeLabel: 'View Books',
  routePath: 'viewBooks'
}

export default wrapper;