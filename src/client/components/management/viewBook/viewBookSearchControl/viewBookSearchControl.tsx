import * as React from 'react';
import { Grid, Col } from 'react-bootstrap';
import { ViewBookSearchPagination } from './viewBookSearchPagination'
import { ViewBookSearchPageCount } from './viewBookSearchPageCount'

type ViewBookSearchControlState = {
  currentPageCount: number
}

export class ViewBookSearchControl extends React.Component<{}, ViewBookSearchControlState> {

  constructor(props) {
    super(props);
    this.state = { currentPageCount: 10 };
  }
  render() {
    return <div>
      <Col sm={2} smOffset={1} xs={7}>
        <ViewBookSearchPagination
          currentPage={2}
          currentPageCount={2}
        />
      </Col>
      <Col sm={1} smOffset={8} xsOffset={1} xs={2}>
        <ViewBookSearchPageCount
          currentPageSize={this.state.currentPageCount}
          updatePageCount={(count) => { this.setState({ ...this.state, currentPageCount: count }) }}
          pageCountOptions={[10, 25, 50, 100]}
        />
      </Col>
    </div>
  }
}