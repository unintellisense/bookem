import * as React from 'react'
import { Book } from '../../../models/book'
import { getBooksByIsbn } from '../../../services/googleBookService'
import { toastError } from '../../../services/toastService'
import { FormControlProps, Col, InputGroup, FormControl, Button, ControlLabel, CheckboxProps } from 'react-bootstrap'
import { BookLookupModal } from './addBookModal'
import { BookCategoryTags } from './bookCategoryTags'
import { SearchResultBook } from '../../../../shared/dto/googleBook';

type BookDetailProps = {
    book: Book
    partialCategoryTag: string
    bookUpdated: (book: Book) => any
    partialCategoryTagUpdated: (partial: string) => any
}

type BookDetailState = {
    book: Book
    partialCategoryTag: string
    searchedBooks?: SearchResultBook[]
}

const numberRegex = /^[0-9\-]*$/
const defaultIsbnText = 'Enter a 10 digit or 13 digit isbn.';

export class BookDetail extends React.Component<BookDetailProps, BookDetailState> {

    constructor(props: BookDetailProps) {
        super(props);
        this.state = { book: props.book, partialCategoryTag: props.partialCategoryTag };
    }

    public componentWillReceiveProps(nextProps) {
        this.setState({ ...this.state, book: nextProps.book, partialCategoryTag: nextProps.partialCategoryTag });
    }

    private handleIsbnSearchClick = async (isbn?: string) => {
        if (isbn && isbn.match(numberRegex)) {
            let isbnString = isbn.match(/\d/g)!.join(''); // strip out digits and join them back together
            let searchResult = await getBooksByIsbn(isbnString);
            if (searchResult.length) {
                // setting searchedBooks will open the modal
                this.setState({ ...this.state, searchedBooks: searchResult })
            } else {
                toastError('ISBN search failed', 'no results found.');
            }
        } else {
            toastError('Invalid ISBN number', 'Please enter numbers and dashes only.');
        }
    }

    private handleChangeForBook = (propName: keyof Book) => (e: React.FormEvent<FormControlProps>) => {
        this.setState({ ...this.state, book: { ...this.state.book, [propName]: e.currentTarget.value } }, () => { this.props.bookUpdated(this.state.book) });

    }

    private handleNumberChangeForBook = (propName: keyof Book) => (e: React.FormEvent<FormControlProps>) => {
        let value = Number.parseInt(e.currentTarget.value as string);
        this.setState({ ...this.state, book: { ...this.state.book, [propName]: value } }, () => { this.props.bookUpdated(this.state.book) });

    }

    private handleBooleanSelectForBook = (propName: keyof Book) => (e: React.FormEvent<CheckboxProps>) => {
        this.setState({ ...this.state, book: { ...this.state.book, [propName]: e.currentTarget.value === 'true' } }, () => { this.props.bookUpdated(this.state.book) });
    }

    private handleCategoriesUpdateForBook = (tags: string[]) => {
        this.setState({ ...this.state, book: { ...this.state.book, categories: tags } }, () => { this.props.bookUpdated(this.state.book) })
    }

    private handlePartialCategoryTagUpdate = (partial: string) => {
        this.setState({ ...this.state, partialCategoryTag: partial }, () => { this.props.partialCategoryTagUpdated(this.state.partialCategoryTag); })
    }

    private applyBookState = (searchedBook: SearchResultBook) => {
        let newBook: Book = {
            title: searchedBook.title || '',
            description: searchedBook.description || '',
            authors: searchedBook.authors || '',
            yearPublished: searchedBook.yearPublished,
            categories: searchedBook.categories,
            bookSeriesNumber: this.state.book.bookSeriesNumber, // preserve
            libraryIdentifier: this.state.book.libraryIdentifier, // preserve
            isbn: this.state.book.isbn, // preserve
            isFiction: this.state.book.isFiction // not sure how to calculate this from API, preserve
        }
        this.setState({ ...this.state, book: newBook, searchedBooks: undefined }, () => { this.props.bookUpdated(this.state.book) });
    }

    private clearSearchedBooks = () => {
        this.setState({ ...this.state, searchedBooks: undefined });
    }

    private clearBookInputs = () => {
        this.setState({ ...this.state, book: Book.GetDefaultBook() }, () => { this.props.bookUpdated(this.state.book) });
    }

    render() {
        return <div>
            <Col sm={12} >
                <InputGroup>
                    <InputGroup.Addon>Isbn</InputGroup.Addon>
                    <FormControl type="text" value={this.state.book.isbn} placeholder={defaultIsbnText} onChange={this.handleChangeForBook('isbn')} />
                    <InputGroup.Button>
                        <Button onClick={(e) => { this.handleIsbnSearchClick(this.state.book.isbn) }}>Search</Button>
                    </InputGroup.Button>
                </InputGroup>
            </Col>
            <Col sm={10} >
                <ControlLabel>Title</ControlLabel>
                <FormControl type="text" value={this.state.book.title} placeholder="Enter title" onChange={this.handleChangeForBook('title')} />
            </Col>
            <Col sm={2} className='mobile-vert-spacing' >
                <ControlLabel>Year Published</ControlLabel>
                <FormControl type="number" value={this.state.book.yearPublished || ''} onChange={this.handleNumberChangeForBook('yearPublished')} />
            </Col>
            <Col sm={6} className='mobile-vert-spacing' >
                <ControlLabel>Authors</ControlLabel>
                <FormControl type="text" value={this.state.book.authors} onChange={this.handleChangeForBook('authors')} />
            </Col>
            <Col sm={2} xs={6} className='mobile-vert-spacing' >
                <ControlLabel>Library Id</ControlLabel>
                <FormControl type="text" value={this.state.book.libraryIdentifier} onChange={this.handleChangeForBook('libraryIdentifier')} />
            </Col>
            <Col sm={2} xs={6} className='mobile-vert-spacing' >
                <ControlLabel>Book Series Number</ControlLabel>
                <FormControl type="number" value={this.state.book.bookSeriesNumber || ''} onChange={this.handleNumberChangeForBook('bookSeriesNumber')} />
            </Col>
            <Col sm={2} className='mobile-vert-spacing' >
                <ControlLabel>Fiction?</ControlLabel>
                <FormControl componentClass="select" value={this.state.book.isFiction ? 'true' : 'false'} onChange={this.handleBooleanSelectForBook('isFiction')}>
                    <option value={'false'}>Non Fiction</option>
                    <option value={'true'}>Fiction</option>
                </FormControl>
            </Col>
            <Col sm={12} className='all-vert-spacing'>
                <ControlLabel>Description</ControlLabel>
                <FormControl componentClass="textarea" rows={3} value={this.state.book.description} placeholder="Enter Description" onChange={this.handleChangeForBook('description')} />
            </Col>
            <Col md={12} className='mobile-vert-spacing' >
                <ControlLabel>Categories</ControlLabel>
                <BookCategoryTags
                    tags={this.state.book.categories}
                    updateTags={this.handleCategoriesUpdateForBook}
                    partialCategoryTag={this.state.partialCategoryTag}
                    updatePartialTag={this.handlePartialCategoryTagUpdate}
                />
            </Col>
            <Col md={9} className='mobile-vert-spacing' >
                <Button block type="submit">Submit</Button>
            </Col>
            <Col mdOffset={1} md={2} className='mobile-vert-spacing'>
                <Button block type="button" onClick={this.clearBookInputs}>Reset</Button>
            </Col>
            <BookLookupModal onClose={this.clearSearchedBooks} searchedBooks={this.state.searchedBooks} applyBook={this.applyBookState} />
        </div>
    }

}