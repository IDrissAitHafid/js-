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
var req=require('request');
var fs = require('fs');
var XLSX = require('xlsx');

var workbook,result;
var lastModifiedData=[];

/*fetch data from openData API*/
request.open('GET', 'https://www.data.gouv.fr/api/1/datasets/53699934a3a729239d2051a1/', true);

request.onload = function () {

  var data = JSON.parse(request.responseText);
  if (request.status >= 200 && request.status < 400) {
    data.resources.forEach(res=> {
    	if(res.format=="ods"){
    		lastModifiedData.push(res.last_modified)
    		var mDate=maxDate(lastModifiedData)
    		if(res.last_modified==mDate){
    			result=res;
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
setTimeout(()=>{
	workbook = XLSX.readFile('museums.ods');
	var sheetName = workbook.SheetNames[0];
	var XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
	var json_object = JSON.stringify(XL_row_object);
	var meusemData = JSON.parse(json_object);
	meusemData.forEach(res =>{
		if(res['NOM DU MUSEE']=='Musée du Louvre'){
			console.log("PERIODE D'OUVERTURE:", res['PERIODE OUVERTURE']);
		}	
	})
}, 3000)


//a function that returns the max of dates contained in a list (we're using it to find the most updated data)
var maxDate = (all_dates) => {
	var max_dt = all_dates[0],
	 max_dtObj = new Date(all_dates[0]);
	all_dates.forEach(function(dt, index){
	  if ( new Date( dt ) > max_dtObj){
		  max_dt = dt;
		  max_dtObj = new Date(dt);
	  }
	});
	return max_dt;
}