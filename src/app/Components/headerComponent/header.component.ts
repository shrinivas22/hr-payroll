import { Component, OnInit } from '@angular/core';
import { HeaderTitleService } from '../../Services/title.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
    title = '';
    routerPath = '';
    clicked: boolean = false;
    /**
    * Constructor used for injecting services and initializing class variables
    * @param _headerTitleService
    */
    constructor(private _headerTitleService: HeaderTitleService) { }

    ngOnInit() {
        this._headerTitleService.title.subscribe(updatedTitle => {
            this.title = updatedTitle;
        });
        this._headerTitleService.routerPath.subscribe(updatedPath => {
            this.routerPath = updatedPath;
        });
    }
}
