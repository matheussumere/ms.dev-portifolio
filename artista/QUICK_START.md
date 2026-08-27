# 🎨 Quick Start - Estúdio de Artes

## ⚡ Em 5 Minutos

### 1. Abrir o Site
```bash
# Opção 1: Abrir arquivo diretamente
Clicar em: c:\Users\SEMEQ\white-label-portifolio\artista\index.html

# Opção 2: Via navegador
Chrome → Ctrl+O → Selecionar index.html

# Opção 3: Via Live Server (VS Code)
Right-click em index.html → Open with Live Server
```

### 2. Testar em Mobile
```bash
Abrir DevTools: F12
Device Toolbar: Ctrl+Shift+M
Selecionar: iPhone/iPad/Android
```

### 3. Testar Formulário
```bash
1. Scroll até seção "Localização & Contato"
2. Preencher formulário (nome, email, projeto, mensagem)
3. Clicar em "Solicitar Orçamento via WhatsApp"
4. WhatsApp deve abrir com mensagem
```

### 4. Testar WhatsApp Button
```bash
1. Encontrar botão verde no canto inferior direito
2. Clicar para testar
3. WhatsApp deve abrir em nova aba
```

---

## 📝 Personalizar para Seu Negócio

### Mudar Número de WhatsApp
Arquivo: `index.html`
```javascript
Procurar: window.WL_CONFIG = {
Substituir: whatsapp: '5511999999999'
Por: whatsapp: 'SEU_NUMERO_AQUI'
```

### Mudar Dados Básicos
Arquivo: `index.html`
```html
Procurar:
- "Rua das Artes, 256" → Seu endereço
- "(11) 99999-9999" → Seu telefone
- "contato@estudioartes.com" → Seu email
- "São Paulo, SP" → Sua localidade
```

### Adicionar Obra ao Portfólio
Arquivo: `data.json`
```json
{
  "id": 13,
  "title": "Nome da obra",
  "category": "Tipo (Pintura/Escultura/Mural)",
  "description": "Descrição breve",
  "image": "https://url-da-imagem.com/imagem.jpg",
  "year": 2026,
  "medium": "Técnica (Acrílica, Óleo, etc)",
  "dimensions": "100 x 150 cm"
}
```

### Adicionar Artigo ao Blog
Arquivo: `data.json`
```json
{
  "id": 4,
  "title": "Título do artigo",
  "category": "Categoria",
  "excerpt": "Resumo breve",
  "content": "Conteúdo completo do artigo",
  "readTime": "8 min",
  "date": "2026-08-27",
  "author": "Seu Nome",
  "image": "https://url-da-imagem.com/imagem.jpg"
}
```

### Adicionar Testimonial
Arquivo: `data.json`
```json
{
  "id": 4,
  "text": "Citação do cliente",
  "author": "Nome do Cliente",
  "work": "Tipo de trabalho",
  "rating": 5
}
```

---

## 🎯 Funcionalidades Principais

### ✅ Funcionando:
- [x] Navegação responsiva
- [x] Portfólio de 12 obras
- [x] Galeria de fotos
- [x] Serviços (6 tipos)
- [x] Blog com 3 artigos
- [x] Formulário de orçamento
- [x] Testimoniais (3 clientes)
- [x] WhatsApp button
- [x] Mapa Google
- [x] SEO + Schema

### 🧪 Testar:
1. [ ] Mobile responsividade
2. [ ] Formulário de orçamento
3. [ ] WhatsApp integration
4. [ ] Lazy loading de imagens
5. [ ] Mapa embarcado
6. [ ] Seções todas carregando

---

## 📊 Estrutura de Dados

### Portfolio (data.json)
```
12 obras com:
- Título e categoria
- Descrição
- Técnica (medium)
- Dimensões
- Imagem
- Ano
```

### Blog (data.json)
```
3 artigos com:
- Título e categoria
- Descrição curta (excerpt)
- Conteúdo completo
- Tempo de leitura
- Data
- Autor
- Imagem
```

### Testimonials (data.json)
```
3 reviews com:
- Texto/citação
- Nome do cliente
- Tipo de trabalho
- Rating (1-5 estrelas)
```

---

## 🔍 Verificar Se Está Tudo Certo

### Checklist
```bash
✓ Arquivo index.html abre sem erros
✓ CSS carrega corretamente (cores visíveis)
✓ Imagens aparecem (ou placeholders)
✓ Navegação funciona (links não quebrados)
✓ Console limpo (F12 → sem erros críticos)
✓ Responsivo em mobile (F12 → Device Toolbar)
✓ Formulário de orçamento abre
✓ WhatsApp button funciona
✓ Portfólio carrega com 12 obras
✓ Blog carrega com 3 artigos
```

---

## 🆘 Problemas Comuns

### WhatsApp não abre
```
❌ Problema: Número de telefone incorreto
✅ Solução: Editar window.WL_CONFIG.whatsapp

❌ Problema: Popup bloqueado
✅ Solução: Permitir popups no navegador
```

### Imagens não carregam
```
❌ Problema: URLs do Unsplash bloqueadas
✅ Solução: Substituir por URLs próprias

❌ Problema: CORS error
✅ Solução: Usar servidor local (Live Server) ao invés de file://
```

### Formulário não funciona
```
❌ Problema: data.json não encontrado
✅ Solução: Colocar data.json no mesmo diretório que index.html

❌ Problema: JavaScript desabilitado
✅ Solução: Ativar JavaScript no navegador
```

### Dados não aparecem
```
❌ Problema: data.json com erro de sintaxe
✅ Solução: Validar JSON em https://jsonlint.com

❌ Problema: Arquivo data.json movido
✅ Solução: Garantir que data.json está no mesmo diretório
```

---

## 📱 Testar em Diferentes Devices

### iPhone (375x667)
```
1. F12
2. Ctrl+Shift+M
3. Selecionar iPhone 12/13/14
4. Verificar: 1 coluna, hamburger menu, botões grandes
```

### iPad (768x1024)
```
1. F12
2. Ctrl+Shift+M
3. Selecionar iPad
4. Verificar: 2 colunas, portfólio responsivo
```

### Desktop (1920x1080)
```
1. F12 → Close (Esc)
2. Maximizar janela do navegador
3. Verificar: layout completo, 3 colunas, grid completo
```

---

## 🔗 Links Importantes

| Arquivo | Descrição |
|---------|-----------|
| `index.html` | Página principal |
| `data.json` | Dados (portfólio, blog, reviews) |
| `LEIA_PRIMEIRO.txt` | Instruções iniciais |
| `QUICK_START.md` | Este guia |

---

## 🎯 Próximos Passos

### Configuração Inicial
1. [ ] Personalizar número WhatsApp
2. [ ] Adicionar dados corretos (endereço/telefone/email)
3. [ ] Reescrever seção "Sobre o Artista"
4. [ ] Substituir imagens por fotos reais

### Dados
5. [ ] Adicionar portfólio real (suas obras)
6. [ ] Escrever artigos de blog
7. [ ] Adicionar testimoniais reais
8. [ ] Atualizar links de redes sociais

### Deploy
9. [ ] Testar em servidor (não file://)
10. [ ] Submeter ao Google Search Console
11. [ ] Configurar Google Analytics
12. [ ] Monitorar performance

---

## 📊 Métricas Esperadas

### Após 1 Mês
- 15-30 visitantes/dia
- 2-5 contatos via formulário/WhatsApp
- +300 impressões no Google

### Após 3 Meses
- 50-100 visitantes/dia
- 5-10 leads/semana
- Ranking em keywords locais (ex: "artista plástico São Paulo")

### Após 6 Meses
- 100-200 visitantes/dia
- 10-20 leads/semana
- Featured snippets no Google
- Presença forte em buscas locais

---

## 💡 Dicas Pro

### 1. Atualize Portfólio Regularmente
```
Nova obra/mês → Sinal ao Google de site ativo
```

### 2. Escreva Blog Posts
```
1 artigo/mês → Mais tráfego orgânico
```

### 3. Otimize Imagens
```
Redimensionar → Converter JPG para WebP → Melhor performance
```

### 4. Coletar Reviews
```
Google Reviews/Facebook → Social Proof → Mais leads
```

### 5. Link Building
```
Instagram/Facebook → Link para site
Diretórios de artistas → Backlinks
```

---

## 🎓 Recursos para Aprender Mais

- [MDN - Responsive Design](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design)
- [Google - Mobile-Friendly Test](https://search.google.com/test/mobile-friendly)
- [Schema.org - LocalBusiness](https://schema.org/LocalBusiness)
- [JSON Validator](https://jsonlint.com)
- [Unsplash - Imagens grátis](https://unsplash.com)

---

**Status:** ✅ Pronto para usar  
**Tempo de Setup:** 5-10 minutos  
**Dificuldade:** Fácil  
**Suporte:** Ver LEIA_PRIMEIRO.txt

