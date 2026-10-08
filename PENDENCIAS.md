# Pendências do protótipo

Tudo que está provisório no site aparece com **sublinhado tracejado rosa** (classe `.placeholder`) ou com **borda tracejada** (`.placeholder-box`).

## Conteúdo — enviar ou revisar (sócias)

- [ ] **Fotos da Rita e da Renata** — formato retrato 4:5 (ex.: 800×1000 px). Hoje: silhueta em SVG, marcada com `<!-- FOTO: Rita -->` e `<!-- FOTO: Renata -->`.
- [ ] **Texto sobre cada sócia** — 2 ou 3 frases cada (trajetória, como atende). Hoje: rascunho genérico.
- [ ] **Texto de apresentação da 2R's** ("Quem somos") — rascunho a revisar.
- [ ] **Avaliações do Google Business Profile** — 3 avaliações reais (texto + primeiro nome, com autorização) ou definir um widget.
- [ ] **Link "Ver avaliações no Google"** — URL do perfil no Google (hoje aponta para `#`).
- [ ] **Logos das operadoras** — há espaço reservado em cada card. Confirmar também se a lista está completa e correta.
- [ ] **Revisão do FAQ** — respostas genéricas sobre carência, coparticipação, MEI, vidas, portabilidade, hospital, adesão, reajuste, doença preexistente e sênior. Conferir cada uma.
- [ ] **E-mail no rodapé** — confirmar se `contato@2rsseguros.com.br` deve aparecer (e se a caixa é lida).
- [ ] **Interior de SP** — quais cidades/regiões citar.
- [ ] **Política de privacidade** — texto provisório; idealmente revisado por alguém de jurídico/LGPD. Definir o canal para pedidos de titulares (hoje: WhatsApp).
- [ ] **Grafia do nome** — o site usa "2R's Seguros" (como no logo); confirmar.
- [ ] **Número do WhatsApp** — confirmar que (11) 98341-4948 é o WhatsApp Business da Rita e que a mensagem automática fora do horário está ativa.

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
