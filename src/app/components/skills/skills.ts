import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Skill {
  name: string;
  image: string;
  url: string;
}

@Component({
  selector: 'app-skills',
  imports: [CommonModule],
  templateUrl: './skills.html',
  styleUrl: './skills.css',
})
export class Skills {
  protected readonly skills = signal<Skill[]>([
    { name: '.NET', image: './img/DoNet.png', url: 'https://dotnet.microsoft.com/' },
    { name: 'Angular', image: 'https://angular.io/assets/images/logos/angular/angular.svg', url: 'https://angular.io/' },
    { name: 'React', image: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg', url: 'https://react.dev/' },
    { name: 'Java', image: 'https://upload.wikimedia.org/wikipedia/en/3/30/Java_programming_language_logo.svg', url: 'https://www.java.com/' },
    { name: 'Spring Boot', image: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Spring_Framework_Logo_2018.svg', url: 'https://spring.io/projects/spring-boot' },
    { name: 'SQL Server', image: 'https://upload.wikimedia.org/wikipedia/commons/8/87/Sql_data_base_with_logo.png', url: 'https://www.microsoft.com/en-us/sql-server' },
    { name: 'Oracle', image: 'https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg', url: 'https://www.oracle.com/' },
    { name: 'PL/SQL', image: 'https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg', url: 'https://docs.oracle.com/en/database/oracle/oracle-database/' },
    { name: 'PostgreSQL', image: 'https://upload.wikimedia.org/wikipedia/commons/2/29/Postgresql_elephant.svg', url: 'https://www.postgresql.org/' },
    { name: 'TypeScript', image: 'https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg', url: 'https://www.typescriptlang.org/' },
    { name: 'GitLab', image: 'https://about.gitlab.com/images/press/logo/png/gitlab-icon-rgb.png', url: 'https://gitlab.com/' },
    { name: 'GitHub', image: 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png', url: 'https://github.com/' },
    { name: 'Grafana', image: 'https://upload.wikimedia.org/wikipedia/commons/3/38/Grafana_logomark.svg', url: 'https://grafana.com/' },
    { name: 'C#', image: 'https://upload.wikimedia.org/wikipedia/commons/4/4f/Csharp_Logo.png', url: 'https://learn.microsoft.com/en-us/dotnet/csharp/' },
  ]);
}
