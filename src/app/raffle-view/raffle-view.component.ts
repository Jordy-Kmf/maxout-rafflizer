import { Component, Input } from '@angular/core';
import { ConfettiService } from '../services/confetti.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-raffle-view',
  templateUrl: './raffle-view.component.html',
  styleUrl: './raffle-view.component.scss'
})
export class RaffleViewComponent {
  num: string[] = ['•', '•', '•', '•', '•', '•'];
  shuffleChars: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0',
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
    'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
    'U', 'V', 'W', 'X', 'Y', 'Z'];
  spinning: boolean = false;
  intervalIds: any[] = [];
  allCodes: string[] = [];
  usedCodes: string[] = [];
  selectedCode: string = '';
  timeToStopInSeconds: number = 20;

  @Input() set loadedCodes(value: string[]) {
    this.allCodes = value;
    this.usedCodes = [];
  }

  constructor(
    private confettiService: ConfettiService,
    private messageService: MessageService
  ) { }

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
    console.log('Used codes:', this.usedCodes);

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
