import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs';

@Injectable()
export class SearchService {

  private searchVariable = new Subject<string>();
  search$ = this.searchVariable.asObservable();

  setSearch(res: string) {
    this.searchVariable.next(res);
  }

}
