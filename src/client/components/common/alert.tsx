import * as React from 'react';
import { Alert as RBAlert } from 'react-bootstrap'

type AlertProps = {
  alertMessage: string
  bsStyle: "success" | "warning" | "danger" | "info" | undefined
}

export class Alert extends React.Component<AlertProps> {

  render() {
    return (
      <RBAlert bsStyle={this.props.bsStyle} className={this.props.bsStyle ? '' : 'invisible'}>
        {this.props.alertMessage}
      </RBAlert>
    )
  }

}