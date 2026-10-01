# White Label Portfolio

Produtos web white label para prestadores de serviços locais.  
Customização rápida via variáveis CSS — troca logo, cores e textos em minutos.

## Demos

| Produto | Demo | Nicho |
|---------|------|-------|
| Landing Page | [Oficina](./oficina/) · [Salão](./salao/) · [Dentista](./dentista/) | Serviços locais |
| Cardápio Digital | [Bistrot Maison](./cardapio/) | Restaurantes & bares |
| Artista / Personalidade | [Sofia Vega](./artista/) | Criadores de conteúdo |
| Estúdio de Tatuagem | [Black Needle](./tatuagem/) | Estúdios |
| Templo Religioso | [Igreja Nova Aliança](./templo/) | Igrejas & comunidades |
| Currículo Pessoal | [Lucas Ferreira](./curriculo/) | Profissionais & devs |
| Loja em Geral | [Maison Goods](./loja/) | E-commerce local |
| Estúdio de Unhas | [Give Beauty](./give-beauty/) | Beleza & serviços |

## Funcionalidades

**Landing Page**
- Solicitação de agendamento com modal (tabs: agendar / contato)
- Formulário de contato via [EmailJS](https://emailjs.com) — sem backend
- Fallback automático para WhatsApp quando EmailJS não está configurado
- Design responsivo, estética europeia/minimalista

**Cardápio Digital**
- Filtro por categoria e busca em tempo real
- Tags: vegetariano, apimentado, novidade
- Galeria de fotos por prato — clique no item para ver mais fotos
- Carrinho de pedidos com controle de quantidade e campo de observações
- Envio do pedido formatado direto pelo WhatsApp — sem backend
- 100% estático, sem dependências externas

## Desenvolvimento e conteúdo

O site é estático. Para iniciar na raiz:

```bash
npm ci
npm run cms:setup
npm run dev
```

Para editar conteúdo pelo Decap, inicie `npm run cms:local` em outro terminal e acesse o caminho `/admin/` no navegador local. O modo local escreve no checkout e deve permanecer restrito à máquina de desenvolvimento.

- `content/site.json`: empresa, vitrine e configuração Plausible.
- `content/templates.json`: contatos e configuração comum dos modelos.
- `give-beauty/posts.json`: notícias públicas, compartilhadas entre visitantes.
- `npm run build`: gera o site publicável em `dist/`.
- `npm test`: regressões no Chromium, com conteúdo e serviços temporários.

A ativação do login do CMS e das métricas em produção exige configurar os serviços externos. Veja [CMS.md](CMS.md) e [ROADMAP.md](ROADMAP.md).

## Como customizar para um cliente

1. Escolha um modelo e atualize seus contatos em `content/templates.json` ou no CMS.
2. Atualize a cor de destaque no mesmo arquivo; ajustes de design específicos continuam no HTML/CSS do modelo.
3. Edite os conteúdos oferecidos no CMS. Os demais textos e produtos ainda são personalizados nos arquivos do modelo.
4. Substitua imagens de demonstração, endereço, horários e metadados do cliente.
5. Valide o site no celular, os links e o fluxo de contato antes da publicação.

Os templates usam configuração e estilos compartilhados. Ao copiar um produto para outro repositório, leve também os diretórios compartilhados e ajuste o catálogo para esse cliente.

## Configurar EmailJS (gratuito até 200 emails/mês)

1. Crie conta em [emailjs.com](https://emailjs.com)
2. Adicione um serviço de e-mail (Gmail, Outlook, etc.)
3. Crie dois templates: `template_agendamento` e `template_contato`
4. Informe a Public Key, o Service ID e os templates nos campos EmailJS do modelo em `content/templates.json` ou no CMS

## Estrutura

```
white-label-portfolio/
├── shared/
│   ├── base.css                  # CSS base (tipografia, layout, componentes)
│   ├── components.css            # Modal, formulários, botão flutuante
│   └── components.js             # Lógica do modal, EmailJS, fallback WhatsApp
├── oficina/index.html
├── salao/index.html
├── dentista/index.html
├── cardapio/index.html
├── artista/index.html
├── tatuagem/index.html
├── templo/index.html
├── curriculo/index.html
├── loja/index.html
├── instagram-legendas.txt        # Legendas prontas para Instagram (9 nichos)
├── whatsapp-mensagens.txt        # Mensagens prontas para prospecção via WhatsApp
└── GITHUB-GUIDE.md               # Guia de organização do repositório
```

## Contato

Interessado em um site para o seu negócio?  
📧 matheussumere@gmail.com · 📱 (19) 97807-5689
