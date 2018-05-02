//import './management.css'

import * as React from 'react'
import { RouteComponentWrapper } from '../index'
import AddBooks from './addBooks'
import ViewBooks from './viewBooks'
import { Navbar, NavItem, Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { Route, Redirect, Switch } from 'react-router-dom'
import { RouteComponentProps } from 'react-router'

const routeComponents: RouteComponentWrapper[] = [ViewBooks, AddBooks];
type ManageProps = RouteComponentProps<{}>;



class Manage extends React.Component<ManageProps> {

  private pathUrl: string;

  constructor(props: ManageProps) {
    super(props);

    this.pathUrl = props.match.url;
    console.log(props);
  }

  render() {
    return (
      <div>
        <h2 className="text-center">Manage</h2>
        <Navbar fluid collapseOnSelect className="manage-navbar-nav">
          <Navbar.Header>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav justified bsStyle="tabs">
              {routeComponents.map((wrap) => // add appropriate linkContainers 
                <LinkContainer to={`${this.pathUrl}/${wrap.routePath}`}>
                  <NavItem>{wrap.routeLabel}</NavItem>
                </LinkContainer >
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Switch>
          {routeComponents.map((wrap) => // add appropriate routes 
            <Route path={`${this.pathUrl}/${wrap.routePath}`} component={wrap.component} />
          )}
          { // default to the first route in the path when no match
            <Route exact path="*" render={() => <Redirect to={`${this.pathUrl}/${routeComponents[0].routePath}`} />} />
          }
        </Switch>
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