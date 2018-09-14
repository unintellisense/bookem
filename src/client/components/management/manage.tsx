import * as React from 'react'
import { IRouteItem, StandardRouteItem } from '../../route'
import AddBook from './addBook'
import ViewBooks from './viewBook/viewBookPage'
import { Navbar, Nav } from 'react-bootstrap'
import { Route, Redirect, Switch } from 'react-router-dom'
import { RouteComponentProps } from 'react-router'

const routeItems: IRouteItem[] = [ViewBooks, AddBook];
type ManageProps = RouteComponentProps<{}>;

class Manage extends React.Component<ManageProps> {

  render() {

    const matchUrl = this.props.match.url;

    return (
      <div>
        <Navbar inverse fluid collapseOnSelect>
          <Nav pullRight>
            {
              routeItems.map(item => item.getNavBarRender(matchUrl))
            }
          </Nav>
        </Navbar>
        <Switch>
          {
            routeItems.map(item => item.getSwitchRender(matchUrl))
          }
          { // default to the first route in the path when no match, but make sure routeComponents isn't empty
            routeItems.length &&
            <Route exact path="*" render={() => <Redirect to={`${matchUrl}/${(routeItems[0] as StandardRouteItem).routePath}`} />} />
          }
        </Switch>
      </div>
    )
  }
}

const routeItem = new StandardRouteItem('Manage', 'manage', Manage);

export default routeItem;