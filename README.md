# 2R'S Seguros — site

Site estático (HTML + CSS + JS puros, sem build e sem dependências) da 2R'S Seguros, corretora de plano de saúde. Objetivo: gerar conversas no WhatsApp.

> Produção: https://2rsseguros.com.br (branch `main`, GitHub Pages). Pré-visualização: https://2rsseguros-prototipo.weebby.workers.dev (branch `prototipo`, Cloudflare). Ver [Publicação](#publicação). Itens em aberto: [PENDENCIAS.md](PENDENCIAS.md).

## Páginas

| URL | Para quê | `data-wa-page` | `data-wa-product` |
|---|---|---|---|
| `/` | Home: plano de saúde em geral, leva às duas landings | `home` | `saude-geral` |
| `/plano-de-saude-empresarial/` | Landing PME/MEI (grupo de anúncios empresarial) | `empresarial` | `saude-empresarial` |
| `/plano-de-saude-individual-familiar/` | Landing pessoa física (grupo individual/familiar) | `individual-familiar` | `saude-pf` |
| `/politica-de-privacidade/` | LGPD | `privacidade` | `saude-geral` |

```
index.html, */index.html   as 4 páginas
assets/css/site.css        todo o CSS (mobile-first; cores em :root)
assets/js/config.js        número, mensagens e horário do WhatsApp
assets/js/site.js          links de WhatsApp, dataLayer, indicador de horário, banner de cookies
assets/fonts/              Plus Jakarta Sans (400/600/800), auto-hospedada
assets/img/                logo (PNG para Open Graph, WebP no site)
_headers                   só Cloudflare: noindex da pré-visualização + cache (o GitHub Pages ignora)
wrangler.jsonc             só Cloudflare: configuração do Worker
.assetsignore              só Cloudflare: arquivos que o Worker não publica (README, PENDENCIAS, configs)
CNAME                      domínio do GitHub Pages — não apagar
```

## Rodar localmente

```bash
python3 -m http.server 8000      # na raiz do repositório
# abrir http://localhost:8000/
```

Os caminhos são absolutos (`/assets/...`), então o site precisa ser servido **na raiz** de um domínio — abrir o `index.html` direto do disco ou servir em subpasta quebra CSS e links.

## Publicação

Os dois branches têm **o mesmo código**; o que muda é onde cada um é publicado:

| | Produção | Pré-visualização |
|---|---|---|
| Branch | `main` | `prototipo` |
| Onde | GitHub Pages | Cloudflare Worker `2rsseguros-prototipo` |
| URL | https://2rsseguros.com.br | https://2rsseguros-prototipo.weebby.workers.dev |
| Google | indexa (sitemap + robots) | **não** indexa: o `_headers` manda `X-Robots-Tag: noindex` |

Fluxo para uma mudança:

```bash
git checkout prototipo        # editar, commitar
git push                      # Cloudflare publica em ~1 min → mostrar ao cliente
git checkout main             # depois da aprovação
git merge --ff-only prototipo
git push                      # GitHub Pages publica em ~1 min
git checkout prototipo
```

Não commite direto no `main`: o `--ff-only` exige que o `main` nunca fique à frente do `prototipo`.

Configuração do Worker no Cloudflare: branch de produção `prototipo`, build command vazio, deploy command `npx wrangler deploy`, root directory `/`; publica a raiz do repo (`"assets": { "directory": "./" }`) menos o que está no `.assetsignore`. **Não** adicione `2rsseguros.com.br` como domínio do Worker — e, se um dia a produção for para o Cloudflare, tire antes o bloco `X-Robots-Tag` do `_headers`.

No GitHub Pages, o `.nojekyll` faz os arquivos irem como estão; README e PENDENCIAS ficam acessíveis no domínio, mas o `robots.txt` bloqueia `*.md` para buscadores.

## Editar número, mensagens e horário

Tudo em [`assets/js/config.js`](assets/js/config.js):

- `whatsapp` / `whatsappDisplay` — número (só dígitos, com 55) e como aparece na tela;
- `messages` — mensagem pré-preenchida por produto (`saude-geral`, `saude-empresarial`, `saude-pf`, `viagem`, `auto`, `residencial`, `consorcio`);
- `hours` — horário por dia da semana (0 = domingo); dias ausentes = fechado. Feriados não são tratados;
- `statusText` — textos do indicador "dentro / fora do horário".

Os links no HTML já trazem um `href` completo, para funcionarem mesmo sem JavaScript; o `site.js` os reescreve a partir do `config.js` ao carregar. **Ao trocar o número ou uma mensagem, atualize também o HTML**: procure por `wa.me/5511983414948` nas 4 páginas.

Cabeçalho, rodapé, barra de WhatsApp e banner de cookies se repetem nas 4 páginas — uma mudança neles precisa ser feita em todas.

## Rastreamento (GTM `GTM-T7275CWD`)

O snippet do GTM está no `<head>` e no `<body>` das 4 páginas, precedido pelo **Consent Mode v2** (padrão `denied`).

### Eventos no `dataLayer`

**`whatsapp_click`** — em todo clique em link de WhatsApp (o link abre normalmente em nova aba):

```js
{ event: 'whatsapp_click', wa_location: 'hero', wa_page: 'empresarial', wa_product: 'saude-empresarial' }
```

| Chave | Valores |
|---|---|
| `wa_location` | `cabecalho`, `hero`, `flutuante` (botão fixo, desktop), `barra-mobile` (barra fixa, celular), `rodape`, `cta-final`, `politica` (texto da política de privacidade), ou o id da seção: `planos`, `para-quem`, `como-funciona`, `operadoras`, `por-que-2rs`, `quem-somos`, `duvidas` |
| `wa_page` | `home`, `empresarial`, `individual-familiar`, `privacidade` |
| `wa_product` | `saude-geral`, `saude-empresarial`, `saude-pf`, `viagem`, `auto`, `residencial`, `consorcio` |

Todo link de WhatsApp tem a classe `js-whatsapp` e os atributos `data-wa-location`, `data-wa-page` e `data-wa-product` — também dá para usar um gatilho de clique do GTM direto nesses atributos.

**`consent_update`** — quando o visitante responde ao banner de cookies:

```js
{ event: 'consent_update', consent_status: 'granted' }   // ou 'denied'
```

Junto, o site chama `gtag('consent', 'update', {...})` com `ad_storage`, `ad_user_data`, `ad_personalization` e `analytics_storage`. A escolha fica em `localStorage` (`2rs-consent`) e é reaplicada como padrão nas próximas visitas. "Preferências de cookies", no rodapé, reabre o banner.

### Configuração sugerida no GTM

1. Variáveis da camada de dados: `wa_location`, `wa_page`, `wa_product`.
2. Acionador: Evento personalizado `whatsapp_click`.
3. Tags: evento GA4 (ex.: `whatsapp_click` ou `generate_lead`, com os três parâmetros) e conversão do Google Ads com o mesmo acionador.
4. **Filtre por hostname** (`Page Hostname` igual a `2rsseguros.com.br`) nas tags de GA4 e Ads — senão as visitas à pré-visualização (`*.workers.dev`) e ao `localhost` entram nas métricas reais.
5. Nas configurações de consentimento das tags, use as verificações nativas do Consent Mode (Google Ads e GA4 já respeitam `ad_storage` / `analytics_storage`).

### CSP

As páginas têm uma Content-Security-Policy em `<meta>`. Ela já libera GTM, GA4 e Google Ads (`googleadservices.com`, `googleads.g.doubleclick.net`, `www.google.com`). Qualquer outra ferramenta adicionada pelo GTM (Meta Pixel, Hotjar, widget de avaliações etc.) será **bloqueada em silêncio** até o domínio ser incluído na CSP das 4 páginas — confira o console do navegador.
