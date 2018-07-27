import * as React from 'react';
import { Pagination, PaginationItem } from 'react-bootstrap'

type ViewBookSearchPaginationProps = {
  paginationRange: number // how many pages to show lower/higher than current page
  currentPage: number // current page selected
  currentPageCount: number // total pages available
  setCurrentPage: (currentPage: number) => void
}

export class ViewBookSearchPagination extends React.Component<ViewBookSearchPaginationProps> {

  get paginationListSize() { // always paginationRange * 2 + 1 so we can keep our current page in center when possible`
    return (this.props.paginationRange * 2) + 1;
  }

  calculateCurrentPages(): number[] {
    let pageRange: number[] = [];

    let startPage = Math.max((this.props.currentPage - this.props.paginationRange), 1);
    let endPage = Math.min((this.props.currentPage + this.props.paginationRange), this.props.currentPageCount);
    // make sure if we are near start/end we show number of values equal to paginationListSize if possible
    let pageCountDiff = this.paginationListSize - (endPage - (startPage - 1));
    startPage = Math.max(Math.min(startPage - pageCountDiff, this.props.currentPageCount), 1);
    //recalculate diff 
    pageCountDiff = this.paginationListSize - (endPage - (startPage - 1));
    endPage = Math.min(endPage + pageCountDiff, this.props.currentPageCount);

    while (startPage <= endPage) {
      pageRange.push(startPage);
      startPage++;
    }
    return pageRange;
  }

  render() {

    let pageRange: number[] = this.calculateCurrentPages();
    // use visibility to hide so it still maintains its space (no shuffling of positions)
    return <Pagination>
      <Pagination.First style={{ visibility: pageRange[0] > 1 ? 'initial' : 'hidden' }}
        onClick={() => { this.props.setCurrentPage(1) }} />
      <Pagination.Prev style={{ visibility: pageRange[0] > 1 ? 'initial' : 'hidden' }}
        onClick={() => { this.props.setCurrentPage(this.props.currentPage - 1) }} />
      {
        pageRange.map(val => <Pagination.Item active={val === this.props.currentPage} key={val} onClick={() => { this.props.setCurrentPage(val) }} >{val}</Pagination.Item>)
      }
      <Pagination.Next
        style={{ visibility: pageRange[pageRange.length - 1] < this.props.currentPageCount ? 'initial' : 'hidden' }}
        onClick={() => { this.props.setCurrentPage(this.props.currentPage + 1) }} />
      <Pagination.Last
        style={{ visibility: pageRange[pageRange.length - 1] < this.props.currentPageCount ? 'initial' : 'hidden' }}
        onClick={() => { this.props.setCurrentPage(this.props.currentPageCount) }} />
    </Pagination>
  }



}