import { Component, OnInit } from '@angular/core';
import { EventService } from '../shared_services/event.service';
import { Event, Activity, Location, ActivityItem } from '../shared_components/model';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  private events:Event[];
  private schedule;
  private activities:Activity[];
  private items:ActivityItem[];
  private locations:Location[] = [];

  constructor(private eventService:EventService) { }

  ngOnInit() {
    this.eventService.listEvents().subscribe(
      list => {
        this.events = list;

        for(let i=0; i<this.events.length;i++){
          this.locations = this.locations.concat(this.events[i].locations);
        }
      }, 
      error => {
        console.log("*** error -> ", error);
      }
    );
  }

  /**
   * 
   */
  updateSearch(event:KeyboardEvent) {
    let searchTerm = (<HTMLInputElement>event.target).value.toLowerCase();
    this.activities = [];
    this.items = [];

    if(searchTerm.length > 0) {
      for(let i=0; i < this.events.length; i++) {
        let currentEvent:Event = this.events[i];

        for(let j=0; j < currentEvent.activities.length; j++){
          let activity:Activity = currentEvent.activities[j];
          let responsibles:string[] = activity.responsibles ? 
              activity.responsibles.filter(resp => resp.toLowerCase().indexOf(searchTerm) > -1) : [];
          let matchName:boolean = activity.name ? activity.name.toLowerCase().indexOf(searchTerm) > -1 : false;
            let matchDesc:boolean = activity.description ? activity.description.toLowerCase().indexOf(searchTerm) > -1 : false;
         
          if((matchName || matchDesc || responsibles.length > 0) && activity.indexed){
            this.activities.push(activity);
          }

          this.items = this.items.concat(this.getActivitiesItemsMatch(activity.activityItems, searchTerm));
        } 
      }
    }
  }

  /**
   * 
   */
  private getActivitiesItemsMatch(items:ActivityItem[], searchTerm:string) : ActivityItem[]{
    searchTerm = searchTerm.toLowerCase();
    let matchedItems:ActivityItem[] = [];

    if(items){
      matchedItems = items.filter(item => {
        let responsibles:string[] = item.responsibles ? 
          item.responsibles.filter(resp => resp.toLowerCase().indexOf(searchTerm) > -1) : [];
        let matchName:boolean = item.name ? item.name.toLowerCase().indexOf(searchTerm) > -1 : false;
        let matchDesc:boolean = item.description ? item.description.toLowerCase().indexOf(searchTerm) > -1 : false;
        return (matchName || matchDesc || responsibles.length > 0);
      });
    }
       
    return matchedItems;
  }

  /**
   * 
   */
  getLocationById(locationId:string) : string {
    return this.locations.find(location => location.id === locationId).name;
  }

  /**
   * 
   */
  getDate(dateString:string) : number {
    return Date.parse(dateString);
  }
}