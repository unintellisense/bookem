import * as React from 'react'
import { RouteComponentWrapper } from './index'

class Manage extends React.Component {

  render() {
    return (
      <div>
        Manage
      </div>
    )

  }
}

const wrapper: RouteComponentWrapper = {
  component: Manage,
  routeLabel: 'Manage',
  routePath: 'manage'
}

export default wrapper;