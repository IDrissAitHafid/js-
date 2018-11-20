import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 


@Injectable({
  providedIn: 'root'
})
export class ClockService {
  constructor(private http: HttpClient) { 

  }
  //get the timezones data from timezones.json
  getTimeZones(){
    return this.http.get('http://localhost:3000/assets/timezones.json');
  }
 
}
