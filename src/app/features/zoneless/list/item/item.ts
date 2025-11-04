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

  ngDoCheck() {
    // Logique de détection des changements
    console.log(`Item checked: ${this.item().name}`);
  }
}
