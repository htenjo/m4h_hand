import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import { Activity, ActivityItem, Event, Location } from '../shared_components/model';

import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/take'
import 'rxjs/add/operator/map';

@Injectable()
export class EventService {
  private events: Event[];
  private eventsObservable : Observable<Event[]>;
  private jsonURL = './assets/data/events.json';

  constructor(private http:Http) {
    this.listLoadedEvents()
    .subscribe(
      list => {
        this.events = list;
      }, 
      error => {
        console.log("*** error -> ", error);
      }
    );
  }

  listLoadedEvents() : Observable<Event[]> {
    if(!this.eventsObservable) {
      this.eventsObservable = this.http
        .get(this.jsonURL)
        .map(res => <Event[]>res.json()).take(1);
    }
    
    return this.eventsObservable;
  }
}