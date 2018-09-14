import * as React from 'react'
import { StandardRouteItem } from '../route'

class Browse extends React.Component {

  render() {
    return (
      <div>
        Browse
      </div>
    )

  }
}

const routeItem = new StandardRouteItem('Browse', 'browse', Browse);

export default routeItem;