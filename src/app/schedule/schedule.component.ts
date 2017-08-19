import { Component, OnInit } from '@angular/core';

import { EventService } from '../shared_services/event.service';

@Component({
  selector: 'schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
  constructor(private eventService:EventService) { }

  ngOnInit() {
  }

}
