# Excel file order formatter for Bengali & English

=========

A small library that orders a certain colomn of an excel file with dictionary like sorting and republish it. Available for Bengali and English

## Installation

  `npm install bengali-excel-order-dictionary`

## Usage

    const excel-order = require('bengali-excel-order-dictionary').zebra;

    // import excel-order from 'bengali-excel-order-dictionary'

    // use 'bng' for bengali alphabets and 'eng' for English Alphabets
    // the last param true returns formatted JSON, false return void
    
    const input = `https://xyz.com`; 
    // const input = fs.readFileSync('target.xlslx'); 

    const sortingColumn = 'sorting_column';
    const columnCount = 5;
    const sortingLang = 'bng';
    const path = 'downloads/dictionary.xlsx';
    const jsonResturn = true; 

    excel-order(url, sortingColumn, sortingLang, path, jsonResturn).then(

    el => console.log(el)

    ).catch(e => console.error(e))
  
  Output should be an excel file with formatted column

## Tests

  `not yet written`

## Contributing

In lieu of a formal style guide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code.
