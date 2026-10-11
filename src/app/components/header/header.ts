// import { Component, signal } from '@angular/core';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-header',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './header.html',
//   styleUrls: ['./header.css']
// })
// export class Header {
//   protected readonly title = signal('CV-Jefferon Miño');
//   protected readonly menuOpen = signal(false);
//   protected readonly modalOpen = signal(false);
  

//   toggleMenu() {
//     this.menuOpen.update(v => !v);
//   }

//   closeMenu() {
//     this.menuOpen.set(false);
//   }

//   openModal() {
//     this.modalOpen.set(true);
//   }

//   closeModal() {
//     this.modalOpen.set(false);
//   }
  

// }

import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoService } from '@ngneat/transloco';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { PdfGeneratorService } from '../../shared/services/pdf-generator.service';
import { VisitorAnalyticsService, VisitorStats } from '../../shared/services/visitor-analytics.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class Header {

  title = signal('CV Jefferson Miño');

  menuOpen = signal(false);
  modalOpen = signal(false);
  visitorModalOpen = signal(false);
  downloadLoading = signal(false);
  visitorStats = signal<VisitorStats | null>(null);

  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);
  private pdfGenerator = inject(PdfGeneratorService);
  private visitorAnalytics = inject(VisitorAnalyticsService);

  constructor(public transloco: TranslocoService) {
    if (this.isBrowser) {
      const savedLang = localStorage.getItem('lang') || 'es';
      this.transloco.setActiveLang(savedLang);
    } else {
      // SSR fallback
      this.transloco.setActiveLang('es');
    }

    // Suscribirse a estadísticas de visitantes
    this.visitorAnalytics.visitorStats$.subscribe(stats => {
      this.visitorStats.set(stats);
    });
  }

  // ===== MENÚ =====
  toggleMenu() {
    this.menuOpen.update(v => !v);
  }

  closeMenu() {
    this.menuOpen.set(false);
  }

  // ===== MODAL =====
  openModal() {
    this.modalOpen.set(true);
  }

  closeModal() {
    this.modalOpen.set(false);
  }

  // ===== VISITAS =====
  openVisitorModal() {
    this.visitorModalOpen.set(true);
  }

  closeVisitorModal() {
    this.visitorModalOpen.set(false);
  }

  // ===== DESCARGAR CV =====
  async downloadCV(language: 'es' | 'en') {
    if (this.downloadLoading()) return;

    try {
      this.downloadLoading.set(true);

      // Obtener la URL base de la imagen
      const profileImg = new URL('./img/perfil.jpg', window.location.href).href;

      await this.pdfGenerator.generateCVPdf({
        language,
        imageUrl: profileImg,
        fullName: 'Jefferson Santiago Miño Tasinchana',
        title: language === 'es' 
          ? 'Desarrollador Full Stack Senior' 
          : 'Senior Full Stack Developer',
        email: 'jefferson.mino@example.com', // Actualizar con email real
        phone: '+34 XXXXXXXXX', // Actualizar con teléfono real
        github: 'https://github.com/m-j26',
        linkedin: 'https://linkedin.com/in/jefferson-miño',
        portfolio: 'https://cv-jm.vercel.app'
      });

      this.closeMenu();
    } catch (error) {
      console.error('Error descargando CV:', error);
      alert(language === 'es' 
        ? 'Error al generar el PDF. Por favor, intenta de nuevo.' 
        : 'Error generating PDF. Please try again.');
    } finally {
      this.downloadLoading.set(false);
    }
  }

  // ===== IDIOMA =====
  setLang(lang: 'es' | 'en') {
    this.transloco.setActiveLang(lang);
    if (this.isBrowser) {
      localStorage.setItem('lang', lang);
    }
  }

  get activeLang(): string {
    return this.transloco.getActiveLang();
  }
}
