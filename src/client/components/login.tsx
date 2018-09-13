import * as React from 'react';
import { PageHeader } from 'react-bootstrap'
import { RouteItem } from '../route'

class Login extends React.Component {

  render() {
    return (
      <div className="container-fluid">
        <PageHeader className="text-center">Login</PageHeader>
        <a href="/api/auth/google" className="btn btn-info" role="button" >Google</a>
      </div>
    )
  }
}

const routeItem = new RouteItem('Login', 'login', Login);

export default routeItem;