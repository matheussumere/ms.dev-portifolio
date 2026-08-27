# Müller Auto - Oficina Mecânica Especializada em Motos

## 🎯 Visão Geral

Site profissional para oficina mecânica especializada em motos com foco em diferenciação de mercado. Implementado com HTML5, CSS3 e JavaScript vanilla (sem dependências externas).

## 📋 Estrutura do Projeto

```
oficina/
├── index.html                    # Página principal (48KB)
├── data.json                     # Dados de portfólio, blog e marcas
├── README.md                     # Este arquivo
├── test-responsiveness.html      # Guia de testes
│
├── JavaScript
│   ├── quote-handler.js          # Gestão de formulário de orçamento
│   ├── dynamic-content.js        # Carregamento dinâmico do data.json
│   └── lazy-loading.js           # Otimização de imagens (lazy loading)
│
└── CSS
    └── images-optimization.css   # Estilos para otimização de imagens
```

## ✨ Recursos Implementados

### 1. **Especialização em Marcas de Motos** 🏍️
- 6 marcas principais: Honda, Yamaha, Harley-Davidson, Suzuki, Kawasaki, Custom
- Lista de modelos específicos por marca
- Cards com hover effect e animações
- Grid responsivo (6 → 3 → 1 coluna)

### 2. **Galeria Antes & Depois** 📸
- 6 projetos reais com imagens
- Overlay interativo com informações do serviço
- Efeito zoom no hover
- Lazy loading para performance

### 3. **Programa de Fidelidade** 🎁
- 4 níveis de desconto (5% → 20%)
- Gradiente visual atrativo
- Texto motivacional
- Responsive em todos os devices

### 4. **Orçamento Online** 📝
- Formulário aprimorado com campos contextualizados:
  - Nome e telefone
  - Marca e modelo da moto
  - Descrição detalhada do problema
  - Nível de urgência (3 opções)
- Integração WhatsApp com mensagem formatada
- Sugestão automática de modelos por marca

### 5. **Garantias & Transparência** ✓
- 6 pontos principais:
  - Garantia de 3 meses em peças
  - Transparência total (fotos via WhatsApp)
  - Orçamento sem surpresas
  - Peças originais ou primeira linha
  - Prazos cumpridos
  - Diagnóstico grátis
- Cards com animação de hover

### 6. **Blog/Dicas** 📚
- 3 artigos iniciais (Manutenção, Rotina, Diagnóstico)
- Categorias por tipo de conteúdo
- Tempo de leitura estimado
- Carregamento dinâmico do data.json
- Estrutura pronta para expansão

### 7. **Localização & Mapa** 🗺️
- Google Maps embarcado e responsivo
- Informações de contato completas
- Horário de funcionamento
- Links diretos para WhatsApp e telefone
- Layout 2 colunas em desktop, 1 em mobile

### 8. **Badges & Certificações** 🏆
- 4 badges principais:
  - Distribuidor Autorizado Honda
  - Certificação 4.8/5 (1.200+ avaliações)
  - Diagnóstico Eletrônico OBD
  - Registro Técnico Especializado
- Ícones em emoji para fácil identificação

### 9. **WhatsApp Button Flutuante** 💬
- Posição fixa inferior direita
- Cor verde oficial WhatsApp (#25d366)
- Animação de hover (scale)
- Mensagem pré-formatada contextualizada
- Funcional em mobile

### 10. **SEO & Performance** ⚡
- Meta tags completas (description, keywords, OG)
- Schema Markup JSON-LD:
  - AutoRepair schema (tipo de negócio)
  - LocalBusiness schema (informações locais)
- Lazy loading nativo com Intersection Observer
- Blur placeholder effect
- Preload de imagens críticas
- Responsive images com srcset
- Alt text em todas as imagens

## 🚀 Como Usar

### Abrir o Site
```bash
# Abrir index.html no navegador
# Chrome: Ctrl+O ou File > Open File
# Firefox: Ctrl+O ou File > Open File
```

### Testar no Mobile
```bash
# Pressionar F12 para abrir DevTools
# Clicar em Device Toolbar (Ctrl+Shift+M)
# Selecionar iPhone/iPad/Android para testar
```

### Configurar WhatsApp
Editar o número no arquivo `index.html`:
```html
window.WL_CONFIG = {
  whatsapp: '5511999999999'  // Seu número aqui
}
```

### Atualizar Dados
Editar `data.json` para adicionar/modificar:
- Portfolio de projetos
- Artigos de blog
- Marcas de motos
- Depoimentos de clientes

## 📊 Dados Mockup

### Portfolio (6 projetos)
```json
{
  "id": 1,
  "title": "Honda CB 500",
  "brand": "Honda",
  "service": "Corrente & Pinhão",
  "duration": "4 horas",
  "satisfaction": 5
}
```

### Blog (3 artigos)
```json
{
  "id": 1,
  "title": "5 Sinais que Sua Corrente Precisa de Revisão",
  "category": "Manutenção",
  "readTime": "10 min",
  "content": "..."
}
```

### Brands (6 marcas)
```json
{
  "name": "Honda",
  "models": ["CB 500F", "CB 500X", ...],
  "specialty": "Bikes de rua e trails"
}
```

## 🎨 Paleta de Cores

```css
--color-primary: #1c1c1c    /* Preto principal */
--color-accent: #c0392b     /* Vermelho (CTA) */
--color-bg: #f0eeeb         /* Bege claro */
--color-surface: #ffffff    /* Branco */
--color-border: #ddd9d3     /* Cinza border */
--color-muted: #6b6560      /* Cinza texto */
```

## 📱 Breakpoints Responsivos

```css
Desktop:  1920px+ (3+ colunas)
Tablet:   768px - 1199px (2 colunas)
Mobile:   < 768px (1 coluna)
```

## ✅ Checklist de Testes

Veja `test-responsiveness.html` para guia completo de testes.

### Testes Essenciais
- [ ] Abrir em mobile (375px)
- [ ] Abrir em tablet (768px)
- [ ] Abrir em desktop (1920px)
- [ ] Testar navegação hamburger
- [ ] Testar formulário de orçamento
- [ ] Testar botão WhatsApp flutuante
- [ ] Verificar loading de imagens
- [ ] Verificar console (sem erros)

## 🔧 Personalizações para Seu Cliente

### 1. Informações de Contato
```html
<!-- Editar em múltiplos locais: -->
Rua das Indústrias, 142
(11) 99999-9999
https://wa.me/5511999999999
```

### 2. Horário de Funcionamento
```html
Segunda a Sexta: 8h - 18h
Sábado: 8h - 14h
Domingo: Fechado
```

### 3. Estatísticas
```json
{
  "years": "25+",
  "clients": "4.8k",
  "satisfaction": "98%",
  "technicians": "12"
}
```

### 4. Imagens
Substituir URLs do Unsplash por fotos reais:
- Hero background
- Sobre (mecânico/oficina)
- Galeria (projetos reais)
- Blog (ilustrações)

## 🌐 SEO Otimização

### Schema Markup Incluído
- ✓ LocalBusiness (endereço, telefone, horário)
- ✓ AutoRepair (tipo de negócio)
- ✓ AggregateRating (avaliações)
- ✓ Service Area (localização)

### Meta Tags Incluídas
- ✓ Description (158 caracteres)
- ✓ Keywords (relevantes para motos)
- ✓ OG Tags (para social media)
- ✓ Viewport (responsivo)

### Melhorias Recomendadas
1. Adicionar Google Analytics
2. Submeter sitemap.xml ao Google Search Console
3. Adicionar página de blog completa
4. Criar conteúdo de FAQ
5. Adicionar reviews do Google/Facebook

## ⚡ Performance

### Otimizações Implementadas
- ✓ Lazy loading com Intersection Observer
- ✓ Blur placeholder effect
- ✓ Preload de imagens críticas
- ✓ Responsive images com srcset
- ✓ CSS inline (sem render blocking)
- ✓ JavaScript assíncrono no final

### Tempo de Carregamento Esperado
- First Paint: < 1s
- Largest Contentful Paint: < 2.5s
- Cumulative Layout Shift: < 0.1

## 🐛 Troubleshooting

### WhatsApp não abre
- Verificar número de telefone em `window.WL_CONFIG`
- Testar link em `https://wa.me/5511999999999`
- Verificar permissões de popup do navegador

### Imagens não carregam
- Verificar URLs (devem ser HTTPS)
- Testar em aba privada (incognito)
- Verificar conexão de internet

### Formulário não funciona
- Abrir console (F12) para ver erros
- Verificar se data.json está no mesmo diretório
- Testar em servidor local (não file://)

### Modal não abre
- Verificar atributo `data-modal-open` nos botões
- Testar em console: `document.getElementById('modal-overlay')`

## 📞 Suporte

Para dúvidas ou problemas:
1. Verificar console (F12) para erros
2. Testar em navegador diferente
3. Limpar cache (Ctrl+Shift+Delete)
4. Testar em servidor local

## 📄 Licença

Arquivo: Copyright © 2026 Müller Auto. Todos os direitos reservados.

---

**Versão:** 1.0  
**Última Atualização:** 27/08/2026  
**Compatibilidade:** Chrome, Firefox, Safari, Edge (últimas 2 versões)
