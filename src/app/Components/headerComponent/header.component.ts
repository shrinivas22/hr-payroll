import { Component, OnInit } from '@angular/core';
import { headerTitleService } from '../../Services/title.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    // styleUrls: ['./home.component.css']
  })
export class HeaderComponent implements OnInit {
    title = '';
    routerPath='';
    constructor(private headerTitleService: headerTitleService) { }

    ngOnInit() {
        this.headerTitleService.title.subscribe(updatedTitle => {
            this.title = updatedTitle;
        });
        this.headerTitleService.routerPath.subscribe(updatedPath => {
            this.routerPath = updatedPath;
        });
    }
}
