# Excel file order formatter for Bengali & English

=========

A small library that orders a certain colomn of an excel file with dictionary like sorting and republish it. Available for Bengali and English

## Installation

  `npm install @darkie8/excel-order-dictionary-alike`

## Usage

    var excel-order = require('@darkie8/excel-order-dictionary-alike');
    // import * as excel-order from '@darkie8/excel-order-dictionary-alike'

    zebra('https://url',
    "key", 5, 'bng', 'dictionary.xlsx').then(
    el => console.log(el)
     ).catch(e => console.error(e))
  
  Output should be an excel file with formatted column

## Tests

  `not yet written`

## Contributing

In lieu of a formal style guide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code.
