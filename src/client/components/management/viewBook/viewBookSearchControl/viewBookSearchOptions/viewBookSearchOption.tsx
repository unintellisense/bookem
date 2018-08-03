import * as React from 'react';
import { Button, ListGroupItem, Row, Col } from 'react-bootstrap'
import { BookSearchDetail } from './viewBookSearchOptionContainer'
type ViewBookSearchOptionProps = {
  field: string
  allFields: BookSearchDetail[]
  idx: number
  onChangeValue: (val: string, idx: number) => void
  onRemove: (idx: number) => void
}

export class ViewBookSearchOption extends React.Component<ViewBookSearchOptionProps> {

  render() {

    return <ListGroupItem>
      <Row>
        <Col>
          <Col xs={4}>
            <select style={{ width: "12rem" }} value={this.props.field} onChange={(e) => this.props.onChangeValue(e.target.value, this.props.idx)} >
              {
                this.props.allFields.map(field => {
                  return <option value={field.shortName} key={field.shortName}>{field.descName}</option>
                })
              }
            </select>
          </Col>
          <Col xs={6}>
            <input type="text" />
          </Col>
          <Col xs={2}>
            <Button block onClick={() => { this.props.onRemove(this.props.idx) }}>Remove</Button>
          </Col>
        </Col>
      </Row>
    </ListGroupItem>
  }
}