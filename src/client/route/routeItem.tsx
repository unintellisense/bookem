import { Route } from "react-router";
import * as React from 'react';
import { LinkContainer } from "react-router-bootstrap";
import { NavItem } from 'react-bootstrap';

export interface IRouteItem {
  getNavBarRender(): JSX.Element | null
  getSwitchRender(): JSX.Element | null
}

export class RouteItem implements IRouteItem {

  constructor(
    public readonly routeLabel: string,
    public readonly routePath: string,
    public readonly component: React.ComponentType
  ) { }


  getNavBarRender(): JSX.Element | null {
    return <LinkContainer to={`/${this.routePath}`} key={this.routeLabel}>
      <NavItem>{this.routeLabel}</NavItem>
    </LinkContainer >
  }

  getSwitchRender(): JSX.Element | null {
    return <Route path={`/${this.routePath}`} component={this.component} key={this.routeLabel} />
  }


}
