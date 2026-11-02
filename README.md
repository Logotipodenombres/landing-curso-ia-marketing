# Landing Page · Curso "De la IA al Marketing Digital en 3 días" — JC Creativo

Landing page comercial preparada para publicarse en **Hostinger** (hosting estático: solo subir archivos).
Mobile First, responsive, optimizada para velocidad, SEO y conversión.

---

## 1. Cómo editar la información (fechas, precios, WhatsApp, temario…)

Todo lo **variable** vive en un solo archivo:

```
js/config.js
```

Ahí puedes cambiar:

| Sección del archivo        | Qué controla                                                    |
| -------------------------- | --------------------------------------------------------------- |
| `curso`                    | Modalidad, lugar, sede, horario, instructor                      |
| `fechas`                   | Fechas del curso y si ya están confirmadas                       |
| `precios`                  | Planes: precio normal, promoción, fecha límite y contador de días  |
| `contacto`                 | Número de WhatsApp, teléfono visible, correo y sitio web         |
| `redes`                    | Enlaces de Facebook, Instagram, TikTok (`null` = no se muestran) |
| `mensajes`                 | Mensajes predefinidos de WhatsApp (inscripción y capacitación)   |
| `programa`                 | Los 3 días: objetivo, temario y actividad práctica               |
| `galeria`                  | Fotografías de la galería (rutas y textos alternativos)          |
| `certificacion`            | Estándar EC0217.01, folio, documento y nota legal                |
| `reconocimiento`           | Imagen y textos del reconocimiento de capacitación               |
| `faq`                      | Preguntas frecuentes                                             |
| `textos`                   | Texto de los botones principales                                 |

**Regla de precios:** cada plan en `precios.planes` define `normal`, `promocion` y `limitePromoISO`.
La página muestra el ahorro calculado, un contador con los días restantes para pagar y el aviso de
que, vencida la fecha límite, se aplica el precio normal. Al cambiar `limitePromoISO` el contador
se actualiza automáticamente.

**Regla de fechas:** mientras `fechas.confirmadas` sea `false`, la página muestra la leyenda
"Fechas tentativas sujetas a confirmación". Cámbialo a `true` cuando se confirmen.

---

## 2. Cambiar las fotografías

1. Optimiza tus fotos (recomendado: `.webp`, máximo 1200 px de ancho).
2. Súbelas a `img/galeria/` (galería del curso) o `img/empresa/` (sección de capacitaciones).
3. Actualiza las rutas en `js/config.js` (sección `galeria`) o en `index.html` (bloque `corp-photos`).

Las fotografías actuales son reales de cursos impartidos por JC Creativo. No uses fotos de stock
en la galería: la confianza se construye con experiencia real.

---

## 3. Publicar en Hostinger

1. Entra a **hPanel → Administrar hosting → Administrador de archivos** (o conecta por FTP).
2. Sube **todo el contenido de esta carpeta** dentro de `public_html/`.
   - Si la página será tu sitio principal: el contenido va directo en `public_html/`.
   - Si convivirá con otro sitio (por ejemplo tu web actual), crea `public_html/curso/` y súbelo ahí.
3. Asegúrate de que `index.html` quede en la raíz pública.
4. Si usas SSL (recomendado, se activa gratis desde hPanel), actualiza las URLs canónicas
   en `index.html` (`canonical`, `og:url`) y en `sitemap.xml` con tu dominio final.

Estructura que se sube:

```
public_html/
├── index.html
├── aviso-privacidad.html
├── robots.txt
├── sitemap.xml
├── css/
│   └── styles.css
├── js/
│   ├── config.js        ← archivo editable
│   └── main.js
└── img/
    ├── logo-jc.png / logo-jc-claro.png
    ├── hero-instructor.webp (foto del instructor: portada y biografía)
    ├── reconocimiento.webp / reconocimiento-640.webp
    ├── cert-ec0217.webp / logo-conocer.webp
    ├── og-cover.jpg / favicon.png / apple-touch-icon.png
    ├── galeria/         (7 fotos del curso, versiones 640 y 1200)
    └── empresa/         (3 fotos para capacitaciones)
```

---

## 4. WhatsApp y formulario

- El número de WhatsApp se configura en `js/config.js → contacto.whatsapp`
  (formato: solo dígitos con código de país, ej. `527531597808`).
- El formulario **no envía datos a ningún servidor**: arma un mensaje y abre WhatsApp con el texto listo.
  Esto elimina riesgo de robo de datos y no requiere backend.
- Medidas anti-spam: campo oculto tipo *honeypot* y validación de tiempo mínimo antes de enviar.
- La confirmación de envío indica expresamente que **la solicitud no es una inscripción confirmada**.

---

## 5. Estadísticas y medición de conversiones

El código ya envía eventos a `window.dataLayer` (compatible con Google Tag Manager / GA4):

| Evento                | Cuándo se dispara                        |
| --------------------- | ---------------------------------------- |
| `solicitud_inscripcion` | Al enviar el formulario de inscripción |
| `formulario_error`      | Cuando la validación falla             |
| `faq_abierta`           | Al abrir una pregunta frecuente        |
| `galeria_abierta`       | Al ampliar una fotografía              |

Para activar la medición: crea tu contenedor en [tagmanager.google.com](https://tagmanager.google.com)
y pega el snippet de GTM en `<head>` de `index.html` (justo después de `<meta name="viewport">`).
Ninguna herramienta externa se carga hasta que tú la agregues.

---

## 6. SEO incluido

- Title y meta description optimizados.
- Open Graph y Twitter Card con imagen (`img/og-cover.jpg`).
- Datos estructurados (JSON-LD): `Course`, `Organization` y `FAQPage`.
- `robots.txt` y `sitemap.xml` listos (ajusta el dominio en ambos).
- Imágenes con `alt`, dimensiones y carga diferida (`loading="lazy"`).
- HTML semántico con encabezados jerárquicos y navegación accesible.

---

## 7. Accesibilidad y rendimiento

- Navegación completa por teclado, foco visible y `prefers-reduced-motion`.
- Contraste alto sobre fondo oscuro.
- Botón de inscripción fijo en móviles que se oculta sobre el formulario para no tapar contenido.
- Tipografías con `display=swap`; imágenes en WebP con versión ligera (640 px) para móviles.

---

## 8. Notas importantes

- **CONOCER:** la página indica que el instructor cuenta con la certificación EC0217.01 y muestra el
  documento del estándar. No se afirma en ningún punto que el curso esté avalado o certificado por CONOCER.
  Si tienes la imagen de tu constancia/certificado personal, reemplaza `img/cert-ec0217.webp`
  (o cambia la ruta en `js/config.js → certificacion.documento`) y actualiza el folio en `certificacion.folio`.
- **Reconocimiento:** la sección 9 muestra la vista previa del reconocimiento de capacitación
  (`img/reconocimiento.webp`). Si actualizas el diseño del reconocimiento, reemplaza esa imagen
  o cambia la ruta en `js/config.js → reconocimiento.imagen`.
- **Redes sociales:** al no estar definidos los perfiles en `redes`, solo se muestra el sitio web.
  Pega las URLs en `js/config.js` para activar Facebook, Instagram y TikTok.
- **Precios y preventa:** pendientes de definir; el módulo de precio está preparado para mostrarlos
  automáticamente en cuanto se llenen en `config.js`.

---

## 9. Video promocional

La carpeta `promo/` incluye un video promocional de ~30 segundos, vertical 9:16 (1080×1920),
listo para Reels, TikTok, Facebook y WhatsApp Status:

- `promo-curso-9x16.mp4` — video con voz profesional en español latino (es-MX), fotografías reales
  del curso, identidad JC Creativo y llamada a la acción a WhatsApp.
- `promo-portada.jpg` — imagen de portada para publicar el video.

Se recomienda agregar subtítulos al publicar en redes (muchos usuarios ven sin audio).
El archivo se puede subir directamente desde el administrador de archivos de Hostinger o desde
las propias herramientas de publicación de cada red social.

---

Desarrollado para JC Creativo · Ing. Juan Carlos Molina — Lázaro Cárdenas, Michoacán.
