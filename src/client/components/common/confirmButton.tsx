import * as React from 'react';
import { Button, Col } from 'react-bootstrap'

type ConfirmButtonProps = {
  unconfirmedLabel: string
  confirmedLabel: string
  cancelLabel: string
  onConfirm: () => any
}

type ConfirmButtonState = {
  showConfirmCancel: boolean
}

export class ConfirmButton extends React.Component<ConfirmButtonProps, ConfirmButtonState> {

  constructor(props) {
    super(props);
    this.state = { showConfirmCancel: false };
  }

  setButtonState = (showConfirmCancel: boolean) => {
    this.setState({ showConfirmCancel });
  }

  onConfirm = () => {
    this.props.onConfirm();
    //this.setState({ showConfirmCancel: false });
  }

  render() {
    let rendering: JSX.Element;
    if (this.state.showConfirmCancel) {
      rendering =
        <div>
          <Col md={2} className='mobile-vert-spacing'>
            <Button block style={{ backgroundColor: '#fcb936' }} type="button" onClick={this.onConfirm} >{this.props.confirmedLabel}</Button>
          </Col>
          <Col md={1} className='mobile-vert-spacing'>
            <Button block type="button" onClick={() => { this.setButtonState(false) }} >{this.props.cancelLabel}</Button>
          </Col >
        </div>
    } else {
      rendering =
        <Col mdOffset={2} md={1} className='mobile-vert-spacing'>
          <Button block type="button" onClick={() => { this.setButtonState(true) }} >{this.props.unconfirmedLabel}</Button>
        </Col >
    }
    return rendering;
  }
}