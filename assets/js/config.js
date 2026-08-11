/* =============================================================
   DOMUS 2026 — CONFIGURAÇÃO CENTRAL
   -------------------------------------------------------------
   Este é o ÚNICO lugar onde os dados do evento devem ser editados.
   Não espalhe data, preço, lote, pregadores ou links pelo código.
   Basta alterar aqui e o site inteiro se atualiza.
   ============================================================= */

window.DOMUS = {
  /* ---------- EVENTO ---------- */
  event: {
    name: "DOMUS 2026",
    tagline: "A Perfeita Alegria",
    dateISO: "2026-10-24",           // usado em contagens/estrutura
    dateLabel: "24 de Outubro",       // exibição curta
    dateLabelFull: "24 de Outubro de 2026",
    weekday: "Sábado",
    // Placeholders — preencher quando a organização confirmar.
    // Deixe "" para o campo ficar oculto automaticamente.
    time: "",                         // ex.: "08h às 18h"
    venue: "",                        // ex.: "Paróquia N. Sra. da ..."
    address: "",                      // ex.: "Rua ..., nº ... — Cidade/UF"
    ageRange: "",                     // ex.: "A partir de 14 anos"
    notes: "",                        // orientações extras
  },

  /* ---------- LOTES / INSCRIÇÕES ----------
     Estrutura pronta para 3 lotes. Apenas os lotes com
     `public: true` aparecem no site. Ative os próximos
     mudando `public` para true quando quiser. */
  batches: [
    {
      id: "lote-01",
      label: "Lote 01",
      badge: "Pré-venda",
      status: "open",                 // "open" | "soon" | "closed" | "soldout"
      statusLabel: "Inscrições abertas",
      price: 60.00,                   // valor PROVISÓRIO e demonstrativo
      priceProvisional: true,
      public: true,
      // Estrutura pronta (não usada como gatilho falso). Deixe null.
      spots: null,                    // ex.: 200
      spotsLeft: null,                // ex.: 47
      deadlineISO: null,              // ex.: "2026-08-31"
    },
    {
      id: "lote-02",
      label: "Lote 02",
      badge: "2º Lote",
      status: "soon",
      statusLabel: "Em breve",
      price: 75.00,
      priceProvisional: true,
      public: false,
      spots: null, spotsLeft: null, deadlineISO: null,
    },
    {
      id: "lote-03",
      label: "Lote 03",
      badge: "3º Lote",
      status: "soon",
      statusLabel: "Em breve",
      price: 90.00,
      priceProvisional: true,
      public: false,
      spots: null, spotsLeft: null, deadlineISO: null,
    },
  ],

  /* ---------- EXPERIÊNCIAS (o que vamos viver) ---------- */
  experiences: [
    {
      icon: "chalice",
      title: "Santa Missa",
      text: "O ponto mais alto do dia. Tudo o que vivermos nos conduz ao encontro com Cristo na Eucaristia.",
    },
    {
      icon: "flame",
      title: "Pregações",
      text: "Momentos de Palavra, formação e aprofundamento — para escutar com o coração e caminhar mais fundo na fé.",
    },
    {
      icon: "joy",
      title: "Animação",
      text: "Alegria que se vive junto: música, encontro e a leveza de estar em comunidade.",
    },
    {
      icon: "bread",
      title: "Lanche Partilhado",
      text: "A mesa que aproxima. Partilhar o pão é partilhar a vida — o gesto simples da fraternidade.",
    },
    // Adicione novas experiências aqui quando forem confirmadas.
  ],

  /* ---------- PREGADORES / LINE-UP ----------
     Enquanto `revealed: false`, o card aparece velado (silhueta,
     luz passando, "Em breve"). Quando revelar, troque para:
       revealed: true, name, role, bio, photo (caminho da imagem). */
  speakers: [
    { id: "p1", revealed: false, kicker: "Pregação", name: null, role: null, bio: null, photo: null },
    { id: "p2", revealed: false, kicker: "Pregação", name: null, role: null, bio: null, photo: null },
    { id: "p3", revealed: false, kicker: "Pregação", name: null, role: null, bio: null, photo: null },
    // Exemplo de card revelado:
    // { id: "p4", revealed: true, kicker: "Pregação",
    //   name: "Nome do Pregador", role: "Função / Comunidade",
    //   bio: "Pequena descrição.", photo: "assets/img/pregadores/nome.jpg" },
  ],

  /* ---------- CONTEXTO FRANCISCANO ----------
     Números históricos ficam aqui para edição fácil. */
  franciscan: {
    years: 800,                       // usado no headline "800 anos"
    jubilee: "Jubileu Franciscano",
  },

  /* ---------- LINKS / CONTATO ----------
     Deixe "" para ocultar automaticamente. */
  links: {
    instagram: "",                    // ex.: "https://instagram.com/domus"
    instagramHandle: "",              // ex.: "@domus"
    whatsapp: "",                     // link de contato
    email: "",                        // ex.: "contato@domus.com"
    privacy: "",                      // link da política de privacidade
    organizer: "",                    // nome da organização responsável
  },

  /* ---------- CAMPOS DO FORMULÁRIO ----------
     Nomenclatura editável. Ex.: se o contato de emergência
     passar a ser exigido só para menores, altere aqui. */
  registrationFields: {
    emergencyLabel: "Telefone de um responsável / contato de emergência",
    emergencyHelp: "Alguém que possamos contatar caso necessário durante o encontro.",
    parishLabel: "Paróquia / Comunidade",
  },

  /* ---------- TERMO DE USO DE IMAGEM ----------
     TEXTO PROVISÓRIO — deve ser validado juridicamente pela
     organização antes da publicação. */
  imageConsent: {
    short: "Li e concordo com o termo de autorização de uso de imagem do DOMUS 2026.",
    full: [
      "O DOMUS 2026 contará com cobertura fotográfica e audiovisual para fins de registro, memória e divulgação do encontro.",
      "Ao concordar com este termo, você autoriza, de forma gratuita e por prazo indeterminado, o uso da sua imagem, voz e depoimentos captados durante o evento em materiais de divulgação da organização — como redes sociais, site, vídeos e peças gráficas — sempre em contexto ligado à finalidade religiosa e formativa do DOMUS.",
      "Nenhuma imagem será cedida a terceiros para fins comerciais alheios ao evento. Você pode solicitar a revisão do uso de uma imagem específica entrando em contato com a organização.",
      "Para participantes menores de idade, esta autorização deverá ser confirmada pelo responsável legal no ato da inscrição.",
      "Este texto é provisório e será validado pela organização antes da publicação definitiva.",
    ],
    // Versão para responsável legal (menores) — estrutura pronta.
    minorNote: "Para menores de 18 anos, a autorização deve ser dada pelo responsável legal.",
  },

  /* ---------- DESTINO DA INSCRIÇÃO ----------
     Onde os dados vão ao finalizar. Enquanto não houver
     integração (planilha, API, pagamento), fica em modo demo:
     mostra a tela de confirmação sem enviar para lugar nenhum. */
  submit: {
    mode: "demo",                     // "demo" | "endpoint"
    endpoint: "",                     // URL (POST JSON) quando mode === "endpoint"
    successRedirect: "",              // opcional: pagamento/WhatsApp após confirmar
  },
};
