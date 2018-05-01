import Browse from './browse';
import Manage from './manage';
import Login from './login';
import LogOut from './logout';

export interface RouteComponentWrapper {
  routeLabel: string
  routePath: string
  component: React.ComponentType
}

export { Browse, Manage, Login, LogOut };