import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-codes-uploader',
  templateUrl: './codes-uploader.component.html',
  styleUrl: './codes-uploader.component.scss'
})
export class CodesUploaderComponent {
  @Input() sidebarVisible: boolean = true;
  @Output() codesLoaded = new EventEmitter<string[]>();

  allCodes: string = '';
  uniqueCodesCount: number = 0;

  constructor(private messageService: MessageService) { }

  onTextareaChange() {
    const uniqueCodes = this.allCodes.split('\n').map(
      line => line.trim()
    ).filter(line => line.length > 0);

    this.uniqueCodesCount = new Set(uniqueCodes).size;
  }

  loadUniqueCodes() {
    if (!this.allCodes) {
      this.messageService.add({
        severity: 'warn',
        summary: 'No Input',
        detail: 'Please enter some codes before loading.'
      });
      return;
    }

    const uniqueCodes = this.allCodes.split('\n').map(
      line => line.trim()
    ).filter(line => line.length > 0);
    this.codesLoaded.emit(uniqueCodes);

    this.messageService.add({
      severity: 'success',
      summary: 'Loaded Successfully',
      detail: 'Unique codes have been successfully loaded.'
    });
  }
}
