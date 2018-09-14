import { Route } from "react-router";
import * as React from 'react';
import { LinkContainer } from "react-router-bootstrap";
import { NavItem } from 'react-bootstrap';

export interface IRouteItem {
  getNavBarRender(prefix?: string): JSX.Element | null
  getSwitchRender(prefix?: string): JSX.Element | null
}

export class RouteItem implements IRouteItem {

  constructor(
    public readonly routeLabel: string,
    public readonly routePath: string,
    public readonly component: React.ComponentType
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
