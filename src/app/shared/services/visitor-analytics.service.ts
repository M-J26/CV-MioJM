import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface VisitorLocation {
  country: string;
  countryCode: string;
  city?: string;
  timestamp: Date;
  count: number;
}

export interface VisitorStats {
  totalVisits: number;
  uniqueCountries: number;
  locations: VisitorLocation[];
}

@Injectable({
  providedIn: 'root',
})
export class VisitorAnalyticsService {
  private readonly STORAGE_KEY = 'cv_visitor_analytics';
  private visitorStatsSubject = new BehaviorSubject<VisitorStats>(this.getInitialStats());

  public visitorStats$: Observable<VisitorStats> = this.visitorStatsSubject.asObservable();

  constructor() {
    this.initializeVisitor();
  }

  private async initializeVisitor(): Promise<void> {
    try {
      const location = await this.fetchVisitorLocation();
      this.recordVisit(location);
    } catch (error) {
      console.log('No se pudo registrar la ubicación del visitante:', error);
      // No interrumpir la funcionalidad si falla la geolocalización
      this.recordVisit({ country: 'Unknown', countryCode: 'XX', city: undefined });
    }
  }

  private async fetchVisitorLocation(): Promise<{ country: string; countryCode: string; city?: string }> {
    // Usar ip-api.com (gratis, 45 requests/min sin key)
    // Para producción, considera usar una API de pago para más robustez
    const response = await fetch('https://ip-api.com/json/?fields=country,countryCode,city,status');

    if (!response.ok) {
      throw new Error('Failed to fetch visitor location');
    }

    const data = await response.json();

    if (data.status === 'fail') {
      throw new Error(data.message);
    }

    return {
      country: data.country || 'Unknown',
      countryCode: data.countryCode || 'XX',
      city: data.city,
    };
  }

  private recordVisit(location: { country: string; countryCode: string; city?: string }): void {
    const stats = this.visitorStatsSubject.getValue();
    const existingLocation = stats.locations.find((l) => l.countryCode === location.countryCode);

    if (existingLocation) {
      existingLocation.count++;
      existingLocation.timestamp = new Date();
    } else {
      stats.locations.push({
        country: location.country,
        countryCode: location.countryCode,
        city: location.city,
        timestamp: new Date(),
        count: 1,
      });
    }

    stats.totalVisits++;
    stats.uniqueCountries = stats.locations.length;

    // Ordenar por cantidad de visitas
    stats.locations.sort((a, b) => b.count - a.count);

    this.visitorStatsSubject.next(stats);
    this.persistStats(stats);
  }

  private getInitialStats(): VisitorStats {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        // Convertir timestamps de string a Date
        parsed.locations = parsed.locations.map((loc: any) => ({
          ...loc,
          timestamp: new Date(loc.timestamp),
        }));
        return parsed;
      } catch {
        return this.createEmptyStats();
      }
    }
    return this.createEmptyStats();
  }

  private createEmptyStats(): VisitorStats {
    return {
      totalVisits: 0,
      uniqueCountries: 0,
      locations: [],
    };
  }

  private persistStats(stats: VisitorStats): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(stats));
    } catch (error) {
      console.warn('No se pudo guardar estadísticas de visitantes:', error);
    }
  }

  public getVisitorStats(): VisitorStats {
    return this.visitorStatsSubject.getValue();
  }

  public clearStats(): void {
    localStorage.removeItem(this.STORAGE_KEY);
    this.visitorStatsSubject.next(this.createEmptyStats());
  }

  /**
   * Obtiene el país con más visitas
   */
  public getTopCountry(): VisitorLocation | null {
    const stats = this.visitorStatsSubject.getValue();
    return stats.locations.length > 0 ? stats.locations[0] : null;
  }

  /**
   * Obtiene un resumen formateado de visitantes
   */
  public getFormattedSummary(): string {
    const stats = this.visitorStatsSubject.getValue();
    if (stats.totalVisits === 0) {
      return 'Sin visitas registradas';
    }

    const top = this.getTopCountry();
    return `${stats.totalVisits} visitas desde ${stats.uniqueCountries} país(es)${top ? ` • Top: ${top.country} (${top.count})` : ''}`;
  }
}
