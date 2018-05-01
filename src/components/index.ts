import Browse from './browse';
import Login from './login';
import LogOut from './logout';

export interface RouteComponentWrapper {
  routeLabel: string
  routePath: string
  component: React.ComponentType
}

export { Browse, Login, LogOut };