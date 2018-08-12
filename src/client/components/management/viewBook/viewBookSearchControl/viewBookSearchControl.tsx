import * as React from 'react';
import { connect } from 'react-redux';
import { style } from 'typestyle';
import { AppState } from '../../../../state'
import { updateviewBookSearchPageSettings } from '../../../../state/manage/viewBook/action'
import { Col, Button } from 'react-bootstrap';
import { ViewBookSearchPagination } from './viewBookSearchPagination'
import { ViewBookSearchPageCount } from './viewBookSearchPageCount'
import ViewBookSearchOptionContainer from './viewBookSearchOptions/viewBookSearchOptionContainer';

const cssClass = style({
  $nest: {
    '&>div>div>button': {
      margin: '20px 0px'
    }
  }
})

type ViewBookSearchControlProps = {
  currentPageCount: number
  currentSelectedPage: number
}

type ViewBookSearchControlDispatch = {
  updateSearchSettings: (pageCount: number, selectedPage: number) => any
}

type ViewBookSearchControlState = {
  currentPaginationRange: number
}

class ViewBookSearchControl extends React.Component<ViewBookSearchControlProps & ViewBookSearchControlDispatch, ViewBookSearchControlState> {

  constructor(props) {
    super(props);
    this.state = { currentPaginationRange: this.calculatePaginationRange() };
  }

  calculatePaginationRange() {
    if (window.window.innerWidth < 360)
      return 0;
    else if (window.window.innerWidth < 576)
      return 1;
    else
      return 2;
  }

  updatePaginationFromWidth = () => {
    this.setState({ ...this.state, currentPaginationRange: this.calculatePaginationRange() });
  }

  componentDidMount() {
    this.updatePaginationFromWidth()
    window.addEventListener('resize', this.updatePaginationFromWidth);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updatePaginationFromWidth);
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
            setCurrentPage={(page) => { this.props.updateSearchSettings(this.props.currentPageCount, page) }}
            currentPage={this.props.currentSelectedPage}
            currentPageCount={10} />
        </Col>
        <Col sm={1} xs={2} >
          <ViewBookSearchPageCount
            currentPageSize={this.props.currentPageCount}
            updatePageCount={(count) => { this.props.updateSearchSettings(count, this.props.currentSelectedPage) }}
            pageCountOptions={[10, 25, 50, 100]} />
        </Col>

        <Col sm={3} xs={6}>
          <Button block>Search</Button>
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
    currentPageCount: state.manage.viewBook.search.currentPageCount,
    currentSelectedPage: state.manage.viewBook.search.currentSelectedPage
  })

const mapDispatchToProps: (dispatch: Function) => ViewBookSearchControlDispatch
  = (dispatch) => ({
    updateSearchSettings: (pageCount: number, selectedPage: number) => dispatch(updateviewBookSearchPageSettings(selectedPage, pageCount))
  })

const connectedViewBookSearchControl = connect(mapStateToProps, mapDispatchToProps)(ViewBookSearchControl);

export default connectedViewBookSearchControl;