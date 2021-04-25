import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class headerTitleService {
  title = new BehaviorSubject('Initial Title');
  routerPath= new BehaviorSubject('');

  setTitle(title: string) {
    this.title.next(title);
  }
  setRoute(routerPath: string) {
    this.routerPath.next(routerPath);
  }
}
