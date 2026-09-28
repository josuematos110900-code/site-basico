# Site Básico + Catálogo

Site simples, rápido e responsivo com **Início**, **Catálogo** e **Contacto**.
Feito apenas com HTML, CSS e JavaScript puro — sem instalações nem dependências.

## Como abrir o projeto

1. Baixar o projeto
2. Abrir a pasta `site-catalogo`
3. Abrir `index.html` no navegador (duplo clique)

Não é preciso servidor nem internet (exceto para abrir o WhatsApp).

## Estrutura

```text
site-catalogo/
├── index.html       Página inicial
├── catalogo.html    Catálogo com pesquisa, filtros e modal
├── contato.html     Contactos + formulário
├── css/style.css    Todo o visual (cores no topo)
├── js/script.js     Configuração, produtos e funcionamento
├── images/          Logo e imagens dos produtos
└── README.md
```

## Como alterar a empresa

Quase tudo se altera **num só sítio**: o início do ficheiro `js/script.js`.

### Nome, WhatsApp, telefone, email, localização e horário

Em `js/script.js`, no objeto `CONFIG`:

```javascript
const CONFIG = {
    nomeEmpresa: "Minha Empresa",
    whatsapp: "244900000000",       // só dígitos: código do país + número
    telefone: "+244 900 000 000",
    email: "email@empresa.com",
    moeda: "Kz",
    localizacao: "Rua Exemplo, n.º 123, Luanda, Angola",
    horario: "Seg. a Sex.: 08h00 – 18h00 · Sáb.: 09h00 – 13h00",
    redesSociais: { facebook: "...", instagram: "...", tiktok: "..." },
    mensagemPadrao: "Olá! Vi o vosso site e gostaria de mais informações."
};
```

- **WhatsApp:** escreva o número sem `+`, espaços ou traços (ex.: `244923456789`).
  Todos os botões do site passam a usar este número automaticamente.
- **Redes sociais:** coloque o link da sua página. Deixe `""` para esconder o ícone.
- O nome também aparece no `<title>` e nos textos de fallback de cada página HTML;
  o JavaScript substitui-o automaticamente, mas para SEO convém alterar "Minha Empresa"
  também nos três ficheiros `.html`.

### Logo

Substitua `images/logo.png` por outro ficheiro com o **mesmo nome**
(ideal: quadrado, 256×256 px, PNG).

### Produtos e preços

Em `js/script.js`, no array `produtos`. Cada produto é um bloco:

```javascript
{
    id: 9,
    nome: "Nome do produto",
    categoria: "Produtos",           // Produtos, Serviços ou Promoções
    descricao: "Descrição curta.",
    preco: 3000,                     // só o número → aparece "3.000 Kz"
    precoAntigo: 4000,               // opcional: preço riscado
    imagem: "images/meu-produto.jpg",
    destaque: true                   // opcional: aparece na Página Inicial
}
```

- Para **adicionar**, copie um bloco, cole a seguir a outro (separado por vírgula) e altere.
- Para **remover**, apague o bloco inteiro.
- A Página Inicial mostra até 4 produtos com `destaque: true`.
- A moeda vem de `CONFIG.moeda`.

### Categorias

Em `js/script.js`:

```javascript
const CATEGORIAS = ["Todos", "Produtos", "Serviços", "Promoções"];
```

Pode adicionar ou mudar nomes (mantenha `"Todos"` em primeiro). A `categoria`
de cada produto tem de ser escrita exatamente igual a uma destas.
Pode ligar diretamente a uma categoria: `catalogo.html?categoria=Promoções`.

### Imagens

- Coloque as imagens na pasta `images/`.
- Tamanho recomendado: **800×600 px** (formato 4:3), JPG, até ~150 KB.
- Se uma imagem não existir, é usada `images/placeholder.jpg` automaticamente.

### Cores

No topo de `css/style.css`:

```css
:root {
    --primary: #0A5548;     /* cor principal (botões, títulos, menu) */
    --secondary: #17A48C;   /* cor de apoio */
    --accent: #D4A017;      /* destaques (promoções, CTA) */
    --background: #f7f7f7;  /* fundo */
    --text: #1f1f1f;        /* texto */
    --white: #ffffff;
}
```

### Textos

Os textos das páginas (títulos, descrições, cartões de destaque) estão
diretamente nos ficheiros `.html` — basta editá-los.

## Formulário de contacto

Não há servidor: o formulário valida os campos e abre o WhatsApp com a
mensagem já escrita. Nenhum dado é guardado nem enviado para outro lado.

## Publicar online

Basta enviar a pasta para qualquer alojamento de sites estáticos
(Netlify, GitHub Pages, Vercel, cPanel, etc.).
