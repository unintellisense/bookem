import * as React from 'react';
import { Navbar, NavItem, Nav } from 'react-bootstrap'
import { LinkContainer } from "react-router-bootstrap";
import { Route, BrowserRouter, Redirect, Switch } from 'react-router-dom'
import { RouteComponentWrapper, Browse, Login, LogOut } from './components'

const loggedInComponents: RouteComponentWrapper[] = [Browse, LogOut];
const loggedOutComponents: RouteComponentWrapper[] = [Login];

export class App extends React.Component {

  loggedIn: boolean = true;

  render() {
    let routeComponents = this.loggedIn ? loggedInComponents : loggedOutComponents;

    return (
      <BrowserRouter>
        <div>
          <Navbar fluid collapseOnSelect>
            <Navbar.Header>
              <Navbar.Brand>
                <a href="#brand">React-Bootstrap</a>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
              <Nav pullRight>
                {routeComponents.map((wrap) => // add appropriate linkContainers 
                  <LinkContainer to={`/${wrap.routePath}`}>
                    <NavItem>{wrap.routeLabel}</NavItem>
                  </LinkContainer >
                )}
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <Switch>
            {routeComponents.map((wrap) => // add appropriate routes 
              <Route path={`/${wrap.routePath}`} component={wrap.component} />
            )}
            { // default to the first route in the path when no match
              <Route exact path="*" render={() => <Redirect to={`/${routeComponents[0].routePath}`} />} />
            }
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}