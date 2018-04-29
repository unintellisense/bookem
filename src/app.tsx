import * as React from 'react';
import { Button } from 'react-bootstrap'
import { } from 'react-router'
import { Route, BrowserRouter } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { RouteComponentWrapper, Book, Login, LogOut } from './components'

const loggedInComponents: RouteComponentWrapper[] = [Book, LogOut];
const loggedOutComponents: RouteComponentWrapper[] = [Login];

export class App extends React.Component {

  loggedIn: boolean = true;

  render() {
    let routeComponents = this.loggedIn ? loggedInComponents : loggedOutComponents;

    return (
      <BrowserRouter>
        <div>
          {routeComponents.map((wrap) => // add appropriate linkContainers 
            <LinkContainer exact to={`/${wrap.routePath}`}>
              <Button>{wrap.routeLabel}</Button>
            </LinkContainer>
          )}
          {routeComponents.map((wrap) => // add appropriate routes 
            <Route path={`/${wrap.routePath}`} component={wrap.component} />
          )}
        </div>
      </BrowserRouter>
    )
  }
}