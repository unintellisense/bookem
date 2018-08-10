import * as React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../../../../state'
import { updateviewBookSearchPanelExpanded, updateviewBookSearchOptions } from '../../../../../state/manage/viewBook/action'
import { style } from 'typestyle';
import { Button, Panel, Row, Col, ListGroup } from 'react-bootstrap'
import { BookSearchDetail, ViewBookSearchType, BookSearchDetailOption } from '../../../../../models/manageBookSearchOption'
import { ViewBookSearchOption } from './viewBookSearchOption'

const cssClass = style({
  $nest: {
    '&>div>div>div': {
      textAlign: "center",
      verticalAlign: "middle",
      height: "34px",
      lineHeight: "34px" // necessary for vertical centering
    },
    '&>div>div>button': {
      width: "100%"
    }
  }
});

const BookSearchFields: BookSearchDetail[] = [
  { shortName: 'title', descName: 'Title', type: ViewBookSearchType.String }, // str
  { shortName: 'authors', descName: 'Authors', type: ViewBookSearchType.String }, // str
  { shortName: 'bookSeriesNumber', descName: 'Book Series #', type: ViewBookSearchType.String }, // num
  { shortName: 'categories', descName: 'Categories', type: ViewBookSearchType.String }, // str
  { shortName: 'description', descName: 'Description', type: ViewBookSearchType.String }, // str
  { shortName: 'isbn', descName: 'ISBN', type: ViewBookSearchType.String }, // str
  { shortName: 'isFiction', descName: 'Fiction?', type: ViewBookSearchType.String }, // bool
  { shortName: 'libraryIdentifier', descName: 'Identifier', type: ViewBookSearchType.String }, // str
  { shortName: 'yearPublished', descName: 'Year Published', type: ViewBookSearchType.String } // num
]

type ViewBookSearchOptionContainerProps = {
  bookSearchOptions: BookSearchDetailOption[]
  panelExpanded: boolean
}

type ViewBookSearchOptionContainerDispatch = {
  updateBookSearchOptions: (books: BookSearchDetailOption[]) => void
  updatePanelExpanded: (expanded: boolean) => void
}

const triangleRight = '\u25BA';
const triangleDown = '\u25BC';

export class ViewBookSearchOptionContainer extends React.Component<ViewBookSearchOptionContainerProps & ViewBookSearchOptionContainerDispatch> {

  constructor(props) {
    super(props);
    this.state = { bookSearchFieldList: [], panelExpanded: true }
  }

  addSearchOption = () => {
    // get first available field
    var newOption = { ...this.getSearchOptionFields()[0], curValue: '' };
    let newList = this.props.bookSearchOptions.concat([newOption]);
    this.props.updateBookSearchOptions(newList);
  }

  removeSearchOption = (idx: number) => {
    let newList = [...this.props.bookSearchOptions];
    newList.splice(idx, 1);
    this.props.updateBookSearchOptions(newList);
  }

  changeSearchOptionField = (newFieldName: string, idx: number) => {
    var newSearchList = [...this.props.bookSearchOptions];
    var newOpt = BookSearchFields.find(field => field.shortName === newFieldName);
    if (!newOpt) return;
    newSearchList[idx] = { ...newOpt, curValue: '' };
    this.props.updateBookSearchOptions(newSearchList);
  }

  getSearchOptionFields = (currentFieldName?: string) => {
    return BookSearchFields.filter(field => {
      return field.shortName === currentFieldName || // always return current field
        !this.props.bookSearchOptions.some(listField => listField.shortName === field.shortName) // and any fields not being used
    })
  }

  togglePanel = () => {
    this.props.updatePanelExpanded(!this.props.panelExpanded);
  }

  afterToggle = () => {
    // this doesn't get called by onToggle?
    console.log('toggle done')
  }

  render() {
    return <Panel className={cssClass} expanded={this.props.panelExpanded} onToggle={this.afterToggle}>
      <Panel.Heading onClick={(this.togglePanel)}>
        <span>{this.props.panelExpanded ? triangleDown : triangleRight}</span> {/** triangle */}
        <span> Search Options</span>
      </Panel.Heading>
      <Panel.Collapse>
        <Panel.Body>
          <Row>
            <Col xs={6} md={4}>Field</Col>
            <Col xsHidden smHidden lgHidden={false} md={6}>Value</Col>
            <Col xs={6} md={2}>
              <Button block onClick={this.addSearchOption}
                disabled={this.props.bookSearchOptions.length === BookSearchFields.length}>
                Add</Button>
            </Col>
          </Row>
        </Panel.Body>
        <ListGroup>
          {
            this.props.bookSearchOptions.map((opt, idx) => {
              return <ViewBookSearchOption
                key={idx}
                field={opt.shortName}
                allFields={this.getSearchOptionFields(opt.shortName)}
                onChangeValue={this.changeSearchOptionField}
                onRemove={this.removeSearchOption}
                idx={idx}
              />
            })
          }
        </ListGroup>
      </Panel.Collapse>
    </Panel>
  }
}

const mapStateToProps: (state: AppState) => ViewBookSearchOptionContainerProps
  = (state) => ({
    bookSearchOptions: state.manage.viewBook.search.searchOptions,
    panelExpanded: state.manage.viewBook.search.searchPanelExpanded
  })

const mapDispatchToProps: (dispatch: Function) => ViewBookSearchOptionContainerDispatch
  = (dispatch) => ({
    updatePanelExpanded: (expanded: boolean) => dispatch(updateviewBookSearchPanelExpanded(expanded)),
    updateBookSearchOptions: (options: BookSearchDetailOption[]) => dispatch(updateviewBookSearchOptions(options))
  })

const connectedViewBookSearchOptionContainer = connect(mapStateToProps, mapDispatchToProps)(ViewBookSearchOptionContainer);
export default connectedViewBookSearchOptionContainer;