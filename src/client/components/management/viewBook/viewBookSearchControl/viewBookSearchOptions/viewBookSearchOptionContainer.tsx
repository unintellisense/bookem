import * as React from 'react';
import { style, media } from 'typestyle';
import { Button, Panel, Row, Col, ListGroup } from 'react-bootstrap'
import { IBook } from '../../../../../../shared/dto/ibook'
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

enum ViewBookSearchType {
  String,
  Number,
  Bool
}

export type BookSearchDetail = {
  shortName: keyof IBook, descName: string, type: ViewBookSearchType
}

type BookSearchDetailOption = BookSearchDetail & { curValue: string }

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

type ViewBookSearchOptionlistState = {
  bookSearchFieldList: BookSearchDetailOption[]
}

export class ViewBookSearchOptions extends React.Component<{}, ViewBookSearchOptionlistState> {

  constructor(props) {
    super(props);
    this.state = { bookSearchFieldList: [] }
  }

  addSearchOption = () => {
    // get first available field
    var newOption = { ...this.getSearchOptionFields()[0], curValue: '' };
    let newList = this.state.bookSearchFieldList.concat([newOption]);
    this.setState({ ...this.state, bookSearchFieldList: newList });
  }

  removeSearchOption = (idx: number) => {
    let newList = [...this.state.bookSearchFieldList];
    newList.splice(idx, 1);
    this.setState({ ...this.state, bookSearchFieldList: newList });
  }

  changeSearchOptionField = (newFieldName: string, idx: number) => {
    var newSearchList = [...this.state.bookSearchFieldList];
    var newOpt = BookSearchFields.find(field => field.shortName === newFieldName);
    if (!newOpt) return;
    newSearchList[idx] = { ...newOpt, curValue: '' };
    this.setState({ ...this.state, bookSearchFieldList: newSearchList })
  }

  getSearchOptionFields = (currentFieldName?: string) => {
    return BookSearchFields.filter(field => {
      return field.shortName === currentFieldName || // always return current field
        !this.state.bookSearchFieldList.some(listField => listField.shortName === field.shortName) // and any fields not being used
    })
  }

  render() {
    return <Panel className={cssClass}>
      <Panel.Heading>
        <span>&#9658;</span> {/** triangle */}
        <span> Search Options</span>
      </Panel.Heading>
      <Panel.Body>
        <Row>
          <Col xs={6} md={4}>Field</Col>
          <Col xsHidden smHidden lgHidden={false} md={6}>Value</Col>
          <Col xs={6} md={2}>
            <Button block onClick={this.addSearchOption}
              disabled={this.state.bookSearchFieldList.length === BookSearchFields.length}>
              Add</Button>
          </Col>
        </Row>
      </Panel.Body>
      <ListGroup>
        {
          this.state.bookSearchFieldList.map((opt, idx) => {
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
    </Panel>
  }
}