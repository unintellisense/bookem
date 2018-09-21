import * as React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect, Switch, BrowserRouter } from 'react-router-dom'
import { Browse, Manage, Login, Signup } from './components'

import { IRouteItem, StandardRouteItem } from './route'
import { RedirectRouteItem } from './route/redirectRouteItem'

import { AppState } from './state';
import { AuthState, LoginState } from '../shared/dto/auth';
import { updateAuthStateAction } from './state/auth/action';
import { Navbar, Nav } from 'react-bootstrap';

const loggedInWithAccountRouteItems: IRouteItem[] = [Browse, Manage, new RedirectRouteItem("api/auth/logout", "Logout", true)];
const loggedInNoAccountRouteItems: IRouteItem[] = [Signup, new RedirectRouteItem("api/auth/logout", "Logout", true)];
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
      case LoginState.LoggedInNoUser:
        return loggedInNoAccountRouteItems;
      case LoginState.LoggedIn:
        return loggedInWithAccountRouteItems;
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
                  routeItems.filter(route => !route.pullRight)
                    .map(item => item.getNavBarRender())
                }
              </Nav>
              <Nav pullRight>
                {
                  routeItems.filter(route => route.pullRight)
                    .map(item => item.getNavBarRender())
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
              <Route exact path="*" render={() => <Redirect to={`/${(routeItems[0] as StandardRouteItem).routePath}`} />} />
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