/**
 *
 * You've been asked to implement a palindrome finder for the following DATA_SOURCE.
 * We want to handle strings values only.
 * Non string values should be ignored without crashing or reporting error
 *
 * > implement one or multiple methods to find palindromes in the provided source
 *
 *
 * EXECUTION ENVIRONMENT:
 * node >= 6.9.2
 *
 */

const DATA_SOURCE = [
    'ada',
    'alla',
    1234,
    1234321,
    ['barab'],
    'essayasse',
    'lala',
    'malayalam',
    'imNotAPalindromeObviously'
];
let outputPalindromes = [];
let outputNotPalindromes = [];

// ------------------------------------>
// please start your implementation below:
//


//
// end of your implementation
// ----------------------------------- <

// should return words extracted from DATA_SOURCE that are palindromes:
console.log('found palindromes: ', palindromeFinder.find());

// should return words extracted from DATA_SOURCE that are not palindromes:
console.log('are not palindromes: ', palindromeFinder.findOther());

// should return words extracted from DATA_SOURCE  that are palindromes:
console.log('found palindromes: ', outputPalindromes);

// should return words extracted from DATA_SOURCE  that are not palindromes:
console.log('are not palindromes: ', outputNotPalindromes);

