import * as React from 'react';
import { Grid, Col } from 'react-bootstrap';
import { ViewBookSearchPagination } from './viewBookSearchPagination'
import { ViewBookSearchPageCount } from './viewBookSearchPageCount'

export class ViewBookSearchControl extends React.Component {
  render() {
    return <div>
      <Col md={2} mdOffset={4}>
        <ViewBookSearchPagination />
      </Col>
      <Col md={1}>
        <ViewBookSearchPageCount />
      </Col>
    </div>
  }
}