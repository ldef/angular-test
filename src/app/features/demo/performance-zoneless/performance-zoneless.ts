import { Component, OnInit, OnDestroy, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-performance-demo',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="performance-demo">
      <h2>Test de Performance - Zoneless</h2>
      
      <div class="counters">
        <div class="counter">
          <h3>Compteur rapide</h3>
          <p>Valeur: {{ fastCounter() }}</p>
          <button (click)="startFastCounter()" [disabled]="fastCounterRunning()">
            {{ fastCounterRunning() ? 'En cours...' : 'Démarrer compteur rapide' }}
          </button>
        </div>

        <div class="counter">
          <h3>Compteur très rapide (stress test)</h3>
          <p>Valeur: {{ stressCounter() }}</p>
          <button (click)="startStressTest()" [disabled]="stressTestRunning()">
            {{ stressTestRunning() ? 'En cours...' : 'Stress Test (10000 itérations)' }}
          </button>
        </div>
      </div>

      <div class="metrics">
        <h3>Métriques</h3>
        <p>Temps d'exécution du stress test: {{ stressTestDuration() }}ms</p>
        <p>Détections de changements: {{ changeDetectionCount() }}</p>
        <p>FPS moyen: {{ averageFPS() }}</p>
      </div>

      <div class="http-test">
        <h3>Test HTTP simultané</h3>
        <button (click)="performHttpStressTest()" [disabled]="httpTestRunning()">
          {{ httpTestRunning() ? 'En cours...' : 'Lancer 50 requêtes simultanées' }}
        </button>
        <p>Requêtes complétées: {{ completedRequests() }}/50</p>
        <p>Temps total HTTP: {{ httpTestDuration() }}ms</p>
      </div>
    </div>
  `,
  styles: [`
    .performance-demo {
      padding: 20px;
      font-family: Arial, sans-serif;
    }
    
    .counters {
      display: flex;
      gap: 20px;
      margin: 20px 0;
    }
    
    .counter {
      border: 1px solid #ccc;
      padding: 15px;
      border-radius: 8px;
      min-width: 200px;
    }
    
    .metrics {
      background: #f0f8ff;
      padding: 15px;
      border-radius: 8px;
      margin: 20px 0;
    }
    
    .http-test {
      border: 2px solid #28a745;
      padding: 15px;
      border-radius: 8px;
    }
    
    button {
      background: #28a745;
      color: white;
      border: none;
      padding: 10px 15px;
      border-radius: 4px;
      cursor: pointer;
      margin: 5px 0;
    }
    
    button:disabled {
      background: #ccc;
      cursor: not-allowed;
    }
    
    h2 { color: #333; }
    h3 { color: #28a745; }
  `]
})
export class PerformanceDemoZoneless implements OnInit, OnDestroy {
  // Utilisation de signals pour une meilleure performance
  fastCounter = signal(0);
  stressCounter = signal(0);
  fastCounterRunning = signal(false);
  stressTestRunning = signal(false);
  stressTestDuration = signal(0);
  changeDetectionCount = signal(0);
  averageFPS = signal(0);
  
  // HTTP Test properties
  httpTestRunning = signal(false);
  completedRequests = signal(0);
  httpTestDuration = signal(0);

  private intervals: any[] = [];
  private fpsCounter = 0;
  private lastTime = 0;

  ngOnInit() {
    // Start FPS monitoring
    this.startFPSMonitoring();
  }

  ngOnDestroy() {
    this.intervals.forEach(interval => clearInterval(interval));
  }

  startFastCounter() {
    if (this.fastCounterRunning()) return;
    
    this.fastCounterRunning.set(true);
    this.fastCounter.set(0);
    
    const interval = setInterval(() => {
      this.fastCounter.update(v => v + 1);
      
      if (this.fastCounter() >= 100) {
        clearInterval(interval);
        this.fastCounterRunning.set(false);
        this.removeInterval(interval);
      }
    }, 50); // Mise à jour toutes les 50ms
    
    this.intervals.push(interval);
  }

  startStressTest() {
    if (this.stressTestRunning()) return;
    
    this.stressTestRunning.set(true);
    this.stressCounter.set(0);
    const startTime = performance.now();
    
    const interval = setInterval(() => {
      // Simuler un travail intensif
      this.stressCounter.update(v => v + 100);
      
      if (this.stressCounter() >= 10000) {
        clearInterval(interval);
        this.stressTestRunning.set(false);
        this.stressTestDuration.set(Math.round(performance.now() - startTime));
        this.removeInterval(interval);
      }
    }, 1); // Très fréquent pour tester les performances
    
    this.intervals.push(interval);
  }

  performHttpStressTest() {
    if (this.httpTestRunning()) return;
    
    this.httpTestRunning.set(true);
    this.completedRequests.set(0);
    const startTime = performance.now();
    
    // Simuler 50 requêtes HTTP simultanées
    const promises = Array.from({ length: 50 }, (_, index) => {
      return this.simulateHttpRequest(index + 1);
    });
    
    Promise.all(promises).then(() => {
      this.httpTestDuration.set(Math.round(performance.now() - startTime));
      this.httpTestRunning.set(false);
    });
  }

  private simulateHttpRequest(id: number): Promise<void> {
    return new Promise(resolve => {
      // Simuler une requête HTTP avec un délai aléatoire
      const delay = Math.random() * 1000 + 200; // 200-1200ms
      
      setTimeout(() => {
        this.completedRequests.update(v => v + 1);
        resolve();
      }, delay);
    });
  }

  private startFPSMonitoring() {
    const measureFPS = () => {
      const now = performance.now();
      if (this.lastTime) {
        const delta = now - this.lastTime;
        const fps = 1000 / delta;
        this.fpsCounter++;
        
        // Calculer FPS moyen toutes les 60 frames
        if (this.fpsCounter % 60 === 0) {
          this.averageFPS.set(Math.round(fps * 10) / 10);
        }
      }
      this.lastTime = now;
      requestAnimationFrame(measureFPS);
    };
    
    measureFPS();
  }

  private removeInterval(interval: any) {
    const index = this.intervals.indexOf(interval);
    if (index > -1) {
      this.intervals.splice(index, 1);
    }
  }
}