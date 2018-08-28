import { Button } from "react-bootstrap";
import React = require("react");

export type RedirectLinkWrapper =
  RedirectLinkProps & { isAuth: true };

type RedirectLinkProps = {
  href: string
  text: string
}

export class RedirectLink extends React.Component<RedirectLinkProps> {
  render() {
    return <li
      onClick={() => { /* this isnt working, figure out */ window.location.href = this.props.text }}
      role="presentation" >
      <a>{this.props.text}</a>
    </li >
  }
}