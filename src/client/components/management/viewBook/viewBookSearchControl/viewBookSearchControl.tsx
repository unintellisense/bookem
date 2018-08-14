import * as React from 'react';
import { connect } from 'react-redux';
import { style } from 'typestyle';
import { AppState } from '../../../../state'
import { updateviewBookSearchPageSettings, getSearchedBooksAction } from '../../../../state/manage/viewBook/action'
import { Col, Button } from 'react-bootstrap';
import { ViewBookSearchPagination } from './viewBookSearchPagination'
import { ViewBookSearchPageCount } from './viewBookSearchPageCount'
import ViewBookSearchOptionContainer from './viewBookSearchOptions/viewBookSearchOptionContainer';
import { Book } from '../../../../models/book';

const cssClass = style({
  $nest: {
    '&>div>div>button': {
      margin: '20px 0px'
    }
  }
})

type ViewBookSearchControlProps = {
  rowsPerPage: number
  selectedPage: number
  searchedBooksCount: number
}

type ViewBookSearchControlDispatch = {
  getSearchedBooks: () => Book[]
  updateSearchSettings: (pageCount: number, selectedPage: number) => any
}

type ViewBookSearchControlState = {
  currentPageCount: number
  currentPaginationRange: number
}

class ViewBookSearchControl extends React.Component<ViewBookSearchControlProps & ViewBookSearchControlDispatch, ViewBookSearchControlState> {

  constructor(props) {
    super(props);
    this.state = { currentPaginationRange: this.calculatePaginationRange(), currentPageCount: this.calculatePageCount() };
  }

  calculatePageCount() {
    let pageCnt = Math.floor(this.props.searchedBooksCount / this.props.rowsPerPage) + 1;
    return isFinite(pageCnt) ? pageCnt : 0;
  }

  calculatePaginationRange() {
    if (window.window.innerWidth < 360)
      return 0;
    else if (window.window.innerWidth < 576)
      return 1;
    else
      return 2;
  }

  updatePageCount = () => {
    let newPageCount = this.calculatePageCount();
    if (this.state.currentPageCount != newPageCount)
      this.setState({ ...this.state, currentPageCount: newPageCount });
  }

  updatePaginationFromWidth = () => {
    this.setState({ ...this.state, currentPaginationRange: this.calculatePaginationRange() });
  }

  componentDidMount() {
    this.updatePaginationFromWidth();
    window.addEventListener('resize', this.updatePaginationFromWidth);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updatePaginationFromWidth);
  }

  componentDidUpdate() {
    if (this.props.selectedPage > this.state.currentPageCount) { // test whether current page number exceeds new number of pages
      this.props.updateSearchSettings(this.props.rowsPerPage, this.state.currentPageCount);
    }
    this.updatePageCount();
  }

  render() {
    return <div className={cssClass}>
      <div>
        <ViewBookSearchOptionContainer />
      </div>
      <div>
        <Col sm={5} xs={10}>
          <ViewBookSearchPagination
            paginationRange={this.state.currentPaginationRange}
            setCurrentPage={(page) => { this.props.updateSearchSettings(this.props.rowsPerPage, page) }}
            currentPage={this.props.selectedPage}
            currentPageCount={this.state.currentPageCount} />
        </Col>
        <Col sm={1} xs={2} >
          <ViewBookSearchPageCount
            currentPageSize={this.props.rowsPerPage}
            updatePageCount={(count) => { this.props.updateSearchSettings(count, this.props.selectedPage) }}
            pageCountOptions={[10, 25, 50, 100]} />
        </Col>

        <Col sm={3} xs={6}>
          <Button block onClick={this.props.getSearchedBooks}>Search</Button>
        </Col>

        <Col sm={3} xs={6}>
          <Button block>Reset</Button>
        </Col>

      </div>
    </div>
  }
}

const mapStateToProps: (state: AppState) => ViewBookSearchControlProps
  = (state) => ({
    rowsPerPage: state.manage.viewBook.search.rowsPerPage,
    selectedPage: state.manage.viewBook.search.selectedPage,
    searchedBooksCount: state.manage.viewBook.page.searchBooksCount
  })

const mapDispatchToProps: (dispatch: Function) => ViewBookSearchControlDispatch
  = (dispatch) => ({
    getSearchedBooks: () => dispatch(getSearchedBooksAction()),
    updateSearchSettings: (pageCount: number, selectedPage: number) => dispatch(updateviewBookSearchPageSettings(selectedPage, pageCount))
  })

const connectedViewBookSearchControl = connect(mapStateToProps, mapDispatchToProps)(ViewBookSearchControl);

export default connectedViewBookSearchControl;