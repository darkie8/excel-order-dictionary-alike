# Excel file order formatter for Bengali & English

=========

A small library that orders a certain colomn of an excel file with dictionary like sorting and republish it. Available for Bengali and English

## NEW IN VERSION 1.0.12

Old Bug fixes.New method inclusion !!!
## Installation

  `npm install bengali-excel-order-dictionary`

## Usage

    const {orderExcel, orderExcelSpecificWorkSheet, orderJSON} = require('bengali-excel-order-dictionary');

    // import {orderExcel, orderExcelSpecificWorkSheet, orderJSON} from 'bengali-excel-order-dictionary';

    // use 'bng' for bengali alphabets and 'eng' for English Alphabets
    // the last param true returns formatted JSON, false return void
    
    const input = `https://xyz.com`; 
    // const input = fs.readFileSync('target.xlslx'); 
    
    const sortingColumn = ['sorting_column']; // column to be sorted of respective worksheets.
    const columnCount = [5]; // column numbers of respective worksheets.
    const sortingLang = 'bng';
    const path = 'downloads/dictionary.xlsx';
    const jsonResturn = true; 

    orderExcel(url, sortingColumn, sortingLang, path, jsonResturn).then(

    el => console.log(el)

    ).catch(e => console.error(e))

    // for certain worksheet
    orderExcelSpecificWorkSheet(input,'dictionarAy', sortingColumn[0],columnCount[0], sortingLang, path, jsonResturn).catch(e => console.error(e));

  Output should be an excel file with formatted column

    // for Sorting inside a JSON
    let jsontobesorted = [{
      C: 'মোটা',
      D: 'এত মোটা বই একদনে পড়া হয়ে গেছে।'
    },
    { C: 'গরম', D: 'বাইরে তো গরম।'},
    {
      C: 'পুরু',
      D: 'দুধের উপর পুরু সর জমেছে। ',
    }]
    orderJSON(jsontobesorted, 'C', jsontobesorted.length, 'bng')

  Output should be an JSON array

## Tests

  `not yet written`

## Contributing

In lieu of a formal style guide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code.
