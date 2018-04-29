import * as React from 'react';
import { RouteComponentWrapper } from './index'

class LogOut extends React.Component {

  render() {
    return (
      <div>
        Logout
      </div>
    )
  }
}

const wrapper: RouteComponentWrapper = {
  component: LogOut,
  routeLabel: 'Logout',
  routePath: 'logout'
}

export default wrapper;