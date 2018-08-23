import * as React from 'react';
import { Button, PageHeader } from 'react-bootstrap'
import { RouteComponentWrapper } from '.'

class Login extends React.Component {

  render() {
    return (
      <div className="container-fluid">
        <PageHeader className="text-center">Login</PageHeader>
        <a href="/auth/google" className="btn btn-info" role="button" >Google</a>
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