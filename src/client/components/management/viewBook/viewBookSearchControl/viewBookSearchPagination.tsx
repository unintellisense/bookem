import * as React from 'react';
import { Pagination } from 'react-bootstrap'

export class ViewBookSearchPagination extends React.Component {
  render() {
    return <Pagination>{
      [1, 2, 3].map(item => <Pagination.Item key={item}>{item}</Pagination.Item>)
    }
      <Pagination.Item>???</Pagination.Item>
    </Pagination>
  }
}