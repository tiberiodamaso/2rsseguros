# Pendências do protótipo

Tudo que está provisório no site aparece com **sublinhado tracejado rosa** (classe `.placeholder`) ou com **borda tracejada** (`.placeholder-box`).

## Conteúdo — enviar ou revisar (sócias)

- [ ] **Fotos da Rita e da Renata** — formato retrato 4:5 (ex.: 800×1000 px). Hoje: silhueta em SVG, marcada com `<!-- FOTO: Rita -->` e `<!-- FOTO: Renata -->`.
- [ ] **Texto sobre cada sócia** — 2 ou 3 frases cada (trajetória, como atende). Hoje: rascunho genérico.
- [ ] **Texto de apresentação da 2R'S** ("Quem somos") — rascunho a revisar.
- [x] **Avaliações do Google** — 3 avaliações reais publicadas na íntegra, com primeiro nome e inicial do sobrenome.
- [ ] **Confirmar o link "Ver todas as avaliações no Google"** — hoje aponta para `https://www.google.com/maps?cid=13234988083665049014`, montado com o número informado, mas não consegui confirmar que abre o perfil (o número pode ser o "ID do perfil" do painel, que é diferente do `cid` do Maps). O mais seguro: no Google, abrir o perfil → **Compartilhar** ou **Pedir avaliações** e colar aqui o link curto (`g.page/r/...`). Ele fica em `index.html` e nas duas landings (procure por `maps?cid=`).
- [ ] **Logos das operadoras** — há espaço reservado em cada card. Pedir o kit oficial de marca de cada operadora (portal do corretor ou gerente comercial). Confirmar também se a lista está completa e correta.
- [ ] **Revisão do FAQ** — respostas genéricas sobre carência, coparticipação, MEI, vidas, portabilidade, hospital, adesão, reajuste, doença preexistente e sênior. Conferir cada uma.
- [x] **E-mail no rodapé** — `contato@2rsseguros.com.br` confirmado (montado por JS; o HTML não tem "@").
- [ ] **Interior de SP** — quais cidades/regiões citar.
- [x] **Política de privacidade** — texto padrão LGPD publicado (canal do titular: e-mail e WhatsApp). Recomendável uma revisão jurídica antes do lançamento.
- [x] **Grafia do nome** — "2R'S Seguros". As mensagens pré-preenchidas do WhatsApp mantêm o texto do briefing ("site da 2RS").
- [x] **Número do WhatsApp** — (11) 98341-4948 confirmado.
- [ ] Confirmar que a mensagem automática fora do horário está ativa no WhatsApp Business.

## Técnico — antes de ir para produção

- [ ] **Remover o `<meta name="robots" content="noindex, nofollow">`** das 4 páginas (há um comentário `PROTÓTIPO` logo acima de cada um).
- [ ] **Remover o bloco `X-Robots-Tag` do `_headers`** (ou o arquivo inteiro, se a produção continuar no GitHub Pages, que não lê `_headers`).
- [ ] Remover a **faixa "Protótipo para avaliação"** do topo das 4 páginas.
- [ ] Ao fazer o merge de `prototipo` no `main`: apagar `wrangler.jsonc` e `.assetsignore` se a produção continuar no GitHub Pages; manter o arquivo `CNAME`.
- [ ] Atualizar o `<lastmod>` do `sitemap.xml` e enviar o sitemap no Google Search Console.
- [ ] No GTM, filtrar as tags de GA4 e Google Ads por hostname `2rsseguros.com.br` (ver README) e criar a conversão de `whatsapp_click`.
- [ ] Se adicionar ferramentas além de Google (Meta Pixel, widget de avaliações etc.), incluir os domínios na CSP das 4 páginas.
- [ ] Opcional: imagem própria para compartilhamento (Open Graph 1200×630) — hoje usa o logo.
- [ ] Opcional: feriados no indicador de horário (hoje só dias da semana).
