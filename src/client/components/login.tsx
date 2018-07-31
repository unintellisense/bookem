import * as React from 'react';
import { RouteComponentWrapper } from '.'

class Login extends React.Component {

  render() {
    return (
      <div>
        Login
      </div>
    )
  }
}

const wrapper: RouteComponentWrapper = {
  component: Login,
  routeLabel: 'Login',
  routePath: 'login'
}

export default wrapper;