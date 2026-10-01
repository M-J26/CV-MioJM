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
import { TranslocoService } from '@ngneat/transloco';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class Header {

  title = signal('CV Jefferson Miño');

  menuOpen = signal(false);
  modalOpen = signal(false);

  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  constructor(public transloco: TranslocoService) {
    if (this.isBrowser) {
      const savedLang = localStorage.getItem('lang') || 'es';
      this.transloco.setActiveLang(savedLang);
    } else {
      // SSR fallback
      this.transloco.setActiveLang('es');
    }
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

  // // ===== IDIOMA =====
  // setLang(lang: 'es' | 'en') {
  //   this.transloco.setActiveLang(lang);
  //   if (this.isBrowser) {
  //     localStorage.setItem('lang', lang);
  //   }
  // }


}
