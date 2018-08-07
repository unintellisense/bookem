import * as React from 'react';
import { style } from 'typestyle';
import { Button, ListGroupItem, Row, Col } from 'react-bootstrap'
import { BookSearchDetail } from './viewBookSearchOptionContainer'

const cssClass = style({
  $nest: {
    '&>div>div': {
      margin: "25px 0px"
    },
    '&>div>div>select': {
      width: "12rem"
    }
  }
});

type ViewBookSearchOptionProps = {
  field: string
  allFields: BookSearchDetail[]
  idx: number
  onChangeValue: (val: string, idx: number) => void
  onRemove: (idx: number) => void
}

export class ViewBookSearchOption extends React.Component<ViewBookSearchOptionProps> {

  render() {

    return <ListGroupItem className={cssClass}>
      <Row>
        <Col xs={4} md={4}>
          <select value={this.props.field} onChange={(e) => this.props.onChangeValue(e.target.value, this.props.idx)} >
            {
              this.props.allFields.map(field => {
                return <option value={field.shortName} key={field.shortName}>{field.descName}</option>
              })
            }
          </select>
        </Col>
        <Col xs={6} xsOffset={2} md={2} mdOffset={0} mdPush={5}>
          <Button block onClick={() => { this.props.onRemove(this.props.idx) }}>&#9587;</Button>
        </Col>
        <Col xs={12} md={6}>
          <input type="text" />
        </Col>

      </Row>
    </ListGroupItem>
  }
}