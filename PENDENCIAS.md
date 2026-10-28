# Pendências

Site aprovado pelo cliente e publicado em produção (https://2rsseguros.com.br) em 2026-10-28.

## Técnico — fazer logo após o lançamento

- [ ] Enviar `https://2rsseguros.com.br/sitemap.xml` no Google Search Console.
- [ ] No GTM, filtrar as tags de GA4 e Google Ads por hostname `2rsseguros.com.br` (ver README) e criar a conversão de `whatsapp_click`.
- [ ] Se adicionar ferramentas além de Google (Meta Pixel, widget de avaliações etc.), incluir os domínios na CSP das 4 páginas.
- [ ] Opcional: imagem própria para compartilhamento (Open Graph 1200×630) — hoje usa o logo.
- [ ] Opcional: feriados no indicador de horário (hoje só dias da semana).

## Conteúdo — pendente com o cliente

- [ ] Confirmar se a lista de operadoras está completa e correta.
- [ ] **Arquivo original do logo em círculo** — o site usa um recorte da imagem enviada (598 px, de uma captura de tela). Para máxima nitidez, enviar o arquivo original (SVG ou PNG ≥ 1000 px) e substituir `assets/img/logo-circulo.png`, `logo-circulo-144.webp` e `favicon.png`.
- [ ] Confirmar que a mensagem automática fora do horário está ativa no WhatsApp Business.
- [ ] Recomendável: revisão jurídica da política de privacidade (texto padrão LGPD; canal do titular: e-mail e WhatsApp).

## Decisões registradas

- **Imagem institucional** — o site fala como empresa/equipe: sem fotos, nomes ou menções às sócias, sem "atendimento online" e sem cidades ou regiões (as regiões servem só para a segmentação no Google Ads; a landing empresarial diz "todo o Brasil").
- **Plano individual** — só é comercializado em SP, mas o site não cita região; isso fica na segmentação geográfica da campanha individual/familiar.
- **Avaliações do Google** — 3 avaliações reais publicadas na íntegra (primeiro nome e inicial do sobrenome), com link para o perfil (`https://share.google/1SWVw5Mm33m8Inv43`). Elas citam a Rita pelo nome e foram mantidas como estão — editar uma avaliação real a falsearia. Se o cliente preferir, trocar por outras do perfil que não citem nomes.
- **Textos** — Quem somos, Missão/Visão/Valores e FAQ aprovados no lançamento.
- **Logos das operadoras** — obtidos dos sites oficiais (`assets/img/operadoras/`). Alice em versão monocromática escura (o original é branco); SulAmérica recortada da versão "130 anos"; Bradesco usa o logo "bradesco seguros" do portal oficial. Se alguma operadora fornecer o kit de marca, basta substituir o arquivo de mesmo nome.
- **Ilustrações dos heros** (`hero-empresa.webp`, `hero-familia.webp`) — imagens do Canva, com licença.
- **Contato** — WhatsApp (11) 98341-4948; e-mail `contato@2rsseguros.com.br` (montado por JS; o HTML não tem "@"). Grafia "2R'S Seguros"; as mensagens pré-preenchidas do WhatsApp mantêm "site da 2RS".
- **Arquivos do Cloudflare** (`_headers`, `wrangler.jsonc`, `.assetsignore`) ficam no repositório nos dois branches: só a pré-visualização os usa, o GitHub Pages os ignora. Manter o `CNAME`.
