import { SearchService } from './../../services/search.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-input-search',
  templateUrl: './input-search.component.html',
  styleUrls: ['./input-search.component.scss']
})
export class InputSearchComponent implements OnInit {

  text: string = '';

  constructor(private searchService: SearchService) { }

  ngOnInit(): void {
  }

  onKeydown(event) {
    if (event.key === "Enter") {
      this.searchService.setSearch(this.text);
    } else if (event.key === "Escape") {
      this.searchService.setSearch(null);
    }
  }

}
