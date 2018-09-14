import { IRouteItem } from ".";
import * as React from "react";
import { Route } from "react-router";

export class InvisibleRouteItem implements IRouteItem {

  constructor(
    public readonly routePath: string,
    public readonly component: React.ComponentType
  ) { }


  getNavBarRender(): JSX.Element | null { return null; }

  getSwitchRender(prefix?: string): JSX.Element | null {
    let path = `${prefix ? prefix : ''}/${this.routePath}`
    return <Route path={path} component={this.component} key={this.routePath} />
  }


}