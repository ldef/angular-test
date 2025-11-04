import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Counter } from "./counter/counter";
import { List } from "./list/list";
import { StressTest } from "./stress-test/stress-test";

@Component({
  selector: 'app-zoneless',
  standalone: true,
  imports: [
    CommonModule, 
    MatCardModule,
    MatIconModule,
    Counter, 
    List,
    StressTest
  ],
  templateUrl: './zoneless.html',
  styleUrl: './zoneless.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ZonelessComponent {

}