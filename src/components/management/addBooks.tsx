import * as React from 'react'
import { RouteComponentWrapper } from '../index'

class AddBooks extends React.Component {

  render() {
    return (
      <div>
        AddBooks
      </div>
    )
  }
}

const wrapper: RouteComponentWrapper = {
  component: AddBooks,
  routeLabel: 'Add Books',
  routePath: 'addBooks'
}

export default wrapper;