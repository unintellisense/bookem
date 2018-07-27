import * as React from 'react';
import { Grid, Col } from 'react-bootstrap';
import { ViewBookSearchPagination } from './viewBookSearchPagination'
import { ViewBookSearchPageCount } from './viewBookSearchPageCount'

type ViewBookSearchControlState = {
  currentPageCount: number
  currentSelectedPage: number
}

export class ViewBookSearchControl extends React.Component<{}, ViewBookSearchControlState> {

  constructor(props) {
    super(props);
    this.state = { currentPageCount: 10, currentSelectedPage: 1 };
  }
  render() {
    return <div>
      <Col sm={4} smOffset={1} xs={11} xsOffset={1}>
        <ViewBookSearchPagination
          setCurrentPage={(page) => { this.setState({ ...this.state, currentSelectedPage: page }) }}
          currentPage={this.state.currentSelectedPage}
          currentPageCount={10}
        />
      </Col>
      <Col sm={1} smOffset={6} xs={3} xsOffset={1}>
        <ViewBookSearchPageCount
          currentPageSize={this.state.currentPageCount}
          updatePageCount={(count) => { this.setState({ ...this.state, currentPageCount: count }) }}
          pageCountOptions={[10, 25, 50, 100]}
        />
      </Col>
    </div>
  }
}