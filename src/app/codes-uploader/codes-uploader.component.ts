import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-codes-uploader',
  templateUrl: './codes-uploader.component.html',
  styleUrl: './codes-uploader.component.scss'
})
export class CodesUploaderComponent {
  @Input() sidebarVisible: boolean = false;

}
