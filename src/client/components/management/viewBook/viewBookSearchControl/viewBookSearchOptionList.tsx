import * as React from 'react';
import { Table, Button } from 'react-bootstrap'

export class ViewBookSearchOptionlist extends React.Component {


  render() {
    return <div>

      <Table condensed bordered striped>
        <thead>
          <tr>
            <th className={"col-xs-3"}>Field</th>
            <th className={"col-xs-1"}>Operation</th>
            <th className={"col-xs-6"}>Value</th>
            <th className={"col-xs-2"}><Button block>Add</Button></th>
          </tr>
        </thead>
        <tbody>
          {['one', 'two', 'three'].map(val => {
            return <tr>
              <td className={"col-xs-3"}>Title</td>
              <td className={"col-xs-1"}>=</td>
              <td className={"col-xs-6"}>{val}</td>
              <td className={"col-xs-2"}><Button block>Remove</Button></td>
            </tr>
          })}
        </tbody>
      </Table>
    </div>

  }
}