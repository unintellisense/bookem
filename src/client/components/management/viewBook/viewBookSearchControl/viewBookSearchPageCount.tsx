import * as React from 'react';
import { DropdownButton, MenuItem } from 'react-bootstrap'

type ViewBookSearchPageCountProps = {
  updatePageCount: (count: number) => void
  pageCount: number
  pageCountOptions: number[]
}

export class ViewBookSearchPageCount extends React.Component<ViewBookSearchPageCountProps> {

  onSelect = (value) => {
    this.props.updatePageCount(value);
  }
  render() {
    return <DropdownButton
      title={this.props.pageCount}
      id={'viewBooks-pageCount'}
      style={{ marginTop: "20px", marginBottom: "20px" }}
      onSelect={this.onSelect}
    >
      {
        this.props.pageCountOptions.map(cnt => <MenuItem eventKey={cnt} key={cnt}>{cnt}</MenuItem>)
      }
    </DropdownButton>
  }
}