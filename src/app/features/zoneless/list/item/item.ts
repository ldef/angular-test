import { Component, input } from '@angular/core';
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
})
export class Item {
  // Signal d'entrée pour recevoir les données de l'élément
  item = input.required<ListItem>();
  
  // Méthode pour obtenir une icône basée sur l'ID
  getIcon(): string {
    const icons = ['code', 'web', 'phone_android', 'laptop', 'storage', 'cloud', 'build', 'palette'];
    return icons[this.item().id % icons.length];
  }
  
  // Méthode pour obtenir une couleur basée sur l'ID
  getIconColor(): string {
    const colors = ['#e74c3c', '#3498db', '#2ecc71', '#f39c12', '#9b59b6', '#1abc9c', '#e67e22', '#34495e'];
    return colors[this.item().id % colors.length];
  }
}
