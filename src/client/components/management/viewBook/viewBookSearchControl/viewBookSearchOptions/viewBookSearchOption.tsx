import * as React from 'react';
import { style, media } from 'typestyle';
import { Button, ListGroupItem, Row, Col, Checkbox } from 'react-bootstrap'
import { BookSearchDetail, ViewBookSearchType, BookSearchDetailOption } from '../../../../../models/manageBookSearchOption'

const cssClass = style({
  $nest: {
    '&>div>div>*': {
      height: "34px", // set everything to same height as button      
      width: "100%",
      textAlign: "center",
      verticalAlign: "middle"
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
  option: BookSearchDetailOption
  allFields: BookSearchDetail[]
  idx: number
  onChangeField: (field: string, idx: number) => void
  onChangeValue: (value: string | boolean, idx: number) => void
  onRemove: (idx: number) => void
}

export class ViewBookSearchOption extends React.Component<ViewBookSearchOptionProps> {

  render() {

    let input: JSX.Element | null = null;

    switch (this.props.option.type) {
      case ViewBookSearchType.Number:
      case ViewBookSearchType.String:
        let inputType = this.props.option.type == ViewBookSearchType.String ? "text" : "number";
        input = <input type={inputType} value={this.props.option.curValue as string} onChange={(e) => this.props.onChangeValue(e.target.value, this.props.idx)} />
        break;
      case ViewBookSearchType.Bool:
        input = <Checkbox defaultChecked={this.props.option.curValue as boolean} onChange={() => this.props.onChangeValue(!this.props.option.curValue, this.props.idx)} >
          Is Fiction?
        </Checkbox>
    }

    return <ListGroupItem className={cssClass}>
      <Row>
        <Col xs={6} md={4}>
          <select value={this.props.option.shortName} onChange={(e) => this.props.onChangeField(e.target.value, this.props.idx)} >
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
          {input}
        </Col>

      </Row>
    </ListGroupItem>
  }
}