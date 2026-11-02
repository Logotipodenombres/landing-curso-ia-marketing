/* =============================================================
   CONFIGURACIÓN CENTRALIZADA · JC CREATIVO
   -------------------------------------------------------------
   Este es el ÚNICO archivo que necesitas editar para actualizar
   la información de la landing: fechas, precios, horarios, sede,
   WhatsApp, redes sociales, temario, preguntas frecuentes,
   fotografías de la galería y textos clave.

   Instrucciones rápidas:
   - Cambia el valor entre comillas y guarda el archivo.
   - Usa "null" cuando un dato esté pendiente (la página mostrará
     "Por confirmar" o "Solicitar información", según corresponda).
   - No borres las comas ni las llaves { }.
   ============================================================= */

window.CONFIG = {

  /* ---------- 1. DATOS GENERALES DEL CURSO ---------- */
  curso: {
    titulo: "De la inteligencia artificial al marketing digital en 3 días",
    subtitulo: "Aprende a utilizar la inteligencia artificial, editar videos y aplicar estrategias de marketing para crear contenido que conecte con tus clientes y promocione tu negocio, servicios o proyectos.",
    duracion: "3 días",
    modalidad: "Presencial",
    lugar: "Lázaro Cárdenas, Michoacán",
    sede: "CECATI 70",             // Cambia el texto si se requiere agregar dirección o referencias
    horario: "4:00 a 8:00 p.m.",
    instructor: "Ing. Juan Carlos Molina",
    incluye: "Reconocimiento de capacitación",
    grupos: "Grupos limitados"
  },

  /* ---------- 2. FECHAS ---------- */
  fechas: {
    texto: "26, 27 y 28 de noviembre de 2026",
    confirmadas: true,           // Cambia a false si vuelven a ser tentativas
    nota: "Fechas tentativas sujetas a confirmación."
  },

  /* ---------- 3. PRECIOS Y PROMOCIONES ----------
     Precios por persona, en pesos mexicanos (MXN).
     "limitePromoISO" controla el contador de días restantes.
     "promocion" aplica únicamente si el pago se realiza antes de la fecha límite. */
  precios: {
    moneda: "MXN",
    porPersona: true,
    nota: "Precios por persona, en pesos mexicanos (MXN).",
    planes: [
      {
        id: "programa-completo",
        destacado: true,
        etiqueta: "Programa principal",
        titulo: "Programa completo · 3 días",
        detalle: "Jueves 26: IA básica · Viernes 27: edición de video · Sábado 28: marketing digital.",
        fechas: "26, 27 y 28 de noviembre de 2026",
        horario: "4:00 a 8:00 p.m. los tres días",
        normal: 2970,
        promocion: 1797,
        limitePromoISO: "2026-11-20",
        limitePromoTexto: "Paga el total a más tardar el 20 de noviembre de 2026",
        incluye: [
          "3 días de curso presencial completo",
          "Material y ejercicios prácticos",
          "Reconocimiento de capacitación al cumplir las condiciones",
          "Acompañamiento durante las actividades"
        ]
      },
      {
        id: "ia-basica",
        destacado: false,
        etiqueta: "Taller de 1 día",
        titulo: "IA Básica · 4 horas",
        detalle: "Sábado 21 de noviembre. Elige el horario que mejor te acomode.",
        fechas: "Sábado 21 de noviembre de 2026",
        horario: "9:00 a.m. a 1:00 p.m. o 4:00 a 8:00 p.m.",
        normal: 990,
        promocion: 599,
        limitePromoISO: "2026-11-14",
        limitePromoTexto: "Paga a más tardar el 14 de noviembre de 2026",
        incluye: [
          "Curso presencial de 4 horas",
          "Introducción práctica a la inteligencia artificial",
          "Material y ejercicios prácticos"
        ]
      }
    ]
  },

  /* ---------- 4. CONTACTO ---------- */
  contacto: {
    whatsapp: "527531597808",            // Solo números, con código de país
    whatsappVisible: "753 159 7808",
    email: "jcmt_krad@hotmail.com",
    sitio: "https://jccreativo.com.mx/"
  },

  /* ---------- 5. REDES SOCIALES ----------
     Pega aquí la URL completa de cada perfil. Si no usas alguna,
     déjala en null y no se mostrará. */
  redes: {
    facebook: null,   // Ej. "https://www.facebook.com/tuperfil"
    instagram: null,  // Ej. "https://www.instagram.com/tuperfil"
    tiktok: null,     // Ej. "https://www.tiktok.com/@tuperfil"
    sitio: "https://jccreativo.com.mx/"
  },

  /* ---------- 6. MENSAJES DE WHATSAPP ----------
     {nombre} se reemplaza automáticamente por el nombre del formulario. */
  mensajes: {
    inscripcion: "Hola, vi la página del curso «De la inteligencia artificial al marketing digital en 3 días» de JC Creativo y me interesa recibir información para inscribirme. Mi nombre es {nombre}.",
    capacitacionPrivada: "Hola, vi la página de cursos de JC Creativo y me interesa solicitar información sobre una capacitación privada para mi negocio, empresa u organización. Me gustaría conocer las opciones disponibles."
  },

  /* ---------- 7. PROGRAMA (3 días) ---------- */
  programa: [
    {
      dia: 1,
      kicker: "Etapa 1 · Crear",
      titulo: "Inteligencia artificial aplicada",
      objetivo: "Aprender a utilizar herramientas de inteligencia artificial para crear contenido, generar ideas y mejorar actividades personales y profesionales.",
      temas: [
        "Introducción práctica a la inteligencia artificial",
        "ChatGPT y sus aplicaciones reales",
        "Cómo escribir instrucciones o prompts efectivos",
        "Generación de textos, ideas y contenido comercial",
        "Creación de imágenes con inteligencia artificial",
        "Redacción de guiones para videos y anuncios",
        "Aplicaciones para emprendedores, trabajadores y negocios",
        "Cómo utilizar versiones gratuitas y aprovechar sus capacidades"
      ],
      practica: "Crear una idea de campaña, su mensaje comercial y un guion para video con ayuda de la IA."
    },
    {
      dia: 2,
      kicker: "Etapa 2 · Transformar",
      titulo: "Creación y edición de videos",
      objetivo: "Aprender a transformar las ideas y guiones del primer día en contenido audiovisual atractivo para redes sociales.",
      temas: [
        "Fundamentos de video para redes sociales",
        "Introducción a CapCut",
        "Formatos verticales y horizontales",
        "Organización de clips y material audiovisual",
        "Cortes, transiciones y ritmo narrativo",
        "Música, efectos y subtítulos",
        "Textos y elementos gráficos",
        "Cómo crear videos con ganchos de atención",
        "Edición de videos promocionales",
        "Exportación para TikTok, Facebook, Instagram y otras plataformas"
      ],
      practica: "Editar un video utilizando el guion desarrollado durante el primer día."
    },
    {
      dia: 3,
      kicker: "Etapa 3 · Promocionar",
      titulo: "Marketing digital para aplicar lo aprendido",
      objetivo: "Aprender a utilizar el contenido producido durante los primeros dos días dentro de una estrategia de marketing orientada a atraer clientes y generar oportunidades comerciales.",
      temas: [
        "Fundamentos del marketing digital",
        "Identificación del cliente ideal",
        "Necesidades, problemas y deseos del consumidor",
        "Cómo construir mensajes comerciales atractivos",
        "Diferencia entre publicar contenido y desarrollar una estrategia",
        "Técnicas de copywriting",
        "Ganchos de atención y llamadas a la acción",
        "Aplicación del modelo AIDA",
        "Estrategias orgánicas para redes sociales",
        "Conceptos básicos de campañas publicitarias",
        "Cómo distribuir los videos creados",
        "Medición de resultados y mejora de contenido"
      ],
      practica: "Desarrollar una pequeña estrategia de marketing que integre las ideas creadas con inteligencia artificial y el video editado durante el curso."
    }
  ],

  /* ---------- 8. GALERÍA DE CURSOS ANTERIORES ----------
     src: ruta de la imagen (webp 1200px). Para cambiar una foto,
     sube el archivo a la carpeta img/galeria/ y actualiza src y alt. */
  galeria: [
    { src: "img/galeria/g1-clase-selfie-1200.webp",          src640: "img/galeria/g1-clase-selfie-640.webp",          alt: "Instructor de JC Creativo en un selfie con los participantes de un curso" },
    { src: "img/galeria/g2-reconocimientos-1200.webp",       src640: "img/galeria/g2-reconocimientos-640.webp",       alt: "Participantes de un curso de JC Creativo mostrando sus reconocimientos" },
    { src: "img/galeria/g3-marketing-emprendedores-1200.webp", src640: "img/galeria/g3-marketing-emprendedores-640.webp", alt: "Grupo de participantes del taller Marketing para Emprendedores de JC Creativo" },
    { src: "img/galeria/g4-grupo-curso-1200.webp",           src640: "img/galeria/g4-grupo-curso-640.webp",           alt: "Grupo de participantes durante una capacitación de JC Creativo" },
    { src: "img/galeria/g5-grupo-exterior-1200.webp",        src640: "img/galeria/g5-grupo-exterior-640.webp",        alt: "Participantes de un curso de JC Creativo en foto de grupo al aire libre" },
    { src: "img/galeria/g6-capacitacion-institucional-1200.webp", src640: "img/galeria/g6-capacitacion-institucional-640.webp", alt: "Capacitación impartida por JC Creativo a personal de una institución pública" },
    { src: "img/galeria/g7-instructor-participantes-1200.webp", src640: "img/galeria/g7-instructor-participantes-640.webp", alt: "Ing. Juan Carlos Molina, instructor de JC Creativo, con los participantes de un curso" }
  ],

  /* ---------- 9. CERTIFICACIÓN EC0217.01 ---------- */
  certificacion: {
    estandar: "EC0217.01",
    nombre: "Impartición de cursos de formación del capital humano de manera presencial grupal",
    sistema: "Sistema Nacional de Competencias (CONOCER)",
    folio: "D-0025243026",       // Folio del instructor. Cámbialo o pon null si no aplica.
    documento: "img/cert-ec0217.webp",  // Imagen del documento verificable
    logoConocer: "img/logo-conocer.webp",
    nota: "La certificación EC0217.01 acredita la competencia del instructor para impartir cursos de forma presencial. Este curso no está avalado ni certificado por CONOCER."
  },

  /* ---------- 10. RECONOCIMIENTO ----------
     Imagen y textos del reconocimiento de capacitación. */
  reconocimiento: {
    titulo: "Reconocimiento de capacitación",
    imagen: "img/reconocimiento.webp",       // Diseño del reconocimiento (sube el tuyo a img/)
    imagen640: "img/reconocimiento-640.webp",
    texto: "Incluye reconocimiento de capacitación expedido por JC Creativo, impartido por instructor certificado en el Estándar de Competencia EC0217.01 de CONOCER. Documento que puede integrarse al currículum profesional como evidencia de formación.",
    nota: "Vista previa del reconocimiento de capacitación de JC Creativo. El diseño final puede variar. Este documento no es una certificación oficial ni está avalado por CONOCER.",
    condiciones: [
      "Asistir a las tres sesiones del curso",
      "Participar en las actividades prácticas propuestas",
      "Cumplir con las condiciones de participación comunicadas al inicio del curso"
    ]
  },

  /* ---------- 11. PREGUNTAS FRECUENTES ---------- */
  faq: [
    {
      p: "¿Necesito experiencia previa en inteligencia artificial, video o marketing?",
      r: "No. El curso está diseñado para principiantes: partimos desde los fundamentos y avanzamos paso a paso con ejercicios prácticos."
    },
    {
      p: "¿Qué requisitos necesito para participar?",
      r: "Solo necesitas interés por aprender y asistir a las tres sesiones. No se requieren conocimientos técnicos previos."
    },
    {
      p: "¿Las herramientas que se utilizan son gratuitas?",
      r: "Trabajaremos con herramientas que cuentan con versiones gratuitas, y aprenderás a aprovechar sus capacidades sin necesidad de pagar suscripciones."
    },
    {
      p: "¿Necesito llevar laptop?",
      r: "Te recomendamos llevar laptop o dispositivo con acceso a internet para realizar las actividades prácticas. Los detalles de requisitos se confirmarán antes del curso."
    },
    {
      p: "¿Cuál es el horario del curso?",
      r: "El Programa completo se imparte de 4:00 a 8:00 p.m. los días 26, 27 y 28 de noviembre de 2026. El taller IA Básica (sábado 21 de noviembre) tiene dos horarios: de 9:00 a.m. a 1:00 p.m. o de 4:00 a 8:00 p.m."
    },
    {
      p: "¿Hasta cuándo aplica el precio de promoción?",
      r: "El precio anticipado aplica únicamente si el pago se realiza a más tardar el 20 de noviembre de 2026 para el Programa completo y el 14 de noviembre de 2026 para el taller IA Básica. Después de esas fechas se aplica el precio normal."
    },
    {
      p: "¿Dónde se llevará a cabo?",
      r: "El curso es presencial en las instalaciones del CECATI 70, en Lázaro Cárdenas, Michoacán. Te compartiremos la ubicación exacta y referencias por WhatsApp antes de tu primera sesión."
    },
    {
      p: "¿Incluye algún reconocimiento?",
      r: "Sí. Incluye reconocimiento de capacitación expedido por JC Creativo, impartido por instructor certificado en el Estándar de Competencia EC0217.01 de CONOCER. Es un documento que puede integrarse a tu currículum profesional como evidencia de formación. Este reconocimiento no es una certificación oficial ni está avalado por CONOCER."
    },
    {
      p: "¿Cómo me inscribo?",
      r: "Solicita información con el botón de inscripción o escríbenos por WhatsApp. Un asesor te compartirá la información de fechas, precios y formas de pago. Tu lugar se confirma hasta recibir la confirmación por parte del equipo de JC Creativo."
    }
  ],

  /* ---------- 12. TEXTOS CLAVE (opcionales) ----------
     Solo cambia aquí los textos si quieres actualizar el mensaje
     de algún botón o etiqueta sin tocar el HTML. */
  textos: {
    ctaPrincipal: "Quiero inscribirme",
    ctaSecundaria: "Ver programa",
    ctaCapacitacion: "Solicitar capacitación privada"
  }
};
