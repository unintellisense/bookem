import * as React from 'react'
import { RouteItem } from '../route'

class Browse extends React.Component {

  render() {
    return (
      <div>
        Browse
      </div>
    )

  }
}

const routeItem = new RouteItem('Browse', 'browse', Browse);

export default routeItem;