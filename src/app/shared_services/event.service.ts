import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import { Activity, ActivityItem, Event, Location } from '../shared_components/model';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class EventService {
  constructor(private http:Http) {
  }

  listEvents() : Observable<Event[]> {
    return this.http
      .get('./assets/data/events.json')
      .map(res => <Event[]>res.json());
  }
}