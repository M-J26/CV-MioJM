
import { Component, inject, signal, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Header } from './components/header/header';
import { About } from './components/about/about';
import { Experience } from './components/experience/experience';
import { Education } from './components/education/education';
import { Skills } from './components/skills/skills';
import { Contact } from './components/contact/contact';
import { TRANSLATION_IMPORTS } from './shared/transloco.shared';

@Component({
  selector: 'app-root',
  imports: [
    Header,
    About,
    Experience,
    Education,
    Skills,
    Contact,
    ...TRANSLATION_IMPORTS,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('CV-JM');
  readonly views = signal(0);

  private readonly platformId = inject(PLATFORM_ID);

  ngOnInit() {
    if (!isPlatformBrowser(this.platformId) || typeof window === 'undefined') {
      return;
    }

    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), 2500);

    fetch('https://api.countapi.xyz/hit/jefferson-cv/views', { signal: controller.signal })
      .then((res) => res.json())
      .then((data) => this.views.set(data?.value ?? 0))
      .catch(() => this.views.set(0))
      .finally(() => window.clearTimeout(timeoutId));
  }
}
