import { Injectable, signal } from '@angular/core';

export interface PerformanceMetrics {
  testName: string;
  duration: number;
  changeDetectionCount: number;
  memoryUsage: number;
  fps: number;
  timestamp: number;
}

@Injectable({
  providedIn: 'root'
})
export class PerformanceMetricsService {
  private metrics = signal<PerformanceMetrics[]>([]);
  
  readonly metricsHistory = this.metrics.asReadonly();
  
  addMetric(metric: PerformanceMetrics) {
    this.metrics.update(current => [...current, metric]);
  }
  
  clearMetrics() {
    this.metrics.set([]);
  }
  
  getLatestMetrics(testName: string): PerformanceMetrics | undefined {
    const filtered = this.metrics().filter(m => m.testName === testName);
    return filtered[filtered.length - 1];
  }
  
  compareMetrics(testName: string): { zoneless: PerformanceMetrics[], zoneJs: PerformanceMetrics[] } {
    const all = this.metrics().filter(m => m.testName === testName);
    return {
      zoneless: all.filter(m => m.testName.includes('Zoneless')),
      zoneJs: all.filter(m => m.testName.includes('Zone.js'))
    };
  }
}