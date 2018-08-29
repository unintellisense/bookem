import { Button } from "react-bootstrap";
import React = require("react");

export type RedirectLinkWrapper =
  RedirectLinkProps & { isRedirect: true };

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