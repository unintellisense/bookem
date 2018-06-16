import * as React from 'react';
import { connect } from 'react-redux';
import { Table } from 'react-bootstrap'
import { Book } from '../../../models/book'
import { AppState } from '../../../state'
import { RouteComponentWrapper } from '../../index'
import { getSearchedBooksAction } from '../../../state/manage/viewBook/action'

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
    return <div>xxx</div>
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