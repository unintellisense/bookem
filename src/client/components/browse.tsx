import * as React from 'react'
import { RouteWrapper } from '../route'

class Browse extends React.Component {

  render() {
    return (
      <div>
        Browse
      </div>
    )

  }
}

const wrapper: RouteWrapper = {
  isAuth: false,
  component: Browse,
  routeLabel: 'Browse',
  routePath: 'browse'
}

export default wrapper;