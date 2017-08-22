import { Component, OnInit } from '@angular/core';

import { EventService } from '../shared_services/event.service';
import { Event, Activity } from '../shared_components/model';

@Component({
  selector: 'schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
  private selectedEvent:Event;
  private selectedDay:string;
  private selectedActivity:Activity = null;
  private events:Event[];
  private schedule;

  constructor(private eventService:EventService) {
  }

  /**
   * 
   */
  ngOnInit() {
    this.eventService.listEvents().subscribe(
      list => {
        this.events = list;
        this.onSelectEvent("Asocimano");
        this.onSelectDay("23");
      }, 
      error => {
        console.log("*** error -> ", error);
      }
    );
  }
  
  /**
   * 
   * @param eventName 
   */
  onSelectEvent(eventName:string) {
    this.selectedEvent = this.events.find(event => event.name === eventName);
    this.buildActivities();
    this.onUnselectActivity();
  }

  /**
   * 
   * @param day 
   */
  onSelectDay(day:string) {
    this.selectedDay = day;
    this.buildActivities();
    this.onUnselectActivity();
  }

  onSelectActivity(activity:Activity){
    this.selectedActivity = activity;
  }

  onUnselectActivity() {
    this.selectedActivity = null;
  }

  hasActivityItemsToDisplay() : boolean {
    if(this.selectedActivity != null && this.selectedActivity.activityItems && this.selectedActivity.activityItems.length > 0) {
      return true;
    }

    return false;
  }

  /**
   * 
   */
  buildActivities() {
    this.schedule = {};
    let times = this.getSchedules();
    
    for(let i=0; i < times.length; i++){
      let key = times[i];
      let activities:Activity[] = this.getActivitiesByTime(key);

      if(activities.length > 0 ){
        this.schedule[key] = activities;
      }
    }
  }

  /**
   * 
   */
  private getSchedules() : string[] {
    let schedules:string[] = [];
    let activities:Activity[] = this.selectedEvent.activities;
    let activity:Activity;

    for(let i=0; i <activities.length; i++){
      activity = activities[i];
      schedules.push(activity.startTime + ' - ' + activity.endTime);
    }

    return schedules;
  }

  /**
   * 
   */
  private getActivitiesByTime(time:string): Activity[] {
    return this.selectedEvent.activities.filter(activity => 
      time === activity.startTime + ' - ' + activity.endTime
      && activity.startTime.indexOf(this.selectedDay) > -1
    );
  }

  /**
   * 
   */
  private listSchedules () : string[] {
    return Object.keys(this.schedule);
  }

  getDate(dateString:string) : number {
    return Date.parse(dateString);
  }

  getStartDateFromTimeHeader(timeHeader:string) {
    let timeParts:string[] = timeHeader.split(" - ");
    return this.getDate(timeParts[0]);
  }

  getEndDateFromTimeHeader(timeHeader:string) {
    let timeParts:string[] = timeHeader.split(" - ");
    return this.getDate(timeParts[1]);
  }

  getLocationById(locationId:string) : string {
    return this.selectedEvent.locations.find(location => location.id === locationId).name;
  }

  getDayStyle(selectedDay:string) : string {
   return selectedDay === this.selectedDay ? 'optionSelected':'';
  }

  getEventStyle(selectedEventName:string) : string {
    return this.selectedEvent 
      && selectedEventName === this.selectedEvent.name ? 'optionSelected' : '';
  }
}
