import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';

interface PortfolioProject {
  title: string;
  category: string;
  summary: string;
  stack: string[];
  url: string;
  accent: string;
}

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './portfolio.html',
  styleUrl: './portfolio.css',
})
export class Portfolio {
  protected readonly projects = signal<PortfolioProject[]>([
    {
      title: 'M&J SoftSolutions',
      category: 'Enterprise Platform',
      summary:
        'Plataforma de gestión empresarial integral.',
      stack: ['React', 'Grafana', 'SQL', 'Node.js', 'Charts'],
      url: 'https://m-j26.github.io/M-JSoftsolutions/',
      accent: '#a78bfa',
    },
    {
      title: 'En boca de todos',
      category: 'Web Application para restorantes',
      summary:
        'Aplicación web para la gestión de restaurantes.',
      stack: ['Angular', 'Spring Boot', 'Oracle', 'PL/SQL', 'REST'],
      url: 'https://m-j26.github.io/en-boca-de-todos/',
      accent: '#7dd3fc',
    },


  ]);
}
