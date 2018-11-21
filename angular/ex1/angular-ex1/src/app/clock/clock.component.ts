import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import * as moment from 'moment-timezone';
import { interval } from 'rxjs';
import { ClockService } from '../clock.service'

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.css']
})

export class ClockComponent implements OnInit {

  constructor (private route: ActivatedRoute, private clockservice:ClockService, private renderer:Renderer2 ) {
    
  }
  arrZones;
  arrZonesValid = false;
  city;
  time;
  cityName;
  isDark=false;
  timezones=moment.tz.names();

  ngOnInit () {
    
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
            this.switchLightWhenDown(this.time,e.format,e.timezone);
          }
        })
      }
    })
  }

  //Bonus1: toggle styles with a dark background and a light background
  switchLight(){
    if(this.isDark){
      this.isDark=false;
      this.renderer.removeClass(document.body, 'dark-back');
      document.querySelector('#toggle-btn').textContent = 'Switch to dark';
    }else{
      this.isDark=true;
      this.renderer.addClass(document.body, 'dark-back');
      document.querySelector('#toggle-btn').textContent = 'Switch to light';
    }
  }

  //Bonus 2: dark and light background switch when the sun is down (between 8pm and 7am for example)
  switchLightWhenDown(time, format, tmz){
    var start = moment.tz('20:00:00', format, tmz);
    var midNight1 = moment.tz('23:59:59', format, tmz);
    var midNight2 = moment.tz('00:00:00', format, tmz);
    var end = moment.tz('07:00:00', format, tmz);
    var t = moment.tz(time, format, tmz);
    if(t.isBetween(start, midNight1) || t.isBetween(midNight2, end)){
      this.renderer.addClass(document.body, 'dark-back');
      document.querySelector('#toggle-btn').textContent = 'Switch to light';
    }else{
      this.renderer.removeClass(document.body, 'dark-back');
      document.querySelector('#toggle-btn').textContent = 'Switch to dark';
    }
  }

  //for adding a new timezone's clock
  addClock(timezone){
    var exist=false;
    this.arrZones.forEach(e=>{
      if(e.timezone==timezone){
        exist=true;
      }
    })
    if(timezone!='default' && !exist){
      var tz = timezone.split('/');
      var path = tz[tz.length -1];
      var city = path.split('_').join(' ');
      var zoneObj = {
        "path": path,
        "city": city,
        "timezone": timezone,
        "format": "H:mm:ss z"
      }
      this.arrZones.push(zoneObj);
    }
  }

}
