# 📍 INSTRUCCIONES PARA AGREGAR EL LOGO DE WNL FLOORING

## 🎯 Ubicación del Logo

**Guarda tu logo aquí:**
```
📁 c:\wnlcotizacion\public\assets\wnl-logo.png
```

## 📐 Especificaciones del Logo

### Formato Recomendado:
- **Formato:** PNG (con fondo transparente) o JPG
- **Tamaño:** 400x200 pixels (ratio 2:1)
- **Resolución:** 300 DPI para mejor calidad en PDF
- **Peso:** Máximo 500KB

### Alternativas Aceptadas:
- 200x100 pixels (mínimo)
- 600x300 pixels (máximo recomendado)
- Formatos: PNG, JPG, JPEG

## 🔧 Cómo Activar el Logo en el PDF

1. **Guarda tu logo** en la ubicación exacta: `public/assets/wnl-logo.png`

2. **Descomenta las líneas del código** en `QuoteGenerator.tsx`:
   Busca estas líneas (aproximadamente línea 62-64):
   ```typescript
   // pdf.addImage('/assets/wnl-logo.png', 'PNG', margin, yPosition, 40, 20);
   // yPosition += 25;
   ```
   
3. **Quita los comentarios** para que quede así:
   ```typescript
   pdf.addImage('/assets/wnl-logo.png', 'PNG', margin, yPosition, 40, 20);
   yPosition += 25;
   ```

## 📄 Posición del Logo en el PDF

El logo aparecerá:
- **Ubicación:** Esquina superior izquierda
- **Tamaño en PDF:** 40x20 mm
- **Posición:** Arriba del nombre de la empresa

## 🎨 Recomendaciones de Diseño

- **Fondo transparente** para mejor integración
- **Colores corporativos** que combinen con azul #2962A6
- **Texto legible** si incluye texto en el logo
- **Diseño limpio** y profesional

## 🔄 Si No Tienes Logo Aún

Puedes usar el generador sin logo y agregarlo más tarde. La aplicación funcionará perfectamente sin él.

---

**Nota:** Una vez agregues el logo, reinicia la aplicación (`npm run dev`) para ver los cambios reflejados en los PDFs generados.
