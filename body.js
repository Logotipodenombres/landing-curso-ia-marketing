/* Shared by the static build and the browser. Renderers have no DOM dependencies. */
(() => {
  "use strict";
  const esc = value => String(value ?? "").replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[char]);
  function safeUrl(value, local = false) {
    if (typeof value !== "string" || !value.trim()) return "";
    if (/^https:\/\/[^/\s]+/i.test(value)) return esc(value);
    if (local && /^(?:\.\/)?[a-z0-9_-]+\/[a-z0-9_./%-]+$/i.test(value) && !value.includes("..")) return esc(value);
    return "";
  }
  const photo = (src, alt, klass = "") => safeUrl(src,true) ? `<img class="${klass}" src="${safeUrl(src,true)}" alt="${esc(alt)}" loading="lazy" decoding="async">` : "";
  const list = items => (items || []).map(item => `<li>${esc(item)}</li>`).join("");
  const kicker = text => `<p class="jc-kicker"><i aria-hidden="true"></i>${esc(text)}</p>`;
  const cta = text => `<a class="jc-cta" href="#inscripcion">${esc(text)} <span aria-hidden="true">↗</span></a>`;
  const section = (id, klass, content) => `<section id="${id}" class="jc-section ${klass}"><div class="jc-wrap">${content}</div></section>`;
  const arrows = ["M3 5h17v13H9l-5 4v-4H3V5Zm5 5h7m-7 4h4","M12 3a9 9 0 1 0 .01 0M12 7v6l4 2","m3 17 5-5 4 4 3-3 6 6M3 4h18v16H3Z","M3 5h18v14H3Zm7 4 5 3-5 3Z","M3 20V5m0 15h18M6 16l5-6 4 2 5-7","m4 12 5 5L20 6"];
  const icon = i => `<svg class="jc-glyph" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${arrows[i % arrows.length]}"/></svg>`;
  function businessNumber(value) {
    const digits = String(value || "").replace(/[\s()+-]/g,"");
    return /^[1-9]\d{7,14}$/.test(digits) ? digits : "";
  }
  function socialLinks(socials) {
    const names = {website:"Sitio oficial",facebook:"Facebook",instagram:"Instagram",tiktok:"TikTok"};
    return Object.entries(socials || {}).filter(([,v]) => safeUrl(v)).map(([k,v]) =>
      `<a href="${safeUrl(v)}" target="_blank" rel="noopener noreferrer">${esc(names[k] || k)} ↗</a>`).join("");
  }
  function opportunity(c) {
    return section("oportunidad","jc-white",`
      <div class="jc-split"><div>${kicker("Campaña de diciembre")}<h2>${esc(c.opportunity.title)}</h2></div><p class="jc-lead">${esc(c.opportunity.text)}</p></div>
      <div class="jc-actions">${cta(c.hero.cta)}</div>`);
  }
  function benefits(c) {
    return section("beneficios","jc-paper",`${kicker("Herramientas para tu proyecto")}<h2>${esc(c.labels.benefitsTitle)}</h2>
      <div class="jc-benefits">${c.benefits.map((b,i)=>`<article>${icon(i)}<h3>${esc(b.title)}</h3><p>${esc(b.text)}</p></article>`).join("")}</div>
      <div class="jc-actions">${cta(c.hero.cta)}</div>`);
  }
  function audience(c) {
    return section("publico","jc-white",`<div class="jc-split"><div>${kicker("Punto de encuentro")}<h2>${esc(c.labels.audienceTitle)}</h2><p>${esc(c.labels.audienceText)}</p>${cta(c.labels.audienceCta)}</div>
      <ul class="jc-tags">${c.audience.map((a,i)=>`<li>${icon(i)}<span>${esc(a)}</span></li>`).join("")}</ul></div>`);
  }
  function dayVisual(i) {
    const illustrations = [
      '<rect x="30" y="14" width="70" height="44" rx="5"/><path d="M41 27h39M41 35h48M41 43h22"/><path d="m105 19 3 7 7 3-7 3-3 7-3-7-7-3 7-3Z"/>',
      '<rect x="24" y="12" width="92" height="49" rx="5"/><path d="m60 19 13 7-13 7Z"/><path d="M32 42h75M32 50h20m4 0h23m4 0h15M73 38v20"/>',
      '<rect x="28" y="13" width="85" height="46" rx="5"/><path d="M39 48V25m0 23h57M46 43l12-12 12 8 18-16m-8 0h8v8"/><circle cx="102" cy="20" r="2"/>'
    ];
    return `<svg class="jc-day-art" viewBox="0 0 140 75" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${illustrations[i]}</svg>`;
  }
  function program(c) {
    return section("programa","jc-dark",`${kicker("Programa de aprendizaje")}<h2>${esc(c.labels.programTitle)}</h2>
      <div class="jc-program">${c.days.map((d,i)=>`<article class="jc-day"><header><span>DÍA 0${i+1}</span>${dayVisual(i)}</header>
        <h3>${esc(d.short)}</h3><p>${esc(d.objective)}</p><div class="jc-activity"><b>Actividad práctica</b><p>${esc(d.activity)}</p></div>
        <div class="jc-outcome"><b>Lo que te llevas</b><p>${esc(d.result)}</p></div><details><summary>Explorar temario</summary><ul>${list(d.topics)}</ul></details>
        </article>`).join("")}</div>
      <div class="jc-ia-examples"><h3>Lo que aprenderás en IA básica</h3><p>Practica cómo escribir instrucciones para crear anuncios de productos y servicios. Estos cuatro diseños son ejemplos demostrativos.</p><div class="jc-ia-grid"><img loading="lazy" src="assets/ia-ejemplo-0.jpg" alt="Autotransportes Delta del Balsas" width="1000" height="1000"><img loading="lazy" src="assets/ia-ejemplo-1.jpg" alt="Pinturas Osel Lázaro" width="1000" height="667"><img loading="lazy" src="assets/ia-ejemplo-2.jpg" alt="Promoción de alimentos y bebidas" width="1000" height="1000"><img loading="lazy" src="assets/ia-ejemplo-3.jpg" alt="Servicios de enfermería" width="800" height="1000"></div></div>
      <ol class="jc-process" aria-label="Cómo se conectan las etapas">${list(c.process)}</ol>
      <div class="jc-result"><p>${esc(c.result)}</p>${cta(c.labels.programCta)}</div>`);
  }
  function courseDetails(c) {
    return section("programa","jc-paper",`${kicker("Temario y ejemplos")}<h2>Explora tu capacitación</h2>
      <nav class="course-switch" aria-label="Seleccionar temario"><a href="?curso=ia-basica#programa" data-detail="basico">IA básica</a><a href="?curso=intensivo#programa" data-detail="programa">Intensivo de 3 días</a></nav>
      <article data-panel="basico"><h3>Curso de Inteligencia Artificial Básica</h3><p>Aprende a utilizar la IA para crear contenido y facilitar tu trabajo.</p><ul class="topics-list"><li>Usa ChatGPT y escribe prompts efectivos.</li><li>Genera imágenes y diseños publicitarios con IA.</li><li>Redacta textos, anuncios y guiones para redes sociales.</li><li>Aplica la IA a tu negocio y a tus actividades diarias.</li></ul><div class="samples">${["Transporte de carga","Anuncio de pinturas","Promoción de alimentos","Servicios de enfermería"].map((alt,i)=>`<img loading="lazy" src="assets/ia-ejemplo-${i}.jpg" alt="${alt}">`).join("")}</div><small>Ejemplos demostrativos de anuncios y publicaciones</small><p><a class="jc-cta" href="#inscripcion" data-plan="basico">Quiero aprender IA ↗</a></p></article>
      <article data-panel="programa" hidden><h3>Curso Intensivo de 3 Días</h3><p>Aprende a crear contenido, editar videos y desarrollar estrategias para atraer clientes.</p>
      <div class="syllabus-days">
        <article><small>DÍA 1</small><h4>Inteligencia artificial</h4><ul><li>Usa ChatGPT, prompts y herramientas de IA.</li><li>Crea imágenes, anuncios y contenido digital.</li><li>Escribe textos persuasivos y guiones para videos.</li></ul></article>
        <article><small>DÍA 2</small><h4>Edición de video</h4><ul><li>Practica técnicas de grabación con tu celular.</li><li>Edita en CapCut y aplica efectos y transiciones.</li><li>Crea videos verticales con acabado profesional para Reels y TikTok.</li></ul></article>
        <article><small>DÍA 3</small><h4>Marketing digital</h4><ul><li>Explora cómo influye la psicología del consumidor en las decisiones de compra.</li><li>Identifica a tu cliente ideal y segmenta tu público.</li><li>Planea contenido para Facebook e Instagram.</li><li>Practica técnicas para atraer clientes y convertir el interés en ventas.</li></ul></article>
      </div><a class="jc-cta" href="#inscripcion" data-plan="programa">Quiero el programa completo ↗</a></article>`);
  }
  function demonstration(c) {
    const stages = [
      ["01", "Inteligencia artificial", "Encuentra tu gancho", "Convierte un producto y un público en una idea para tu anuncio.", "M6 4h36v24H22l-9 8v-8H6z M13 12h21m-21 7h14"],
      ["02", "Edición de video", "Dale ritmo a tu idea", "Ordena las tomas, corta a tiempo y añade texto que se lea en el celular.", "M5 7h38v25H5z M20 13l10 6-10 6z M5 38h11m3 0h15m3 0h6"],
      ["03", "Marketing digital", "Dale un destino a tu Reel", "Elige a quién hablarle y qué invitarle a hacer después de verlo.", "M6 16l29-9v25L6 23z M12 26l4 10h6l-5-11 M39 13l5-3m-5 10h6m-6 6l5 3"]
    ];
    const cards = stages.map(([day, tool, benefit, text, path]) => `<article class="lab-card"><div class="lab-mark"><span>DÍA ${day}</span><svg viewBox="0 0 50 42" aria-hidden="true"><path d="${path}"/></svg></div><h3>${tool}</h3><strong>${benefit}</strong><p>${text}</p></article>`).join("");
    return section("demostracion","jc-lab",`${kicker("El programa de tres días")}<h2>Una idea, tres pasos para publicarla</h2><div class="lab-cards">${cards}</div>
      <a class="primary" href="#inscripcion">Quiero aprender a hacerlo ↗</a>`);
  }
  function gallery(c) {
    const g=c.gallery;
    return section("galeria","jc-white",`<div id="experiencia">${kicker("Archivo fotográfico")}<h2>${esc(g.title)}</h2><p class="jc-intro">${esc(g.text)}</p></div>
      <div class="jc-gallery" tabindex="0" role="region" aria-label="Galería de capacitaciones">${g.photos.filter(p=>safeUrl(p.src,true)).map((p,i)=>`<button type="button" data-photo="${safeUrl(p.src,true)}" aria-label="Ampliar fotografía ${i+1}. ${esc(p.alt)}">${photo(p.thumb || p.src,p.alt)}<span aria-hidden="true">ARCHIVO / 0${i+1}<b>↗</b></span></button>`).join("")}</div>
      <div class="jc-carousel-nav"><button type="button" data-slide="-1" aria-label="Fotografía anterior">←</button><button type="button" data-slide="1" aria-label="Fotografía siguiente">→</button></div>
      <div class="jc-result"><p class="jc-pull">${esc(g.caption)}</p>${cta(c.labels.galleryCta)}</div>`);
  }
  function evidence(c) {
    const ev=c.evidence;
    const items=(ev.materials || []).map(item=>`<article>${photo(item.image,item.title)}<h3>${esc(item.title)}</h3><p>${esc(item.text)}</p>
      ${safeUrl(item.video,true)?`<video controls preload="none" src="${safeUrl(item.video,true)}"></video>`:""}
      ${safeUrl(item.url,true)?`<a href="${safeUrl(item.url,true)}" target="_blank" rel="noopener noreferrer">Consultar material ↗</a>`:""}</article>`);
    const voices=(ev.testimonials||[]).filter(t=>t.authorized && t.quote).map(t=>`<figure>${photo(t.photo,t.name||"Participante")}<blockquote>${esc(t.quote)}</blockquote><figcaption>${[t.name,t.course].filter(Boolean).map(esc).join(" · ")}</figcaption>${safeUrl(t.video,true)?`<video controls preload="none" src="${safeUrl(t.video,true)}"></video>`:""}</figure>`);
    const stats=(ev.metrics||[]).filter(m=>m.source && m.value!=null).map(m=>`<li><strong>${esc(m.value)}</strong> ${esc(m.label)}<small>Fuente: ${esc(m.source)}</small></li>`);
    const shots=[1,2].map(i=>c.gallery.photos[i]).filter(Boolean).map(p=>`<figure>${photo(p.thumb||p.src,p.alt)}</figure>`).join("");
    return section("evidencias","jc-paper",`<div class="jc-split"><div>${kicker("En el aula")}<h2>${esc(ev.title)}</h2><p>${esc(ev.text)}</p></div><div class="jc-proof">${shots}</div></div>
      ${items.length ? `<div class="jc-evidence">${items.join("")}</div>`:""}${voices.length ? `<div class="jc-evidence">${voices.join("")}</div>`:""}${stats.length ? `<ul class="jc-metrics">${stats.join("")}</ul>`:""}`);
  }
  function instructor(c) {
    const i=c.instructor;
    return section("instructor","jc-white",`<div class="jc-bio">${photo(i.photo,i.photoAlt || i.name,"jc-portrait")}<div>${kicker("Tu instructor")}<h2>${esc(i.name)}</h2><h3>${esc(i.title)}</h3><p>${esc(i.bio)}</p>
      <ul class="jc-skills">${list(i.skills)}</ul><nav class="jc-social" aria-label="Enlaces del instructor">${socialLinks(c.socials)}</nav><a class="profile-link" href="#empresas">Conocer capacitaciones para empresas ↗</a></div></div>`);
  }
  function certification(c) {
    const cert=c.certification;
    return section("certificacion","jc-credential",`<div class="jc-split"><div>${kicker("Capacitación con estándares")}<h2>Instructor certificado en el estándar <em>EC0217.01</em></h2>${photo(cert.logo,"Educación y CONOCER","jc-conocer-logo")}<p>${esc(cert.text)}</p><p>El estándar describe cómo preparar una sesión grupal, conducir las actividades y evaluar el aprendizaje.</p><p>Folio del instructor · <strong>D-0025243026</strong></p></div><a class="standard-sheet" href="https://www.conocer.gob.mx/contenido/publicaciones_dof/2021/EC0217.01.pdf" target="_blank" rel="noopener noreferrer">${photo("assets/estandar.jpg","Primera página del estándar EC0217.01")}<span>Leer el estándar oficial de CONOCER · PDF ↗</span></a></div>`);
  }
  function recognition(c) {
    const r=c.recognition;
    const awards = [[c.basic.name,r.basicImage],["Programa completo · IA, edición de video y marketing",r.image]];
    const previews = awards.map(([name,image]) => `<article><h3>${esc(name)}</h3><a class="jc-award-preview" href="${safeUrl(image,true)}" target="_blank" rel="noopener noreferrer">${photo(image,"Reconocimiento de JC Creativo · "+name)}<span>Ampliar reconocimiento ↗</span></a></article>`).join("");
    return section("reconocimiento","jc-paper",`${kicker("Al terminar el curso")}<h2>${esc(r.title)}</h2><p>Al concluir el curso elegido y cumplir sus requisitos, recibirás el reconocimiento de JC Creativo correspondiente a tu formación. Puedes integrarlo a tu currículum como evidencia de capacitación.</p><div class="jc-split">${previews}</div>`);
  }
  const pesos = value => "$" + value.toLocaleString("es-MX");
  function quote(c, plan, now = Date.now()) {
    const p = c.pricing;
    const units = plan === "programa" ? p.programSize : 1;
    const promo = now < Date.parse(p.deadlines[plan]);
    const unit = promo ? p.early : p.regular;
    return {promo, units, unit, total: unit * units, regular: p.regular * units, saving: (p.regular - unit) * units};
  }
  function offer(c, now = Date.now()) {
    const cards = [["basico",c.basic.name],["programa","Programa de 3 días · IA + Edición de Video + Marketing"]].map(([plan,name])=>{
      const q = quote(c,plan,now);
      const percent = (100*q.saving/q.regular).toFixed(1);
      const savings = plan === "programa" ? `3 cursos por ${pesos(q.total)}. ¡Ahorras ${pesos(q.saving)}!` : `Ahorras ${pesos(q.saving)} MXN`;
      return `<article class="jc-offer"><h3>${esc(name)}</h3><p class="jc-offer-date"><b>${esc(plan === "basico" ? c.basic.date : c.logistics.dates)}</b><br>${esc(plan === "basico" ? "4 horas · Elige de "+c.basic.shifts.join(" o de ") : "12 horas · "+c.logistics.time)}</p><small>${q.promo ? "PRONTO PAGO" : "PRECIO NORMAL"}</small><strong>${pesos(q.total)} MXN</strong>
      ${q.promo ? `<p>Precio normal: <s>${pesos(q.regular)} MXN</s></p><p><b>${savings}</b> · ≈ ${percent}% de descuento</p>` : ""}
      <p>${plan==="basico"?"ChatGPT, prompts, imágenes, publicaciones y guiones para tu trabajo.":"Crea con IA, edita un video y prepara su promoción."}</p>
      ${q.promo ? `<p class="jc-payment-term">Liquida ${pesos(q.total)} MXN a más tardar el 15 de noviembre de 2026.</p>` : ""}
      <a class="jc-cta" data-plan="${plan}" href="#inscripcion">${plan==="basico"?"Quiero aprender IA":"Quiero el programa completo"} ↗</a><a class="detail-link" data-detail="${plan}" href="?curso=${plan==="basico"?"ia-basica":"intensivo"}#programa">Ver temario y ejemplos ↓</a></article>`;
    }).join("");
    return `${kicker("Inscripción al curso")}<h2>${esc(c.labels.pricingTitle)}</h2><p>${esc(c.pricing.text)}</p>
      
      <div class="jc-split">${cards}</div><p>${esc(c.pricing.conditions)}</p>`;
  }
  function inclusions(c) {
    return section("incluye","jc-paper",`${kicker("Tu inscripción")}<h2>${esc(c.labels.includesTitle)}</h2><div class="jc-ia-grid"><article><h3>Solo IA básica</h3><p>Tu inscripción cubre únicamente el taller de 4 horas del sábado 21, en el horario que elijas. Practicas con herramientas de IA y, al concluir el taller y cumplir sus requisitos, recibes el reconocimiento de IA básica de JC Creativo.</p></article><article><h3>Programa completo de 3 días</h3><p>Tu inscripción cubre las tres sesiones del 26, 27 y 28 de noviembre. Practicas inteligencia artificial, edición de video y marketing digital. Al concluir el programa y cumplir sus requisitos, recibes el reconocimiento del programa completo de JC Creativo.</p></article></div>`);
  }
  function faq(c) {
    return section("preguntas","jc-white",`<div class="jc-split jc-faq"><div>${kicker("Antes de inscribirte")}<h2>${esc(c.labels.faqTitle)}</h2></div><div>${c.faq.map(f=>`<details><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`).join("")}</div></div>`);
  }
  function registration(c) {
    const active=Boolean(businessNumber(c.contact.whatsapp));
    return section("inscripcion","jc-dark",`<div class="jc-split jc-registration"><div>${kicker("Contacto e inscripciones")}<h2>${esc(c.labels.formTitle)}</h2><p class="jc-lead">Cuéntanos qué te interesa. JC Creativo te orientará sobre disponibilidad y el proceso para confirmar tu lugar.</p>
      <ul class="jc-registration-facts">${list(["Organiza e imparte JC Creativo","Sede: "+c.logistics.venue+", "+c.logistics.city])}</ul></div>
      <form id="jc-form" class="jc-form"><label>Nombre completo<input name="nombre" autocomplete="name" required maxlength="100" pattern=".*\\S.*"></label>
      <label>WhatsApp con lada<input name="telefono" type="tel" autocomplete="tel" required maxlength="24" placeholder="+52 000 000 0000"></label>
      <label>Correo electrónico (opcional)<input name="correo" type="email" autocomplete="email" maxlength="254"></label>
      <label>Curso<select name="interes" required><option value="">Elige tu curso</option><option value="basico">IA básica</option><option value="programa">Programa completo</option></select></label>
      <label id="turno" hidden>Horario del taller<select name="turno"><option value="">Elige tu horario</option>${c.basic.shifts.map(t=>`<option>${esc(t)}</option>`).join("")}</select></label>
      <output id="jc-price-summary" aria-live="polite"></output><div class="jc-trap" aria-hidden="true"><label>Sitio personal<input name="web" tabindex="-1" autocomplete="off"></label></div>
      <details class="jc-privacy" id="privacidad"><summary>Aviso de privacidad</summary><p>${esc(c.contact.privacy)}</p></details>
      <label class="jc-check"><input type="checkbox" name="consent" required><span>${esc(c.contact.consent)}</span></label>
      <button class="jc-cta" type="submit">SOLICITAR MI INSCRIPCIÓN <span aria-hidden="true">↗</span></button>
      <p class="jc-note">${active ? "Continúa en WhatsApp para enviar tu mensaje." : "WhatsApp de inscripciones pendiente de publicación. Podrás copiar tu solicitud para contactar a JC Creativo."}</p>
      <div id="jc-status" role="status" aria-live="polite"></div><div id="jc-draft" hidden><label>Tu mensaje<textarea readonly rows="5"></textarea></label><button type="button" class="jc-copy">Copiar mensaje</button></div>
      </form></div>`);
  }
  function closing(c) {
    const pic=c.closing.photo || c.gallery.photos.at(-1)?.src;
    return section("cierre","jc-closing",`<div class="jc-split"><div>${kicker("IA + VIDEO + MARKETING")}<h2>${esc(c.closing.title)}</h2><p class="jc-lead">${esc(c.closing.text)}</p><p class="jc-last-facts">${esc(c.logistics.duration)} de capacitación · Reconocimiento de participación</p>${cta(c.closing.cta)}</div>${photo(pic,c.closing.photoAlt || "Participantes en una capacitación presencial de JC Creativo","jc-closing-photo")}</div>`);
  }
  function corporate(c) {
    const data=c.corporate;
    const num=businessNumber(c.contact.whatsapp);
    const action=num ? `<a class="jc-cta" data-corporate href="https://wa.me/${num}?text=${encodeURIComponent(data.message)}" target="_blank" rel="noopener noreferrer">${esc(data.cta)} ↗</a>` :
      `<button type="button" class="jc-cta" data-corporate aria-controls="jc-corp-draft" aria-expanded="false">${esc(data.cta)} ↗</button>
      <div id="jc-corp-draft" hidden><p>WhatsApp empresarial pendiente de publicación. Puedes copiar el mensaje y contactar a JC Creativo en su sitio oficial.</p><label>Mensaje para cotización<textarea rows="4" readonly>${esc(data.message)}</textarea></label><button class="jc-copy" type="button">Copiar mensaje</button> ${safeUrl(c.socials.website) ? `<a href="${safeUrl(c.socials.website)}" rel="noopener noreferrer" target="_blank">Sitio oficial ↗</a>`:""}<p role="status"></p></div>`;
    return section("empresas","jc-corporate",`<div class="jc-split"><div>${kicker("JC Creativo / Formación a la medida")}<h2>${esc(data.title)}</h2><p class="jc-lead">${esc(data.subtitle)}</p></div>${photo(data.photo,"Experiencia de capacitación grupal de JC Creativo","jc-corp-photo")}</div>
      <div class="jc-modalities">${data.modalities.map((m,i)=>`<article><small>0${i+1}</small><h3>${esc(m.title)}</h3><p>${esc(m.text)}</p></article>`).join("")}</div>
      <ul class="jc-corp-benefits">${list(data.benefits)}</ul><div class="jc-corp-action">${action}</div>`);
  }
  function footer(c) {
    const num=businessNumber(c.contact.whatsapp);
    return `<footer class="jc-foot"><div class="jc-wrap"><div><strong>JC CREATIVO</strong><p>Capacitación, creatividad y herramientas digitales.</p></div><nav aria-label="Contacto y redes sociales">${socialLinks(c.socials)}
      ${num ? `<a data-whatsapp href="https://wa.me/${num}" rel="noopener noreferrer" target="_blank">WhatsApp ↗</a>`:""}<a href="#privacidad">Aviso de privacidad</a><a href="#jc-form">Información de contacto</a></nav><small>© ${new Date().getFullYear()} JC Creativo. Derechos reservados.</small></div></footer>
      <dialog class="jc-dialog" aria-label="Fotografía ampliada"><button type="button" aria-label="Cerrar fotografía" autofocus>×</button><img alt=""><p></p></dialog>`;
  }
  window.renderCourseBody = () => {
    const c=window.CURSO;
    return [section("precio","jc-white",offer(c)),courseDetails(c),instructor(c),certification(c),gallery(c),recognition(c),registration(c),faq(c),corporate(c),footer(c)].join("\n");
  };

  function track(event, channel) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({event, channel});
  }
  function bindCopy(button, area, status) {
    button.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(area.value);
        status.textContent = "Mensaje copiado.";
      } catch {
        area.focus();
        area.select();
        status.textContent = "Selecciona Copiar en tu dispositivo.";
      }
    });
  }
  function bindGallery(root) {
    const modal=root.querySelector(".jc-dialog");
    const strip=root.querySelector(".jc-gallery");
    const buttons=Array.from(strip.querySelectorAll("[data-photo]"));
    for (const button of buttons) button.addEventListener("click", () => {
      const img=modal.querySelector("img");
      img.src=button.dataset.photo;
      img.alt=button.querySelector("img").alt;
      modal.querySelector("p").textContent="";
      modal.showModal();
    });
    modal.querySelector("button").addEventListener("click",()=>modal.close());
    modal.addEventListener("click",ev=>{if (ev.target===modal) modal.close();});
    const go = direction => {
      if (!buttons.length) return;
      const width=buttons[0].offsetWidth+10;
      const next=Math.max(0,Math.min(buttons.length-1,Math.round(strip.scrollLeft/width)+direction));
      strip.scrollTo({left:width*next,behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"instant":"smooth"});
    };
    for (const button of root.querySelectorAll("[data-slide]")) button.addEventListener("click",()=>go(Number(button.dataset.slide)));
    strip.addEventListener("keydown",event=>{
      if (strip.scrollWidth<=strip.clientWidth) return;
      if (event.key==="ArrowLeft" || event.key==="ArrowRight") {
        event.preventDefault();
        go(event.key==="ArrowLeft"?-1:1);
      }
    });
  }
  function bindRegistration(root,c) {
    const form=root.querySelector("#jc-form");
    const status=root.querySelector("#jc-status");
    const draft=root.querySelector("#jc-draft");
    const area=draft.querySelector("textarea");
    const num=businessNumber(c.contact.whatsapp);
    const select = form.elements.interes;
    const selectedPlan = () => select.value || "basico";
    const summary = root.querySelector("#jc-price-summary");
    const submit = form.querySelector('button[type="submit"]');
    function refreshSummary() {
      const q = quote(c,selectedPlan());
      const basic = select.value === "basico";
      root.querySelector("#turno").hidden = !basic;
      form.elements.turno.required = basic;
      const choice = basic ? c.basic.name+" · "+c.basic.date+" · "+(form.elements.turno.value || "Elige tu horario") : "Programa completo · "+c.logistics.dates+" · "+c.logistics.time;
      summary.textContent = select.value ? choice + " · Total por persona: " + pesos(q.total) + " MXN" : "";
      submit.textContent = select.value ? "Solicitar mi inscripción por " + pesos(q.total) + " MXN ↗" : "Solicitar mi inscripción ↗";
    }
    let displayedPromo;
    function refreshPrices() {
      const promo = [quote(c,"basico").promo, quote(c,"programa").promo].join("/");
      if (displayedPromo === promo) { refreshSummary(); return; }
      displayedPromo = promo;
      root.querySelector("#precio .jc-wrap").innerHTML = offer(c);
      refreshSummary();
      draft.hidden = true;
      status.textContent = "";
    }
    function schedulePrices() {
      refreshPrices();
      const now = Date.now();
      const future = Object.values(c.pricing.deadlines).map(value => Date.parse(value)).filter(end => end > now);
      if (future.length) setTimeout(schedulePrices, Math.min(Math.min(...future) - now, 2147483647));
    }
    schedulePrices();
    window.addEventListener("pageshow",refreshPrices);
    document.addEventListener("visibilitychange",()=>{if(!document.hidden) refreshPrices()});
    function choose(plan) {
      select.value=plan;
      root.querySelectorAll("[data-panel]").forEach(panel=>panel.hidden=panel.dataset.panel!==plan);
      root.querySelectorAll(".course-switch a").forEach(link=>link.setAttribute("aria-current",String(link.dataset.detail===plan)));
      refreshSummary();
    }
    function fromURL(){
      const route=new URLSearchParams(location.search).get("curso");
      choose(route==="intensivo"?"programa":"basico");
    }
    fromURL();
    window.addEventListener("popstate",fromURL);
    form.elements.turno.addEventListener("change",refreshSummary);
    select.addEventListener("change",()=>choose(select.value));
    root.addEventListener("click",event=>{
      const link=event.target.closest("[data-detail]");
      if(!link || event.ctrlKey || event.metaKey || event.shiftKey) return;
      event.preventDefault();history.pushState(null,"",link.href);choose(link.dataset.detail);
      root.querySelector("#programa").scrollIntoView();
    });
    root.addEventListener("click",event=>{
      const link = event.target.closest("[data-plan]");
      if (!link) return;
      choose(link.dataset.plan);
      draft.hidden = true;
      status.textContent = "";
      refreshSummary();
      if (!select.value) select.focus({preventScroll:true});
    });
    form.addEventListener("focusin",()=>track("start_registration","curso"),{once:true});
    form.addEventListener("input",()=>{
      form.elements.telefono.setCustomValidity("");
      draft.hidden=true;
      status.textContent="";
    });
    form.addEventListener("submit",event=>{
      event.preventDefault();
      if (form.elements.web.value) return;
      const telephone=form.elements.telefono.value.trim();
      if (!/^[+\d()\s-]+$/.test(telephone) || !/^\d{8,15}$/.test(telephone.replace(/\D/g,""))) {
        form.elements.telefono.setCustomValidity("Escribe un número de WhatsApp con lada, de 8 a 15 dígitos.");
        form.reportValidity();
        return;
      }
      if (!form.reportValidity()) return;
      const message=[c.contact.message,"Nombre: "+form.elements.nombre.value.trim(),"WhatsApp: "+telephone,"Inscripción: "+summary.textContent];

      if(form.elements.correo.value) message.push("Correo: "+form.elements.correo.value.trim());
      const body=message.join("\n");
      track("submit_registration","curso");
      if(num) {
        if (typeof window.fbq === "function") window.fbq("track", "Lead");
        track("click_whatsapp","curso");
        window.location.assign("https://wa.me/"+num+"?text="+encodeURIComponent(body));
        return;
      }
      area.value=body;
      draft.hidden=false;
      status.textContent="Tu mensaje está listo para copiar. Aún no se ha enviado.";
    });
    bindCopy(draft.querySelector("button"),area,status);
    root.querySelector('a[href="#privacidad"]').addEventListener("click",()=>{ root.querySelector("#privacidad").open=true; });
  }
  function bindCorporate(root) {
    const action=root.querySelector("[data-corporate]");
    const draft=root.querySelector("#jc-corp-draft");
    if(draft) bindCopy(draft.querySelector("button"),draft.querySelector("textarea"),draft.querySelector('[role="status"]'));
    action.addEventListener("click",()=>{
      track("click_corporate_training","empresas");
      if(!draft) {track("click_whatsapp","empresas"); return;}
      draft.hidden=!draft.hidden;
      action.setAttribute("aria-expanded",String(!draft.hidden));
      if(!draft.hidden) draft.querySelector("textarea").focus();
    });
    root.querySelector("[data-whatsapp]")?.addEventListener("click",()=>track("click_whatsapp","contacto"));
  }
  const root=document.getElementById("contenido");
  if (!root) return;
  if (!root.querySelector("#programa")) root.innerHTML=window.renderCourseBody();
  // Re-evaluate a dated offer if the static page outlives its presale deadline.

  bindGallery(root);
  bindRegistration(root,window.CURSO);
  bindCorporate(root);
})();









