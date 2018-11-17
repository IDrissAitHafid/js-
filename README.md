# Exercises instructions

expectations:

- write clean code
- ensure your code will run in the expected environment (node or browser)
- deliver all the code in one GIT repository (fork the original if provided), each exercises MUST be treated like a feature of the project. That means you'll have to create a new git branch for each exercise and merge this branch in the master branch once the exercise is completed. Bonus can be treated as independent features and should be developped in dedicated branches too. 

## nodeJS - exercise 1

You've been asked to implement a palindrome finder, the goal is to find [palindromes](https://en.wikipedia.org/wiki/Palindrome) in a provided list of words

- write your implementation between the following comments, none of the above and below lines should be modified:

```
// ------------------------------------>
// please start your implementation below:
//

	// your code here

//
// end of your implementation
// ----------------------------------- <
```
- you don't need to add/install external script/modules

your implementation must be compatible with a Node environment >= 6.9.2


## nodeJS - exercise 2

You've been asked to reuse your implementation in a modular way.

## nodeJS - exercise 3

You've been asked to display the opening hours of the Louvre museum when executing the file in `node-js/ex3/get-le-louvre-schedule.js`,
the informations will be displayed as a result in the command line.

data must be fetched from the openData API, and can be retrieved from the following dataset:
[https://www.data.gouv.fr/api/1/datasets/53699934a3a729239d2051a1/](https://www.data.gouv.fr/api/1/datasets/53699934a3a729239d2051a1/)

- html version : [https://www.data.gouv.fr/fr/datasets/liste-et-localisation-des-musees-de-france/](https://www.data.gouv.fr/fr/datasets/liste-et-localisation-des-musees-de-france/)
- the API documentation (the endpoint we want to use): [https://www.data.gouv.fr/fr/apidoc/#!/datasets/get_dataset](https://www.data.gouv.fr/fr/apidoc/#!/datasets/get_dataset) 

from this dataset, you'll find the required resources. You have to take the most updated data in the odt format.

mandatory steps:

- fetch data from openData
- download and parse the odt data file
- display in the command line the opening hours of the Louvre museum

bonus steps (nice to have but not required):

- Bonus 1: create a json file containing an array of the museum in "ILE-DE-FRANCE" region (NOMREG)
- Bonus 2: on the same json file: filter and transform the following keys in camelCase or snake case, feel free to translate key names in english:
	- NOM DU MUSEE, 
	- ADR, 
	- VILLE, 
	- CP, 
	- SITEWEB, 
	- PERIODE OUVERTURE
- Bonus 3: on the same json file: convert opening hours into a usefull readable format ( see Bonus 4 for exemple usage)
- Bonus 4: create a cli script that display (in the command line) if the Louvre museum is open on a given date (fallback to current date if no date is specified). This information should be retrieved from the previous json file
- Bonus 5: make previous script suggest other open museum if a city is provided as argument too.

your implementation must be compatible with a Node environment >= 6.9.2, you are free to use any libraries that can help you.

-------------------------------------------------

## angular - exercise 1

You've been asked to write an application with angular which will be a clock that display the current time in different cities.

expectations:

- bootstrap your angular project with angular-cli
- clock must refresh itself every seconds
- each cities are accessible via url (localhost:3000/#/clock/paris, localhost:3000/#/clock/new-york)
- clean html/css, example of rendering: [Paris clock example](./angular/ex1/sample-image/oclock-paris.png), [NewYork clock example](./angular/ex1/sample-image/oclock-new-york.png) , [Shanghai clock example](./angular/ex1/sample-image/oclock-shanghai.png) 
- you must create a clock module which have it's own services, components, router, ...
- you are encouraged to use well known established external library for date and timezone management in order to make your application more robust and accelerate your development time.
- you are encouraged to modify the webpack configuration to fit your needs
- city and timezone information are provided dynamically, you'll have to make an ajax request to the following url [http://localhost:3000/public/timezones.json
](http://localhost:3000/public/timezones.json) this file is located here: `angular/ex1/sample-timezones/timezones.json` and shouldn't be modified. Ajax request is expected to be in a service


bonus - nice to have but not required:

- toggle styles with a dark background and a light background
- dark and light background switch when the sun is down (between 8pm and 7am for example)
- add a new clock for a city via a search form in the links

