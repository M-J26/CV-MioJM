import { Component , signal} from '@angular/core';
import { CommonModule } from '@angular/common';


interface experiencia{
  date: string;
  role: string;
  company: string;
  location: string;
  description: string[];
  technologies: string[];
}

@Component({
  selector: 'app-experience',
  imports: [CommonModule],
  templateUrl: './experience.html',
  styleUrl: './experience.css'
})

export class Experience {
  protected readonly showDetails = signal(true);
protected readonly experiences = signal<experiencia[]>([
  {
      date: '09/2026 ',
      role: 'Asesor de Desarrollo de Software',
      company: 'Presidencia de la republica del Ecuador',
      location: 'Quito',
      description: [
        'Diseño e implementación de aplicaciones empresariales Full Stack utilizando .NET Core, Java y Angular.',        
        'Gestión de código y 􀃮ujos de trabajo con Git y GitLab, asegurando calidad y trazabilidad.',
        'Optimización de consultas  con sitemas spring boot y React, mejorando tiempos de respuesta y estabilidad del sistema.',
        'Crecaio de aplicaciones web y móviles para la gestión de procesos internos del gobierno, mejorando la eficiencia y la transparencia.',
        'Implementación de servicios backend en spring boot y  Plsql para garantizar integridad y trazabilidad de los datos.',
        'Aplicación de arquitectura clear para mejorar mantenibilidad y escalabilidad.',
        'Optimización de bases de datos Oracle 12.5 para manejo de grandes volúmenes de información.'
      ],
      technologies: [ 'Spring Boot', 'CLEAR', 'Oracle', 'React', 'HTML', 'CSS', 'Java', 'Git', 'GitLab']
    }, 
  {
      date: '09/2024 - 02/2026',
      role: 'Desarrollador Especialista',
      company: 'PROCONTY',
      location: 'Quito',
      description: [
        'Diseño e implementación de aplicaciones empresariales Full Stack utilizando .NET Core, Java y Angular.',        
        'Desarrollo y consumo de APIs REST para integración de sistemas financieros.',
        'Análisis técnico y resolución de incidencias complejas en entornos productivos.',
        'Gestión de código y 􀃮ujos de trabajo con Git y GitLab, asegurando calidad y trazabilidad.',
        'Optimización de consultas en SQL Server y Oracle, mejorando tiempos de respuesta y estabilidad del sistema.'
      ],
      technologies: ['.NET', '.NET Core', 'DevExpress', 'MVC', 'Oracle', 'Angular', 'C#', 'HTML', 'CSS', 'Java', 'Git', 'GitLab']
    },  
  {
      date: '04/2024 - 08/2024',
      role: 'Desarrollador Especialista',
      company: 'Consejo Nacional Electoral "CNE"',
      location: 'Quito',
      description: [
        'Desarrollo de sistemas electorales críticos bajo altos estándares de seguridad, confiabilidad y rendimiento.',
        'Implementación de servicios backend en C# y .NET Core para garantizar integridad y trazabilidad de los datos.',
        'Aplicación de arquitectura MVC para mejorar mantenibilidad y escalabilidad.',
        'Optimización de bases de datos Oracle 12.5 para manejo de grandes volúmenes de información.'
      ],
      technologies: ['.NET', '.NET Core', 'DevExpress', 'MVC', 'Oracle 12.5', 'Angular', 'C#', 'HTML', 'CSS']
    },
    {
      date: '03/2022 - 12/2023',
      role: 'Desarrollador Especialista',
      company: 'Consejo Nacional Electoral "CNE"',
      location: 'Quito',
      description: [
        'Desarrollo de sistemas para control de contabilidad electoral.',
        'Implementación de soluciones Full Stack para integración y consolidación de datos.',
        'Desarrollo de módulos backend robustos en .NET Core y C#.',
        'Trabajo en entornos regulados con altos estándares de calidad.',
      ],
      technologies: ['.NET', '.NET Core', 'DevExpress', 'MVC', 'Oracle 12.5', 'Angular', 'C#', 'HTML', 'CSS']
    },
    {
      date: '10/2020 - 03/2022',
      role: 'Desarrollador Semi Senior',
      company: 'Lead Solutions',
      location: 'Quito',
      description: [
        'Creación de sistema de facturación y migración de sistemas antiguos.',
        'Creación de servicios REST y SOAP.',
        'Desarrollo Full Stack con módulos independientes.'
      ],
      technologies: ['SQL Server', '.NET', 'C#', 'Angular']
    },
    {
      date: '09/2019 - 09/2020',
      role: 'Desarrollador',
      company: 'NimbusSoft',
      location: 'Quito',
      description: [
        'Servicios REST y SOAP para sistemas de aduanas.',
        'Uso de múltiples lenguajes: HTML, CSS, jQuery, C#, Java, Bootstrap, ASPX, .NET, Kotlin, TypeScript, JS.'
      ],
      technologies: ['SQL Server', 'Scripts', 'Stored Procedures', 'Jobs', 'Triggers']
    },
    {
      date: '09/2018 - 09/2019',
      role: 'Desarrollador Junior',
      company: 'IT del Ecuador',
      location: 'Quito',
      description: [
        'Mantenimiento de servidores.',
        'Desarrollo de aplicaciones web con C# y DevExpress.',
        'Bases de datos SQL Server y Oracle.'
      ],
      technologies: ['SQL Server', 'Oracle', 'C#', 'DevExpress']
    },
    {
      date: '09/2013 - 09/2014',
      role: 'Desarrollador Junior (Pasante)',
      company: 'EMASEO',
      location: 'Quito',
      description: [
        'Prácticas pre-profesionales en sistemas de control de ingreso y salida de empleados.',
        'Creación de APIs con .NET y base de datos SQL Server.'
      ],
      technologies: ['.NET', 'SQL Server']
    },
    {
      date: '06/2012 - 06/2013',
      role: 'Call Center',
      company: 'TATA',
      location: 'Quito',
      description: ['Atención al cliente.'],
      technologies: ['Aplicaciones de banca']
    }
  ]);
}
