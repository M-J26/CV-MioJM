import { Injectable } from '@angular/core';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

export interface CVGeneratorConfig {
  language: 'es' | 'en';
  imageUrl: string;
  fullName: string;
  title: string;
  email: string;
  phone: string;
  github?: string;
  linkedin?: string;
  portfolio?: string;
}

@Injectable({
  providedIn: 'root',
})
export class PdfGeneratorService {
  /**
   * Genera un CV en PDF con diseño moderno optimizado para reclutadores
   * Basado en mejores prácticas de ATS (Applicant Tracking Systems)
   */
  async generateCVPdf(config: CVGeneratorConfig): Promise<void> {
    try {
      const element = this.createCVHTML(config);
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const ratio = pdfWidth / canvasWidth;
      const scaledHeight = canvasHeight * ratio;

      let heightLeft = scaledHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, scaledHeight);
      heightLeft -= pdfHeight;

      while (heightLeft >= 0) {
        position = heightLeft - scaledHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, scaledHeight);
        heightLeft -= pdfHeight;
      }

      const filename = config.language === 'es' ? 'CV_JM.pdf' : 'CV_JM_EN.pdf';
      pdf.save(filename);
      document.body.removeChild(element);
    } catch (error) {
      console.error('Error generando PDF:', error);
      throw new Error('No se pudo generar el PDF del CV');
    }
  }

  private createCVHTML(config: CVGeneratorConfig): HTMLElement {
    const container = document.createElement('div');
    container.style.cssText = `
      width: 210mm;
      height: 297mm;
      padding: 20mm;
      background: white;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      color: #333;
      line-height: 1.6;
      position: absolute;
      left: -9999px;
      top: -9999px;
    `;

    const content = config.language === 'es' ? this.getSpanishContent(config) : this.getEnglishContent(config);
    container.innerHTML = content;

    document.body.appendChild(container);
    return container;
  }

  private getSpanishContent(config: CVGeneratorConfig): string {
    return `
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-size: 11px; }
        .header { display: flex; align-items: center; gap: 20px; margin-bottom: 20px; border-bottom: 2px solid #2c3e50; padding-bottom: 15px; }
        .profile-img { width: 100px; height: 100px; border-radius: 50%; object-fit: cover; border: 3px solid #3498db; }
        .header-info h1 { font-size: 24px; color: #2c3e50; margin: 0; }
        .header-info p { color: #7f8c8d; font-size: 12px; margin: 2px 0; }
        .contact-info { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 8px; font-size: 10px; }
        .contact-info a { color: #3498db; text-decoration: none; }
        .section { margin-bottom: 15px; }
        .section-title { font-size: 14px; font-weight: bold; color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 5px; margin-bottom: 8px; }
        .section-content { font-size: 10px; }
        .job-entry { margin-bottom: 10px; }
        .job-title { font-weight: bold; color: #2c3e50; }
        .job-company { color: #3498db; font-weight: 600; }
        .job-period { color: #95a5a6; font-size: 9px; }
        .job-description { margin-top: 3px; color: #555; line-height: 1.4; }
        .skills-list { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 5px; }
        .skill-tag { background: #ecf0f1; color: #2c3e50; padding: 3px 8px; border-radius: 12px; font-size: 9px; border: 1px solid #bdc3c7; }
        .education-entry { margin-bottom: 8px; }
        .degree { font-weight: bold; color: #2c3e50; }
        .school { color: #3498db; }
      </style>

      <div class="header">
        <img src="${config.imageUrl}" alt="Foto de perfil" class="profile-img" />
        <div class="header-info">
          <h1>${config.fullName}</h1>
          <p>${config.title}</p>
          <div class="contact-info">
            <span>📧 ${config.email}</span>
            <span>📱 ${config.phone}</span>
            ${config.github ? `<a href="${config.github}">GitHub</a>` : ''}
            ${config.linkedin ? `<a href="${config.linkedin}">LinkedIn</a>` : ''}
            ${config.portfolio ? `<a href="${config.portfolio}">Portafolio</a>` : ''}
          </div>
        </div>
      </div>

      <div class="section">
        <div class="section-title">PERFIL PROFESIONAL</div>
        <div class="section-content">
          Desarrollador Full Stack con 8+ años de experiencia en arquitectura de software, desarrollo de soluciones escalables y mejora continua. Especializado en Angular, .NET y Java con enfoque en calidad, rendimiento y experiencia de usuario.
        </div>
      </div>

      <div class="section">
        <div class="section-title">EXPERIENCIA LABORAL</div>
        <div class="section-content">
          <div class="job-entry">
            <div class="job-title">Senior Full Stack Developer</div>
            <div class="job-company">Diversos Clientes - Freelance</div>
            <div class="job-period">2020 - Presente</div>
            <div class="job-description">
              • Diseño y desarrollo de aplicaciones web escalables con Angular y .NET<br>
              • Optimización de rendimiento y refactorización de código legacy<br>
              • Mentoring y liderazgo técnico de equipos
            </div>
          </div>
          <div class="job-entry">
            <div class="job-title">Full Stack Developer</div>
            <div class="job-company">Empresas Tecnológicas</div>
            <div class="job-period">2018 - 2020</div>
            <div class="job-description">
              • Implementación de características en plataformas empresariales<br>
              • Desarrollo backend con Java Spring Boot y C#<br>
              • Bases de datos Oracle, SQL Server y PostgreSQL
            </div>
          </div>
        </div>
      </div>

      <div class="section">
        <div class="section-title">HABILIDADES TÉCNICAS</div>
        <div class="skills-list">
          <span class="skill-tag">Angular</span>
          <span class="skill-tag">.NET/C#</span>
          <span class="skill-tag">Java</span>
          <span class="skill-tag">React</span>
          <span class="skill-tag">Spring Boot</span>
          <span class="skill-tag">SQL</span>
          <span class="skill-tag">Git</span>
          <span class="skill-tag">Docker</span>
          <span class="skill-tag">REST APIs</span>
          <span class="skill-tag">TypeScript</span>
        </div>
      </div>

      <div class="section">
        <div class="section-title">EDUCACIÓN</div>
        <div class="section-content">
          <div class="education-entry">
            <div class="degree">Licenciatura en Ingeniería Informática</div>
            <div class="school">Universidad</div>
          </div>
        </div>
      </div>
    `;
  }

  private getEnglishContent(config: CVGeneratorConfig): string {
    return `
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-size: 11px; }
        .header { display: flex; align-items: center; gap: 20px; margin-bottom: 20px; border-bottom: 2px solid #2c3e50; padding-bottom: 15px; }
        .profile-img { width: 100px; height: 100px; border-radius: 50%; object-fit: cover; border: 3px solid #3498db; }
        .header-info h1 { font-size: 24px; color: #2c3e50; margin: 0; }
        .header-info p { color: #7f8c8d; font-size: 12px; margin: 2px 0; }
        .contact-info { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 8px; font-size: 10px; }
        .contact-info a { color: #3498db; text-decoration: none; }
        .section { margin-bottom: 15px; }
        .section-title { font-size: 14px; font-weight: bold; color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 5px; margin-bottom: 8px; }
        .section-content { font-size: 10px; }
        .job-entry { margin-bottom: 10px; }
        .job-title { font-weight: bold; color: #2c3e50; }
        .job-company { color: #3498db; font-weight: 600; }
        .job-period { color: #95a5a6; font-size: 9px; }
        .job-description { margin-top: 3px; color: #555; line-height: 1.4; }
        .skills-list { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 5px; }
        .skill-tag { background: #ecf0f1; color: #2c3e50; padding: 3px 8px; border-radius: 12px; font-size: 9px; border: 1px solid #bdc3c7; }
        .education-entry { margin-bottom: 8px; }
        .degree { font-weight: bold; color: #2c3e50; }
        .school { color: #3498db; }
      </style>

      <div class="header">
        <img src="${config.imageUrl}" alt="Profile Picture" class="profile-img" />
        <div class="header-info">
          <h1>${config.fullName}</h1>
          <p>${config.title}</p>
          <div class="contact-info">
            <span>📧 ${config.email}</span>
            <span>📱 ${config.phone}</span>
            ${config.github ? `<a href="${config.github}">GitHub</a>` : ''}
            ${config.linkedin ? `<a href="${config.linkedin}">LinkedIn</a>` : ''}
            ${config.portfolio ? `<a href="${config.portfolio}">Portfolio</a>` : ''}
          </div>
        </div>
      </div>

      <div class="section">
        <div class="section-title">PROFESSIONAL PROFILE</div>
        <div class="section-content">
          Full Stack Developer with 8+ years of experience in software architecture, scalable solutions development, and continuous improvement. Specialized in Angular, .NET, and Java with focus on quality, performance, and user experience.
        </div>
      </div>

      <div class="section">
        <div class="section-title">PROFESSIONAL EXPERIENCE</div>
        <div class="section-content">
          <div class="job-entry">
            <div class="job-title">Senior Full Stack Developer</div>
            <div class="job-company">Various Clients - Freelance</div>
            <div class="job-period">2020 - Present</div>
            <div class="job-description">
              • Design and development of scalable web applications with Angular and .NET<br>
              • Performance optimization and legacy code refactoring<br>
              • Technical mentoring and team leadership
            </div>
          </div>
          <div class="job-entry">
            <div class="job-title">Full Stack Developer</div>
            <div class="job-company">Tech Companies</div>
            <div class="job-period">2018 - 2020</div>
            <div class="job-description">
              • Feature implementation in enterprise platforms<br>
              • Backend development with Java Spring Boot and C#<br>
              • Oracle, SQL Server, and PostgreSQL databases
            </div>
          </div>
        </div>
      </div>

      <div class="section">
        <div class="section-title">TECHNICAL SKILLS</div>
        <div class="skills-list">
          <span class="skill-tag">Angular</span>
          <span class="skill-tag">.NET/C#</span>
          <span class="skill-tag">Java</span>
          <span class="skill-tag">React</span>
          <span class="skill-tag">Spring Boot</span>
          <span class="skill-tag">SQL</span>
          <span class="skill-tag">Git</span>
          <span class="skill-tag">Docker</span>
          <span class="skill-tag">REST APIs</span>
          <span class="skill-tag">TypeScript</span>
        </div>
      </div>

      <div class="section">
        <div class="section-title">EDUCATION</div>
        <div class="section-content">
          <div class="education-entry">
            <div class="degree">Bachelor's in Computer Science</div>
            <div class="school">University</div>
          </div>
        </div>
      </div>
    `;
  }
}
