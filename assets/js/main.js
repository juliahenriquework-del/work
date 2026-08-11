/* =============================================================
   DOMUS 2026 — interações
   Vanilla JS. Sem dependências. Otimizado para mobile.
   ============================================================= */
(function () {
  "use strict";
  const CFG = window.DOMUS || {};
  const $  = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- utils ---------- */
  const money = (v) =>
    "R$ " + Number(v).toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  function getPath(obj, path) {
    return path.split(".").reduce((o, k) => (o == null ? o : o[k]), obj);
  }

  /* Ícones das experiências (inline SVG) */
  const ICONS = {
    chalice: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M7 3h10M8 3l1 6a3 3 0 0 0 6 0l1-6M12 12v7M8 21h8"/></svg>',
    flame:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3s5 4 5 9a5 5 0 0 1-10 0c0-2 1-3 1-3 .5 2 2 2.5 2 2.5-1-3 2-5.5 2-8.5z"/></svg>',
    joy:     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11l3-8 3 8M12 3v7M4 13c2 3 5 4 8 4s6-1 8-4M6 20c1.5 1.5 3.7 2 6 2s4.5-.5 6-2"/></svg>',
    bread:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 11c0-3 3.5-5 8-5s8 2 8 5c0 1-.7 1.6-1.6 1.6H5.6C4.7 12.6 4 12 4 11z"/><path d="M6 12.6V18a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-5.4M9 6.5V4M13 6.2V3.6"/></svg>',
  };

  /* =============================================================
     1. INJEÇÃO DO CONFIG (textos e atributos)
     ============================================================= */
  function injectConfig() {
    $$("[data-config]").forEach((el) => {
      const val = getPath(CFG, el.getAttribute("data-config"));
      if (val != null && val !== "") el.textContent = val;
    });
    $$("[data-config-attr]").forEach((el) => {
      const val = getPath(CFG, el.getAttribute("data-config-attr"));
      if (val != null && val !== "") el.textContent = val;
    });
  }

  /* ---------- carrossel do hero (fotos do encontro anterior) ---------- */
  function renderHeroCarousel() {
    const media = $("#heroMedia");
    if (!media) return;
    const photos = (CFG.heroPhotos || []).filter((p) => p && p.src);
    if (photos.length) {
      media.innerHTML = photos.map((p, i) =>
        `<div class="hero__slide${i === 0 ? " is-active" : ""}" style="background-image:url('${p.src}');${p.position ? `background-position:${p.position};` : ""}"></div>`
      ).join("");
    } else {
      // placeholders elegantes da identidade enquanto as fotos não chegam
      media.innerHTML = [0, 1, 2].map((i) =>
        `<div class="hero__slide hero__slide--ph${i === 0 ? " is-active" : ""}"></div>`).join("");
    }
  }
  function startHeroCarousel() {
    const media = $("#heroMedia");
    if (!media) return;
    const slides = $$(".hero__slide", media);
    if (slides.length <= 1) return;
    let idx = 0;
    const INTERVAL = 2200;   // troca a cada ~2s
    setInterval(() => {
      slides[idx].classList.remove("is-active");
      idx = (idx + 1) % slides.length;
      slides[idx].classList.add("is-active");
    }, INTERVAL);
  }

  /* ---------- experiências ---------- */
  function renderExperiences() {
    const grid = $("#expGrid");
    if (!grid || !CFG.experiences) return;
    grid.innerHTML = CFG.experiences.map((x, i) => `
      <article class="card exp-card reveal" data-anim="up" data-delay="${i % 3}" role="listitem">
        <span class="exp-card__num">0${i + 1}</span>
        <span class="exp-card__icon" data-icon="${x.icon}">${ICONS[x.icon] || ICONS.flame}</span>
        <h3>${x.title}</h3>
        <p>${x.text}</p>
      </article>`).join("");
  }

  /* silhueta humana (cabeça, ombros e tronco) claramente reconhecível como pessoa */
  const SILHOUETTE = `<svg viewBox="0 0 200 260" preserveAspectRatio="xMidYMax meet" fill="currentColor" aria-hidden="true"><circle cx="100" cy="58" r="34"/><path d="M62 96q38 16 76 0l-6 10q10 6 14 20l10 62q-56 20 -112 0l10-62q4-14 14-20z"/><path d="M52 264c0-58 30-92 48-92s48 34 48 92z"/></svg>`;

  /* ---------- pregadores ---------- */
  function renderSpeakers() {
    const track = $("#speakersTrack");
    if (!track || !CFG.speakers) return;
    track.innerHTML = CFG.speakers.map((s) => {
      if (s.revealed) {
        return `
        <article class="card speaker-card is-revealed reveal" data-anim="up" role="listitem">
          ${s.photo ? `<img class="speaker-card__photo" src="${s.photo}" alt="${s.name || "Pregador"}" loading="lazy" />` : ""}
          <span class="speaker-card__scrim"></span>
          <div class="speaker-card__body">
            <span class="speaker-card__kicker">${s.kicker || "Pregação"}</span>
            <span class="speaker-card__name">${s.name || ""}</span>
            ${s.role ? `<span class="speaker-card__role">${s.role}</span>` : ""}
          </div>
        </article>`;
      }
      return `
        <article class="card speaker-card reveal" data-anim="up" role="listitem" aria-label="Pregador ainda não revelado">
          <span class="speaker-card__backlight"></span>
          <span class="speaker-card__figure"><span class="speaker-card__silhouette">${SILHOUETTE}</span></span>
          <span class="speaker-card__rim"></span>
          <span class="speaker-card__scrim"></span>
          <div class="speaker-card__body">
            <span class="speaker-card__kicker">${s.kicker || "Pregação"}</span>
            <span class="speaker-card__tag">Em breve</span>
          </div>
        </article>`;
    }).join("");
  }

  /* ---------- lote público atual ---------- */
  function currentBatch() {
    return (CFG.batches || []).find((b) => b.public) || null;
  }
  function renderBatch() {
    const card = $("#batchCard");
    const b = currentBatch();
    if (!card) return;
    if (!b) { card.innerHTML = `<p class="batch__prov">As inscrições abrem em breve.</p>`; return; }
    let meta = "";
    if (b.spotsLeft != null) meta = `${b.spotsLeft} vagas restantes`;
    else if (b.deadlineISO) meta = `Inscrições até ${new Date(b.deadlineISO + "T00:00").toLocaleDateString("pt-BR")}`;
    card.innerHTML = `
      <span class="batch__badge">${b.badge || b.label}</span>
      <p class="batch__name">${b.label}</p>
      <p class="batch__status">${b.statusLabel || ""}</p>
      <div class="batch__price"><span class="cur">R$</span><span class="val">${Number(b.price).toLocaleString("pt-BR", { minimumFractionDigits: 0 })}</span></div>
      ${b.priceProvisional ? `<p class="batch__prov">valor provisório e demonstrativo</p>` : ""}
      <a href="#inscricao" class="btn btn--wine btn--lg">Garantir meu lugar</a>
      ${meta ? `<p class="batch__meta">${meta}</p>` : ""}`;
  }

  /* ---------- links do rodapé ---------- */
  function renderFooter() {
    const nav = $("#footerLinks");
    const L = CFG.links || {};
    if (nav) {
      const links = [];
      if (L.instagram) links.push(`<a href="${L.instagram}" target="_blank" rel="noopener">${L.instagramHandle || "Instagram"}</a>`);
      if (L.whatsapp)  links.push(`<a href="${L.whatsapp}" target="_blank" rel="noopener">WhatsApp</a>`);
      if (L.email)     links.push(`<a href="mailto:${L.email}">Contato</a>`);
      if (L.privacy)   links.push(`<a href="${L.privacy}">Política de privacidade</a>`);
      nav.innerHTML = links.join("");
    }
    const org = $("#footerOrg");
    if (org && L.organizer) org.textContent = `Uma realização ${L.organizer}.`;
  }

  /* =============================================================
     2. ANIMAÇÕES
     ============================================================= */
  function splitWords() {
    $$('[data-anim="words"]').forEach((el) => {
      if (el.dataset.split) return;
      el.dataset.split = "1";
      const parts = el.textContent.trim().split(/\s+/);
      el.innerHTML = parts.map((w, i) =>
        `<span class="word" style="transition-delay:${i * 55}ms">${w}</span>`).join(" ");
    });
  }

  function scrollReveal() {
    const els = $$(".reveal");
    if (prefersReduced || !("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -8% 0px" });
    els.forEach((el) => io.observe(el));
  }

  function heroIntro() {
    const hero = $("#hero");
    if (!hero) return;
    requestAnimationFrame(() => hero.classList.add("is-in"));
  }

  function portalScroll() {
    const arch = $("[data-portal]");
    if (!arch || prefersReduced) { if (arch) arch.classList.add("is-open"); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) arch.classList.add("is-open"); });
    }, { threshold: 0.4 });
    io.observe(arch);
  }

  function joyBeats() {
    const beats = $$(".joy__beat");
    if (!beats.length) return;
    if (prefersReduced || !("IntersectionObserver" in window)) {
      beats.forEach((b) => b.classList.add("is-visible")); return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("is-visible"); });
    }, { threshold: 0.6 });
    beats.forEach((b) => io.observe(b));
  }

  /* =============================================================
     3. HEADER + NAV
     ============================================================= */
  function header() {
    const hdr = $("#siteHeader");
    const onScroll = () => hdr.classList.toggle("is-scrolled", window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    // menu mobile
    const toggle = $("#navToggle");
    const menu = $("#navMobile");
    if (toggle && menu) {
      const close = () => { toggle.setAttribute("aria-expanded", "false"); menu.hidden = true; };
      toggle.addEventListener("click", () => {
        const open = toggle.getAttribute("aria-expanded") === "true";
        toggle.setAttribute("aria-expanded", String(!open));
        menu.hidden = open;
      });
      $$("a", menu).forEach((a) => a.addEventListener("click", close));
    }
  }

  /* ---------- barra de progresso + indicador de dobras ---------- */
  function scrollUI() {
    const SECTIONS = [
      { id: "hero", label: "Início" },
      { id: "o-domus", label: "O Domus" },
      { id: "experiencia", label: "Experiência" },
      { id: "perfeita-alegria", label: "A Perfeita Alegria" },
      { id: "franciscano", label: "Jubileu" },
      { id: "pregadores", label: "Pregadores" },
      { id: "inscricao", label: "Inscrição" },
    ];
    const dotsNav = $("#sectionDots");
    const bar = $("#scrollProgress");
    const navLinks = $$(".nav-desktop a");

    if (dotsNav) {
      dotsNav.innerHTML = SECTIONS.map((s) =>
        `<a href="#${s.id}" data-sec="${s.id}" data-label="${s.label}" aria-label="Ir para ${s.label}"></a>`).join("");
    }
    const dots = dotsNav ? $$("a", dotsNav) : [];

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const h = document.documentElement;
        const max = h.scrollHeight - h.clientHeight;
        const y = window.scrollY || h.scrollTop;
        if (bar) bar.style.width = (max > 0 ? (y / max) * 100 : 0).toFixed(1) + "%";
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    if ("IntersectionObserver" in window) {
      const setActive = (id) => {
        dots.forEach((d) => d.classList.toggle("is-active", d.dataset.sec === id));
        navLinks.forEach((l) => l.classList.toggle("is-active", l.getAttribute("href") === "#" + id));
      };
      const io = new IntersectionObserver((entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); });
      }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });
      SECTIONS.forEach((s) => { const el = document.getElementById(s.id); if (el) io.observe(el); });
    }
  }

  /* ---------- CTA flutuante (mobile) ---------- */
  function floatingCta() {
    const cta = $("#floatingCta");
    const hero = $("#hero");
    const form = $("#inscricao");
    if (!cta || !hero) return;
    const update = () => {
      const pastHero = window.scrollY > hero.offsetHeight * 0.8;
      const inForm = form && window.scrollY + window.innerHeight > form.offsetTop + 120 &&
                     window.scrollY < form.offsetTop + form.offsetHeight;
      const show = pastHero && !inForm;
      cta.classList.toggle("is-visible", show);
      cta.setAttribute("aria-hidden", String(!show));
      cta.tabIndex = show ? 0 : -1;
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
  }

  /* =============================================================
     4. FORMULÁRIO EM ETAPAS
     ============================================================= */
  function form() {
    const form = $("#regForm");
    if (!form) return;
    const steps = $$(".step", form);
    const total = steps.length;
    let current = 1;

    const stepNames = ["Sobre você", "Informações importantes", "Autorizações", "Confirmar inscrição"];
    const els = {
      prev: $("#prevBtn"), next: $("#nextBtn"), submit: $("#submitBtn"),
      count: $("#stepCount"), name: $("#stepName"), fill: $("#progressFill"),
    };

    // preço no resumo
    const b = currentBatch();
    if (b) { const sp = $("#summaryPrice"); if (sp) sp.textContent = money(b.price); }

    // alergia condicional
    const allergyField = $("#allergyDetailField");
    $$('input[name="allergy"]').forEach((r) => r.addEventListener("change", () => {
      const yes = $('input[name="allergy"]:checked')?.value === "sim";
      allergyField.hidden = !yes;
      if (!yes) { $("#allergyDetail").value = ""; clearError($("#allergyDetail")); }
    }));

    function showStep(n, scroll = true) {
      steps.forEach((s) => { const active = Number(s.dataset.step) === n; s.hidden = !active; s.classList.toggle("is-active", active); });
      current = n;
      els.count.textContent = `${n} de ${total}`;
      els.name.textContent = stepNames[n - 1] || "";
      els.fill.style.width = `${(n / total) * 100}%`;
      els.prev.hidden = n === 1;
      els.next.hidden = n === total;
      els.submit.hidden = n !== total;
      if (n === total) buildSummary();
      // rolar o topo do formulário para a viewport (sem esconder o botão pelo teclado)
      if (scroll) {
        const shell = $(".form-shell");
        const y = shell.getBoundingClientRect().top + window.scrollY - 90;
        window.scrollTo({ top: y, behavior: prefersReduced ? "auto" : "smooth" });
      }
    }

    /* ---- validação ---- */
    function setError(input, msg) {
      const field = input.closest(".field") || input.closest(".consent");
      if (!field) return;
      field.classList.add("has-error");
      const err = field.querySelector("[data-error]");
      if (err) err.textContent = msg;
    }
    function clearError(input) {
      const field = input.closest(".field") || input.closest(".consent");
      if (!field) return;
      field.classList.remove("has-error");
      const err = field.querySelector("[data-error]");
      if (err) err.textContent = "";
    }

    function validateStep(n) {
      let ok = true; let firstBad = null;
      const fail = (input, msg) => { setError(input, msg); ok = false; if (!firstBad) firstBad = input; };

      if (n === 1) {
        const name = $("#fullName"), birth = $("#birth"), parish = $("#parish");
        if (!name.value.trim()) fail(name, "Informe seu nome completo.");
        else if (name.value.trim().split(/\s+/).length < 2) fail(name, "Informe seu nome e sobrenome.");
        else clearError(name);

        if (!birth.value) fail(birth, "Informe sua data de nascimento.");
        else {
          const d = new Date(birth.value);
          if (isNaN(d) || d > new Date()) fail(birth, "Informe uma data válida.");
          else clearError(birth);
        }
        if (!parish.value.trim()) fail(parish, "Informe sua paróquia ou comunidade.");
        else clearError(parish);
      }

      if (n === 2) {
        const allergy = $('input[name="allergy"]:checked');
        const allergyGroup = $('input[name="allergy"]');
        if (!allergy) fail(allergyGroup, "Selecione Sim ou Não.");
        else {
          clearError(allergyGroup);
          if (allergy.value === "sim") {
            const det = $("#allergyDetail");
            if (!det.value.trim()) fail(det, "Conte qual alergia ou restrição precisamos conhecer.");
            else clearError(det);
          }
        }
        const emg = $("#emergency");
        const digits = emg.value.replace(/\D/g, "");
        if (!emg.value.trim()) fail(emg, "Informe um telefone de contato.");
        else if (digits.length < 10) fail(emg, "Informe um telefone válido com DDD.");
        else clearError(emg);
      }

      if (n === 3) {
        const consent = $("#imageConsent");
        if (!consent.checked) fail(consent, "É preciso concordar com o termo para continuar.");
        else clearError(consent);
      }

      if (!ok && firstBad) firstBad.focus({ preventScroll: false });
      return ok;
    }

    /* ---- resumo ---- */
    function buildSummary() {
      const g = $("#regSummary");
      const allergy = $('input[name="allergy"]:checked')?.value;
      const rows = [
        ["Nome", $("#fullName").value.trim()],
        ["Nascimento", formatDate($("#birth").value)],
        ["Paróquia / Comunidade", $("#parish").value.trim()],
        ["Alergia/restrição", allergy === "sim" ? ($("#allergyDetail").value.trim() || "Sim") : "Não"],
        ["Contato de emergência", $("#emergency").value.trim()],
        ["Uso de imagem", $("#imageConsent").checked ? "Autorizado" : "Pendente"],
      ];
      g.innerHTML = rows.map(([dt, dd]) =>
        `<dl class="summary__row"><dt>${dt}</dt><dd>${dd || "Não informado"}</dd></dl>`).join("");
    }
    function formatDate(v) {
      if (!v) return "Não informado";
      const d = new Date(v + "T00:00");
      return isNaN(d) ? v : d.toLocaleDateString("pt-BR");
    }

    // limpar erro ao digitar
    $$("input, textarea", form).forEach((i) =>
      i.addEventListener("input", () => clearError(i)));

    els.next.addEventListener("click", () => { if (validateStep(current)) showStep(current + 1); });
    els.prev.addEventListener("click", () => showStep(current - 1));

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      // valida todas as etapas por segurança
      for (let n = 1; n <= total; n++) { if (!validateStep(n)) { showStep(n); return; } }
      submitRegistration(collect());
    });

    function collect() {
      const allergy = $('input[name="allergy"]:checked')?.value;
      return {
        fullName: $("#fullName").value.trim(),
        birth: $("#birth").value,
        parish: $("#parish").value.trim(),
        allergy: allergy || "",
        allergyDetail: allergy === "sim" ? $("#allergyDetail").value.trim() : "",
        emergency: $("#emergency").value.trim(),
        imageConsent: $("#imageConsent").checked,
        batch: currentBatch()?.id || "",
        price: currentBatch()?.price ?? null,
      };
    }

    showStep(1, false);   // inicial: não rolar a página para o formulário
  }

  /* ---------- envio ---------- */
  async function submitRegistration(data) {
    const S = CFG.submit || { mode: "demo" };
    const submitBtn = $("#submitBtn");
    if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = "Enviando..."; }

    try {
      if (S.mode === "endpoint" && S.endpoint) {
        const res = await fetch(S.endpoint, {
          method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error("Falha no envio");
      }
      // modo demo: apenas mostra confirmação
      showConfirmation(S);
    } catch (err) {
      if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = "Finalizar minha inscrição"; }
      alert("Não foi possível concluir agora. Tente novamente em instantes.");
    }
  }

  function showConfirmation(S) {
    const formShell = $(".form-shell");
    const confirm = $("#confirm");
    if (formShell) formShell.style.display = "none";
    $(".register .eyebrow")?.style.setProperty("display", "none");
    $("#reg-title")?.style.setProperty("display", "none");
    if (confirm) {
      confirm.hidden = false;
      confirm.scrollIntoView({ behavior: prefersReduced ? "auto" : "smooth", block: "center" });
      if (S && S.successRedirect) {
        const next = $("#confirmNext");
        if (next) next.innerHTML = `<a href="${S.successRedirect}" class="btn btn--gold">Continuar</a>`;
      }
    }
  }

  /* =============================================================
     5. MODAL — termo de imagem
     ============================================================= */
  function consentModal() {
    const modal = $("#consentModal");
    const open = $("#openConsent");
    const body = $("#consentFull");
    if (!modal) return;
    if (body && CFG.imageConsent?.full) {
      body.innerHTML = CFG.imageConsent.full.map((p) => `<p>${p}</p>`).join("");
    }
    const show = () => { modal.hidden = false; document.body.style.overflow = "hidden";
      modal.querySelector(".modal__close")?.focus(); };
    const hide = () => { modal.hidden = true; document.body.style.overflow = ""; open?.focus(); };
    open?.addEventListener("click", show);
    $$("[data-close]", modal).forEach((el) => el.addEventListener("click", hide));
    document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !modal.hidden) hide(); });
  }

  /* =============================================================
     BOOT
     ============================================================= */
  function init() {
    injectConfig();
    renderHeroCarousel();
    renderExperiences();
    renderSpeakers();
    renderBatch();
    renderFooter();
    splitWords();
    scrollReveal();
    joyBeats();
    portalScroll();
    heroIntro();
    startHeroCarousel();
    header();
    scrollUI();
    floatingCta();
    form();
    consentModal();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
