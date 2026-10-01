# Identidade visual dos modelos

A página da ms.dev e os dez modelos usam fontes locais, hierarquia de títulos, campos com foco visível e botões com área de toque confortável. Os modelos mantêm suas identidades: vermelho industrial na oficina, azul no consultório, terracota no artista, dourado nos estúdios, verde na loja e tons quentes no salão e na comunidade.

- `assets/visual.css`: apresentação da ms.dev, exemplos na abertura, vitrine e cotação.
- `shared/design.css`: base de tipografia, navegação, formulários, responsividade e ajustes de cada modelo. É carregado depois dos estilos originais.
- `shared/design.js`: menus dos modelos que não tinham navegação móvel e ícones SVG locais.
- `shared/enhancements.js`: navegação por teclado, fechamento com Escape e animações que respeitam a preferência por menos movimento. O conteúdo continua visível se esse script não carregar.
- `shared/themes.js`: seleção de aparência salva separadamente para cada modelo. “Original” restaura a identidade do site.
- `assets/fonts/`: fontes WOFF2, licenças e versões verificadas pela integridade dos pacotes Fontsource. O site não depende do Google Fonts ou de uma fonte de ícones externa.

O menu passa para a versão móvel até 1024 px. A faixa de demonstração ocupa 38 px e o cabeçalho reserva seu próprio espaço. Links para seções consideram essas alturas, evitando títulos encobertos.

Para revisar mudanças, execute `npm test` e `npm run previews`. Os testes incluem 375, 768 e 1440 px, menus, temas, cotação, busca e carrinho. As prévias são capturas reais e reproduzíveis, com fotos externas bloqueadas; o site publicado conserva os URLs dessas fotos. As fotos locais da Give Beauty aparecem normalmente nas capturas.

O visual apresenta os conteúdos existentes. Antes de usar um modelo para um cliente, personalize também contatos, fotos, textos, avaliações e condições comerciais.
