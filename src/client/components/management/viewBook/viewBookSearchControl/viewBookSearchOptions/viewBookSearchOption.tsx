import * as React from 'react';
import { Button } from 'react-bootstrap'

type ViewBookSearchOptionProps = {
  field: string
  allFields: { shortName: string, longName: string }[]
}

export class ViewBookSearchOption extends React.Component<ViewBookSearchOptionProps> {

  render() {

    return <tr>
      <td className={"col-xs-4"}>
        <select >
          {
            this.props.allFields.map(field => {
              return <option key={field.shortName}
                selected={field.shortName === this.props.field}>{field.longName}
              </option>
            })
          }
        </select>
      </td>
      <td className={"col-xs-6"}><input /></td>
      <td className={"col-xs-2"}><Button block>Remove</Button></td>
    </tr>
  }
}