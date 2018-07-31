import * as React from 'react'
import { RouteComponentWrapper } from '..'
import AddBook from './addBook'
import ViewBooks from './viewBook/viewBookPage'
import { Navbar, NavItem, Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { Route, Redirect, Switch } from 'react-router-dom'
import { RouteComponentProps } from 'react-router'

const routeComponents: RouteComponentWrapper[] = [ViewBooks, AddBook];
type ManageProps = RouteComponentProps<{}>;

class Manage extends React.Component<ManageProps> {

  // Get the printable name for the current route
  private getSubRoute() {
    var strippedPath = this.props.history.location.pathname.replace(`/${wrapper.routePath}/`, '');
    var matchingComps = routeComponents.filter(comp => comp.routePath === strippedPath);
    if (matchingComps.length > 0) return matchingComps[0].routeLabel;
  }

  render() {

    const matchUrl = this.props.match.url;

    return (
      <div>
        <Navbar inverse fluid collapseOnSelect>
          <Nav pullRight>
            {routeComponents.map((wrap) => // add appropriate linkContainers 
              <LinkContainer to={`${matchUrl}/${wrap.routePath}`} key={wrap.routeLabel}>
                <NavItem>{wrap.routeLabel}</NavItem>
              </LinkContainer >
            )}
          </Nav>
        </Navbar>
        <Switch>
          {routeComponents.map((wrap) => // add appropriate routes 
            <Route path={`${matchUrl}/${wrap.routePath}`} component={wrap.component} key={wrap.routeLabel} />
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