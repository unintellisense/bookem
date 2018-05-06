import * as React from 'react'
import { RouteComponentWrapper } from '../index'
import { Button, Grid, Row, Col, FormGroup, ControlLabel, FormControl, FormControlProps, HelpBlock } from 'react-bootstrap'

type AddBooksProps = {
  isbn: string
  title: string
}

class AddBooks extends React.Component<{}, AddBooksProps> {

  constructor(props: {}) {
    super(props);
    this.state = { isbn: '', title: '' };
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
      <Grid>
        <Row className="display-flex">
          <Col md={12} xs={12}>
            <ControlLabel>Isbn</ControlLabel>
          </Col>
        </Row>
        <Row className="display-flex">
          <Col md={9} xs={9}>
            <FormGroup controlId="isbnInput" validationState={this.validateIsbnValue()}>
              <FormControl type="text" value={this.state.isbn} placeholder="Enter isbn" onChange={this.handleChangeFor('isbn')} />
              {/* commented out till I know if I need it <FormControl.Feedback /> */}
              <HelpBlock>Enter a 10 digit or 13 digit isbn.</HelpBlock>
            </FormGroup>
          </Col>
          <Col md={3} xs={3}>
            <Button className="align-middle">Search</Button>
          </Col>
        </Row>
        <Row className="display-flex">
          <Col md={1} xs={1}>
            <ControlLabel>Title</ControlLabel>
          </Col>
          <Col md={11} xs={11}>
            <FormGroup controlId="titleInput">
              <FormControl type="text" value={this.state.title} placeholder="Enter title" onChange={this.handleChangeFor('title')} />
            </FormGroup>
          </Col>
        </Row>
      </Grid>
    )
  }
}

const wrapper: RouteComponentWrapper = {
  component: AddBooks,
  routeLabel: 'Add Books',
  routePath: 'addBooks'
}

export default wrapper;