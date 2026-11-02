// Contenido editable. Las rutas son relativas a la página, también en GitHub Pages.
// Deja en blanco los enlaces sin verificar y en null los importes o cupos pendientes.
window.CURSO = (() => {
  const courseName = "IA + VIDEO + MARKETING";
  const logistics = {
    dates: "Jueves 26, viernes 27 y sábado 28 de noviembre de 2026", dateStatus: "Fechas confirmadas",
    city: "Lázaro Cárdenas, Michoacán", venue: "CECATI 70", time: "4:00 p. m. a 8:00 p. m. los tres días",
    mode: "Presencial", duration: "3 días", level: "Introductorio y práctico", capacity: null
  };
  const photos = [
    "El instructor acompaña a participantes con computadoras en un aula con mesas azules.",
    "Participantes de una capacitación muestran sus reconocimientos frente a la cámara.",
    "Grupo del curso Marketing para Emprendedores frente a una pantalla de proyección.",
    "Un grupo amplio de participantes se reúne entre las mesas de un aula.",
    "Participantes reunidos en el exterior de una instalación educativa.",
    "Grupo de capacitación con participantes uniformados.",
    "El instructor está sentado al centro, rodeado de participantes dentro del aula."
  ].map((alt, index) => ({
    caption: ({1:"Entrega de reconocimientos",2:"Taller de marketing para emprendedores"})[index], src: "assets/" + (index + 1) + ".jpg", thumb: "assets/thumb-" + (index + 1) + ".jpg", alt
  }));
  const basic = {name:"Inteligencia artificial básica", date:"Sábado 21 de noviembre de 2026", shifts:["9:00 a. m. a 1:00 p. m.","4:00 p. m. a 8:00 p. m."]};
  const pricing = {
    regular:990, early:599, programSize:3, deadlines:{basico:"2026-11-15T00:00:00-06:00", programa:"2026-11-15T00:00:00-06:00"}, currency:"MXN", payments:[],
    cta:"Consultar inscripciones y precios", earlyCta:"Asegurar mi lugar con precio de preventa",
    text:"Los precios son por persona. Elige el taller de IA básica del sábado 21 o el programa completo del 26 al 28 de noviembre.",
    conditions:"Consulta disponibilidad y condiciones con JC Creativo antes de realizar un pago."
  };
  return {
    basic,
    hero:{
      courseName, promotionalTitle:"De la idea a la acción en 3 días",
      title:"Diciembre está por llegar. ¿Tu negocio está listo para vender?",
      subtitle:"Prepárate para la temporada navideña. Aprende a utilizar inteligencia artificial, crear videos atractivos y promocionar tus productos o servicios con herramientas digitales.",
      cta:"Quiero prepararme para diciembre", secondaryCta:"Aprender IA, video y marketing",
      photo:photos[6].src, photoMobile:photos[6].thumb, photoAlt:photos[6].alt, steps:["Crear","Editar","Promocionar"]
    },
    logistics,
    opportunity:{
      title:"No esperes a diciembre para aprender a promocionarte",
      text:"Aprovecha noviembre para elegir un producto o servicio, escribir su mensaje y preparar el video con el que lo presentarás en diciembre. Si buscas desarrollar tus habilidades profesionales, puedes hacer los mismos ejercicios con una idea para tu portafolio o un proyecto personal.",
      situations:["Tardas demasiado en preparar una publicación.","Te interesa la IA y buscas por dónde empezar.","Tienes una idea para un video y te falta saber editarlo.","Publicas en redes sin una estrategia definida.","Quieres dar a conocer mejor tus productos o servicios.","Buscas formas de agilizar tareas que repites cada semana."],
      transformation:"No necesitas dominar todas las herramientas desde el principio. Necesitas aprender a utilizarlas con un objetivo claro."
    },
    benefits:[
      {title:"Inteligencia artificial",text:"Pasa de una idea suelta a un mensaje, un guion o una imagen que puedas trabajar."},
      {title:"Productividad",text:"Prueba instrucciones reutilizables para agilizar borradores y organizar tus ideas."},
      {title:"Creación de contenido",text:"Elige qué contar y convierte tu mensaje en materiales visuales para tu proyecto."},
      {title:"Edición de videos",text:"Combina clips, textos y sonido en un video adaptado a redes sociales."},
      {title:"Marketing digital",text:"Define a quién quieres llegar y qué acción quieres que tome después de ver tu pieza."},
      {title:"Aplicación práctica",text:"Trabaja en la misma idea durante el taller y reúne tus entregables en una estrategia de promoción."}
    ],
    audience:["Emprendedores que desean promocionar sus productos","Comerciantes y propietarios de negocios","Personas que ofrecen servicios profesionales","Creadores de contenido","Trabajadores administrativos","Responsables de redes sociales","Quienes buscan nuevas habilidades digitales","Principiantes en IA, edición y marketing"],
    days:[
      {title:"Inteligencia artificial",short:"Aprende a crear con inteligencia artificial",objective:"Usa IA para explorar ideas, redactar promociones de temporada y convertir una de ellas en un guion.",
       topics:["Introducción práctica a la IA","Aplicaciones de ChatGPT","Uso de herramientas gratuitas","Cómo escribir prompts efectivos","Generación de textos y contenido","Creación de imágenes con IA","Redacción de guiones para videos","Aplicaciones para negocios y productividad","Ejemplos prácticos de uso cotidiano"],
       activity:"Crea una idea comercial y desarrolla el guion para un video con ayuda de la IA.",result:"Un concepto y un guion listos para trabajar el segundo día."},
      {title:"Edición de video",short:"Convierte tus ideas en videos que capten la atención",objective:"Edita un video corto a partir de tu guion para presentar un producto, un servicio o una promoción.",
       topics:["Fundamentos de edición","Introducción a CapCut","Formatos para redes sociales","Organización de clips","Cortes y ritmo de edición","Música y efectos","Subtítulos","Textos y elementos gráficos","Transiciones","Ganchos de atención","Videos promocionales","Exportación y formatos finales"],
       activity:"Edita un video utilizando el guion que desarrollaste durante el primer día.",result:"Una pieza audiovisual para integrar en tu estrategia comercial el tercer día."},
      {title:"Marketing digital",short:"Aprende a promocionar lo que creaste",objective:"Elige a quién dirigir tu oferta, dónde difundir el video y qué invitación incluir en la publicación.",
       topics:["Conceptos esenciales de marketing","Identificación del cliente ideal","Necesidades y deseos del consumidor","Elaboración de mensajes de venta","Copywriting comercial","Modelo AIDA","Ganchos de atención","Llamadas a la acción","Estrategias para redes sociales","Publicación de videos con objetivos comerciales","Fundamentos de anuncios digitales","Medición básica de resultados","Mejoras a una estrategia de contenido"],
       activity:"Diseña una estrategia sencilla para promocionar tu video.",result:"Un ejercicio integral que une tu idea inicial, la pieza editada y un plan de promoción."}
    ],
    process:["Idea","Inteligencia artificial","Guion y contenido","Edición de video","Pieza audiovisual","Marketing digital","Estrategia de promoción"],
    result:"Trabaja con una idea propia. Al final del recorrido podrás reunir tu guion, tu video y una estrategia básica de publicación y promoción.",
    demo:{
      title:"Una campaña de diciembre, de la idea a la publicación",
      label:"Demostración didáctica · Cafetería ficticia",video:"assets/demo.mp4",poster:"assets/demo-poster.jpg",
      steps:[
        {title:"Crear con IA",text:"Define a quién quieres llegar y usa IA para redactar el mensaje que abrirá tu video."},
        {title:"Editar un video",text:"Coloca la pregunta al inicio, muestra el café en la segunda escena y reserva el cierre para la invitación. Reproduce la pieza para ver el ritmo."},
        {title:"Aplicar marketing",text:"Publica el video cerca de la hora de descanso. Observa cuántas personas preguntan por el menú para decidir qué mensaje probar después."}
      ],
      script:["¿Una pausa?","Café recién molido","Pide el menú de hoy"],
      audience:"Personas que trabajan cerca de la cafetería y buscan una pausa.",
      message:"¿Una pausa entre compras? Este diciembre prueba nuestro café con pan de canela. Escríbenos para conocer el menú navideño de hoy.",cta:"Pide el menú de hoy"
    },
    gallery:{
      title:"La experiencia no solo se cuenta. Se demuestra.",
      text:"Conoce algunas de las capacitaciones y experiencias de aprendizaje compartidas con participantes de distintos sectores.",
      caption:"Capacitación real. Experiencia comprobable. Aprendizaje práctico.",photos
    },
    // Publicar solo materiales y cifras documentados, con autorización cuando corresponda.
    evidence:{title:"Así trabajamos en los talleres",text:"En este curso trabajarás con una idea de tu negocio o proyecto. La usarás para escribir un guion, editar un video y decidir cómo promocionarlo.",testimonials:[],metrics:[],materials:[]},
    instructor:{
      title:"Capacitador en marketing, contenido y proyectos digitales", name:"Ing. Juan Carlos Molina",photo:"assets/instructor.jpg",
      bio:"Juan Carlos Molina es ingeniero industrial, diseñador gráfico y creador de contenido con formación en marketing digital. En JC Creativo combina la capacitación presencial con el desarrollo de identidades visuales, herramientas digitales y estrategias de comunicación para negocios de distintos sectores.",
      skills:["Ingeniero industrial","Más de 10 años de experiencia","Inteligencia artificial aplicada","Herramientas digitales para negocios"]
    },
    certification:{logo:"assets/educacion-conocer.png",
      title:"Preparación profesional que respalda la experiencia de capacitación",image:"",
      standard:"EC0217.01 · Impartición de cursos de formación del capital humano de manera presencial grupal",system:"Sistema Nacional de Competencias · CONOCER",
      text:"El Ing. Juan Carlos Molina cuenta con la certificación EC0217.01 para impartir cursos presenciales en grupo."
    },
    recognition:{basicImage:"assets/reconocimiento-ia.png",image:"assets/reconocimiento.png",
      title:"Recibirás un reconocimiento de capacitación",text:"JC Creativo entregará un reconocimiento de participación a quienes cumplan los requisitos establecidos para el curso.",
      previewTitle:"Reconocimiento de participación",participant:"Nombre del participante",previewText:"Por su participación en el curso presencial «" + courseName + "»."
    },
    pricing,
    includes:["Acceso a los tres días de capacitación","Actividades prácticas","Formación en IA, edición de video y marketing","Reconocimiento de participación sujeto a requisitos"],
    faq:[
      {q:"¿Necesito conocimientos previos?",a:"Puedes comenzar sin experiencia en IA, edición de video o marketing. Los primeros ejercicios te guiarán desde la idea inicial."},
      {q:"¿El curso es adecuado para principiantes?",a:"Sí. El nivel es introductorio y trabajarás paso a paso en un mismo ejercicio durante las tres etapas."},
      {q:"¿Debo llevar mi computadora?",a:"El equipo organizador confirmará el equipo necesario. Al solicitar información, indica si planeas trabajar desde una laptop o un teléfono."},
      {q:"¿Puedo utilizar versiones gratuitas de ChatGPT y otras herramientas?",a:"Sí. El temario incluye cómo aprovechar las versiones gratuitas para realizar los ejercicios."},
      {q:"¿Dónde se impartirá?",a:logistics.mode + " en " + logistics.city + ". " + logistics.venue + "."},
      {q:"¿Cuáles serán los horarios?",a:basic.date + ": elige de " + basic.shifts.join(" o de ") + ". Programa de tres días: " + logistics.time + "."},
      {q:"¿Cuáles son las fechas?",a:basic.name + ": " + basic.date + ". Programa completo: " + logistics.dates + "."},
      {q:"¿Se entregará reconocimiento?",a:"Sí. JC Creativo lo entregará a quienes cumplan las condiciones establecidas de participación."},
      {q:"¿Cómo puedo apartar mi lugar?",a:"Prepara tu solicitud con el formulario y comunícate con JC Creativo. El equipo te indicará los pasos y confirmará tu lugar expresamente."},
      {q:"¿Qué formas de pago aceptan?",a:pricing.payments.length ? pricing.payments.join(", ") + "." : "Las formas de pago están por confirmar. Solicita los detalles directamente antes de realizar un pago."},
      {q:"¿Puedo inscribir a varias personas?",a:"Indica cuántas personas desean asistir al contactar al equipo. La organización te informará de la disponibilidad y el proceso para tu grupo."},
      {q:"¿Hasta cuándo puedo pagar el precio de preventa?",a:"El pronto pago de ambas opciones está disponible hasta el 14 de noviembre de 2026 inclusive. Liquida el curso elegido antes de la medianoche, hora de Ciudad de México. Desde el 15 se aplica el precio normal."}
    ],
    closing:{title:"La tecnología avanza. Tú también puedes hacerlo.",text:"Trae una idea de tu negocio o trabajo y aprende, paso a paso, a convertirla en contenido que puedas compartir y promocionar.",photo:photos[1].src,cta:"Quiero inscribirme"},
    corporate:{
      title:"¿Necesitas capacitar a tu equipo o empresa?",subtitle:"En JC Creativo desarrollamos capacitaciones privadas adaptadas a las necesidades de negocios, empresas, instituciones y organizaciones.",
      photo:photos[5].src,
      modalities:[
        {title:"Capacitaciones privadas",text:"Formación individual o para grupos pequeños que buscan dominar una herramienta específica."},
        {title:"Capacitación para negocios",text:"Talleres de IA, video, marketing, redes sociales y creación de contenido."},
        {title:"Capacitación empresarial",text:"IA, productividad y automatización aplicadas a procesos administrativos, operativos y comerciales."},
        {title:"Capacitación para instituciones",text:"Programas diseñados de acuerdo con los objetivos y perfiles de los participantes."}
      ],
      benefits:["Capacitación adaptada al grupo","Ejercicios relacionados con actividades reales","Programas personalizados","Modalidad presencial o en línea, según disponibilidad","Cotización según duración, contenido y participantes"],
      cta:"Solicitar capacitación para mi empresa",message:"Hola, vi la página de capacitaciones de JC Creativo y me interesa conocer las opciones de cursos privados para mi negocio, empresa u organización."
    },
    contact:{
      whatsapp:"527531597808",message:"Hola, quiero inscribirme con JC Creativo. Quisiera confirmar disponibilidad y formas de pago.",
      interests:[...basic.shifts.map(turno => basic.name + " · " + basic.date + " · " + turno), courseName + " · 26 al 28 de noviembre · " + logistics.time],
      privacy:"JC Creativo utilizará tu nombre, tu número de WhatsApp y el correo opcional para responder y dar seguimiento a tu solicitud. Si envías el mensaje por WhatsApp, compartirás los datos incluidos con JC Creativo a través de esa plataforma. Puedes solicitar acceso, corrección o eliminación de tus datos, o retirar tu autorización, por el mismo canal de contacto.",
      consent:"Autorizo a JC Creativo a utilizar mis datos para atender esta solicitud y darle seguimiento conforme al aviso de privacidad."
    },
    socials:{facebook:"",instagram:"",tiktok:"",website:"https://jccreativo.com.mx/"},
    labels:{
      benefitsTitle:"En tres días conocerás herramientas que puedes comenzar a aplicar en tus proyectos",audienceTitle:"Este curso puede ser para ti",
      audienceText:"No necesitas ser experto en tecnología para comenzar. Aprenderás mediante explicaciones claras y ejercicios prácticos.",audienceCta:"Quiero aprender estas habilidades",
      programTitle:"Tres días. Tres habilidades. Una sola estrategia.",programCta:"Quiero vivir esta experiencia",galleryCta:"Quiero formar parte del próximo grupo",
      pricingTitle:"Elige tu curso y consulta su precio",faqTitle:"Preguntas frecuentes",formTitle:"Solicita tu inscripción",includesTitle:"Qué incluye tu inscripción",
      program:"Programa",gallery:"Galería",instructor:"Instructor",faq:"Preguntas frecuentes",form:"Solicitar mi inscripción",privacy:"Aviso de privacidad",recognition:"Reconocimiento de participación"
    }
  };
})();










