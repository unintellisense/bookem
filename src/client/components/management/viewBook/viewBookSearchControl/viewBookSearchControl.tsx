import * as React from 'react';
import { Grid, Col } from 'react-bootstrap';
import { ViewBookSearchPagination } from './viewBookSearchPagination'
import { ViewBookSearchPageCount } from './viewBookSearchPageCount'
import { ViewBookSearchOptionlist } from './viewBookSearchOptionList';

type ViewBookSearchControlState = {
  currentPageCount: number
  currentSelectedPage: number
  currentPaginationRange: number
}

export class ViewBookSearchControl extends React.Component<{}, ViewBookSearchControlState> {

  constructor(props) {
    super(props);
    this.state = { currentPageCount: 10, currentSelectedPage: 1, currentPaginationRange: this.calculatePaginationRange() };
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
    return <div>
      <div>
        <ViewBookSearchOptionlist />
      </div>
      <div>
        <Col sm={6} xs={10}>
          <ViewBookSearchPagination
            paginationRange={this.state.currentPaginationRange}
            setCurrentPage={(page) => { this.setState({ ...this.state, currentSelectedPage: page }) }}
            currentPage={this.state.currentSelectedPage}
            currentPageCount={10}
          />
        </Col>
        <Col sm={1} smOffset={5} xs={2} xsOffset={0}>

          <ViewBookSearchPageCount
            currentPageSize={this.state.currentPageCount}
            updatePageCount={(count) => { this.setState({ ...this.state, currentPageCount: count }) }}
            pageCountOptions={[10, 25, 50, 100]}
          />
        </Col>
      </div>
    </div>
  }
}