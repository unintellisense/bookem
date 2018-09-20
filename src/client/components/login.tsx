import * as React from 'react';
import { Alert } from 'react-bootstrap'
import { StandardRouteItem } from '../route'

class Login extends React.Component {

  render() {
    return (
      <div className="container-fluid">
        <Alert className="text-center">Please select a login method below.</Alert>
        <a href="/api/auth/google" className="btn btn-info" role="button" >Google</a>
      </div>
    )
  }
}

const routeItem = new StandardRouteItem('Login', 'login', Login);

export default routeItem;