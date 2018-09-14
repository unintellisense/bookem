import * as React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect, Switch, BrowserRouter } from 'react-router-dom'
import { Browse, Manage, Login } from './components'

import { IRouteItem, RouteItem } from './route/routeItem'
import { RedirectRouteItem } from './route/redirectRouteItem'

import { AppState } from './state';
import { AuthState, LoginState } from '../shared/dto/auth';
import { updateAuthStateAction } from './state/auth/action';
import { Navbar, Nav } from 'react-bootstrap';

const loggedInRouteItems: IRouteItem[] = [Browse, Manage, new RedirectRouteItem("api/auth/logout", "Logout")];
const loggedOutRouteItems: IRouteItem[] = [Browse, Login];

type AppRouteProps = {
  authState: AuthState
}

type AppRouteDispatch = {
  updateAuthState: () => void
}

class AppRouter extends React.Component<AppRouteProps & AppRouteDispatch> {

  componentDidMount() {
    this.props.updateAuthState();
  }

  private getRouteItems(): IRouteItem[] {
    switch (this.props.authState.loginState) {
      case LoginState.LoggedOut:
        return loggedOutRouteItems;
      case LoginState.LoggedIn:
        return loggedInRouteItems;
    }
    return [];
  }

  render() {

    let routeItems = this.getRouteItems();

    return (
      <BrowserRouter>
        <div>
          <Navbar fluid collapseOnSelect className="main-nav">
            <Navbar.Header>
              <Navbar.Brand>
                <a href="#brand">Bookem!</a>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
              <Nav>
                {
                  routeItems.map(item => item.getNavBarRender())
                }
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <Switch>
            {
              routeItems.map(item => item.getSwitchRender())
            }
            { // default to the first route in the path when no match, but make sure routeComponents isn't empty
              routeItems.length &&
              <Route exact path="*" render={() => <Redirect to={`/${(routeItems[0] as RouteItem).routePath}`} />} />
            }
          </Switch>
        </div>
      </BrowserRouter>
    )
  }

}

const mapStateToProps: (state: AppState) => AppRouteProps
  = (state) => ({
    authState: state.auth
  })

const mapDispatchToProps: (dispatch: Function) => AppRouteDispatch
  = (dispatch) => ({
    updateAuthState: () => dispatch(updateAuthStateAction())
  })

const connectedAppRouter = connect(mapStateToProps, mapDispatchToProps)(AppRouter);

export default connectedAppRouter;