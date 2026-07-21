import { Component, Input, OnInit } from '@angular/core';
import { ConfettiService } from '../services/confetti.service';
import { MessageService } from 'primeng/api';
import { RaffleStorageService } from '../services/raffle-storage.service';

@Component({
  selector: 'app-raffle-view',
  templateUrl: './raffle-view.component.html',
  styleUrl: './raffle-view.component.scss'
})
export class RaffleViewComponent implements OnInit {
  num: string[] = ['•', '•', '•', '•', '•', '•'];
  shuffleChars: string[] = [
    '1', '2', '3', '4', '5', '6', '7', '8', '9', '0',
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
    'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
    'U', 'V', 'W', 'X', 'Y', 'Z'
  ];
  spinning: boolean = false;
  intervalIds: any[] = [];
  allCodes: string[] = [];
  usedCodes: string[] = [];
  selectedCode: string = '';
  timeToStopInSeconds: number = 15;
  colors: string[] = [
    '#f6b002',
    '#75972a',
    '#0157a7',
    '#6f3789',
    '#fd5d01',
    '#dc2b2a'
  ];

  /**
   * How the persistence logic avoids stale state: the `loadedCodes` setter now ignores empty arrays (so the parent's default `[]` on page load doesn't wipe anything) and only resets `usedCodes` when a genuinely different code list comes in. `ngOnInit` restores from localStorage after that guard runs, so a refresh mid-raffle keeps both the code list and the used codes intact, while uploading a fresh list still correctly starts a clean session.
  */
  @Input() set loadedCodes(value: string[]) {
    if (!value?.length) return;

    const isSameSet = this.allCodes.length === value.length &&
      this.allCodes.every(code => value.includes(code));
    if (isSameSet) return;

    this.allCodes = value;
    this.usedCodes = [];
    this.persistState();
  }

  constructor(
    private confettiService: ConfettiService,
    private messageService: MessageService,
    private storage: RaffleStorageService
  ) { }

  ngOnInit() {
    const state = this.storage.getState();
    if (state) {
      this.allCodes = state.allCodes;
      this.usedCodes = state.usedCodes;
    }
  }

  private persistState() {
    this.storage.setState({ allCodes: this.allCodes, usedCodes: this.usedCodes });
  }

  startShuffle() {
    if (!this.allCodes.length || this.allCodes.length === this.usedCodes.length) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Oops!',
        detail: 'Looks like there are no more unique codes available. Load more codes to continue.'
      });
      return;
    }

    this.spinning = true;
    const availableUniqueCodes = this.allCodes.filter(uniqueCode => !this.usedCodes.includes(uniqueCode));
    this.selectedCode = availableUniqueCodes[Math.floor(Math.random() * availableUniqueCodes.length)];
    this.usedCodes.push(this.selectedCode);
    this.persistState();

    const totalDuration = this.timeToStopInSeconds * 1000;
    const intervalTime = 50;
    const stopInterval = totalDuration / this.selectedCode?.length;

    for (let i = 0; i < this.num.length; i++) {
      this.shuffleCharacter(i, intervalTime, stopInterval * (i + 1));
    }
  }

  shuffleCharacter(index: number, intervalTime: number, stopTime: number) {
    const startTime = Date.now();
    const endTime = startTime + stopTime;

    const intervalId = setInterval(() => {
      const currentTime = Date.now();
      if (currentTime >= endTime) {
        clearInterval(intervalId);
        this.num[index] = this.selectedCode[index];
        if (index === this.num.length - 1) {
          this.spinning = false;
          this.confettiService.launchCelebrationConfetti();
        }
      } else {
        const randomIndex = Math.floor(Math.random() * this.shuffleChars.length);
        this.num[index] = this.shuffleChars[randomIndex];
      }
    }, intervalTime);

    this.intervalIds.push(intervalId);
  }

  showConfetti() {
    this.confettiService.launchWelcomeConfetti();
  }
}