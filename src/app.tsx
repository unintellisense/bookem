import * as React from 'react';
import { Button } from 'react-bootstrap'
import {} from 'react-router'
import { Route, BrowserRouter } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Book, Login, LogOut } from './components'

export class App extends React.Component {

  render() {
    return (
      <BrowserRouter>
        <div>
          <LinkContainer exact to="/books">
            <Button>Books</Button>
          </LinkContainer>
          <Route path="/books" component={Book} />
          <Route path="/login" component={Login} />
        </div>
      </BrowserRouter>
    )
  }
}