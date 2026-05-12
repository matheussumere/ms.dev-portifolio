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

## Funcionalidades

**Landing Page**
- Agendamento online com modal (tabs: agendar / contato)
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

## Como customizar para um cliente

1. Copie a pasta do produto (`oficina/`, `salao/`, `cardapio/`, etc.)
2. Edite as variáveis de cor no `<style>` do HTML:
```css
--color-primary: #1c1c1c;
--color-accent:  #c0392b;
--color-bg:      #f8f7f5;
```
3. Para landing pages, atualize o `WL_CONFIG` com os dados do cliente:
```js
window.WL_CONFIG = {
  emailjs_public_key: 'CHAVE_DO_CLIENTE',
  emailjs_service_id: 'service_xxx',
  emailjs_schedule_template: 'template_agendamento',
  emailjs_contact_template: 'template_contato',
  business_name: 'Nome do Negócio',
  whatsapp: '5511999999999',
};
```
4. Para o cardápio, troque o número no topo do script:
```js
const WHATSAPP_NUMBER = '5511999999999';
```
5. Substitua textos, endereço e telefone no HTML

## Configurar EmailJS (gratuito até 200 emails/mês)

1. Crie conta em [emailjs.com](https://emailjs.com)
2. Adicione um serviço de e-mail (Gmail, Outlook, etc.)
3. Crie dois templates: `template_agendamento` e `template_contato`
4. Copie a Public Key e o Service ID para o `WL_CONFIG`

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
