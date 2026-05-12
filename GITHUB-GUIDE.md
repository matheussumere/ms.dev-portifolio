# Guia GitHub — Portfólio White Label

## 1. Estrutura de repositórios

Use **um repositório por produto**, não um repositório gigante com tudo.

```
github.com/seu-usuario/
├── white-label-landing-page     ← template base (público, portfólio)
├── white-label-agendamento      ← próximo produto
└── white-label-cardapio         ← próximo produto
```

O repositório do template fica **público** — é seu portfólio.
Projetos de clientes reais ficam **privados**.

---

## 2. Criando o repositório do template

```bash
# 1. Acesse: https://github.com/new
# Nome: white-label-landing-page
# Visibilidade: Public
# Marque: Add a README file

# 2. Clone na sua máquina
git clone https://github.com/seu-usuario/white-label-landing-page.git
cd white-label-landing-page

# 3. Copie os arquivos do projeto
# (copie as pastas oficina/, salao/, dentista/, shared/ para dentro)

# 4. Primeiro commit
git add .
git commit -m "feat: add 3 white label landing page demos"
git push origin main
```

---

## 3. Estrutura de branches

| Branch | Uso |
|--------|-----|
| `main` | Versão estável, demos públicas |
| `dev` | Desenvolvimento em andamento |
| `client/nome-do-cliente` | Customização para cliente específico |

```bash
# Criar branch de desenvolvimento
git checkout -b dev

# Criar branch para um cliente
git checkout -b client/muller-auto
```

---

## 4. Padrão de commits

Use commits pequenos e descritivos:

```
feat: adiciona seção de depoimentos
fix: corrige responsividade no mobile
style: ajusta cores do cliente X
chore: atualiza README com instruções
```

---

## 5. README do repositório

O README é seu cartão de visitas. Inclua:

```markdown
# White Label Landing Page

Landing pages profissionais para prestadores de serviços locais.
Customização rápida via variáveis CSS.

## Demos
- [Oficina Mecânica](link)
- [Salão de Beleza](link)
- [Clínica Odontológica](link)

## Como customizar
1. Clone o repositório
2. Edite as variáveis em `shared/base.css`
3. Substitua textos e links no HTML

## Contato
Interessado? Entre em contato: seu@email.com
```

---

## 6. Publicando as demos com GitHub Pages

```bash
# No repositório, vá em:
# Settings → Pages → Source: Deploy from branch → main → / (root)

# Suas demos ficam disponíveis em:
# https://seu-usuario.github.io/white-label-landing-page/oficina/
# https://seu-usuario.github.io/white-label-landing-page/salao/
# https://seu-usuario.github.io/white-label-landing-page/dentista/
```

Isso é **gratuito** e funciona como portfólio online que você manda para clientes.

---

## 7. Fluxo para cada novo cliente

```bash
# 1. Crie um repositório PRIVADO para o cliente
#    Nome: cliente-nome-da-empresa

# 2. Clone o template
git clone https://github.com/seu-usuario/white-label-landing-page.git cliente-nome
cd cliente-nome

# 3. Troque o remote para o repositório do cliente
git remote set-url origin https://github.com/seu-usuario/cliente-nome.git
git push -u origin main

# 4. Crie uma branch para o cliente
git checkout -b client/nome

# 5. Faça as customizações e commite
git add .
git commit -m "feat: customiza identidade visual para Nome Empresa"
git push origin client/nome
```

---

## 8. Checklist antes de entregar ao cliente

- [ ] Trocar nome, endereço e telefone
- [ ] Atualizar link do WhatsApp (`wa.me/55XXXXXXXXXXX`)
- [ ] Substituir textos de placeholder
- [ ] Testar no celular (responsividade)
- [ ] Verificar se todos os links funcionam
- [ ] Remover comentários de desenvolvimento

---

## Dica final

Mantenha o repositório público do template **sempre atualizado e bonito**.
Ele é sua vitrine. Quando um cliente pesquisar seu nome no Google, esse repositório aparece.
