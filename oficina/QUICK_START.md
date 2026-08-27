# 🚀 Quick Start - Müller Auto

## ⚡ Em 5 Minutos

### 1. Abrir o Site
```bash
# Opção 1: Abrir arquivo diretamente
Clicar em: c:\Users\SEMEQ\white-label-portifolio\oficina\index.html

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

### 3. Testar Formulário de Orçamento
```bash
1. Clicar em "Solicitar Orçamento" (hero ou nav)
2. Preencher formulário de orçamento
3. Submeter → WhatsApp deve abrir com mensagem
```

### 4. Testar WhatsApp Button
```bash
1. Scroll até final da página
2. Clicar no botão verde #25d366 (canto inferior direito)
3. WhatsApp deve abrir em nova aba
```

---

## 📝 Personalizar para Seu Cliente

### Mudar Número de WhatsApp
Arquivo: `index.html`
```javascript
Procurar: window.WL_CONFIG = {
Substituir: whatsapp: '5511999999999'
Por: whatsapp: 'SEU_NUMERO_AQUI'
```

### Mudar Endereço & Horário
Arquivo: `index.html`
```html
Procurar: "Rua das Indústrias, 142"
Substituir por: "Seu endereço"

Procurar: "Segunda a Sexta: 8h - 18h"
Substituir por: "Seus horários"
```

### Adicionar Projetos à Galeria
Arquivo: `data.json`
```json
{
  "id": 7,
  "title": "Novo Projeto",
  "brand": "Brand da Moto",
  "description": "Descrição",
  "service": "Tipo de serviço",
  "image": "URL da imagem"
}
```

### Adicionar Artigo de Blog
Arquivo: `data.json`
```json
{
  "id": 4,
  "title": "Novo Artigo",
  "category": "Categoria",
  "excerpt": "Resumo",
  "content": "Conteúdo completo",
  "readTime": "X min",
  "date": "2026-08-27"
}
```

---

## 🎯 Funcionalidades Principais

### ✅ Funcionando:
- [x] Navegação responsiva
- [x] Especialização em marcas
- [x] Galeria de projetos
- [x] Programa de fidelidade
- [x] Formulário de orçamento
- [x] Garantias destacadas
- [x] Blog/Dicas
- [x] Mapa Google
- [x] WhatsApp button
- [x] SEO + Schema

### 🧪 Testar:
1. [ ] Mobile responsividade
2. [ ] Formulário de orçamento
3. [ ] WhatsApp integration
4. [ ] Lazy loading de imagens
5. [ ] Mapa embarcado

---

## 📊 Estrutura de Dados

### Portfolio (data.json)
```
6 projetos com:
- Marca e modelo
- Serviço realizado
- Duração
- Imagem
```

### Blog (data.json)
```
3 artigos com:
- Título e categoria
- Conteúdo completo
- Tempo de leitura
- Data
```

### Brands (data.json)
```
6 marcas de motos com:
- Modelos principais
- Especialidade
- Ícone
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
✅ Solução: Substituir por URLs proprias ou CDN

❌ Problema: CORS error
✅ Solução: Usar servidor local (Live Server) ao invés de file://
```

### Formulário não funciona
```
❌ Problema: data.json não encontrado
✅ Solução: Colocar data.json no mesmo diretório

❌ Problema: JavaScript desabilitado
✅ Solução: Ativar JavaScript no navegador (Settings)
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
3. Selecionar iPad (768 width)
4. Verificar: 2 colunas, galeria responsiva
```

### Desktop (1920x1080)
```
1. F12 → Close (Esc)
2. Maximizar janela do navegador
3. Verificar: layout completo, 3+ colunas
```

---

## 🔗 Links Rápidos

| Arquivo | Descrição |
|---------|-----------|
| `index.html` | Página principal |
| `data.json` | Dados (portfolio, blog, marcas) |
| `README.md` | Documentação completa |
| `MELHORIAS_IMPLEMENTADAS.md` | Detalhes das melhorias |
| `test-responsiveness.html` | Guia de testes |

---

## 🎯 Próximos Passos

### Configuração Inicial
1. [ ] Personalizar número WhatsApp
2. [ ] Adicionar endereço/telefone corretos
3. [ ] Adicionar horário de funcionamento
4. [ ] Substituir imagens por fotos reais

### Dados
5. [ ] Adicionar projetos reais à galeria
6. [ ] Escrever artigos de blog
7. [ ] Adicionar depoimentos reais
8. [ ] Atualizar estatísticas ("25 anos", "4.8k clientes", etc)

### Deploy
9. [ ] Testar em servidor (não file://)
10. [ ] Submeter ao Google Search Console
11. [ ] Configurar Google Analytics
12. [ ] Monitorar performance

---

## 📊 Métricas

### Esperadas Após 1 Mês
- 10-20 visitantes/dia
- 2-5 leads via formulário/WhatsApp
- +500 impressões no Google

### Esperadas Após 3 Meses
- 50-100 visitantes/dia
- 10-20 leads/semana
- Ranking em keywords locais (ex: "mecânica motos São Paulo")

---

## 💡 Dicas Pro

### 1. Use Analytics
```
Google Analytics → Monitorar visitantes, bounce rate, leads
```

### 2. Atualize Blog Regularmente
```
1 artigo/mês → Sinal ao Google de site ativo
```

### 3. Crie Conteúdo Local
```
"Oficina de motos em São Paulo" → Melhor SEO local
```

### 4. Responda Rapidamente
```
Cliente envia orçamento via WhatsApp → Responder em < 1 hora
```

### 5. Colete Reviews
```
Google Reviews/Facebook → Social Proof → Mais leads
```

---

## 🎓 Aprender Mais

- [MDN - Responsive Design](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design)
- [Google - Mobile-Friendly Test](https://search.google.com/test/mobile-friendly)
- [Schema.org - LocalBusiness](https://schema.org/LocalBusiness)
- [WhatsApp - Click to Chat](https://www.whatsapp.com/business/api/web/)

---

**Status:** ✅ Pronto para usar  
**Tempo de Setup:** 5-10 minutos  
**Dificuldade:** Fácil  
**Suporte:** Ver README.md
