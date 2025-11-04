import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Counter } from "./counter/counter";
import { List } from "./list/list";

@Component({
  selector: 'app-zoneless',
  standalone: true,
  imports: [
    CommonModule, 
    MatCardModule,
    MatIconModule,
    Counter, 
    List
  ],
  templateUrl: './zoneless.html',
  styleUrl: './zoneless.scss'
})
export class ZonelessComponent {

}