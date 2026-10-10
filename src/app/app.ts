
import { Component, signal } from '@angular/core';
import { Header } from './components/header/header';
import { About } from './components/about/about';
import { Experience } from './components/experience/experience';
import { Portfolio } from './components/portfolio/portfolio';
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
    Portfolio,
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
  readonly views = signal(128);
}
