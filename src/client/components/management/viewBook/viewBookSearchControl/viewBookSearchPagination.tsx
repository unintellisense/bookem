import * as React from 'react';
import { Pagination, PaginationItem } from 'react-bootstrap'


// how many pages to show lower/higher than current page
const paginationRange = 2;
// number of pages to show besides first/last. 
// always paginationRange * 2 + 1 so we can keep our current page in center when possible
const paginationListSize = (paginationRange * 2) + 1;

type ViewBookSearchPaginationProps = {
  currentPage: number // current page selected
  currentPageCount: number // total pages available
  setCurrentPage: (currentPage: number) => void
}

export class ViewBookSearchPagination extends React.Component<ViewBookSearchPaginationProps> {

  setCurrentPage = (e) => {
    console.log(e);
  }

  calculateCurrentPages(): number[] {
    let pageRange: number[] = [];

    let startPage = Math.max((this.props.currentPage - paginationRange), 1);
    let endPage = Math.min((this.props.currentPage + paginationRange), this.props.currentPageCount);
    // make sure if we are near start/end we show number of values equal to paginationListSize if possible
    let pageCountDiff = paginationListSize - (endPage - (startPage - 1));
    startPage = Math.max(Math.min(startPage - pageCountDiff, this.props.currentPageCount), 1);
    //recalculate diff 
    pageCountDiff = paginationListSize - (endPage - (startPage - 1));
    endPage = Math.min(endPage + pageCountDiff, this.props.currentPageCount);
    while (startPage <= endPage) {
      pageRange.push(startPage);
      startPage++;
    }
    return pageRange;
  }

  render() {
    let pageRange = this.calculateCurrentPages();
    return <Pagination>
      {
        pageRange.map(val => <Pagination.Item active={val === this.props.currentPage} key={val} onClick={this.setCurrentPage} >{val}</Pagination.Item>)
      }
      <Pagination.Item>???</Pagination.Item>
    </Pagination>
  }



}