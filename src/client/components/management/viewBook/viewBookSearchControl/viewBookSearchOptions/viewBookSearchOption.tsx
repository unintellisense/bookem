import * as React from 'react';
import { Button } from 'react-bootstrap'
import { BookSearchDetail } from './viewBookSearchOptionContainer'
type ViewBookSearchOptionProps = {
  field: string
  allFields: BookSearchDetail[]
  idx: number
  onChangeValue: (val: string, idx: number) => void
}

export class ViewBookSearchOption extends React.Component<ViewBookSearchOptionProps> {

  render() {

    return <tr>
      <td className={"col-xs-4"}>
        <select value={this.props.field} onChange={(e) => this.props.onChangeValue(e.target.value, this.props.idx)} >
          {
            this.props.allFields.map(field => {
              return <option value={field.shortName} key={field.shortName}>{field.descName}</option>
            })
          }
        </select>
      </td>
      <td className={"col-xs-6"}><input /></td>
      <td className={"col-xs-2"}><Button block>Remove</Button></td>
    </tr>
  }
}