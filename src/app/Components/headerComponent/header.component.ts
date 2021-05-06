import { Component, OnInit } from '@angular/core';
import { HeaderTitleService } from '../../Services/title.service';
import { TokenStorageService } from '../../Services/token-storage.service';


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
    title = '';
    routerPath = '';
    clicked: boolean = false;
    private roles: string[] = [];
    isLoggedIn = false;
    showAdminBoard = false;
    showModeratorBoard = false;
    username?: string;

    /**
    * Constructor used for injecting services and initializing class variables
    * @param _headerTitleService
    */
    constructor(private _headerTitleService: HeaderTitleService,
        private tokenStorageService: TokenStorageService) { }

    ngOnInit() {
        this._headerTitleService.title.subscribe(updatedTitle => {
            this.title = updatedTitle;
        });
        this._headerTitleService.routerPath.subscribe(updatedPath => {
            this.routerPath = updatedPath;
        });
        this.isLoggedIn = !!this.tokenStorageService.getToken();

        if (this.isLoggedIn) {
            const user = this.tokenStorageService.getUser();
            this.username = user.username;
        }
    }
    /**
   * logout function used to reset the session storage and redirect back to the login page
   */
    logout() {
        this.tokenStorageService.signOut();
        window.location.reload();
    }
}
