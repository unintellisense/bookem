import { IRouteItem } from "./routeItem";
import React = require("react");


export class RedirectRouteItem implements IRouteItem {

  constructor(private href: string, private text: string) { }

  getNavBarRender() {
    return <RedirectLink href={this.href} text={this.text} />
  }

  getSwitchRender() { return null }

}

type RedirectLinkProps = {
  href: string
  text: string
}

export class RedirectLink extends React.Component<RedirectLinkProps> {
  render() {
    return <li role="presentation" >
      <a href={this.props.href}>{this.props.text}</a>
    </li >
  }
}