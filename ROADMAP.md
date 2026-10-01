# Evolução do portfólio ms.dev

## Entregue no código

- Cotação com validação, modelo de referência, mensagem contextualizada e link de continuação caso o popup não abra.
- Correções da busca do cardápio: limpar o texto, trocar de categoria e restaurar os itens. Escape funciona nas páginas sem modal compartilhado.
- Vitrine com dez prévias, filtros por segmento, detalhes e CTA por modelo; o Give Beauty também está acessível pela vitrine.
- Etapas da contratação, prazo condicionado ao escopo e conteúdo, e descrição das solicitações de agendamento sem prometer confirmação automática.
- Eventos de visita, interesse e contato com integração Plausible configurável, sem dados do formulário no payload.
- Configuração compartilhada de contatos e destaque visual das demos. Conteúdo da vitrine centralizado em JSON.
- Decap CMS local, edição de conteúdos já consumidos por JSON e notícias do Give Beauty compartilhadas entre navegadores.
- Build estática, configuração Netlify e testes de regressão no navegador.
- Renovação visual das 11 páginas, fontes locais, menus móveis, temas independentes e controles de toque maiores. Consulte `DESIGN.md`.

## Ativação em produção

- Definir o domínio e conectar a hospedagem ao repositório.
- Configurar OAuth do GitHub para o Decap e verificar permissão de edição.
- Configurar o domínio Plausible, objetivos de eventos e confirmar recepção de métricas.
- Revisar contatos, preços, imagens e conteúdo de demonstração antes de entregar sites a clientes.
- Conferir a disponibilidade das fotos externas na hospedagem; as fontes já são locais.

Esses passos exigem contas e configurações externas e não estão concluídos apenas porque o código foi preparado. Consulte `CMS.md` para os comandos e a ativação.

## Próxima padronização

Migrar progressivamente os serviços, produtos e textos ainda escritos em cada HTML para dados estruturados. Começar pelo segmento mais contratado, preservar o design de cada modelo e validar a leitura do novo conteúdo antes de expô-lo no CMS. Preços e condições comerciais também podem passar a um catálogo único quando seus pacotes estiverem definidos.

## Escolher a próxima integração com dados reais

Registre nos contatos recebidos quais tarefas os clientes precisam resolver, seu volume e o valor que aceitariam pagar por essa solução. Use a origem da demo e o tipo de serviço dos eventos como indicação de interesse; confirme a demanda conversando com os clientes.

| Demanda recorrente | Próxima integração candidata | Evidência a buscar |
| --- | --- | --- |
| Organizar horários e reduzir conflitos | Agenda com disponibilidade e confirmação | Clientes precisam reservar horários reais, não apenas enviar solicitações |
| Acompanhar pedidos de restaurantes | Gestão de pedidos e status | Volume e operação excedem o atendimento manual no WhatsApp |
| Cobrar compras online | Checkout, estoque e frete real | Clientes precisam concluir e pagar a compra pelo site |
| Centralizar acompanhamento comercial | CRM de contatos | Leads ficam sem resposta ou sem acompanhamento |

Priorize uma integração com demanda confirmada, definindo custo do provedor, responsabilidades e critério de sucesso antes da implementação. Não adicionar pagamentos, agenda ou estoque apenas para ampliar a lista de funcionalidades.
