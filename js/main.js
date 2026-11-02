/* =============================================================
   JC CREATIVO · Landing curso 3 días · Lógica principal
   Lee la configuración de js/config.js y arma las secciones
   dinámicas, el formulario de WhatsApp, la galería y las
   animaciones. No contiene secretos ni claves privadas.
   ============================================================= */
(function () {
  "use strict";

  var C = window.CONFIG || {};
  var $ = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };

  /* ---------- Utilidades ---------- */
  function el(tag, attrs, html) {
    var n = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) {
      if (k === "class") n.className = attrs[k];
      else n.setAttribute(k, attrs[k]);
    });
    if (html != null) n.innerHTML = html;
    return n;
  }
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function waLink(msg, numero) {
    return "https://wa.me/" + (numero || C.contacto.whatsapp) + "?text=" + encodeURIComponent(msg || "");
  }

  /* ---------- Medición de conversiones (preparado para GA4/GTM) ----------
     No se cargan scripts externos. Cuando conectes Google Tag Manager,
     basta con dejar window.dataLayer activo y estos eventos se registrarán. */
  window.dataLayer = window.dataLayer || [];
  function medir(evento, datos) {
    window.dataLayer.push(Object.assign({ event: evento }, datos || {}));
    document.dispatchEvent(new CustomEvent("jcc:" + evento, { detail: datos || {} }));
    if (window.__jccDebug) console.log("[medición]", evento, datos || {});
  }
  window.medirConversion = medir;

  /* =============================================================
     1. RENDER DE DATOS DEL CURSO
     ============================================================= */
  function renderDatos() {
    var curso = C.curso || {}, fechas = C.fechas || {}, precios = C.precios || {};
    var sede = curso.sede || "Sede por confirmar";
    var horario = curso.horario || "Horario por confirmar";
    var fechasTxt = fechas.texto || "Por confirmar";

    $$("[data-fecha]").forEach(function (n) { n.textContent = fechasTxt; });
    $$("[data-fecha-nota]").forEach(function (n) {
      n.textContent = fechas.confirmadas ? "" : (fechas.nota || "Fechas tentativas sujetas a confirmación.");
      n.style.display = fechas.confirmadas ? "none" : "";
    });
    $$("[data-sede]").forEach(function (n) { n.textContent = sede; });
    $$("[data-lugar]").forEach(function (n) { n.textContent = curso.lugar || ""; });
    $$("[data-lugar-completo]").forEach(function (n) {
      n.textContent = (curso.sede ? curso.sede + ", " : "") + (curso.lugar || "");
    });
    $$("[data-horario]").forEach(function (n) { n.textContent = horario; });
    $$("[data-modalidad]").forEach(function (n) { n.textContent = curso.modalidad || ""; });
    $$("[data-duracion]").forEach(function (n) { n.textContent = curso.duracion || ""; });
    $$("[data-instructor]").forEach(function (n) { n.textContent = curso.instructor || ""; });

    /* Enlaces de WhatsApp */
    var msgIns = (C.mensajes && C.mensajes.inscripcion) || "Hola, me interesa el curso de JC Creativo.";
    var msgCap = (C.mensajes && C.mensajes.capacitacionPrivada) || "Hola, me interesa una capacitación privada.";
    $$("[data-wa-inscripcion]").forEach(function (n) { n.setAttribute("href", waLink(msgIns)); });
    $$("[data-wa-capacitacion]").forEach(function (n) {
      n.setAttribute("href", waLink(msgCap));
      if (n.hasAttribute("data-cta-texto")) n.textContent = (C.textos && C.textos.ctaCapacitacion) || n.textContent;
    });
    $$("[data-wa-general]").forEach(function (n) {
      n.setAttribute("href", waLink("Hola, vi la página de cursos de JC Creativo y me gustaría recibir información."));
    });

    /* Contacto y redes */
    $$("[data-whatsapp-visible]").forEach(function (n) { n.textContent = C.contacto.whatsappVisible || ""; });
    $$("[data-email]").forEach(function (n) {
      n.textContent = C.contacto.email || "";
      if (n.tagName === "A") n.setAttribute("href", "mailto:" + (C.contacto.email || ""));
    });
    $$("[data-sitio]").forEach(function (n) {
      n.textContent = (C.contacto.sitio || "").replace(/^https?:\/\//, "");
      if (n.tagName === "A") n.setAttribute("href", C.contacto.sitio || "#");
    });
    $$("[data-tel-href]").forEach(function (n) {
      n.setAttribute("href", "tel:+" + (C.contacto.whatsapp || ""));
    });

    renderRedes();

    /* Textos configurables */
    if (C.textos) {
      $$("[data-texto=cta]").forEach(function (n) { n.textContent = C.textos.ctaPrincipal || n.textContent; });
      $$("[data-texto=cta2]").forEach(function (n) { n.textContent = C.textos.ctaSecundaria || n.textContent; });
      $$("[data-texto=ctaCap]").forEach(function (n) { n.textContent = C.textos.ctaCapacitacion || n.textContent; });
    }
  }

  function renderRedes() {
    var r = C.redes || {};
    var redes = [
      ["facebook", r.facebook, "Facebook", icono("facebook")],
      ["instagram", r.instagram, "Instagram", icono("instagram")],
      ["tiktok", r.tiktok, "TikTok", icono("tiktok")]
    ].filter(function (x) { return x[1]; });

    $$("[data-redes]").forEach(function (n) {
      n.innerHTML = "";
      redes.forEach(function (x) {
        var a = el("a", { href: x[1], target: "_blank", rel: "noopener noreferrer", "aria-label": x[2] }, x[3]);
        n.appendChild(a);
      });
      if (r.sitio) {
        n.appendChild(el("a", { href: r.sitio, target: "_blank", rel: "noopener noreferrer", "aria-label": "Sitio web JC Creativo" }, icono("globe")));
      }
    });
  }

  /* =============================================================
     1B. PRECIOS Y PROMOCIONES (planes)
     ============================================================= */
  function fmtMXN(n) {
    return "$" + Number(n).toLocaleString("es-MX");
  }
  function fmtFecha(iso) {
    try {
      return new Date(iso + "T12:00:00").toLocaleDateString("es-MX", { day: "numeric", month: "long", year: "numeric" });
    } catch (e) { return iso; }
  }
  function diasRestantes(iso) {
    var fin = new Date(iso + "T23:59:59");
    return Math.ceil((fin.getTime() - Date.now()) / 86400000);
  }

  function renderPrecios() {
    var grid = $("#planes-grid");
    var p = C.precios;
    if (!grid || !p || !p.planes) return;

    p.planes.forEach(function (plan, i) {
      var ahorro = plan.normal - plan.promocion;
      var pct = Math.round((ahorro / plan.normal) * 100);
      var dias = diasRestantes(plan.limitePromoISO);
      var vigente = dias >= 0;
      var cuenta = !vigente ? "Promoción finalizada · precio normal " + fmtMXN(plan.normal) :
        dias === 0 ? "¡Hoy es el último día para pagar!" :
        dias === 1 ? "Queda 1 día para pagar" :
        "Faltan " + dias + " días para pagar";

      var card = el("article", {
        class: "plan-card reveal" + (plan.destacado ? " plan-card--destacado" : ""),
        "data-delay": String(i)
      });
      card.innerHTML =
        '<span class="plan-flag">' + esc(plan.etiqueta) + "</span>" +
        "<h3>" + esc(plan.titulo) + "</h3>" +
        '<p class="plan-detalle">' + esc(plan.detalle) + "</p>" +
        '<p class="plan-meta">' + icono("cal") + '<span class="meta-fecha">' + esc(plan.fechas) + "</span>" +
          icono("clock") + "<span>" + esc(plan.horario) + "</span>" +
          icono("pin") + "<span>" + esc((C.curso && C.curso.sede) ? C.curso.sede + ", " + (C.curso.lugar || "") : (C.curso && C.curso.lugar) || "") + "</span></p>" +
        '<div class="price-amounts">' +
          '<div class="price-amount price-amount--now"><span class="label">Precio si pagas antes del ' + esc(fmtFecha(plan.limitePromoISO)) + "</span>" +
            '<span class="value">' + fmtMXN(plan.promocion) + ' <small>MXN</small></span>' +
            '<span class="price-save">Ahorras ' + fmtMXN(ahorro) + " (" + pct + "% de descuento)</span></div>" +
        "</div>" +
        '<div class="plan-deadline' + (vigente ? "" : " vencida") + '">' +
          '<span class="deadline-ico">' + (vigente ? "⏰" : "✔") + "</span>" +
          "<div><b>" + esc(plan.limitePromoTexto) + "</b>" +
          '<span class="deadline-count">' + esc(cuenta) + "</span></div></div>" +
        '<div class="plan-normal">' +
          '<span class="plan-normal__label">Pasada la fecha de promoción, el precio es el normal</span>' +
          '<span class="plan-normal__value">' + fmtMXN(plan.normal) + ' <small>MXN</small></span>' +
        "</div>" +
        '<ul class="price-list" style="list-style:none">' + plan.incluye.map(function (t) {
          return "<li>" + icono("check") + "<span>" + esc(t) + "</span></li>";
        }).join("") + "</ul>" +
        '<a class="btn ' + (plan.destacado ? "btn--primary" : "btn--ghost") + ' btn--block" href="#inscripcion" data-plan="' + esc(plan.id) + '">' +
          (C.textos && C.textos.ctaPrincipal ? esc(C.textos.ctaPrincipal) : "Quiero inscribirme") + "</a>";
      grid.appendChild(card);
    });

    /* Opciones en la portada (2 cursos) */
    var hp = $("#hero-planes");
    if (hp) {
      hp.innerHTML = p.planes.map(function (plan) {
        var dias = diasRestantes(plan.limitePromoISO);
        return '<a class="hero-plan" href="#precio" data-plan-hero="' + esc(plan.id) + '">' +
          '<span class="hero-plan__top">' +
            '<span class="hero-plan__title">' + esc(plan.titulo) + "</span>" +
            (dias >= 0 ? '<em class="hero__promo-dias">' + (dias === 0 ? "¡último día!" : dias === 1 ? "queda 1 día" : "faltan " + dias + " días") + "</em>" : "") +
          "</span>" +
          '<span class="hero-plan__fechas">' + icono("cal") + "<span>" + esc(plan.fechas) + " · " + esc(plan.horario) + "</span></span>" +
          '<span class="hero-plan__promo">Si pagas antes del <b>' + esc(fmtFecha(plan.limitePromoISO)) + "</b>: <strong>" + fmtMXN(plan.promocion) + " MXN</strong></span>" +
          '<span class="hero-plan__normal">Precio normal: ' + fmtMXN(plan.normal) + " MXN</span>" +
          "</a>";
      }).join("");
    }

    var nota = $("#precios-nota");
    if (nota) nota.textContent = (p.nota || "") + (p.porPersona ? " Promociones válidas solo con pago antes de la fecha límite." : "");

    /* Destacado de promoción en la portada (plan principal) */
    var principal = p.planes.filter(function (x) { return x.destacado; })[0] || p.planes[0];
    if (principal) {
      var diasP = diasRestantes(principal.limitePromoISO);
      $$("[data-promo-hero]").forEach(function (n) {
        if (diasP >= 0) {
          n.innerHTML = "Precio anticipado <b>" + fmtMXN(principal.promocion) + " MXN</b> si pagas antes del " +
            esc((principal.limitePromoTexto || "").replace("Paga el total a más tardar el ", "").replace("Paga a más tardar el ", "")) +
            ' <span class="hero__promo-dias">(' + (diasP === 0 ? "¡último día!" : diasP === 1 ? "queda 1 día" : "faltan " + diasP + " días") + ")</span>";
        } else {
          n.innerHTML = "Consulta nuestras promociones vigentes.";
        }
      });
    }

    /* Botones de plan: preseleccionan el curso en el formulario */
    $$("[data-plan]").forEach(function (b) {
      b.addEventListener("click", function () {
        var sel = $("#plan");
        if (sel) sel.value = b.getAttribute("data-plan");
      });
    });
    renderIconos();
  }

  /* =============================================================
     2. PROGRAMA
     ============================================================= */
  function renderPrograma() {
    var wrap = $("#programa-cards");
    if (!wrap || !C.programa) return;
    C.programa.forEach(function (d, idx) {
      var card = el("article", { class: "day day--" + (idx + 1) + " reveal", "data-delay": String(idx) });
      var temas = (d.temas || []).map(function (t) {
        return "<li>" + icono("check") + "<span>" + esc(t) + "</span></li>";
      }).join("");
      card.innerHTML =
        '<div class="day__top">' +
          '<div class="day__pill"><div><span>Día</span><b>0' + d.dia + '</b></div></div>' +
          '<div class="day__titles"><span class="kicker">' + esc(d.kicker || "") + "</span><h3>" + esc(d.titulo) + "</h3></div>" +
        "</div>" +
        '<div class="day__objetivo"><b>Objetivo:</b> ' + esc(d.objetivo) + "</div>" +
        '<ul class="day__temas">' + temas + "</ul>" +
        '<div class="day__practica">' + icono("star") + "<p><b>Actividad práctica</b>" + esc(d.practica) + "</p></div>";
      wrap.appendChild(card);

      if (idx < C.programa.length - 1 && window.matchMedia("(max-width: 899px)").matches) {
        wrap.appendChild(el("div", { class: "program-connector" }, icono("arrow") + "<span>Continúa</span>"));
      }
    });
  }

  /* =============================================================
     3. GALERÍA + LIGHTBOX
     ============================================================= */
  var galeriaItems = [];
  function renderGaleria() {
    var grid = $("#galeria-grid");
    if (!grid || !C.galeria) return;
    galeriaItems = C.galeria;
    C.galeria.forEach(function (g, i) {
      var wide = (i === 0 || i === 5) ? " gallery__item--wide" : "";
      var alto = wide ? 675 : 900;
      var btn = el("button", {
        class: "gallery__item reveal" + wide,
        type: "button",
        "aria-label": "Ampliar fotografía: " + g.alt,
        "data-index": String(i)
      });
      btn.innerHTML =
        '<img src="' + esc(g.src640 || g.src) + '" srcset="' + esc(g.src640 || g.src) + " 640w, " + esc(g.src) + ' 1200w" ' +
        'sizes="(min-width: 900px) 25vw, 50vw" alt="' + esc(g.alt) + '" loading="lazy" decoding="async" width="1200" height="' + alto + '">' +
        '<span class="zoom">' + icono("zoom") + "</span>";
      btn.addEventListener("click", function () { openLightbox(i); });
      grid.appendChild(btn);
    });
  }

  var lb, lbImg, lbCaption, lbIndex = 0;
  function openLightbox(i) {
    lbIndex = i;
    lb = $("#lightbox");
    lbImg = $("#lightbox-img");
    lbCaption = $("#lightbox-caption");
    updateLightbox();
    lb.classList.add("open");
    document.body.style.overflow = "hidden";
    $("#lightbox-close").focus();
    medir("galeria_abierta", { foto: i + 1 });
  }
  function updateLightbox() {
    var g = galeriaItems[lbIndex];
    lbImg.src = g.src;
    lbImg.alt = g.alt;
    lbCaption.textContent = g.alt;
  }
  function closeLightbox() {
    if (!lb) return;
    lb.classList.remove("open");
    document.body.style.overflow = "";
  }
  function moveLightbox(step) {
    lbIndex = (lbIndex + step + galeriaItems.length) % galeriaItems.length;
    updateLightbox();
  }

  function bindLightbox() {
    if (!$("#lightbox")) return;
    $("#lightbox-close").addEventListener("click", closeLightbox);
    $("#lightbox-prev").addEventListener("click", function () { moveLightbox(-1); });
    $("#lightbox-next").addEventListener("click", function () { moveLightbox(1); });
    $("#lightbox").addEventListener("click", function (e) {
      if (e.target === this) closeLightbox();
    });
    document.addEventListener("keydown", function (e) {
      if (!lb || !lb.classList.contains("open")) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") moveLightbox(-1);
      if (e.key === "ArrowRight") moveLightbox(1);
    });
  }

  /* =============================================================
     4. PREGUNTAS FRECUENTES
     ============================================================= */
  function renderFaq() {
    var wrap = $("#faq-list");
    if (!wrap || !C.faq) return;
    C.faq.forEach(function (f, i) {
      var item = el("div", { class: "faq__item reveal" });
      item.innerHTML =
        '<button class="faq__q" type="button" aria-expanded="false" aria-controls="faq-a-' + i + '">' +
          "<span>" + esc(f.p) + "</span>" + icono("plus") +
        "</button>" +
        '<div class="faq__a" id="faq-a-' + i + '"><p>' + esc(f.r) + "</p></div>";
      wrap.appendChild(item);

      var q = $(".faq__q", item), a = $(".faq__a", item);
      q.addEventListener("click", function () {
        var abierto = item.classList.toggle("open");
        q.setAttribute("aria-expanded", abierto ? "true" : "false");
        a.style.maxHeight = abierto ? a.scrollHeight + "px" : "0px";
        if (abierto) medir("faq_abierta", { pregunta: f.p });
      });
    });
  }

  /* =============================================================
     5. CERTIFICACIÓN / RECONOCIMIENTO
     ============================================================= */
  function renderCertificacion() {
    var cert = C.certificacion;
    if (!cert) return;
    $$("[data-cert-estandar]").forEach(function (n) { n.textContent = cert.estandar || ""; });
    $$("[data-cert-nombre]").forEach(function (n) { n.textContent = cert.nombre || ""; });
    $$("[data-cert-folio]").forEach(function (n) {
      n.textContent = cert.folio ? cert.folio : "—";
      n.parentElement.style.display = cert.folio ? "" : "none";
    });
    $$("[data-cert-nota]").forEach(function (n) { n.textContent = cert.nota || ""; });
    var img = $("#cert-doc");
    if (img && cert.documento) {
      img.src = cert.documento;
      img.alt = "Documento del estándar de competencia " + (cert.estandar || "") + " del Sistema Nacional de Competencias (CONOCER)";
    }
    var logo = $("#cert-logo-conocer");
    if (logo && cert.logoConocer) logo.src = cert.logoConocer;

    var rec = C.reconocimiento;
    if (rec) {
      $$("[data-rec-nota]").forEach(function (n) { n.textContent = rec.nota || ""; });
      $$("[data-rec-texto]").forEach(function (n) { n.textContent = rec.texto || ""; });
      var img = $("#rec-imagen");
      if (img && rec.imagen) {
        img.src = rec.imagen;
        if (rec.imagen640) img.setAttribute("srcset", rec.imagen640 + " 640w, " + rec.imagen + " 1200w");
        img.alt = "Vista previa del reconocimiento de capacitación expedido por JC Creativo";
      }
      var ul = $("#rec-condiciones");
      if (ul) ul.innerHTML = (rec.condiciones || []).map(function (t) {
        return "<li>" + icono("check") + "<span>" + esc(t) + "</span></li>";
      }).join("");
    }
  }

  /* =============================================================
     6. FORMULARIO DE INSCRIPCIÓN → WHATSAPP
     ============================================================= */
  function bindForm() {
    var form = $("#form-inscripcion");
    if (!form) return;
    var cargado = Date.now();

    function setError(nombre, mensaje) {
      var campo = form.querySelector('[data-field="' + nombre + '"]');
      if (!campo) return;
      campo.classList.add("invalid");
      $(".error", campo).textContent = mensaje;
    }
    function clearError(nombre) {
      var campo = form.querySelector('[data-field="' + nombre + '"]');
      if (campo) campo.classList.remove("invalid");
    }

    ["nombre", "whatsapp", "email"].forEach(function (n) {
      var input = form.elements[n];
      if (input) input.addEventListener("input", function () { clearError(n); });
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      /* Anti-spam: campo oculto + tiempo mínimo en el formulario */
      if (form.elements.website && form.elements.website.value !== "") return;
      if (Date.now() - cargado < 3000) {
        setError("nombre", "Espera un momento y vuelve a intentarlo.");
        return;
      }

      var nombre = (form.elements.nombre.value || "").trim();
      var whatsapp = (form.elements.whatsapp.value || "").replace(/[^\d+]/g, "");
      var email = (form.elements.email.value || "").trim();
      var privacidad = form.elements.privacidad.checked;

      var valido = true;
      if (nombre.length < 2) { setError("nombre", "Escribe tu nombre completo."); valido = false; }
      if (!/^\+?\d{10,15}$/.test(whatsapp)) { setError("whatsapp", "Escribe un número de WhatsApp válido (10 dígitos)."); valido = false; }
      if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError("email", "Revisa tu correo electrónico."); valido = false; }
      if (!privacidad) {
        setError("privacidad", "Debes autorizar el tratamiento de tus datos.");
        valido = false;
      }
      if (!valido) {
        medir("formulario_error", {});
        return;
      }

      var msg = ((C.mensajes && C.mensajes.inscripcion) || "Hola, me interesa el curso de JC Creativo.")
        .replace("{nombre}", nombre);
      msg += "\n\nNombre: " + nombre;
      msg += "\nWhatsApp: " + whatsapp;
      if (email) msg += "\nCorreo: " + email;
      var planSel = form.elements.plan;
      if (planSel && planSel.value) msg += "\nCurso de interés: " + planSel.options[planSel.selectedIndex].text;
      msg += "\n\nAutorizo el tratamiento de mis datos conforme al aviso de privacidad.";
      msg += "\n(Solicitud de información — no es una inscripción confirmada)";

      medir("solicitud_inscripcion", { canal: "whatsapp" });

      $("#form-success").classList.add("show");
      window.open(waLink(msg), "_blank", "noopener");
      form.reset();
    });
  }

  /* =============================================================
     7. MENÚ MÓVIL, HEADER, CTA FIJO, SCROLL
     ============================================================= */
  function bindNav() {
    var toggle = $("#nav-toggle");
    var menu = $("#mobile-menu");
    if (toggle && menu) {
      toggle.addEventListener("click", function () {
        var abierto = document.body.classList.toggle("nav-open");
        toggle.setAttribute("aria-expanded", abierto ? "true" : "false");
      });
      $$("a", menu).forEach(function (a) {
        a.addEventListener("click", function () {
          document.body.classList.remove("nav-open");
          toggle.setAttribute("aria-expanded", "false");
        });
      });
    }

    var header = $("#header");
    var onScroll = function () {
      if (header) header.classList.toggle("scrolled", window.scrollY > 40);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    /* CTA fijo móvil: se oculta cuando el formulario es visible */
    var sticky = $("#sticky-cta");
    var form = $("#form-inscripcion");
    if (sticky && form && "IntersectionObserver" in window) {
      new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          sticky.classList.toggle("hidden", en.isIntersecting);
        });
      }, { threshold: 0.15 }).observe(form);
    }
  }

  /* =============================================================
     8. ANIMACIONES DE APARICIÓN
     ============================================================= */
  function bindReveal() {
    var nodes = $$(".reveal");
    if (!("IntersectionObserver" in window)) {
      nodes.forEach(function (n) { n.classList.add("in"); });
      return;
    }
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add("in");
          obs.unobserve(en.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    nodes.forEach(function (n) { obs.observe(n); });
  }

  /* =============================================================
     9. ICONOS SVG EN LÍNEA
     ============================================================= */
  var ICONS = {
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6L9 17l-5-5"/></svg>',
    plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>',
    star: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 2l2.9 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l7.1-1.01L12 2z"/></svg>',
    arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>',
    zoom: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.35-4.35M11 8v6M8 11h6"/></svg>',
    whatsapp: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.22 8.22 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.25-8.23 2.2 0 4.27.86 5.83 2.42a8.19 8.19 0 0 1 2.41 5.82c0 4.54-3.7 8.23-8.24 8.23zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.78.97-.15.16-.29.18-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.43.12-.15.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.85-.2-.48-.4-.42-.56-.43h-.47c-.16 0-.43.06-.65.31-.22.25-.85.84-.85 2.04s.87 2.37 1 2.53c.12.16 1.71 2.61 4.15 3.66.58.25 1.03.4 1.39.51.58.19 1.11.16 1.53.1.47-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.11-.22-.17-.47-.29z"/></svg>',
    facebook: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.9h2.54V9.85c0-2.52 1.49-3.92 3.78-3.92 1.09 0 2.24.2 2.24.2v2.47h-1.26c-1.24 0-1.63.78-1.63 1.57v1.89h2.78l-.45 2.9h-2.33V22c4.78-.76 8.44-4.92 8.44-9.94z"/></svg>',
    instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4.2"/><circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none"/></svg>',
    tiktok: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M16.6 2h-2.9c-.25 2.2-1.6 3.93-3.98 4.16v2.96c1.42-.05 2.72-.5 3.85-1.3v6.06c0 4.1-3.26 6.72-6.85 5.88-3.2-.75-4.95-3.85-4.2-6.9.72-2.9 3.45-4.83 6.4-4.62v3.05c-.32-.08-.65-.13-1-.12-1.38.03-2.4 1.18-2.32 2.55.07 1.28 1.12 2.28 2.42 2.24 1.35-.03 2.35-1.12 2.35-2.45V2z"/></svg>',
    globe: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.6 3.8 5.7 3.8 9S14.5 18.4 12 21c-2.5-2.6-3.8-5.7-3.8-9S9.5 5.6 12 3z"/></svg>',
    cal: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="3"/><path d="M8 3v4M16 3v4M3 10h18"/></svg>',
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z"/><circle cx="12" cy="10" r="2.6"/></svg>',
    clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.2 2"/></svg>',
    award: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="9" r="5.5"/><path d="M8.2 13.5L7 22l5-2.8L17 22l-1.2-8.5"/></svg>',
    users: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6"/><circle cx="17" cy="9" r="2.6"/><path d="M17 14c2.8 0 4.8 1.7 4.8 4.5"/></svg>',
    shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 2l8 3.5v5.2c0 5-3.4 9.4-8 11.3-4.6-1.9-8-6.3-8-11.3V5.5L12 2z"/><path d="M8.8 12.2l2.3 2.3 4.3-4.6"/></svg>',
    info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/></svg>',
    lock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>',
    play: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2.5" y="4.5" width="19" height="15" rx="3"/><path d="M10 9l5 3-5 3V9z"/></svg>',
    spark: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 2l2 6 6 2-6 2-2 6-2-6-6-2 6-2 2-6z"/></svg>',
    pen: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M16.5 3.5l4 4L8 20H4v-4L16.5 3.5z"/><path d="M14 6l4 4"/></svg>',
    target: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r="1" fill="currentColor"/></svg>',
    bag: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="7" width="18" height="13" rx="2.5"/><path d="M8 7V5.5A2.5 2.5 0 0 1 10.5 3h3A2.5 2.5 0 0 1 16 5.5V7"/></svg>',
    smile: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M8.5 14c1 1.3 2.2 2 3.5 2s2.5-.7 3.5-2M9 9.5h.01M15 9.5h.01"/></svg>'
  };
  function icono(nombre) { return ICONS[nombre] || ICONS.check; }
  window.__icono = icono;

  /* Inyectar iconos declaradas en el HTML con data-icon */
  function renderIconos() {
    $$("[data-icon]").forEach(function (n) {
      n.innerHTML = icono(n.getAttribute("data-icon"));
    });
  }

  /* =============================================================
     INICIO
     ============================================================= */
  document.addEventListener("DOMContentLoaded", function () {
    renderIconos();
    renderDatos();
    renderPrecios();
    renderPrograma();
    renderGaleria();
    renderFaq();
    renderCertificacion();
    bindLightbox();
    bindForm();
    bindNav();
    bindReveal();

    /* Marca activa del nav al hacer scroll */
    var secciones = $$("main section[id]");
    if ("IntersectionObserver" in window) {
      var obsNav = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            $$(".nav a").forEach(function (a) {
              a.classList.toggle("active", a.getAttribute("href") === "#" + en.target.id);
            });
          }
        });
      }, { rootMargin: "-40% 0px -55% 0px" });
      secciones.forEach(function (s) { obsNav.observe(s); });
    }
  });
})();
