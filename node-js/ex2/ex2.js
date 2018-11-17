/**
 *
 * Your palindrome finder is a big success and will be used in multiple node projects
 * we will use it right now, and require it as a module.
 *
 *  > put your palindromeFinder code source as a module in the "./module" folder
 *  >
 *  > ensure this code works
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
const ANOTHER_DATA_SOURCE = [
    'detartrated',
    'aibohphobia',
    'imObviouslyNotAnotherPalindrome'
];

// ------------------------------------>
// please start your implementation below:
//

//
// end of your implementation
// ----------------------------------- <

// should return words extracted from DATA_SOURCE that are palindromes:
console.log('found palindromes: ',palindromeFinder.find());

// should return words extracted from DATA_SOURCE that are not palindromes:
console.log('are not palindromes: ',palindromeFinder.findOther());

// should return words extracted from ANOTHER_DATA_SOURCE that are palindromes:
console.log('found palindromes: ',anotherPalindromeFinder.find());

// should return words extracted from ANOTHER_DATA_SOURCE that are not palindromes:
console.log('are not palindromes: ',anotherPalindromeFinder.findOther());