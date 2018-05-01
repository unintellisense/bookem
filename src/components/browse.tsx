import * as React from 'react'
import { RouteComponentWrapper } from './index'

class Browse extends React.Component {

  render() {
    return (
      <div>
        Browse
      </div>
    )

  }
}

const wrapper: RouteComponentWrapper = {
  component: Browse,
  routeLabel: 'Browse',
  routePath: 'browse'
}

export default wrapper;