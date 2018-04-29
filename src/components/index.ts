import Book from './book';
import Login from './login';
import LogOut from './logout';

export interface RouteComponentWrapper {
  routeLabel: string
  routePath: string
  component: React.ComponentType
}

export { Book, Login, LogOut };