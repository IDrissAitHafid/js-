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

var palindromeFinder = {

    find: () => {
        let l, j = 0
        for (var i = 0; i < DATA_SOURCE.length; i++) {
            if (typeof (DATA_SOURCE[i]) == "string") {
                j = 0
                toBeCompared = DATA_SOURCE[i].toLowerCase()
                toBeCompared = toBeCompared.replace(/[.,\/#!?$%\^&\*;:{}=\-_`~()\s]/g, '')
                l = toBeCompared.length
                while (j < Math.floor(l / 2)) {
                    if (toBeCompared[j] != toBeCompared[l - 1 - j]) {
                        break;
                    } else {
                        j++;
                    }
                }
                if (j >= Math.floor(l / 2)) {
                    outputPalindromes.push(DATA_SOURCE[i])
                }
            }
        }

        return outputPalindromes;
    },
    findOther: () => {
        let l, j = 0
        for (var i = 0; i < DATA_SOURCE.length; i++) {
            if (typeof (DATA_SOURCE[i]) == "string") {
                j = 0
                toBeCompared = DATA_SOURCE[i].toLowerCase()
                toBeCompared = toBeCompared.replace(/[.,\/#!?$%\^&\*;:{}=\-_`~()\s]/g, '')
                l = toBeCompared.length
                while (j < Math.floor(l / 2)) {
                    if (toBeCompared[j] != toBeCompared[l - 1 - j]) {
                        outputNotPalindromes.push(DATA_SOURCE[i])
                        break;
                    } else {
                        j++;
                    }
                }
            }
        }

        return outputNotPalindromes;
    }
}

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

