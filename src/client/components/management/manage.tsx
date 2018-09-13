import * as React from 'react'
import { RouteWrapper, RouteItem } from '../../route'
import AddBook from './addBook'
import ViewBooks from './viewBook/viewBookPage'
import { Navbar, NavItem, Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { Route, Redirect, Switch } from 'react-router-dom'
import { RouteComponentProps } from 'react-router'

const routeComponents: RouteWrapper[] = [ViewBooks, AddBook];
type ManageProps = RouteComponentProps<{}>;

class Manage extends React.Component<ManageProps> {

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

const routeItem = new RouteItem('Manage', 'manage', Manage);

export default routeItem;