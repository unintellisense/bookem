import * as parse from 'csv-parse'
import * as stringify from 'csv-stringify';
import { } from 'csv'
import * as fs from 'fs'
import * as path from 'path'
import { getBooksByIsbn } from '../../client/services/googleBookService'

const googleBooksApiKeyEnvName = 'GOOGLE_BOOKS_API_KEY';

const googleBooksApiKey = process.env[googleBooksApiKeyEnvName];

enum RowField { // original fields from input file
  localId = 0,
  ISBN = 1,
  Author = 2,
  Title = 3,
  YearPublished = 5,
  Category = 8,
  Synopsis = 10
  // not sure others will be used for this function
}

type BookResult = { // results from API call
  authors: string
  categories: string[] | null
  description: string
  title: string
  yearPublished: number | null
}

type InputRow = string[];

type OutputRow = {
  localId: string
  ISBN: string
  yearPublished: string | null
  authors: string
  categories: string | null
  description: string
  title: string
}

const dataFileName = path.resolve(__dirname, 'data.csv');
const apiRequestRate = 0;

const outFileName = path.resolve(__dirname, 'output.csv');

if (fs.existsSync(outFileName)) {
  fs.unlinkSync(outFileName);
}

let writer = fs.createWriteStream(outFileName);

const stringer = stringify();

stringer.on('readable', () => {
  let stringRow;
  while (stringRow = stringer.read()) {
    writer.write(stringRow);
  }
}).on('finish', () => {
  writer.close();
  console.log('all done!');
});



const parser = parse({ delimiter: ',' })
  .on('data', row => {
    let isbn = row[RowField.ISBN] as string;
    if (isbn) {
      let match = isbn.match(/\d/g);
      if (match) {
        let isbnString = match.join('');
        parser.pause(); // wait for our async call to complete
        setTimeout(() => {
          getBooksByIsbn(isbnString, googleBooksApiKey).then(results => {
            parser.resume();
            if (results.length === 1) {
              handleResultRow(stringer, row, results[0]);
            } else {
              //write out what we had to begin with
              handleOriginalRow(stringer, row);
            }
          }).catch(e => {
            console.log(e);
            process.exit(69);
          })
        }, apiRequestRate)

        return;

      } else {
        //write out what we had to begin with
        handleOriginalRow(stringer, row);
      }
    }
  }).on('end', () => {
    stringer.end();
  });




fs.createReadStream(dataFileName).pipe(parser);


function handleOriginalRow(stringer: stringify.Stringifier, row: InputRow) {
  let outputRow: OutputRow =
  {
    localId: row[RowField.localId],
    ISBN: row[RowField.ISBN],
    title: row[RowField.Title],
    authors: row[RowField.Author],
    categories: row[RowField.Category],
    yearPublished: row[RowField.YearPublished],
    description: row[RowField.Synopsis]
  }
  writeOutput(stringer, outputRow);
}

function handleResultRow(stringer: stringify.Stringifier, row: InputRow, result: BookResult) {
  let outputRow: OutputRow =
  {
    localId: row[RowField.localId],
    ISBN: row[RowField.ISBN],
    title: result.title,
    authors: result.authors,
    categories: result.categories && result.categories.join(', '),
    yearPublished: result.yearPublished ? result.yearPublished.toString() : row[RowField.YearPublished],
    description: result.description
  }
  writeOutput(stringer, outputRow);
}

let recCount = 0;

function writeOutput(stringer: stringify.Stringifier, output: OutputRow) {
  stringer.write([output.localId, output.ISBN, output.title, output.authors, output.categories, output.yearPublished, output.description]);
  console.log(`rec count: ${recCount++}`);
}
