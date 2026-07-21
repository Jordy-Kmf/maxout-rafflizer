import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MessageService } from 'primeng/api';
import { RaffleStorageService } from '../services/raffle-storage.service';

const CODE_PATTERN = /^[A-Z0-9]{6}$/;

@Component({
  selector: 'app-codes-uploader',
  templateUrl: './codes-uploader.component.html',
  styleUrl: './codes-uploader.component.scss'
})
export class CodesUploaderComponent implements OnInit {
  @Input() sidebarVisible: boolean = true;
  @Output() codesLoaded = new EventEmitter<string[]>();

  allCodes: string = '';
  uniqueCodesCount: number = 0;
  invalidCodesCount: number = 0;
  fileName: string = '';
  existingCodesCount: number = 0;

  constructor(
    private messageService: MessageService,
    private storage: RaffleStorageService
  ) { }

  ngOnInit() {
    this.existingCodesCount = this.storage.getState()?.allCodes?.length ?? 0;
  }

  useExistingCodes() {
    const state = this.storage.getState();
    if (!state?.allCodes?.length) return;

    this.allCodes = state.allCodes.join('\n');
    this.fileName = '';
    this.validate();
  }

  onTextareaChange() {
    this.fileName = '';
    this.validate();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    if (!file.name.toLowerCase().endsWith('.txt')) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Unsupported file',
        detail: 'Please select a .txt file with one code per line.'
      });
      input.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      this.allCodes = reader.result as string;
      this.fileName = file.name;
      this.validate();
    };
    reader.onerror = () => {
      this.messageService.add({
        severity: 'error',
        summary: 'Read Failed',
        detail: 'Could not read that file. Please try again.'
      });
    };
    reader.readAsText(file);
    input.value = '';
  }

  private validate() {
    const lines = this.allCodes.split('\n')
      .map(line => line.trim().toUpperCase())
      .filter(line => line.length > 0);
    const unique = Array.from(new Set(lines));

    this.uniqueCodesCount = unique.filter(code => CODE_PATTERN.test(code)).length;
    this.invalidCodesCount = unique.length - this.uniqueCodesCount;
  }

  loadUniqueCodes() {
    if (!this.allCodes) {
      this.messageService.add({
        severity: 'warn',
        summary: 'No Input',
        detail: 'Please enter or upload some codes before loading.'
      });
      return;
    }

    const lines = this.allCodes.split('\n')
      .map(line => line.trim().toUpperCase())
      .filter(line => line.length > 0);
    const unique = Array.from(new Set(lines));
    const validCodes = unique.filter(code => CODE_PATTERN.test(code));

    if (!validCodes.length) {
      this.messageService.add({
        severity: 'error',
        summary: 'No Valid Codes',
        detail: 'None of the entries matched the required 6-character A-Z/0-9 format.'
      });
      return;
    }

    this.codesLoaded.emit(validCodes);

    const invalidCount = unique.length - validCodes.length;
    this.messageService.add({
      severity: 'success',
      summary: 'Codes Loaded',
      detail: `${validCodes.length} valid code(s) loaded` +
        (invalidCount ? `, ${invalidCount} skipped for invalid format.` : '.')
    });
  }
}