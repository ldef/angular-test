import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-stress-test',
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    MatChipsModule
  ],
  templateUrl: './stress-test.html',
  styleUrl: './stress-test.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StressTest {
  // Compteurs pour voir l'activité
  asyncOpsCount = signal(0);
  detectionCycles = signal(0);
  elapsedTime = signal(0);
  isRunning = signal(false);
  
  // Compteur de rendus du template
  private templateEvalCount = 0;
  
  trackTemplateEval(): number {
    this.templateEvalCount++;
    return this.templateEvalCount;
  }
  
  /**
   * Stress Test: Lance 1000 setTimeout sans toucher aux signals
   * 
   * Avec Zone.js: Chaque setTimeout déclenche la détection de changement
   * → 1000 cycles de détection inutiles
   * → Template évalué 1000+ fois
   * 
   * Avec Zoneless: Les setTimeout n'affectent pas les signals
   * → 0 cycle de détection automatique
   * → Template évalué seulement au début et à la fin
   */
  async startStressTest() {
    this.isRunning.set(true);
    this.asyncOpsCount.set(0);
    this.detectionCycles.set(this.templateEvalCount);
    
    const startTime = performance.now();
    
    // Lance 1000 opérations asynchrones qui ne touchent PAS aux signals
    const promises = [];
    for (let i = 0; i < 1000; i++) {
      promises.push(
        new Promise<void>(resolve => {
          setTimeout(() => {
            // Opération sans effet sur l'UI
            const dummy = Math.random() * Math.random();
            resolve();
          }, Math.random() * 100);
        })
      );
    }
    
    await Promise.all(promises);
    
    const endTime = performance.now();
    const elapsed = Math.round(endTime - startTime);
    
    // Mise à jour des signals (déclenche UNE détection)
    this.asyncOpsCount.set(1000);
    this.elapsedTime.set(elapsed);
    this.detectionCycles.set(this.templateEvalCount - this.detectionCycles());
    this.isRunning.set(false);
  }
  
  /**
   * Test intensif avec signals
   * 
   * Montre que même avec beaucoup d'updates de signals,
   * Zoneless est efficace car il batch les mises à jour
   */
  async startSignalStressTest() {
    this.isRunning.set(true);
    this.asyncOpsCount.set(0);
    this.detectionCycles.set(this.templateEvalCount);
    
    const startTime = performance.now();
    
    // Met à jour le signal 1000 fois rapidement
    for (let i = 0; i < 1000; i++) {
      await new Promise(resolve => setTimeout(resolve, 0));
      this.asyncOpsCount.update(v => v + 1);
    }
    
    const endTime = performance.now();
    const elapsed = Math.round(endTime - startTime);
    
    this.elapsedTime.set(elapsed);
    this.detectionCycles.set(this.templateEvalCount - this.detectionCycles());
    this.isRunning.set(false);
  }
  
  /**
   * Polling continu pour simuler un flux de données
   * 
   * Avec Zone.js: Chaque tick déclenche la détection sur toute l'app
   * Avec Zoneless: Seulement ce composant est mis à jour
   */
  private pollingInterval: any;
  pollingCount = signal(0);
  isPolling = signal(false);
  
  startPolling() {
    this.isPolling.set(true);
    this.pollingCount.set(0);
    this.detectionCycles.set(this.templateEvalCount);
    
    this.pollingInterval = setInterval(() => {
      this.pollingCount.update(v => v + 1);
      
      // Arrêt automatique après 100 ticks
      if (this.pollingCount() >= 100) {
        this.stopPolling();
      }
    }, 50); // Toutes les 50ms = 20 fois/seconde
  }
  
  stopPolling() {
    if (this.pollingInterval) {
      clearInterval(this.pollingInterval);
      this.pollingInterval = null;
    }
    this.isPolling.set(false);
    this.detectionCycles.set(this.templateEvalCount - this.detectionCycles());
  }
  
  reset() {
    this.stopPolling();
    this.asyncOpsCount.set(0);
    this.elapsedTime.set(0);
    this.detectionCycles.set(0);
    this.pollingCount.set(0);
  }
}
