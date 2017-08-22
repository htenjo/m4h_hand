import { Component, OnInit } from '@angular/core';
import { EventService } from '../shared_services/event.service';
import { Event, Activity, Location } from '../shared_components/model';

@Component({
  selector: 'location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {
  private events:Event[];
  private selectedEvent:Event;
  private selectedLocations:Location[];
  constructor(private eventService:EventService) { }

  ngOnInit() {
    this.eventService.listEvents().subscribe(
      list => {
        this.events = list;
        this.onSelectEvent("Asocimano");
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
    this.selectedLocations = this.selectedEvent.locations.sort(
      (locationA, locationB) => {
        if (locationA.name < locationB.name) return -1;
        if (locationA.name >= locationB.name) return 1;
      }
    );
  }


  getEventStyle(selectedEventName:string) : string {
    return this.selectedEvent 
      && selectedEventName === this.selectedEvent.name ? 'optionSelected' : '';
  }
}
