import { Component, signal, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDividerModule } from '@angular/material/divider';
import { Item } from './item/item';
import { ListItem } from './item/list-item.model';

@Component({
  selector: 'app-list',
  imports: [
    CommonModule, 
    MatCardModule, 
    MatIconModule, 
    MatButtonModule, 
    MatBadgeModule,
    MatProgressBarModule,
    MatDividerModule,
    Item
  ],
  templateUrl: './list.html',
  styleUrl: './list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class List implements OnInit {
  // Signal contenant les 100 éléments
  items = signal<ListItem[]>([]);
  
  // Compteur pour voir combien de fois le template est VRAIMENT évalué
  private templateEvalCount = 0;
  
  // Cette fonction sera appelée depuis le template pour prouver son exécution
  trackTemplateEval(): string {
    this.templateEvalCount++;
    const msg = `🟢 List template eval #${this.templateEvalCount}`;
    console.log(msg);
    return msg;
  }

  ngOnInit() {
    this.generateItems();
  }

  // Générer 100 éléments de test
  generateItems() {
    const names = [
      'Angular', 'React', 'Vue', 'Svelte', 'TypeScript', 'JavaScript', 'HTML', 'CSS',
      'Node.js', 'Express', 'NestJS', 'MongoDB', 'PostgreSQL', 'Redis', 'Docker', 'Kubernetes',
      'AWS', 'Azure', 'GCP', 'Jenkins', 'GitLab', 'GitHub', 'Webpack', 'Vite',
      'ESLint', 'Prettier', 'Jest', 'Cypress', 'Playwright', 'Storybook', 'Figma', 'Adobe XD'
    ];
    
    const items: ListItem[] = [];
    
    for (let i = 1; i <= 100; i++) {
      const name = names[Math.floor(Math.random() * names.length)];
      
      items.push({
        id: i,
        name: `${name} ${i}`
      });
    }
    
    this.items.set(items);
  }
}
