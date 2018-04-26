import * as React from 'react';
import { Button } from 'react-bootstrap'
import { Route, BrowserRouter } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Book } from './book'
export class App extends React.Component {
  render() {
    return (  
      <BrowserRouter>
        <div>
          <LinkContainer exact to="/books">
            <Button>Books</Button>
          </LinkContainer>
          <Route path="/books" component={Book} />
        </div>
      </BrowserRouter>
    )
  }
}