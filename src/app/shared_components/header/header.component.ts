import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  openMenu() {
    document.getElementById("mySidenav").style.width = "280px";
  }

  closeMenu() {
    document.getElementById("mySidenav").style.width = "0";
  }
}
