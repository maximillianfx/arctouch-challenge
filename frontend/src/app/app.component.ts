import { Component } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Arctouch';
  route: string;

  constructor(private router: Router) {
    this.router.events.subscribe((event: RouterEvent) => {
      if (event.url) {
        this.route = event.url;
      }
    });
  }
}
