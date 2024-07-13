import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'maxout-raffle';
  sidebarVisible: boolean = false;
  loadedCodes: string[] = [];

  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }

  onCodesLoaded(uniqueCodes: string[]) {
    this.loadedCodes = uniqueCodes;
  }

}
