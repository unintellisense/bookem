
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

  render() {

    const matchUrl = this.props.match.url;

    return (
      <div>
        <Navbar fluid collapseOnSelect className="manage-navbar-nav">
          <Navbar.Header>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav justified bsStyle="tabs">
              {routeComponents.map((wrap) => // add appropriate linkContainers 
                <LinkContainer to={`${matchUrl}/${wrap.routePath}`}>
                  <NavItem>{wrap.routeLabel}</NavItem>
                </LinkContainer >
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Switch>
          {routeComponents.map((wrap) => // add appropriate routes 
            <Route path={`${matchUrl}/${wrap.routePath}`} component={wrap.component} />
          )}
          { // default to the first route in the path when no match
            <Route exact path="*" render={() => <Redirect to={`${matchUrl}/${routeComponents[0].routePath}`} />} />
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