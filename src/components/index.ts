import Browse from './browse';
import Login from './login';
import LogOut from './logout';
import { Manage } from './management';

export interface RouteComponentWrapper {
  routeLabel: string
  routePath: string
  component: React.ComponentType
}

export { Browse, Manage, Login, LogOut };