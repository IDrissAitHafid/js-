import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import * as moment from 'moment-timezone';
import { interval } from 'rxjs';
import { ClockService } from '../clock.service'

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.css']
})

export class ClockComponent implements OnInit {

  constructor (private route: ActivatedRoute, private clockservice:ClockService, private router: Router) {
    
  }
  arrZones;
  arrZonesValid = false;
  city;
  time;
  cityName;

  ngOnInit () {
    //get paris time by default
    if(this.city==null){
      this.router.navigate(['clock/paris'])
    }
    
    //get the timezones data and assign it to arrZones
    this.clockservice.getTimeZones().subscribe(
      data => {
        this.arrZones = data;
        this.arrZonesValid = true;
      }
    );

    //get the city param from the url then assing it to city 
    this.route.paramMap.subscribe(params => {
      this.city = params.get("city")
    })

    this.getTimeZone();

  }

  //get the timezone for each city every second
  getTimeZone(){
    interval(1000).subscribe(()=>{
      if(this.arrZonesValid){
        this.arrZones.forEach((e) =>{
          if(e.path == this.city){
            this.time = moment().tz(e.timezone).format(e.format);
            this.cityName = e.city;
          }
        })
      }
    })
  }

}
