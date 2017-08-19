import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import { Activity, ActivityItem, Event, Location } from '../shared_components/model';

@Injectable()
export class EventService {
  private events:Event[];

  constructor(private http:Http) {
    this.http
      .get('/assets/data/events.json')
      .subscribe(res => {
        this.events = res.json();
      });
  }

  getEventsByTime() {
    let eventyByTime : Map<String, Event[]> = new Map();

    for (let event in this.events) {

    }
  }

  
}