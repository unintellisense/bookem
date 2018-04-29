import * as React from 'react'
import { RouteComponentWrapper } from './index'

class Book extends React.Component {

  routeLabel: 'Books';
  routePath: 'book';

  render() {
    return (
      <div>
        Books
      </div>
    )

  }
}

const wrapper: RouteComponentWrapper = {
  component: Book,
  routeLabel: 'Books',
  routePath: 'book'
}

export default wrapper;