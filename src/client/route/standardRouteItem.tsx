import { IRouteItem } from ".";
import { LinkContainer } from "react-router-bootstrap";
import * as React from "react";
import { NavItem } from "react-bootstrap";
import { Route } from "react-router";

export class StandardRouteItem implements IRouteItem {

  constructor(
    public readonly routeLabel: string,
    public readonly routePath: string,
    public readonly component: React.ComponentType,
    public readonly pullRight: boolean = false
  ) { }


  getNavBarRender(prefix?: string): JSX.Element | null {
    let to = `${prefix ? prefix : ''}/${this.routePath}`
    return <LinkContainer to={to} key={this.routeLabel}>
      <NavItem>{this.routeLabel}</NavItem>
    </LinkContainer >
  }

  getSwitchRender(prefix?: string): JSX.Element | null {
    let path = `${prefix ? prefix : ''}/${this.routePath}`
    return <Route path={path} component={this.component} key={this.routeLabel} />
  }


}