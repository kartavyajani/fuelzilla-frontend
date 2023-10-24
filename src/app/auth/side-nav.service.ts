import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SideNavService {

  constructor() { }
  private collapsedSubject = new BehaviorSubject<boolean>(true);
  collapsed$: Observable<boolean> = this.collapsedSubject.asObservable();

  toggleCollapse(collapsed: boolean) {
    this.collapsedSubject.next(collapsed);
  }
}
