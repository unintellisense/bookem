import * as React from 'react';
import { style, media } from 'typestyle';
import { Button, ListGroupItem, Row, Col } from 'react-bootstrap'
import { BookSearchDetail } from './viewBookSearchOptionContainer'

const cssClass = style({
  $nest: {
    '&>div>div>*': {
      height: "34px", // set everything to same height as button      
      width: "100%"
    }
  }
},
  media({ maxWidth: 991 }, {
    $nest: {
      '&>div>div': {
        margin: "5px 0px"
      }
    }
  }));

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
        <Col xs={6} md={4}>
          <select value={this.props.field} onChange={(e) => this.props.onChangeValue(e.target.value, this.props.idx)} >
            {
              this.props.allFields.map(field => {
                return <option value={field.shortName} key={field.shortName}>{field.descName}</option>
              })
            }
          </select>
        </Col>
        <Col xs={6} xsOffset={2} md={2} mdOffset={0} mdPush={6}>
          <Button block onClick={() => { this.props.onRemove(this.props.idx) }}>Remove</Button>
        </Col>
        <Col xs={12} md={6} mdPull={2}>
          <input type="text" />
        </Col>

      </Row>
    </ListGroupItem>
  }
}