import * as React from 'react'
import { Form, FormControlProps, Col, ControlLabel, FormControl } from 'react-bootstrap'
import { InvisibleRouteItem } from '../route'
import { IUser, UserSelfModifiable } from '../../shared/dto/iuser';

type SignupState = { [prop in keyof UserSelfModifiable]: UserSelfModifiable[prop] }

export class Signup extends React.Component<{}, SignupState> {

  constructor(props) {
    super(props);
    this.state = { firstName: '', lastName: '' };
  }

  private handleChangeForUser = (propName: keyof IUser) => (e: React.FormEvent<FormControlProps>) => {
    let newState = { ...this.state };
    newState[propName] = e.currentTarget.value;
    this.setState(newState);
  }

  handleSubmit = (e: React.FormEvent<any>) => {
    e.preventDefault
  }

  render() {
    return <Form horizontal className="container-fluid" onSubmit={this.handleSubmit}>
      <Col sm={12} >
        <ControlLabel>First Name</ControlLabel>
        <FormControl type="text" value={this.state.firstName || ''} placeholder="please enter first name" onChange={this.handleChangeForUser('firstName')} />
      </Col>
      <Col sm={12} >
        <ControlLabel>Last Name</ControlLabel>
        <FormControl type="text" value={this.state.lastName || ''} placeholder="please enter last name" onChange={this.handleChangeForUser('lastName')} />
      </Col>
    </Form>
  }
}

const routeItem = new InvisibleRouteItem("signup", Signup);

export default routeItem;