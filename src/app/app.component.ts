import { Component, OnInit } from '@angular/core';
import { EventService } from './shared_services/event.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(){
  }
}
