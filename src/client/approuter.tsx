import * as React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect, Switch, BrowserRouter } from 'react-router-dom'
import { Browse, Manage, Login } from './components'
import { RouteWrapper, NavBarWrapper, RedirectLink } from './route'
import { AppState } from './state';
import { AuthState, LoginState } from '../shared/dto/auth';
import { updateAuthStateAction } from './state/auth/action';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const loggedInComponents: NavBarWrapper[] = [Browse, Manage, { isAuth: true, href: "api/auth/logout", text: "Logout" }];
const loggedOutComponents: NavBarWrapper[] = [Browse, Login];

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

  private getRouteComponents(): NavBarWrapper[] {
    switch (this.props.authState.loginState) {
      case LoginState.LoggedOut:
        return loggedOutComponents;
      case LoginState.LoggedIn:
        return loggedInComponents;
    }
    return [];
  }

  render() {

    let routeComponents = this.getRouteComponents();

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
                {routeComponents.map((wrap) => // add appropriate linkContainers 
                  wrap.isAuth ?
                    <RedirectLink href={wrap.href} text={wrap.text} /> :
                    <LinkContainer to={`/${wrap.routePath}`} key={wrap.routeLabel}>
                      <NavItem>{wrap.routeLabel}</NavItem>
                    </LinkContainer >
                )}
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <Switch>
            {routeComponents.map((wrap) => // add appropriate routes 
              wrap.isAuth ?
                null /* no need to render 'auth' page loads */
                :
                <Route path={`/${wrap.routePath}`} component={wrap.component} key={wrap.routeLabel} />
            )}
            { // default to the first route in the path when no match, but make sure routeComponents isn't empty
              routeComponents.length &&
              <Route exact path="*" render={() => <Redirect to={`/${(routeComponents[0] as RouteWrapper).routePath}`} />} />
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