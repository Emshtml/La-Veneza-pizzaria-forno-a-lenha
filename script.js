// Cardápio oficial da La Veneza Pizzaria Forno a Lenha
const produtos = [
    {
        id: 1,
        nome: "Pizza Doce de Leite com Paçoca",
        descricao: "Deliciosa combinação de doce de leite cremoso com farofa crocante de paçoca.",
        preco: 45.00,
        imagem: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=500"
    },
    {
        id: 2,
        nome: "Frango com Catupiry",
        descricao: "Frango desfiado temperado artesanalmente com o legítimo Catupiry original.",
        preco: 59.00,
        imagem: "https://images.unsplash.com/photo-1601924582970-9238bcb495d9?q=80&w=500"
    },
    {
        id: 3,
        nome: "Mussarela com Calabresa",
        descricao: "Mussarela premium, calabresa fatiada e cebola fresca ao forno a lenha.",
        preco: 39.00,
        imagem: "https://images.unsplash.com/photo-1594007654729-407eedc4be65?q=80&w=500"
    },
    {
        id: 4,
        nome: "Marguerita",
        descricao: "Molho artesanal, mussarela especial, tomate fresco, manjericão e azeite.",
        preco: 42.00,
        imagem: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?q=80&w=500"
    },
    {
        id: 5,
        nome: "Quatro Queijos",
        descricao: "Mussarela, parmesão, provolone e gorgonzola derretidos no forno a lenha.",
        preco: 49.00,
        imagem: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=500"
    },
    {
        id: 6,
        nome: "Portuguesa",
        descricao: "Presunto, ovos, cebola, ervilha, mussarela e azeitonas selecionadas.",
        preco: 38.00,
        imagem: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=500"
    },
    {
        id: 7,
        nome: "Coca-Cola 2L",
        descricao: "Refrigerante Coca-Cola 2 litros bem gelada.",
        preco: 15.00,
        imagem: "https://images.unsplash.com/photo-1554866585-cd94860890b7?q=80&w=500"
    },
    {
        id: 8,
        nome: "Guaraná Antarctica 2L",
        descricao: "Guaraná Antarctica 2 litros trincando de gelado.",
        preco: 12.00,
        imagem: "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?q=80&w=500"
    }
];

let carrinho = [];

// Seleção de elementos do DOM
const cardapioContainer = document.getElementById("cardapio");
const modalCarrinho = document.getElementById("modal-carrinho");
const btnVerCarrinho = document.getElementById("btn-ver-carrinho");
const btnFecharModal = document.getElementById("btn-fechar-modal");
const itensCarrinhoContainer = document.getElementById("itens-carrinho");
const totalBarra = document.getElementById("total-barra");
const totalModal = document.getElementById("total-modal");
const contadorCarrinho = document.getElementById("contador-carrinho");
const inputEndereco = document.getElementById("input-endereco");
const avisoEndereco = document.getElementById("aviso-endereco");
const btnFinalizarPedido = document.getElementById("btn-finalizar-pedido");

// Renderizar Cardápio
function renderizarCardapio() {
    cardapioContainer.innerHTML = "";

    produtos.forEach(produto => {
        const div = document.createElement("div");

        div.className =
            "bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all border border-orange-100 flex flex-col";

        div.innerHTML = `
            <img src="${produto.imagem}" alt="${produto.nome}" class="w-full h-52 object-cover">

            <div class="p-4 flex flex-col flex-1 justify-between">
                
                <div>
                    <h3 class="font-bold text-lg text-gray-900 mb-2">
                        ${produto.nome}
                    </h3>

                    <p class="text-gray-500 text-sm leading-relaxed mb-4">
                        ${produto.descricao}
                    </p>
                </div>

                <div class="flex items-center justify-between mt-auto">
                    <span class="font-extrabold text-2xl text-orange-600">
                        R$ ${produto.preco.toFixed(2).replace(".", ",")}
                    </span>

                    <button 
                        class="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-lg transition-all active:scale-95 btn-add"
                        data-id="${produto.id}"
                    >
                        <i class="fa-solid fa-cart-plus mr-1"></i>
                        Adicionar
                    </button>
                </div>
            </div>
        `;

        cardapioContainer.appendChild(div);
    });
}

// Adicionar ao carrinho
cardapioContainer.addEventListener("click", (e) => {
    const botao = e.target.closest(".btn-add");

    if (botao) {
        const id = parseInt(botao.getAttribute("data-id"));
        adicionarAoCarrinho(id);
    }
});

function adicionarAoCarrinho(id) {
    const produto = produtos.find(p => p.id === id);
    const itemExistente = carrinho.find(item => item.id === id);

    if (itemExistente) {
        itemExistente.quantidade += 1;
    } else {
        carrinho.push({
            ...produto,
            quantidade: 1
        });
    }

    atualizarInterface();
}

// Atualizar totais
function atualizarInterface() {
    let total = 0;
    let totalItens = 0;

    carrinho.forEach(item => {
        total += item.preco * item.quantidade;
        totalItens += item.quantidade;
    });

    const totalFormatado =
        `R$ ${total.toFixed(2).replace(".", ",")}`;

    totalBarra.textContent = totalFormatado;
    totalModal.textContent = totalFormatado;
    contadorCarrinho.textContent = totalItens;
}

// Abrir Modal
btnVerCarrinho.addEventListener("click", () => {
    renderizarCarrinhoModal();
    modalCarrinho.classList.remove("hidden");
});

// Fechar Modal
btnFecharModal.addEventListener("click", () => {
    modalCarrinho.classList.add("hidden");
});

modalCarrinho.addEventListener("click", (e) => {
    if (e.target === modalCarrinho) {
        modalCarrinho.classList.add("hidden");
    }
});

// Renderizar Carrinho
function renderizarCarrinhoModal() {
    itensCarrinhoContainer.innerHTML = "";

    if (carrinho.length === 0) {
        itensCarrinhoContainer.innerHTML = `
            <p class="text-gray-500 text-center py-6">
                Seu carrinho está vazio.
            </p>
        `;
        return;
    }

    carrinho.forEach(item => {
        const div = document.createElement("div");

        div.className =
            "flex justify-between items-center bg-orange-50 p-4 rounded-xl border border-orange-100";

        div.innerHTML = `
            <div class="flex-1">
                <h4 class="font-bold text-gray-900 text-sm">
                    ${item.nome}
                </h4>

                <span class="text-xs text-gray-500">
                    R$ ${item.preco.toFixed(2).replace(".", ",")} un.
                </span>
            </div>

            <div class="flex items-center gap-3">
                <button 
                    class="text-red-500 hover:text-red-700 px-2 font-bold btn-diminuir"
                    data-id="${item.id}"
                >
                    -
                </button>

                <span class="font-semibold text-sm bg-white border px-3 py-1 rounded-md">
                    ${item.quantidade}
                </span>

                <button 
                    class="text-green-500 hover:text-green-700 px-2 font-bold btn-aumentar"
                    data-id="${item.id}"
                >
                    +
                </button>
            </div>
        `;

        itensCarrinhoContainer.appendChild(div);
    });
}

// Alterar Quantidade
itensCarrinhoContainer.addEventListener("click", (e) => {

    if (e.target.classList.contains("btn-aumentar")) {

        const id = parseInt(e.target.getAttribute("data-id"));

        const item = carrinho.find(i => i.id === id);

        item.quantidade++;

        atualizarInterface();
        renderizarCarrinhoModal();
    }

    if (e.target.classList.contains("btn-diminuir")) {

        const id = parseInt(e.target.getAttribute("data-id"));

        const idx = carrinho.findIndex(i => i.id === id);

        if (carrinho[idx].quantidade > 1) {
            carrinho[idx].quantidade--;
        } else {
            carrinho.splice(idx, 1);
        }

        atualizarInterface();
        renderizarCarrinhoModal();
    }
});

// Finalizar Pedido WhatsApp
btnFinalizarPedido.addEventListener("click", () => {

    if (carrinho.length === 0) {
        return alert("Seu carrinho está vazio!");
    }

    if (inputEndereco.value.trim() === "") {

        avisoEndereco.classList.remove("hidden");
        inputEndereco.classList.add("border-red-500");

        return;
    }

    avisoEndereco.classList.add("hidden");
    inputEndereco.classList.remove("border-red-500");

    let msg = `🍕 *LA VENEZA PIZZARIA FORNO A LENHA* 🍕\n`;
    msg += `\n*--- NOVO PEDIDO ---*\n\n`;

    carrinho.forEach(item => {

        msg += `• *${item.quantidade}x* ${item.nome}`;
        msg += ` - R$ ${(item.preco * item.quantidade).toFixed(2)}\n`;
    });

    const total = carrinho.reduce((acc, item) => {
        return acc + (item.preco * item.quantidade);
    }, 0);

    msg += `\n💰 *Total:* R$ ${total.toFixed(2)}`;

    msg += `\n📍 *Endereço:* ${inputEndereco.value}`;

    // Substitua pelo número oficial da pizzaria
    const telefone = "5511999999999";

    const url =
        `https://api.whatsapp.com/send?phone=${telefone}&text=${encodeURIComponent(msg)}`;

    carrinho = [];

    atualizarInterface();

    inputEndereco.value = "";

    modalCarrinho.classList.add("hidden");

    window.open(url, "_blank");
});

// Inicialização
renderizarCardapio();
