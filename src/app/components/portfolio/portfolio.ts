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
      title: 'Sistema de Gestión Electoral',
      category: 'Enterprise Platform',
      summary:
        'Plataforma robusta para procesos electorales con control documental, trazabilidad y paneles operativos.',
      stack: ['Angular', 'Spring Boot', 'Oracle', 'PL/SQL', 'REST'],
      url: 'https://github.com/',
      accent: '#7dd3fc',
    },
    {
      title: 'Dashboard de Operaciones',
      category: 'Analytics & Monitoring',
      summary:
        'Panel ejecutivo enfocado en KPIs, métricas de negocio y alertas para equipos de operación y control.',
      stack: ['React', 'Grafana', 'SQL', 'Node.js', 'Charts'],
      url: 'https://github.com/',
      accent: '#a78bfa',
    },
    {
      title: 'Portal de Facturación Digital',
      category: 'Web Application',
      summary:
        'Solución para facturación y flujo de documentos con integración de servicios, seguridad y automatización.',
      stack: ['.NET', 'Angular', 'SQL Server', 'REST', 'DevExpress'],
      url: 'https://github.com/',
      accent: '#34d399',
    },
    {
      title: 'Ecosistema de Integración',
      category: 'Backend Services',
      summary:
        'Servicios transaccionales para conectar aplicaciones internas y sistemas externos con alta confiabilidad.',
      stack: ['Java', 'Spring Boot', 'REST', 'SOAP', 'Oracle'],
      url: 'https://github.com/',
      accent: '#fbbf24',
    },
  ]);
}
