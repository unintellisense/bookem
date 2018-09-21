import * as React from 'react'
import { Form, FormControlProps, Col, ControlLabel, FormControl, Alert, Button, Row } from 'react-bootstrap'
import { style } from 'typestyle';
import { connect } from 'react-redux';
import { InvisibleRouteItem } from '../route'
import { IUser, UserSelfModifiable } from '../../shared/dto/iuser';
import { createUserAction } from '../state/user'

type SignupState = UserSelfModifiable;

const DefaultState = {
  firstName: '',
  lastName: ''
}

const buttonMarginTopStyle = style({
  marginTop: '27px'
})

type SignupDispatch = {
  submitSignup: (signupState: SignupState) => void
}

class Signup extends React.Component<SignupDispatch, SignupState> {

  constructor(props) {
    super(props);
    this.state = DefaultState;
  }

  private handleChangeForUser = (propName: keyof IUser) => (e: React.FormEvent<FormControlProps>) => {
    let newState = { ...this.state };
    newState[propName] = e.currentTarget.value;
    this.setState(newState);
  }

  handleSubmit = (e: React.FormEvent<any>) => {
    e.preventDefault();
    this.props.submitSignup(this.state);
  }

  handleReset = (e: React.FormEvent<any>) => {
    e.preventDefault();
    this.setState(DefaultState);
  }

  render() {
    return <Form horizontal className="container-fluid" onSubmit={this.handleSubmit}>
      <Alert>Looks like you are a new user. Please use the form below to let us know some information about you.</Alert>
      <Col sm={12} >
        <ControlLabel>First Name</ControlLabel>
        <FormControl type="text" value={this.state.firstName || ''} placeholder="please enter first name" onChange={this.handleChangeForUser('firstName')} />
      </Col>
      <Col sm={12} >
        <ControlLabel>Last Name</ControlLabel>
        <FormControl type="text" value={this.state.lastName || ''} placeholder="please enter last name" onChange={this.handleChangeForUser('lastName')} />
      </Col>
      <Col sm={12} >
        <Button block className={buttonMarginTopStyle} type="submit">Submit</Button>
      </Col>
      <Col sm={12} >
        <Button block className={buttonMarginTopStyle} type="button" onClick={this.handleReset}>Reset</Button>
      </Col>
    </Form>
  }
}

const mapDispatchToProps: (dispatch: Function) => SignupDispatch
  = (dispatch) => ({
    submitSignup: (signupState: SignupState) => dispatch(createUserAction(signupState))
  })

const connectedSignup = connect<{}, SignupDispatch>(null, mapDispatchToProps)(Signup);

const routeItem = new InvisibleRouteItem("signup", connectedSignup);

export default routeItem;