import * as parse from 'csv-parse'
import * as stringify from 'csv-stringify';
import { } from 'csv'
import * as fs from 'fs'
import * as path from 'path'
import { getBooksByIsbn } from '../../client/services/googleBookService'

const googleBooksApiKeyEnvName = 'GOOGLE_BOOKS_API_KEY';

const googleBooksApiKey = process.env[googleBooksApiKeyEnvName];

enum RowField {
  localId = 0,
  ISBN = 1,
  Author = 2,
  Title = 3
  // not sure others will be used for this function
}

type OutputRow = string[];

const dataFileName = path.resolve(__dirname, 'data.csv');
const apiRequestRate = 1000;

const outFileName = path.resolve(__dirname, 'output.csv');

const stringer = stringify();

stringer.on('readable', () => {
  let stringRow;
  while (stringRow = stringer.read()) {
    console.log(stringRow);
  }
}).on('finish', () => {
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
              //console.log(results[0]);
            } else {
              //write out what we had to begin with
              writeToStringer(stringer, row);
            }
          }).catch(e => {
            console.log(e);
            process.exit(69);
          })
        }, apiRequestRate)

        return;

      } else {
        //write out what we had to begin with
        writeToStringer(stringer, row);
      }
    }
  }).on('end', () => {
    stringer.end();
  });




fs.createReadStream(dataFileName).pipe(parser);


function writeToStringer(stringer: stringify.Stringifier, row: OutputRow) {
  stringer.write([row[RowField.Title], row[RowField.Author], row[RowField.localId], row[RowField.ISBN]]);
}