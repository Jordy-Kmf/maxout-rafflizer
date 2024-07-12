import { Component } from '@angular/core';
import { ConfettiService } from '../services/confetti.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-raffle-view',
  templateUrl: './raffle-view.component.html',
  styleUrl: './raffle-view.component.scss'
})
export class RaffleViewComponent {
  num: string[] = ['-', '-', '-', '-', '-', '-'];
  a: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0',
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
    'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
    'U', 'V', 'W', 'X', 'Y', 'Z'];
  spinning: boolean = false;
  intervalIds: any[] = [];
  targets: string[] = ['111AAA', '222BBB', '3333CCC', '444DDD', '555EEEE'];
  used: string[] = [];
  selectedTarget: string = '';
  timeToStopInSeconds: number = 20;


  constructor(
    private confettiService: ConfettiService,
    private messageService: MessageService
  ) { }


  startShuffle() {
    if (this.targets.length === this.used.length) {
      this.messageService.add({
        severity: 'warn', summary: 'Oops!', detail: 'Looks like there are no more unique codes available.'
      });
      return;
    }

    this.spinning = true;
    const availableTargets = this.targets.filter(target => !this.used.includes(target));
    this.selectedTarget = availableTargets[Math.floor(Math.random() * availableTargets.length)];
    this.used.push(this.selectedTarget);

    const totalDuration = this.timeToStopInSeconds * 1000;
    const intervalTime = 50; // Update every 50 milliseconds
    const stopInterval = totalDuration / this.selectedTarget?.length; // Time to stop each character

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
        this.num[index] = this.selectedTarget[index];
        if (index === this.num.length - 1) {
          this.spinning = false;
          this.confettiService.launchCelebrationConfetti();
        }
      } else {
        const randomIndex = Math.floor(Math.random() * this.a.length);
        this.num[index] = this.a[randomIndex];
      }
    }, intervalTime);

    this.intervalIds.push(intervalId);
  }


  showConfetti() {
    this.confettiService.launchWelcomeConfetti();
  }
}
