import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LocationComponent } from './location/location.component';
import { ScheduleComponent } from './schedule/schedule.component'
import { SearchComponent } from './search/search.component';

export const ROUTES: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'location', component: LocationComponent},
  { path: 'schedule', component: ScheduleComponent},
  { path: 'search', component: SearchComponent },
  { path: '**', redirectTo: '' }
];
