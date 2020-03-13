import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-movies-panel',
  templateUrl: './movies-panel.component.html',
  styleUrls: ['./movies-panel.component.scss']
})
export class MoviesPanelComponent implements OnInit {

  items = new Array(7);

  constructor() { }

  ngOnInit(): void {
  }

}
