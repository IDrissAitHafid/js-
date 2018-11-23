#!/usr/bin/env node
var ileDeFranceArray = require('./ileDeFranceArray.json')
const [, , ...args] = process.argv

var checkIfOpen = (openingDates, day = (new Date).getDay(), hour = (new Date).getHours() + 'h' + (new Date).getMinutes(), museum = 'Musée du Louvre') => {
	var weekDays = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
	if (typeof (day) == 'number') {
		day = weekDays[day];
	}
	day = day.toLowerCase()
	hour = hour.toLowerCase()
	Object.keys(openingDates).forEach(d => {
		if (d == day) {
			var hours = openingDates[day].split('-');
			var start = parseFloat(hours[0].replace(/h/g, '.'));
			var end = parseFloat(hours[1].replace(/h/g, '.'));
			var cmp = parseFloat(hour.replace(/h/g, '.'));
			if (isBetween(start, cmp, end)) {
				console.log(`${museum} is OPENED.`);
			}
			// else{
			// 	console.log(`${museum} is CLOSED.`);
			// 	console.log(`The Opening Hours of ${museum} are`, openingDates[day]);
			// }
		}
	})
	// if(!Object.keys(openingDates).includes(day)){
	// 	console.log(`${museum} is CLOSED.`);
	// 	console.log(`The Opening Days of ${museum} are`, Object.keys(openingDates));
	// }
}

//check if cmp is between start and end
var isBetween = (start, cmp, end) => {
	return start <= cmp && end >= cmp;
}

//Bonus 5: suggest other open museum if a city is provided as argument too
var OpenedMuseumsInCity = (city) => {
	if (city != null) {
		city = city.toUpperCase();
		ileDeFranceArray.forEach(e => {
			if (e['ville'] == city) {
				checkIfOpen(e['periodeOuverture'], args[0], args[1], e['nomDuMusee']);
			}
		})
	} else {//check if the Louvre museum is open
		ileDeFranceArray.forEach(e => {
			if (e['nomDuMusee'] == 'Musée du Louvre') {
				checkIfOpen(e['periodeOuverture'], args[0], args[1]);
			}
		})
	}
}

OpenedMuseumsInCity(args[2]);

