import * as React from 'react';
import { DropdownButton, MenuItem } from 'react-bootstrap'

export class ViewBookSearchPageCount extends React.Component {
  render() {
    return <DropdownButton
      title={'title?'}
      id={'viewBooks-pageCount'}
    >
      <MenuItem>10</MenuItem>
      <MenuItem>25</MenuItem>
      <MenuItem>50</MenuItem>
      <MenuItem>100</MenuItem>
    </DropdownButton>
  }
}