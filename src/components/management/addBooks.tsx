import * as React from 'react'
import { RouteComponentWrapper } from '../index'
import { Grid, Row, Col, FormGroup, ControlLabel, FormControl, FormControlProps, HelpBlock } from 'react-bootstrap'
class AddBooks extends React.Component<{}, { isbnValue: string }> {

  constructor(props: {}) {
    super(props);
    this.state = { isbnValue: '' };
  }

  private handleIsbnSearchClick = (e: React.FormEvent<HTMLInputElement>) => {
    e.currentTarget.value
  }

  private handleIsbnUpdate = (e: React.FormEvent<FormControlProps>) => {

    this.setState({ isbnValue: e.currentTarget.value as string });
  }

  private validateIsbnValue() {
    const length = this.state.isbnValue.length;
    if (length == 10 || length == 13) return 'success';
    if (length > 0) return 'error';
    return null;
  }

  render() {
    return (
      <Grid>
        <Row>
          <Col md={9} xs={9}>
            <FormGroup controlId="formBasicText" validationState={this.validateIsbnValue()}>
              <ControlLabel>Isbn</ControlLabel>
              <FormControl type="text" value={this.state.isbnValue} placeholder="Enter isbn" onChange={this.handleIsbnUpdate} />
              {/* commented out till I know if I need it <FormControl.Feedback /> */}
              <HelpBlock>Enter a 10 digit or 13 digit isbn.</HelpBlock>
            </FormGroup>
          </Col>
          <Col md={3} xs={3}>
          </Col>
          <Col md={12} xs={12}>
            value: {this.state.isbnValue}
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