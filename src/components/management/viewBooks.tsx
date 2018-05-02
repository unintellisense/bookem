import * as React from 'react'
import { RouteComponentWrapper } from '../index'

class ViewBooks extends React.Component {

  render() {
    return (
      <div>
        ViewBooks
      </div>
    )
  }
}

const wrapper: RouteComponentWrapper = {
  component: ViewBooks,
  routeLabel: 'View Books',
  routePath: 'viewBooks'
}

export default wrapper;