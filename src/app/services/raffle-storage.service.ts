import { Injectable } from '@angular/core';

const STORAGE_KEY = 'maxout-raffle-state';

export interface RaffleState {
  allCodes: string[];
  usedCodes: string[];
}

@Injectable({ providedIn: 'root' })
export class RaffleStorageService {
  getState(): RaffleState | null {
    if (typeof localStorage === 'undefined') return null;
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    try {
      const state = JSON.parse(raw) as RaffleState;
      return state?.allCodes?.length ? state : null;
    } catch {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }
  }

  setState(state: RaffleState) {
    if (typeof localStorage === 'undefined') return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }
}