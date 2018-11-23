#!/usr/bin/env node
var ileDeFranceArray = require('./ileDeFranceArray.json')
const [,, ...args] = process.argv

var checkIfOpen = (openingDates, day = (new Date).getDay(), hour = (new Date).getHours()+'h'+(new Date).getMinutes()) => {
	var weekDays = ['dimanche','lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
	if(typeof(day)=='number'){
		day=weekDays[day];
	}
	day = day.toLowerCase()
	hour = hour.toLowerCase()
	Object.keys(openingDates).forEach(d => {
		if(d == day){
			var hours=openingDates[day].split('-');
			var start=parseFloat(hours[0].replace(/h/g,'.'));
			var end=parseFloat(hours[1].replace(/h/g,'.'));
			var cmp = parseFloat(hour.replace(/h/g,'.'));
			if (isBetween(start,cmp,end)) {
				console.log('The louvre meusem is OPEN.');
			}else{
				console.log('The louvre meusem is CLOSE.')
				console.log('The Opening Hours are', openingDates[day])
			}
		}
	})
}

//check if cmp is between start and end
var isBetween=(start,cmp,end) =>{
	return start<=cmp && end>=cmp;
}

//check if the Louvre museum is open 
ileDeFranceArray.forEach( e =>{
	if(e['nomDuMusee']=='Musée du Louvre'){
		checkIfOpen(e['periodeOuverture'], args[0], args[1]);
	}
})
