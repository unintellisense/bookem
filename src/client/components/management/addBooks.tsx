import * as React from 'react'
import { RouteComponentWrapper } from '../index'
import { Alert, Form, FormGroup, Button, InputGroup, ControlLabel, FormControl, FormControlProps } from 'react-bootstrap'

const defaultIsbnText = 'Enter a 10 digit or 13 digit isbn.';

type AddBooksProps = {
  dialogMessage: string
  isbn: string
  title: string
  description: string
}

class AddBooks extends React.Component<{}, AddBooksProps> {

  constructor(props: {}) {
    super(props);
    this.state = { isbn: '', title: '', description: '', dialogMessage: '' };
  }

  private handleIsbnSearchClick = (e: React.FormEvent<HTMLInputElement>) => {
    e.currentTarget.value
  }

  private handleChangeFor = (propName: keyof AddBooksProps) => (e: React.FormEvent<FormControlProps>) => {
    this.setState({ ...this.state, [propName]: e.currentTarget.value });
  }

  private validateIsbnValue() {
    const length = this.state.isbn.length;
    if (length == 10 || length == 13) return 'success';
    if (length > 0) return 'error';
    return null;
  }

  render() {
    return (
      <Form horizontal className="container-fluid">
        <Alert className={this.state.dialogMessage ? '' : 'invisible'} >
          {this.state.dialogMessage ? this.state.dialogMessage : '&#65279'} /**zero width non breaking space to preserve height */
        </Alert>
        <FormGroup controlId="isbnInput" validationState={this.validateIsbnValue()}>
          <InputGroup>
            <InputGroup.Addon>Isbn</InputGroup.Addon>
            <FormControl type="text" value={this.state.isbn} placeholder={defaultIsbnText} onChange={this.handleChangeFor('isbn')} />
            <InputGroup.Button>
              <Button>Search</Button>
            </InputGroup.Button>
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <ControlLabel>Title</ControlLabel>
          <FormControl type="text" value={this.state.title} placeholder="Enter title" onChange={this.handleChangeFor('title')} />
        </FormGroup>
        <FormGroup>
          <ControlLabel>Description</ControlLabel>
          <FormControl componentClass="textarea" value={this.state.description} placeholder="Enter Description" onChange={this.handleChangeFor('description')} />
        </FormGroup>
        <FormGroup>
          <div className="well">
            <Button block>Submit</Button>
          </div>
        </FormGroup>
      </Form >
    )
  }
}

const wrapper: RouteComponentWrapper = {
  component: AddBooks,
  routeLabel: 'Add Books',
  routePath: 'addBooks'
}

export default wrapper;