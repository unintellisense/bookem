import * as React from 'react'
import { InvisibleRouteItem } from '../route'


export class Signup extends React.Component {

  render() {
    return "Signup"
  }
}

const routeItem = new InvisibleRouteItem("signup", Signup);

export default routeItem;