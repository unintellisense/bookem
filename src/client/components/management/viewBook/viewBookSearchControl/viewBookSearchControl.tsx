import * as React from 'react';
import { Grid } from 'react-bootstrap';
import { ViewBookSearchPagination } from './viewBookSearchPagination'

export class ViewBookSearchControl extends React.Component {
  render() {
    return <Grid >
      <ViewBookSearchPagination />
    </Grid>
  }
}