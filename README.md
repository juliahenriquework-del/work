# DOMUS 2026 — A Perfeita Alegria

Site de divulgação e inscrição do **DOMUS 2026** — um encontro imersivo de um dia,
vivido dentro do contexto do Jubileu Franciscano. **24 de outubro de 2026.**

Construído **mobile-first**, sem frameworks (HTML + CSS + JavaScript puro), com foco
em performance, acessibilidade e uma experiência visual imersiva na identidade do evento.

---

## 🚀 Como visualizar

É um site estático. Basta abrir o `index.html` no navegador — ou servir a pasta:

```bash
# opção simples com Python
python3 -m http.server 8000
# depois acesse http://localhost:8000
```

Para publicar, envie os arquivos para qualquer hospedagem estática
(GitHub Pages, Netlify, Vercel, Hostinger, etc.).

---

## ✏️ Onde editar o conteúdo (IMPORTANTE)

**Quase tudo que muda ao longo das fases está centralizado em um único arquivo:**

### `assets/js/config.js`

Abra esse arquivo para alterar, sem mexer no restante do código:

| O que editar | Onde |
|---|---|
| Data, horário, local, endereço, faixa etária | `event` |
| **Preço** e lote atual | `batches` |
| Ativar o Lote 02 / 03 | mude `public: false` → `public: true` |
| Revelar pregadores | `speakers` → `revealed: true` + `name`, `role`, `photo` |
| Experiências (Missa, Pregações...) | `experiences` |
| Instagram, WhatsApp, e-mail, política | `links` |
| Texto do termo de uso de imagem | `imageConsent` |
| Contexto franciscano (nº de anos) | `franciscan` |
| Para onde a inscrição é enviada | `submit` |

> Campos deixados como `""` (vazios) somem automaticamente do site.
> Assim você não mostra "Local: a definir" — simplesmente não aparece até ser preenchido.

---

## 💰 Preço

O valor **R$ 60,00** é **provisório e demonstrativo**. Ele está definido em
**um só lugar** (`batches[].price` no config) e se propaga para o card do lote,
o resumo da inscrição e o comprovante. Basta alterar lá.

---

## 🎤 Revelando um pregador

No `config.js`, troque um item de `speakers` para:

```js
{
  id: "p1", revealed: true, kicker: "Pregação",
  name: "Nome do Pregador",
  role: "Função / Comunidade",
  bio: "Pequena descrição.",
  photo: "assets/img/pregadores/nome.jpg"
}
```

A foto entra com uma animação de `blur → nítido`. Coloque as imagens em
`assets/img/pregadores/`. Enquanto `revealed: false`, o card aparece velado
(silhueta + luz passando + "Em breve").

---

## 📦 Ativando os próximos lotes

Cada lote em `batches` tem uma flag `public`. Só o lote com `public: true`
aparece no site. Para virar o lote, coloque `public: false` no atual e
`public: true` no próximo. A estrutura para vagas restantes (`spotsLeft`) e
prazo (`deadlineISO`) já existe — preencha **apenas quando os números forem reais**.
Nenhum gatilho falso de escassez é usado.

---

## 📨 Recebendo as inscrições

Por padrão o formulário está em **modo demonstração** (`submit.mode: "demo"`):
valida tudo e mostra a tela de confirmação, sem enviar para lugar nenhum.

Para receber os dados de verdade, aponte para um endpoint (planilha via
Apps Script, formulário serverless, API própria...):

```js
submit: {
  mode: "endpoint",
  endpoint: "https://SEU-ENDPOINT",   // recebe POST com JSON da inscrição
  successRedirect: ""                 // opcional: link de pagamento/WhatsApp após confirmar
}
```

---

## 🖼️ Termo de uso de imagem

O texto em `imageConsent` é **provisório** e deve ser **validado juridicamente
pela organização** antes da publicação. O consentimento é obrigatório para
concluir a inscrição e há estrutura pronta para uma versão destinada ao
responsável legal (menores de idade).

---

## 🗂️ Estrutura

```
index.html                 → estrutura e conteúdo (SEO, Open Graph)
assets/css/styles.css      → identidade visual, layout mobile-first, animações
assets/js/config.js        → ⭐ TODOS os dados editáveis do evento
assets/js/main.js          → interações (formulário, animações, menu)
assets/img/logo-domus.svg  → logo oficial (casinha DOMUS)
assets/img/favicon.svg     → ícone da aba
assets/img/og-domus.svg    → imagem de compartilhamento (WhatsApp/Instagram)
```

---

## 🎨 Identidade

- **Vinho profundo** (fundo, do convite original) · **creme** `#FFF6F1` (logo) · **dourado champanhe** (acentos de luz e celebração).
- Fontes: **Fredoka** (marca/acentos), **Fraunces** (títulos editoriais), **Inter** (texto).
- Todas as animações respeitam `prefers-reduced-motion` (acessibilidade).

---

## ♿ Acessibilidade & performance

- HTML semântico, um único `<h1>`, labels em todos os campos, foco visível, navegação por teclado.
- Animações via `transform`/`opacity`; imagens em SVG; sem bibliotecas pesadas.
- Áreas de toque confortáveis, `safe-area` para iPhones, sem rolagem horizontal.

---

## 🔭 Fases futuras (arquitetura pronta)

1. Lote 01 · pregadores velados ← **fase atual**
2. Revelação gradual dos pregadores
3. Lote 02 · 4. Lote 03 · 5. Últimas vagas
6. Contagem regressiva (estrutura de data já centralizada)

Nenhuma dessas fases usa urgência artificial — apenas dados reais quando existirem.
