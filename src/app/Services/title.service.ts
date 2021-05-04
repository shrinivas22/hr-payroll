import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class HeaderTitleService {
  // setting the initial condiiton as required by BehaviorSubject.
  title = new BehaviorSubject('Initial Title');
  routerPath = new BehaviorSubject('');

  /**
   * This function is used to change the title of the header based on an action event.
   * @param title - a string containing the title to be set in the header every time the app is routed to a different page.
   */
  setTitle(title: string) {
    this.title.next(title);
  }

  /**
   * This function is used to change the routerPath of the routeURL based on an action event.
   * @param routerPath - a string containing the routePath to be set in the routeURL every time the app is routed to a different page.
   */
  setRoute(routerPath: string) {
    this.routerPath.next(routerPath);
  }
}
