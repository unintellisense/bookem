import * as React from 'react'
import { Book } from '../../../models/book'
import { getBooksByIsbn } from '../../../services/googleBookService'
import { toastError } from '../../../services/toastService'
import { FormControlProps, Col, InputGroup, FormControl, Button, ControlLabel, CheckboxProps } from 'react-bootstrap'
import { BookLookupModal } from './addBookModal'
import { BookCategoryTags } from '../common/bookCategoryTags'
import { SearchResultBook } from '../../../../shared/dto/googleBook';

type BookDetailProps = {
    book: Book
    partialCategoryTag: string
    bookUpdated: (book: Book) => any
    partialCategoryTagUpdated: (partial: string) => any
}

type BookDetailState = {
    searchedBooks?: SearchResultBook[]
}

const numberRegex = /^[0-9\-]*$/
const defaultIsbnText = 'Enter a 10 digit or 13 digit isbn.';

export class BookDetail extends React.Component<BookDetailProps, BookDetailState> {

    constructor(props: BookDetailProps) {
        super(props);
        this.state = {};
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
        let book = { ...this.props.book, [propName]: e.currentTarget.value };
        this.props.bookUpdated(book);
    }

    private handleNumberChangeForBook = (propName: keyof Book) => (e: React.FormEvent<FormControlProps>) => {
        let book = { ...this.props.book, [propName]: Number.parseInt(e.currentTarget.value as string) };
        this.props.bookUpdated(book);
    }

    private handleBooleanSelectForBook = (propName: keyof Book) => (e: React.FormEvent<CheckboxProps>) => {
        let book = { ...this.props.book, [propName]: e.currentTarget.value === 'true' };
        this.props.bookUpdated(book);
    }

    private handleCategoriesUpdateForBook = (tags: string[]) => {
        let book = { ...this.props.book, categories: tags };
        this.props.bookUpdated(book);
        this.props.partialCategoryTagUpdated('');
    }

    private handlePartialCategoryTagUpdate = (partial: string) => {
        this.props.partialCategoryTagUpdated(partial);
    }

    private applyBookState = (searchedBook: SearchResultBook) => {
        let newBook: Book = {
            title: searchedBook.title || '',
            description: searchedBook.description || '',
            authors: searchedBook.authors || '',
            yearPublished: searchedBook.yearPublished,
            categories: searchedBook.categories || [],
            bookSeriesNumber: this.props.book.bookSeriesNumber, // preserve
            libraryIdentifier: this.props.book.libraryIdentifier, // preserve
            isbn: this.props.book.isbn, // preserve
            isFiction: this.props.book.isFiction // not sure how to calculate this from API, preserve
        }
        this.props.bookUpdated(newBook);
        this.setState({ searchedBooks: [] });
    }

    private clearSearchedBooks = () => {
        this.setState({ ...this.state, searchedBooks: undefined });
    }

    private clearBookInputs = () => {
        this.props.bookUpdated(Book.GetDefaultBook());
        this.props.partialCategoryTagUpdated('');
    }

    render() {
        return <div>
            <Col sm={12} >
                <InputGroup>
                    <InputGroup.Addon>Isbn</InputGroup.Addon>
                    <FormControl type="text" value={this.props.book.isbn} placeholder={defaultIsbnText} onChange={this.handleChangeForBook('isbn')} />
                    <InputGroup.Button>
                        <Button onClick={(e) => { this.handleIsbnSearchClick(this.props.book.isbn) }}>Search</Button>
                    </InputGroup.Button>
                </InputGroup>
            </Col>
            <Col sm={10} >
                <ControlLabel>Title</ControlLabel>
                <FormControl type="text" value={this.props.book.title} placeholder="Enter title" onChange={this.handleChangeForBook('title')} />
            </Col>
            <Col sm={2} className='mobile-vert-spacing' >
                <ControlLabel>Year Published</ControlLabel>
                <FormControl type="number" value={this.props.book.yearPublished || ''} onChange={this.handleNumberChangeForBook('yearPublished')} />
            </Col>
            <Col sm={6} className='mobile-vert-spacing' >
                <ControlLabel>Authors</ControlLabel>
                <FormControl type="text" value={this.props.book.authors} onChange={this.handleChangeForBook('authors')} />
            </Col>
            <Col sm={2} xs={6} className='mobile-vert-spacing' >
                <ControlLabel>Library Id</ControlLabel>
                <FormControl type="text" value={this.props.book.libraryIdentifier} onChange={this.handleChangeForBook('libraryIdentifier')} />
            </Col>
            <Col sm={2} xs={6} className='mobile-vert-spacing' >
                <ControlLabel>Book Series Number</ControlLabel>
                <FormControl type="number" value={this.props.book.bookSeriesNumber || ''} onChange={this.handleNumberChangeForBook('bookSeriesNumber')} />
            </Col>
            <Col sm={2} className='mobile-vert-spacing' >
                <ControlLabel>Fiction?</ControlLabel>
                <FormControl componentClass="select" value={this.props.book.isFiction ? 'true' : 'false'} onChange={this.handleBooleanSelectForBook('isFiction')}>
                    <option value={'false'}>Non Fiction</option>
                    <option value={'true'}>Fiction</option>
                </FormControl>
            </Col>
            <Col sm={12} className='all-vert-spacing'>
                <ControlLabel>Description</ControlLabel>
                <FormControl componentClass="textarea" rows={3} value={this.props.book.description} placeholder="Enter Description" onChange={this.handleChangeForBook('description')} />
            </Col>
            <Col md={12} className='mobile-vert-spacing' >
                <ControlLabel>Categories</ControlLabel>
                <BookCategoryTags
                    tags={this.props.book.categories}
                    updateTags={this.handleCategoriesUpdateForBook}
                    partialCategoryTag={this.props.partialCategoryTag}
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