import * as React from 'react'
import { Provider } from 'react-redux'
import ReduxToastr from 'react-redux-toastr'
import AppRouter from './approuter'
import { configureStore } from './configureStore'

export const store = configureStore();

export class App extends React.Component {

  loggedIn: boolean = false;

  render() {

    return (
      <div>
        <h1 className="text-center">Book Store</h1>
        <Provider store={store}>
          <div>
            <AppRouter />
            <ReduxToastr
              timeOut={2500}
              transitionIn="fadeIn"
              transitionOut="fadeOut"
              progressBar />
          </div>
        </Provider>
      </div>
    )
  }
}