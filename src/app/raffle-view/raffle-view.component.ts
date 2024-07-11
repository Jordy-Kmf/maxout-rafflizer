import { Component, OnInit } from '@angular/core';
import { ConfettiService } from '../confetti.service';

@Component({
  selector: 'app-raffle-view',
  templateUrl: './raffle-view.component.html',
  styleUrl: './raffle-view.component.scss'
})
export class RaffleViewComponent implements OnInit {

  constructor(private confettiService: ConfettiService) { }

  ngOnInit(): void {
    this.showConfetti();
  }

  showConfetti() {
    this.confettiService.launchConfetti();
  }
}
