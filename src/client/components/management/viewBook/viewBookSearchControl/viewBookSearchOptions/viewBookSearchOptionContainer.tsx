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
  { shortName: 'bookSeriesNumber', descName: 'Book Series #', type: ViewBookSearchType.Number }, // num
  { shortName: 'categories', descName: 'Categories', type: ViewBookSearchType.String }, // str
  { shortName: 'description', descName: 'Description', type: ViewBookSearchType.String }, // str
  { shortName: 'isbn', descName: 'ISBN', type: ViewBookSearchType.String }, // str
  { shortName: 'isFiction', descName: 'Fiction?', type: ViewBookSearchType.Bool }, // bool
  { shortName: 'libraryIdentifier', descName: 'Identifier', type: ViewBookSearchType.String }, // str
  { shortName: 'yearPublished', descName: 'Year Published', type: ViewBookSearchType.Number } // num
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
    let newField: BookSearchDetail = this.getSearchOptionFields()[0]
    let newOpt: BookSearchDetailOption;
    if (newField.type == ViewBookSearchType.Bool) {
      newOpt = { ...newField, curValue: false }
    } else {
      newOpt = { ...newField, curValue: '' }
    }
    let newList = this.props.bookSearchOptions.concat([newOpt]);
    this.props.updateBookSearchOptions(newList);
  }

  removeSearchOption = (idx: number) => {
    let newList = [...this.props.bookSearchOptions];
    newList.splice(idx, 1);
    this.props.updateBookSearchOptions(newList);
  }

  changeSearchOptionField = (newFieldName: string, idx: number) => {
    let searchListCopy = [...this.props.bookSearchOptions];
    let newField = BookSearchFields.find(field => field.shortName === newFieldName);
    if (!newField) return;
    let oldOption = searchListCopy[idx];
    let newOption: BookSearchDetailOption;
    if (newField.type === oldOption.type) {
      newOption = {
        ...newField, curValue: oldOption.curValue
      } as BookSearchDetailOption; // cast needed as TS cant tell this means the curValue types are same
    } else {
      if (newField.type === ViewBookSearchType.Bool) {
        newOption = { ...newField, curValue: false }
      } else {
        newOption = { ...newField, curValue: '' }
      }
    }
    searchListCopy[idx] = newOption;
    this.props.updateBookSearchOptions(searchListCopy);
  }

  changeSearchOptionValue = (newValue: string | boolean, idx: number) => {
    var newSearchList = [...this.props.bookSearchOptions];
    newSearchList[idx].curValue = newValue;
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

  searchOptionsToDescription = () => {
    let desc: string = this.props.bookSearchOptions.reduce((prevDesc, opt, i) => {
      if (i != 0) prevDesc += ', '
      prevDesc += `${opt.descName} has '${opt.curValue}'`
      return prevDesc
    }, ': ')
    return desc;
  }

  render() {
    return <Panel className={cssClass} expanded={this.props.panelExpanded} onToggle={this.afterToggle}>
      <Panel.Heading onClick={(this.togglePanel)}>
        <span>{this.props.panelExpanded ? triangleDown : triangleRight}</span> {/** triangle */}
        <span> Search Options {this.props.panelExpanded ? null : this.searchOptionsToDescription()}</span>
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
                option={opt}
                allFields={this.getSearchOptionFields(opt.shortName)}
                onChangeField={this.changeSearchOptionField}
                onChangeValue={this.changeSearchOptionValue}
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