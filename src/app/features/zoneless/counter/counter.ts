import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-counter',
  imports: [
    CommonModule, 
    MatCardModule, 
    MatButtonModule, 
    MatIconModule, 
    MatBadgeModule,
    MatChipsModule
  ],
  templateUrl: './counter.html',
  styleUrl: './counter.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Counter {
  count = signal(0);
  
  // Compteur pour voir combien de fois le template est VRAIMENT évalué
  private templateEvalCount = 0;
  
  // Cette fonction sera appelée depuis le template pour prouver son exécution
  trackTemplateEval(): string {
    this.templateEvalCount++;
    const msg = `🔵 Counter template eval #${this.templateEvalCount}`;
    console.log(msg);
    return msg;
  }

  increment() {
    this.count.update(value => value + 1);
  }

  decrement() {
    this.count.update(value => value - 1);
  }

  reset() {
    this.count.set(0);
  }
}
