import * as React from 'react'
import { InvisibleRouteItem } from '../route/invisibleRouteItem'


export class Signup extends React.Component {

  render() {
    return "Signup"
  }
}

const routeItem = new InvisibleRouteItem("Signup", Signup);

export default routeItem;