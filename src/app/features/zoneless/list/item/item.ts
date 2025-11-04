import { Component, DoCheck, input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { ListItem } from './list-item.model';

@Component({
  selector: 'app-item',
  imports: [
    CommonModule, 
    MatListModule, 
    MatIconModule, 
    MatButtonModule,
    MatRippleModule
  ],
  templateUrl: './item.html',
  styleUrl: './item.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Item implements DoCheck {
  // Signal d'entrée pour recevoir les données de l'élément
  item = input.required<ListItem>();
  
  private templateEvalCount = 0;
  private doCheckCount = 0;

  ngDoCheck() {
    this.doCheckCount++;
    // On log seulement pour le premier item pour ne pas polluer la console
    if (this.item().id === 1) {
      console.log(`  ⚪ Item #1 ngDoCheck called (count: ${this.doCheckCount})`);
    }
  }
  
  // Cette fonction prouve que le template de l'item est évalué
  trackTemplateEval(): string {
    this.templateEvalCount++;
    // On log seulement pour le premier item
    if (this.item().id === 1) {
      console.log(`  🔶 Item #1 template eval (count: ${this.templateEvalCount})`);
    }
    return `Item #${this.item().id}`;
  }
}
