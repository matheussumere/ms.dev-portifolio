# Conteúdo, publicação e métricas

O site continua estático. O Decap CMS edita arquivos versionados no GitHub; uma publicação do site disponibiliza esse conteúdo aos visitantes. O modo local foi preparado para desenvolvimento e não substitui autenticação em produção.

## Desenvolvimento

Na raiz do repositório, com Node.js e Python 3 disponíveis:

```bash
npm ci
npm run cms:setup
npm run dev
```

Para editar conteúdo localmente, mantenha outro terminal aberto na mesma raiz:

```bash
npm run cms:local
```

O site usa a porta 8000 e o proxy do CMS usa a porta 8081, ambos em loopback. Abra o caminho `/admin/` no seu navegador local e clique em **Entrar**. Esse modo não usa senha e escreve os arquivos do checkout; confira o diff antes de publicar. Nunca exponha o proxy local na Internet. O painel só ativa esse modo quando o hostname do navegador é localhost ou um endereço loopback.

O bundle do CMS é instalado de um pacote npm fixado em `scripts/cms-bundle.lock.json`, com SHA-512 verificado. Ele fica em `admin/vendor/`, ignorado pelo Git. Não é necessário liberar uma CDN para carregar o painel.

As prévias da vitrine são capturas dos próprios modelos. Com os requisitos de desenvolvimento disponíveis, `npm run previews` atualiza essas imagens; a captura bloqueia recursos externos para ser reproduzível. Para uma entrega comercial, você pode substituir as prévias pelo CMS após revisar o site com suas imagens e fontes definitivas.

## O que pode ser editado

| Tela do CMS | Arquivo e efeito |
| --- | --- |
| Empresa e vitrine | `content/site.json`: contatos da empresa, texto de apresentação, descrições, categorias, prévias e configuração Plausible |
| Contatos dos modelos | `content/templates.json`: WhatsApp, telefone, nome no cabeçalho dos modelos que exibem nome, destaque de cor e configurações públicas de EmailJS |
| Oficina | `oficina/data.json`: galeria, artigos, marcas e depoimentos |
| Artista | `artista/data.json`: portfólio, artigos e depoimentos |
| Dentista | `dentista/data.json`: dados consumidos pelo carregador existente |
| Give Beauty | `give-beauty/posts.json`: notícias visíveis para todos os visitantes |

Os IDs dos modelos são fixos porque correspondem a pastas reais. Acrescentar um modelo exige também criar sua página e registrá-lo na vitrine. Nos demais templates, os serviços, produtos e blocos de texto ainda mantêm a implementação original em HTML/JavaScript. Endereço e e-mail nos metadados dos modelos são dados disponíveis para as próximas migrações; não substituem automaticamente texto livre dentro de cada HTML. A padronização entregue cobre a configuração de contato, a vitrine e os conteúdos já carregados de JSON.

Os posts antigos do Give Beauty que algum navegador tenha salvo em `gb_posts` não são apagados nem enviados automaticamente. Antes de migrar conteúdo real, exporte esses posts nesse navegador e revise-os para importar pelo CMS. O novo painel não utiliza a antiga senha exposta no frontend.

## Publicação com Netlify e GitHub

O projeto inclui `netlify.toml`. A build `npm run build` produz `dist/`, contendo o site e o painel, sem `node_modules`, arquivos de ambiente ou ferramentas de desenvolvimento. O diretório de publicação é `dist`.

1. Conecte o repositório `matheussumere/ms.dev-portifolio`, branch `main`, a um site no Netlify e confirme as configurações de build.
2. Configure o provedor GitHub OAuth nas configurações de acesso do site no Netlify. O GitHub backend do Decap usa o serviço OAuth do Netlify por padrão. A aplicação OAuth do GitHub utiliza o callback `https://api.netlify.com/auth/done`.
3. Informe Client ID e Client Secret somente nas configurações seguras do provedor. Não coloque valores em HTML, JSON, Git ou chat.
4. Acesse `/admin/` no domínio publicado e entre com uma conta GitHub que tenha permissão de escrita no repositório. O backend configurado é GitHub, não Git Gateway.
5. Edite um texto, publique no CMS e confirme o commit, a build e o conteúdo no site público. A publicação do CMS escreve na branch `main`; as alterações passam a aparecer após o deploy.

Se usar outra hospedagem, configure um provedor OAuth compatível com o GitHub backend e seus campos `base_url`/`auth_endpoint` em `admin/config.yml`. Hospedagem estática sozinha não fornece esse serviço. Não há credenciais ou infraestrutura OAuth configuradas por este código.

Referências: [GitHub backend](https://decapcms.org/docs/github-backend/), [backend local](https://decapcms.org/docs/working-with-a-local-git-repository/), [OAuth no Netlify](https://docs.netlify.com/manage/security/secure-access-to-sites/oauth-provider-tokens/).

## Plausible

1. Cadastre o domínio público no Plausible.
2. Em **Empresa e vitrine → Métricas Plausible**, informe esse domínio e ative o envio. Para Plausible hospedado, mantenha `https://plausible.io/api/event`; para uma instalação própria, informe seu endpoint HTTPS.
3. Publique o conteúdo e confirme a recepção no dashboard. Se a rede for restrita, libere o hostname do endpoint configurado.
4. Cadastre objetivos por evento com os nomes abaixo para acompanhar o funil.

| Evento | Significado |
| --- | --- |
| `pageview` | A página carregou a configuração |
| `demo_view` | Uma demonstração foi aberta |
| `demo_open` | Clique para abrir uma demo na vitrine |
| `quote_intent` | Clique para pedir cotação ou escolher um modelo |
| `quote_whatsapp_click` | Formulário válido preparou a mensagem e tentou abrir o WhatsApp |
| `contact_click` | Clique em contato direto ou no link de continuação |

Os eventos são disponibilizados em `window.dataLayer` e em `msdev:analytics`, mesmo quando o envio remoto está desativado. O envio está **desativado por padrão** até existir um domínio configurado. O payload não contém nome, negócio, segmento digitado, observações, query string, referrer ou cookies. A URL enviada contém apenas origem e caminho. Como em qualquer requisição externa, o provedor recebe metadados de rede; revise a política de privacidade da empresa conforme os serviços ativados.

Um clique no WhatsApp não confirma envio de mensagem, recebimento do lead ou venda. Compare os eventos com os contatos realmente recebidos para avaliar conversão. Uma falha no analytics não interrompe o contato.

Referência: [Plausible Events API](https://plausible.io/docs/events-api).

## Validação

Com Chromium e os requisitos de desenvolvimento disponíveis:

```bash
python3 -m venv .venv
. .venv/bin/activate
python3 -m pip install -r requirements-dev.txt
python3 -m playwright install chromium
npm test
```

Se Chromium já estiver instalado no sistema, os testes o utilizam; `CHROMIUM_PATH` permite escolher outro executável. Os testes iniciam seus próprios servidores, usam conteúdo temporário, simulam o endpoint Plausible e interceptam o WhatsApp. Não enviam mensagens, não escrevem no checkout e não publicam no GitHub. Também exercitam uma edição real pelo Decap em um proxy local temporário.

Os recursos externos das demos (fontes, fotos, mapas e Instagram) devem ser conferidos no ambiente publicado. Os testes automáticos bloqueiam esses recursos para validar os fluxos locais sem depender da rede.
