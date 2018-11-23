/**
 *
 * Exercice 3 - organise you source code as you wish.
 *
 * EXECUTION ENVIRONMENT:
 * node >= 6.9.2
 *
 */

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var request = new XMLHttpRequest();
var req = require('request');
var fs = require('fs');
var XLSX = require('xlsx');

var workbook, result;
var lastModifiedData = [];

/*fetch data from openData API*/
request.open('GET', 'https://www.data.gouv.fr/api/1/datasets/53699934a3a729239d2051a1/', true);

request.onload = function () {

	var data = JSON.parse(request.responseText);
	if (request.status >= 200 && request.status < 400) {
		data.resources.forEach(res => {
			if (res.format == "ods") {
				lastModifiedData.push(res.last_modified);
				var mDate = maxDate(lastModifiedData);
				if (res.last_modified == mDate) {
					result = res;
				}
			}
		});

		//load data into museums.ods3
		req(result.url).pipe(fs.createWriteStream('museums.ods'));
	} else {
		console.log('error');
	}
}

request.send();

/* read data from museums.ods */
var ileDeFranceArray = []
setTimeout(() => {
	workbook = XLSX.readFile('museums.ods');
	var sheetName = workbook.SheetNames[0];
	var XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
	var json_object = JSON.stringify(XL_row_object);
	var meusemData = JSON.parse(json_object);
	meusemData.forEach(res => {
		if (res['NOM DU MUSEE'] == 'Musée du Louvre') {
			console.log("PERIODE D'OUVERTURE de Musée du Louvre:", res['PERIODE OUVERTURE']);
		}
		if (res['NOMREG'] == 'ILE-DE-FRANCE') {//For Bonus 1
			ileDeFranceArray.push(res);
		}
	})
	//Bonus 2
	var newKey;
	ileDeFranceArray.forEach(e => {
		//for Bonus 3
		var cDate = changeDate(e['PERIODE OUVERTURE']);
		delete e['PERIODE OUVERTURE'];
		e['PERIODE OUVERTURE'] = cDate;
		Object.keys(e).forEach(key => {
			if (key == 'ADR' || key == 'VILLE' || key == 'CP') {
				newKey = key.toLowerCase();
				e[newKey] = e[key];
				delete e[key];
			} else if (key == 'NOM DU MUSEE' || key == 'PERIODE OUVERTURE') {
				newKey = key.toLowerCase();
				newKey = newKey.replace(/(\s\w)/g, (m) => m[1].toUpperCase());
				e[newKey] = e[key];
				delete e[key];
			} else if (key == 'SITWEB') {
				e['siteWeb'] = e[key];
				delete e[key];
			}
		})
	})
	var json = JSON.stringify(ileDeFranceArray, null, 4);
	fs.writeFile('ileDeFranceArray.json', json, 'utf8', () => { });
}, 3000)


//a function that returns the max of dates contained in a list (we're using it to find the most updated data)
var maxDate = (allDates) => {
	var maxDt = allDates[0],
		maxDtObj = new Date(allDates[0]);
	allDates.forEach(function (dt, index) {
		if (new Date(dt) > maxDtObj) {
			maxDt = dt;
			maxDtObj = new Date(dt);
		}
	});
	return maxDt;
}

//Bonus 3: convert opening hours into a usefull readable format
var changeDate = (date) => {
	var weekDays = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'];
	var days = [];
	var hoursRegExp = /^(\d|[01]\d|2[0-3])h([0-5]\d)?\sà\s([01]\d|2[0-3])h([0-5]\d)?$/;//exple: 14h30 à 16h
	var dateObj = {};
	var valid = false;
	if (date != null) {
		date = date.replace(/[,.]/g, "");
		var str = date.split(' ');
		for (i = 0; i < str.length; i++) {
			if (weekDays.includes((str[i]))) {
				days.push(str[i]);
			}
			if (i > 1) {
				var toTest = str[i - 2] + ' ' + str[i - 1] + ' ' + str[i];
				if (hoursRegExp.test(toTest)) {
					days.forEach(day => {
						dateObj[day] = str[i - 2] + '-' + str[i];
					})
					days = [];
				}
			}
			if (str[i + 1] == 'au') {//exple mardi au samedi
				weekDays.forEach(e => {
					if (e == str[i]) {
						valid = true;
					}
					if (valid) {
						for (j = 2; j < str.length; j++) {
							var toTest = str[j - 2] + ' ' + str[j - 1] + ' ' + str[j];
							if (hoursRegExp.test(toTest)) {
								dateObj[e] = str[j - 2] + '-' + str[j];
								days = [];
							}
						}
					}
					if (e == str[i + 2]) {
						valid = false;
					}

				})
			}
		}
	}
	return dateObj;
}