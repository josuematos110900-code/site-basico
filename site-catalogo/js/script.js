/* =========================================================================
   SITE BÁSICO + CATÁLOGO
   Ficheiro único de JavaScript usado por todas as páginas.
   ========================================================================= */

/* =========================================================================
   1. CONFIGURAÇÃO CENTRAL
   👉 Altere aqui os dados da empresa. Tudo o que está no site é
      preenchido automaticamente a partir destes valores.
   ========================================================================= */
const CONFIG = {
    nomeEmpresa: "Minha Empresa",

    // 👉 NÚMERO DO WHATSAPP — ALTERE AQUI
    // Formato: código do país + número, apenas dígitos (sem "+", espaços ou traços).
    // Exemplo para Angola: "244923456789"
    whatsapp: "244900000000",

    telefone: "+244 900 000 000",
    email: "email@empresa.com",
    moeda: "Kz",
    localizacao: "Rua Exemplo, n.º 123, Luanda, Angola",
    horario: "Seg. a Sex.: 08h00 – 18h00 · Sáb.: 09h00 – 13h00",

    // Redes sociais (deixe "" para esconder o ícone)
    redesSociais: {
        facebook: "https://facebook.com/",
        instagram: "https://instagram.com/",
        tiktok: "https://tiktok.com/"
    },

    // Mensagem usada nos botões gerais "Falar no WhatsApp"
    mensagemPadrao: "Olá! Vi o vosso site e gostaria de mais informações."
};

// Atalho para o número do WhatsApp (altere o valor em CONFIG.whatsapp acima)
const WHATSAPP_NUMBER = CONFIG.whatsapp;

/* =========================================================================
   2. CATEGORIAS E PRODUTOS
   👉 Para adicionar um produto, copie um bloco { ... } e altere os valores.
      - categoria: tem de ser uma das CATEGORIAS abaixo
      - preco: apenas o número (ex.: 3000). A moeda vem de CONFIG.moeda
      - precoAntigo: opcional, mostra o preço riscado (promoções)
      - destaque: true para aparecer na Página Inicial
      - imagem: caminho do ficheiro dentro da pasta images/
   ========================================================================= */
const CATEGORIAS = ["Todos", "Produtos", "Serviços", "Promoções"];

const produtos = [
    {
        id: 1,
        nome: "Produto Exemplo 1",
        categoria: "Produtos",
        descricao: "Descrição curta do produto. Destaque aqui as principais vantagens.",
        preco: 3000,
        imagem: "images/produto-1.jpg",
        destaque: true
    },
    {
        id: 2,
        nome: "Serviço Exemplo 1",
        categoria: "Serviços",
        descricao: "Descrição do serviço prestado, prazos e o que está incluído.",
        preco: 5000,
        imagem: "images/produto-2.jpg",
        destaque: true
    },
    {
        id: 3,
        nome: "Produto Exemplo 2",
        categoria: "Produtos",
        descricao: "Produto de qualidade, ideal para o dia a dia.",
        preco: 4500,
        imagem: "images/produto-3.jpg",
        destaque: true
    },
    {
        id: 4,
        nome: "Promoção Exemplo 1",
        categoria: "Promoções",
        descricao: "Oferta por tempo limitado. Aproveite enquanto durar o stock.",
        preco: 2500,
        precoAntigo: 3500,
        imagem: "images/produto-1.jpg",
        destaque: true
    },
    {
        id: 5,
        nome: "Produto Exemplo 3",
        categoria: "Produtos",
        descricao: "Versão premium com acabamento superior.",
        preco: 8000,
        imagem: "images/produto-3.jpg"
    },
    {
        id: 6,
        nome: "Serviço Exemplo 2",
        categoria: "Serviços",
        descricao: "Atendimento personalizado ao domicílio ou nas nossas instalações.",
        preco: 12000,
        imagem: "images/produto-2.jpg"
    },
    {
        id: 7,
        nome: "Promoção Exemplo 2",
        categoria: "Promoções",
        descricao: "Pacote especial com desconto. Leve mais, pague menos.",
        preco: 6000,
        precoAntigo: 7500,
        imagem: "images/produto-2.jpg"
    },
    {
        id: 8,
        nome: "Produto Exemplo 4",
        categoria: "Produtos",
        descricao: "Produto sem imagem própria — é usada a imagem de substituição.",
        preco: 1500,
        imagem: "images/nao-existe.jpg"
    }
];

const IMAGEM_PADRAO = "images/placeholder.jpg";

/* =========================================================================
   3. FUNÇÕES AUXILIARES
   ========================================================================= */

// 3000 -> "3.000 Kz"
function formatarPreco(valor) {
    const numero = String(Math.round(valor)).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return `${numero} ${CONFIG.moeda}`;
}

// Evita que texto dos produtos seja interpretado como HTML
function escaparHTML(texto) {
    return String(texto)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

// Remove acentos e passa a minúsculas, para a pesquisa
function normalizar(texto) {
    return String(texto).normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim();
}

function linkWhatsApp(mensagem) {
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensagem)}`;
}

function mensagemProduto(produto) {
    return `Olá! Tenho interesse no produto: ${produto.nome}.\n` +
        `Preço: ${formatarPreco(produto.preco)}.\n` +
        `Gostaria de saber mais informações.`;
}

function abrirWhatsApp(mensagem) {
    window.open(linkWhatsApp(mensagem), "_blank", "noopener");
}

/* =========================================================================
   4. CONTEÚDO GERAL (nome, contactos, redes sociais, ano)
   ========================================================================= */
function preencherConfiguracao() {
    document.title = document.title.replace("Minha Empresa", CONFIG.nomeEmpresa);

    document.querySelectorAll("[data-config]").forEach((el) => {
        const valor = CONFIG[el.dataset.config];
        if (valor) el.textContent = valor;
    });

    document.querySelectorAll("[data-whatsapp]").forEach((el) => {
        el.href = linkWhatsApp(CONFIG.mensagemPadrao);
        el.target = "_blank";
        el.rel = "noopener";
    });

    document.querySelectorAll("[data-tel]").forEach((el) => {
        el.href = `tel:${CONFIG.telefone.replace(/[^\d+]/g, "")}`;
    });

    document.querySelectorAll("[data-email]").forEach((el) => {
        el.href = `mailto:${CONFIG.email}`;
    });

    document.querySelectorAll("[data-social]").forEach((el) => {
        const url = CONFIG.redesSociais[el.dataset.social];
        if (url) {
            el.href = url;
            el.target = "_blank";
            el.rel = "noopener";
        } else {
            el.closest("li")?.remove();
        }
    });

    document.querySelectorAll("[data-ano]").forEach((el) => {
        el.textContent = new Date().getFullYear();
    });
}

/* =========================================================================
   5. MENU MOBILE (hamburger)
   ========================================================================= */
function iniciarMenu() {
    const botao = document.querySelector(".nav-toggle");
    const nav = document.getElementById("menu-principal");
    if (!botao || !nav) return;

    const fechar = () => {
        nav.classList.remove("is-open");
        botao.setAttribute("aria-expanded", "false");
        botao.setAttribute("aria-label", "Abrir menu");
    };

    botao.addEventListener("click", () => {
        const aberto = nav.classList.toggle("is-open");
        botao.setAttribute("aria-expanded", String(aberto));
        botao.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
    });

    nav.querySelectorAll("a").forEach((a) => a.addEventListener("click", fechar));

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && nav.classList.contains("is-open")) {
            fechar();
            botao.focus();
        }
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 768) fechar();
    });
}

/* =========================================================================
   6. CARDS DE PRODUTO
   modo "destaque"  -> botão "Ver produto" (abre o modal)
   modo "catalogo"  -> botão "Pedir pelo WhatsApp" + "Detalhes"
   ========================================================================= */
function criarCard(produto, modo, indice) {
    const card = document.createElement("article");
    card.className = "product-card";
    card.style.setProperty("--i", indice);

    const precoAntigo = produto.precoAntigo
        ? `<span class="price-old">${formatarPreco(produto.precoAntigo)}</span>`
        : "";

    const acoes = modo === "catalogo"
        ? `<button type="button" class="btn btn-whatsapp btn-block" data-acao="pedir">
               ${ICONE_WHATSAPP} Pedir pelo WhatsApp
           </button>
           <button type="button" class="btn btn-link" data-acao="ver">Ver detalhes</button>`
        : `<button type="button" class="btn btn-outline btn-block" data-acao="ver">Ver produto</button>`;

    card.innerHTML = `
        <button type="button" class="product-media" data-acao="ver"
                aria-label="Ver detalhes de ${escaparHTML(produto.nome)}">
            <img src="${escaparHTML(produto.imagem)}" alt="${escaparHTML(produto.nome)}"
                 loading="lazy" width="800" height="600">
            ${produto.categoria === "Promoções" ? '<span class="badge badge-promo">Promoção</span>' : ""}
        </button>
        <div class="product-body">
            <span class="product-category">${escaparHTML(produto.categoria)}</span>
            <h3 class="product-name">${escaparHTML(produto.nome)}</h3>
            <p class="product-desc">${escaparHTML(produto.descricao)}</p>
            <p class="product-price">${formatarPreco(produto.preco)} ${precoAntigo}</p>
            <div class="product-actions">${acoes}</div>
        </div>`;

    usarImagemPadraoSeFalhar(card.querySelector("img"));

    card.addEventListener("click", (e) => {
        const alvo = e.target.closest("[data-acao]");
        if (!alvo) return;
        if (alvo.dataset.acao === "ver") abrirModal(produto, alvo);
        if (alvo.dataset.acao === "pedir") abrirWhatsApp(mensagemProduto(produto));
    });

    return card;
}

function usarImagemPadraoSeFalhar(img) {
    img.addEventListener("error", function trocar() {
        img.removeEventListener("error", trocar);
        img.src = IMAGEM_PADRAO;
    });
}

function renderizarProdutos(container, lista, modo) {
    container.innerHTML = "";
    const fragmento = document.createDocumentFragment();
    lista.forEach((p, i) => fragmento.appendChild(criarCard(p, modo, i)));
    container.appendChild(fragmento);
}

/* =========================================================================
   7. PÁGINA INICIAL — produtos em destaque
   ========================================================================= */
function iniciarDestaques() {
    const container = document.getElementById("produtos-destaque");
    if (!container) return;
    const destaques = produtos.filter((p) => p.destaque).slice(0, 4);
    renderizarProdutos(container, destaques, "destaque");
}

/* =========================================================================
   8. CATÁLOGO — filtros e pesquisa
   ========================================================================= */
function iniciarCatalogo() {
    const grid = document.getElementById("catalogo-grid");
    if (!grid) return;

    const filtrosEl = document.getElementById("filtros");
    const pesquisa = document.getElementById("pesquisa");
    const contador = document.getElementById("contador-resultados");
    const vazio = document.getElementById("sem-resultados");
    const limpar = document.getElementById("limpar-filtros");

    // Categoria inicial pode vir do link: catalogo.html?categoria=Promoções
    const pedida = new URLSearchParams(location.search).get("categoria");
    const estado = {
        categoria: CATEGORIAS.includes(pedida) ? pedida : "Todos",
        termo: ""
    };

    // Botões de filtro
    CATEGORIAS.forEach((cat) => {
        const botao = document.createElement("button");
        botao.type = "button";
        botao.className = "filter-btn";
        botao.textContent = cat;
        botao.dataset.categoria = cat;
        botao.addEventListener("click", () => {
            estado.categoria = cat;
            atualizar();
        });
        filtrosEl.appendChild(botao);
    });

    pesquisa.addEventListener("input", () => {
        estado.termo = pesquisa.value;
        atualizar();
    });

    limpar.addEventListener("click", () => {
        estado.categoria = "Todos";
        estado.termo = "";
        pesquisa.value = "";
        atualizar();
        pesquisa.focus();
    });

    function atualizar() {
        const termo = normalizar(estado.termo);

        const lista = produtos.filter((p) => {
            const naCategoria = estado.categoria === "Todos" || p.categoria === estado.categoria;
            const texto = normalizar(`${p.nome} ${p.descricao} ${p.categoria}`);
            return naCategoria && (!termo || texto.includes(termo));
        });

        filtrosEl.querySelectorAll(".filter-btn").forEach((b) => {
            b.setAttribute("aria-pressed", String(b.dataset.categoria === estado.categoria));
        });

        renderizarProdutos(grid, lista, "catalogo");
        vazio.hidden = lista.length > 0;
        contador.textContent = lista.length === 1
            ? "1 resultado encontrado"
            : `${lista.length} resultados encontrados`;
    }

    atualizar();
}

/* =========================================================================
   9. MODAL DO PRODUTO
   ========================================================================= */
let modal = null;
let ultimoFoco = null;

function criarModal() {
    modal = document.createElement("div");
    modal.className = "modal";
    modal.hidden = true;
    modal.innerHTML = `
        <div class="modal-backdrop" data-fechar></div>
        <div class="modal-dialog" role="dialog" aria-modal="true" aria-labelledby="modal-titulo">
            <button type="button" class="modal-close" data-fechar aria-label="Fechar">&times;</button>
            <div class="modal-media"><img src="" alt=""></div>
            <div class="modal-content">
                <span class="product-category" id="modal-categoria"></span>
                <h2 id="modal-titulo"></h2>
                <p class="modal-desc" id="modal-descricao"></p>
                <p class="product-price modal-price" id="modal-preco"></p>
                <div class="modal-actions">
                    <button type="button" class="btn btn-whatsapp" id="modal-pedir">
                        ${ICONE_WHATSAPP} Pedir pelo WhatsApp
                    </button>
                    <button type="button" class="btn btn-outline" data-fechar>Fechar</button>
                </div>
            </div>
        </div>`;
    document.body.appendChild(modal);

    usarImagemPadraoSeFalhar(modal.querySelector("img"));

    modal.addEventListener("click", (e) => {
        if (e.target.closest("[data-fechar]")) fecharModal();
    });

    modal.addEventListener("keydown", (e) => {
        if (e.key === "Escape") fecharModal();
        if (e.key === "Tab") prenderFoco(e);
    });
}

function abrirModal(produto, origem) {
    if (!modal) criarModal();
    ultimoFoco = origem || document.activeElement;

    const img = modal.querySelector(".modal-media img");
    img.src = produto.imagem;
    img.alt = produto.nome;
    modal.querySelector("#modal-categoria").textContent = produto.categoria;
    modal.querySelector("#modal-titulo").textContent = produto.nome;
    modal.querySelector("#modal-descricao").textContent = produto.descricao;
    modal.querySelector("#modal-preco").innerHTML = formatarPreco(produto.preco) +
        (produto.precoAntigo ? ` <span class="price-old">${formatarPreco(produto.precoAntigo)}</span>` : "");
    modal.querySelector("#modal-pedir").onclick = () => abrirWhatsApp(mensagemProduto(produto));

    modal.hidden = false;
    document.body.classList.add("modal-aberto");
    modal.querySelector(".modal-close").focus();
}

function fecharModal() {
    if (!modal || modal.hidden) return;
    modal.hidden = true;
    document.body.classList.remove("modal-aberto");
    if (ultimoFoco && document.body.contains(ultimoFoco)) ultimoFoco.focus();
}

// Mantém o foco do teclado dentro do modal enquanto estiver aberto
function prenderFoco(e) {
    const focaveis = modal.querySelectorAll("button, [href], input, [tabindex]:not([tabindex='-1'])");
    const primeiro = focaveis[0];
    const ultimo = focaveis[focaveis.length - 1];
    if (e.shiftKey && document.activeElement === primeiro) {
        e.preventDefault();
        ultimo.focus();
    } else if (!e.shiftKey && document.activeElement === ultimo) {
        e.preventDefault();
        primeiro.focus();
    }
}

/* =========================================================================
   10. FORMULÁRIO DE CONTACTO
   Sem backend: valida os campos e abre o WhatsApp com a mensagem preenchida.
   ========================================================================= */
function iniciarFormulario() {
    const form = document.getElementById("form-contacto");
    if (!form) return;

    const sucesso = document.getElementById("form-sucesso");
    const regras = {
        nome: (v) => v.trim().length >= 2 || "Indique o seu nome.",
        email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) || "Indique um email válido.",
        mensagem: (v) => v.trim().length >= 10 || "A mensagem deve ter pelo menos 10 caracteres."
    };

    function validarCampo(campo) {
        const resultado = regras[campo.name](campo.value);
        const erro = document.getElementById(`erro-${campo.name}`);
        const valido = resultado === true;
        campo.setAttribute("aria-invalid", String(!valido));
        erro.textContent = valido ? "" : resultado;
        return valido;
    }

    Object.keys(regras).forEach((nome) => {
        const campo = form.elements[nome];
        campo.addEventListener("blur", () => campo.value && validarCampo(campo));
        campo.addEventListener("input", () => {
            if (campo.getAttribute("aria-invalid") === "true") validarCampo(campo);
        });
    });

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        sucesso.hidden = true;

        const campos = Object.keys(regras).map((n) => form.elements[n]);
        const invalidos = campos.filter((c) => !validarCampo(c));
        if (invalidos.length) {
            invalidos[0].focus();
            return;
        }

        const { nome, email, mensagem } = form.elements;
        const texto = `Olá! O meu nome é ${nome.value.trim()}.\n` +
            `Email: ${email.value.trim()}\n\n` +
            `${mensagem.value.trim()}`;

        abrirWhatsApp(texto);
        sucesso.hidden = false;
        form.reset();
        campos.forEach((c) => c.removeAttribute("aria-invalid"));
    });
}

/* =========================================================================
   11. ÍCONES
   ========================================================================= */
const ICONE_WHATSAPP = `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91C21.95 6.45 17.5 2 12.04 2zm0 18.15c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.26 8.26 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 4.54 0 8.24 3.7 8.24 8.24 0 4.55-3.7 8.24-8.24 8.24zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43s.17-.25.25-.41c.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18s-.22-.16-.47-.28z"/></svg>`;

/* =========================================================================
   12. ARRANQUE
   ========================================================================= */
document.addEventListener("DOMContentLoaded", () => {
    preencherConfiguracao();
    iniciarMenu();
    iniciarDestaques();
    iniciarCatalogo();
    iniciarFormulario();
});
