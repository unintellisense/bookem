import * as React from 'react';
import { DropdownButton, MenuItem } from 'react-bootstrap'
import { style } from 'typestyle';

const cssClass = style({
  marginTop: "20px",
  marginBottom: "20px",
  transform: "translateX(-50%)",
  $nest: {
    '&+ul': {
      transform: "translateX(-50%)"
    }
  }
})

type ViewBookSearchPageCountProps = {
  updatePageCount: (count: number) => void
  currentPageSize: number
  pageCountOptions: number[]
}

export class ViewBookSearchPageCount extends React.Component<ViewBookSearchPageCountProps> {

  onSelect = (value) => {
    this.props.updatePageCount(value);
  }
  render() {
    return <DropdownButton
      className={cssClass}
      title={this.props.currentPageSize}
      id={'viewBooks-pageCount'}      
      onSelect={this.onSelect}
    >
      {
        this.props.pageCountOptions.map(cnt => <MenuItem eventKey={cnt} key={cnt}>{cnt}</MenuItem>)
      }
    </DropdownButton>
  }
}