# 🎉 Funcionalidades Implementadas: Descarga de CV + Analytics de Visitantes

## 📥 Descarga de CV en PDF

### ¿Cómo funciona?

1. **Abre el menú** (ícono hamburguesa en móvil, o menú directo en desktop)
2. **Selecciona idioma**: "CV Español" o "CV English"
3. **Se descarga automáticamente** el archivo PDF con tu CV profesional

### 🎨 Características del CV

- ✅ Diseño moderno y profesional optimizado para ATS
- ✅ Incluye tu foto de perfil en círculo
- ✅ Bilingüe (Español 🇪🇸 e Inglés 🇬🇧)
- ✅ Estructura clara: Perfil → Experiencia → Skills → Educación
- ✅ Colores corporativos profesionales
- ✅ Compatible con lectores ATS de reclutadores

### 📝 Personalización Requerida

Edita `src/app/components/header/header.ts` líneas ~73-81:

```typescript
email: 'jefferson.mino@example.com', // ← Tu email real
phone: '+34 XXXXXXXXX',              // ← Tu teléfono real
github: 'https://github.com/...',    // ← Tu GitHub
linkedin: 'https://linkedin.com/...', // ← Tu LinkedIn
portfolio: 'https://...'             // ← Tu portafolio
```

También actualiza los datos de experiencia en `pdf-generator.service.ts` si es necesario.

---

## 👁️ Análisis de Visitantes por País

### ¿Cómo funciona?

1. **Cada vez que alguien entra** en tu página, se detecta automáticamente su país
2. **Se almacena localmente** en el navegador (localStorage)
3. **Haz clic en "Visitas"** en el menú para ver el desglose

### 📊 Información Disponible

- 📈 Total de visitas
- 🌍 Cantidad de países únicos
- 🗺️ Tabla con desglose:
  - País
  - Número de visitas
  - Porcentaje del total

### ⚙️ Cómo está configurado

**Servicio**: `src/app/shared/services/visitor-analytics.service.ts`

- API: **ip-api.com** (gratis, 45 req/min)
- Almacenamiento: **localStorage** del navegador
- Observable: Actualización en tiempo real

### 🔌 Limitaciones Actuales

- Datos se pierden si el usuario borra localStorage
- Limitado a 45 solicitudes/minuto (sin API key)
- Solo funciona en navegadores (sin SSR)

### 🚀 Mejoras Futuras Recomendadas

Para producción, considera:
1. **Backend API** para persistencia permanente
2. **API key pagado** de ip-api.com o MaxMind
3. **Base de datos** (MongoDB, Firebase, etc.)
4. **Gráficos** con Chart.js o D3.js
5. **Exportar datos** a CSV/Excel

---

## 🌐 Multiidioma

El sitio ahora soporta:
- 🇪🇸 **Español** - Traducción completa
- 🇬🇧 **English** - Traducción completa

**Selector**: En el menú, botones "Español" y "English"

**Archivos de traducción**:
- `src/assets/i18n/es.json`
- `src/assets/i18n/en.json`

---

## 📦 Dependencias Instaladas

```bash
npm install jspdf html2canvas --save
```

- **jsPDF** (v4.2.1): Generación de PDF desde JavaScript
- **html2canvas** (v1.4.1): Conversión de HTML a imagen

---

## 🛠️ Stack Técnico

| Layer | Tecnología |
|-------|-----------|
| Frontend | Angular 20.3 + Standalone Components |
| PDF | jsPDF + html2canvas |
| Geolocalización | ip-api.com (API REST) |
| Idiomas | @ngneat/transloco |
| Estado | RxJS (Observables, BehaviorSubject) |
| Estilos | Tailwind CSS + Custom CSS |

---

## 🚀 Próximos Pasos

### Obligatorio
1. ✏️ Actualizar datos personales (email, teléfono, enlaces)
2. 🧪 Probar descarga de PDF en ambos idiomas
3. 👀 Verificar que la foto se vea correctamente

### Recomendado
1. Agregar experiencia real en el CV
2. Implementar backend para visitantes
3. Añadir más analytics (duracion sesión, clicks, etc.)
4. Crear gráficos de visitantes

---

## 📚 Archivos Principales

```
src/
├── app/
│   ├── shared/services/
│   │   ├── pdf-generator.service.ts      ← Generación de PDF
│   │   └── visitor-analytics.service.ts  ← Analytics de visitantes
│   ├── components/header/
│   │   ├── header.ts                     ← Lógica principal
│   │   ├── header.html                   ← UI mejorada
│   │   └── header.css                    ← Estilos (nuevos)
│   └── app.ts                            ← Inyección de servicios
└── assets/i18n/
    ├── es.json                           ← Traducciones ES
    └── en.json                           ← Traducciones EN
```

---

## 💡 Tips Útiles

### Para desarrolladores

Cambiar la foto de perfil en PDF:
```typescript
// En header.ts, línea ~71
const profileImg = new URL('./img/perfil.jpg', window.location.href).href;
// Cambiar path si es necesario
```

Personalizar diseño del CV:
```typescript
// En pdf-generator.service.ts
// Métodos: getSpanishContent() y getEnglishContent()
// Edita el HTML/CSS para cambiar estilos
```

Usar otra API de geolocalización:
```typescript
// En visitor-analytics.service.ts, método fetchVisitorLocation()
// Reemplaza ip-api.com por MaxMind, ipify, etc.
```

---

## ✅ Checklist de Implementación

- [x] Instalar jsPDF y html2canvas
- [x] Crear servicio de generación de PDF
- [x] Crear servicio de analytics de visitantes
- [x] Actualizar header con botones
- [x] Agregar modal de visitas
- [x] Actualizar traducciones
- [x] Verificar compilación
- [ ] Personalizar datos (email, teléfono, etc.)
- [ ] Probar descarga en navegador
- [ ] Probar analytics en múltiples accesos

---

## 📞 Soporte

Si tienes problemas:
1. Abre la consola del navegador (F12)
2. Revisa si hay errores en red
3. Verifica localStorage (`cv_visitor_analytics`)
4. Prueba en navegador privado/incógnito

¡Listo! Tu CV ahora es descargable en PDF y tu sitio tiene analytics de visitantes. 🎉
