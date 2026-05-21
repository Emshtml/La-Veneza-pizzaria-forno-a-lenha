// ================================
// LA VENEZA PIZZARIA FORNO A LENHA
// SCRIPT.JS OFICIAL
// ================================

// CARDÁPIO
const produtos = [

    {
        id: 1,
        nome: "Pizza Doce de Leite com Paçoca",
        descricao: "Delicioso doce de leite cremoso com paçoca crocante.",
        preco: 45.00,
        imagem: "assets/pizzadocedeleite.webp"
    },

    {
        id: 2,
        nome: "Frango com Catupiry",
        descricao: "Frango artesanal com Catupiry original.",
        preco: 59.00,
        imagem: "assets/frangocomcatupi.webp"
    },

    {
        id: 3,
        nome: "Mussarela com Calabresa",
        descricao: "Mussarela premium com calabresa especial.",
        preco: 39.00,
        imagem: "assets/mussarelacomcalabresa.webp"
    },

    {
        id: 4,
        nome: "Marguerita",
        descricao: "Molho artesanal, tomate e manjericão fresco.",
        preco: 42.00,
        imagem: "assets/calabresacomcatupiri.webp"
    },

    {
        id: 5,
        nome: "Quatro Queijos",
        descricao: "Mistura especial de quatro queijos ao forno a lenha.",
        preco: 49.00,
        imagem: "assets/calabresacomcatupiri.webp"
    },

    {
        id: 6,
        nome: "Portuguesa",
        descricao: "Presunto, ovos, cebola, ervilha e azeitonas.",
        preco: 38.00,
        imagem: "assets/frangocomcatupi.webp"
    },

    {
        id: 7,
        nome: "Coca-Cola 350ml",
        descricao: "Refrigerante Coca-Cola 2 litros bem gelada.",
        preco: 8.00,
        imagem: "assets/logo.webp"
    },

    {
        id: 8,
        nome: "Guaraná Antarctica 350mL",
        descricao: "Guaraná Antarctica 350ml.",
        preco: 8.00,
        imagem: "assets/logo.webp"
    }

];

let carrinho = [];

// ELEMENTOS DOM
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

// ================================
// RENDERIZAR CARDÁPIO
// ================================
function renderizarCardapio() {

    cardapioContainer.innerHTML = "";

    produtos.forEach(produto => {

        const div = document.createElement("div");

        div.className =
            "bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all border border-orange-100 flex flex-col";

        div.innerHTML = `
            <img
                src="${produto.imagem}"
                alt="${produto.nome}"
                class="w-full h-56 object-cover"
            >

            <div class="p-5 flex flex-col flex-1">

                <h3 class="font-extrabold text-xl text-gray-900">
                    ${produto.nome}
                </h3>

                <p class="text-gray-500 text-sm mt-2 flex-1">
                    ${produto.descricao}
                </p>

                <div class="flex items-center justify-between mt-5">

                    <span class="text-2xl font-extrabold text-orange-600">
                        R$ ${produto.preco.toFixed(2).replace(".", ",")}
                    </span>

                    <button
                        class="bg-orange-500 hover:bg-orange-600 text-black font-bold px-4 py-3 rounded-xl shadow-lg transition-all active:scale-95 btn-add"
                        data-id="${produto.id}"
                    >
                        <i class="fa-solid fa-cart-plus"></i>
                    </button>

                </div>

            </div>
        `;

        cardapioContainer.appendChild(div);

    });

}

// ================================
// ADICIONAR AO CARRINHO
// ================================
cardapioContainer.addEventListener("click", (e) => {

    const botao = e.target.closest(".btn-add");

    if (botao) {

        const id =
            parseInt(botao.getAttribute("data-id"));

        adicionarAoCarrinho(id);

    }

});

function adicionarAoCarrinho(id) {

    const produto =
        produtos.find(p => p.id === id);

    const itemExistente =
        carrinho.find(item => item.id === id);

    if (itemExistente) {

        itemExistente.quantidade++;

    } else {

        carrinho.push({
            ...produto,
            quantidade: 1
        });

    }

    atualizarInterface();

}

// ================================
// ATUALIZAR INTERFACE
// ================================
function atualizarInterface() {

    let total = 0;
    let totalItens = 0;

    carrinho.forEach(item => {

        total += item.preco * item.quantidade;
        totalItens += item.quantidade;

    });

    totalBarra.textContent =
        `R$ ${total.toFixed(2).replace(".", ",")}`;

    totalModal.textContent =
        `R$ ${total.toFixed(2).replace(".", ",")}`;

    contadorCarrinho.textContent =
        totalItens;

}

// ================================
// MODAL
// ================================
btnVerCarrinho.addEventListener("click", () => {

    renderizarCarrinhoModal();

    modalCarrinho.classList.remove("hidden");

});

btnFecharModal.addEventListener("click", () => {

    modalCarrinho.classList.add("hidden");

});

modalCarrinho.addEventListener("click", (e) => {

    if (e.target === modalCarrinho) {

        modalCarrinho.classList.add("hidden");

    }

});

// ================================
// RENDERIZAR CARRINHO
// ================================
function renderizarCarrinhoModal() {

    itensCarrinhoContainer.innerHTML = "";

    if (carrinho.length === 0) {

        itensCarrinhoContainer.innerHTML = `
            <p class="text-center text-gray-500 py-6">
                Seu carrinho está vazio.
            </p>
        `;

        return;

    }

    carrinho.forEach(item => {

        const div = document.createElement("div");

        div.className =
            "bg-orange-50 rounded-2xl p-4 flex items-center justify-between border border-orange-100";

        div.innerHTML = `
            <div>

                <h4 class="font-bold text-sm">
                    ${item.nome}
                </h4>

                <span class="text-gray-500 text-xs">
                    R$ ${item.preco.toFixed(2).replace(".", ",")}
                </span>

            </div>

            <div class="flex items-center gap-3">

                <button
                    class="text-red-500 font-bold btn-diminuir"
                    data-id="${item.id}"
                >
                    -
                </button>

                <span class="font-bold">
                    ${item.quantidade}
                </span>

                <button
                    class="text-green-500 font-bold btn-aumentar"
                    data-id="${item.id}"
                >
                    +
                </button>

            </div>
        `;

        itensCarrinhoContainer.appendChild(div);

    });

}

// ================================
// ALTERAR QUANTIDADE
// ================================
itensCarrinhoContainer.addEventListener("click", (e) => {

    if (e.target.classList.contains("btn-aumentar")) {

        const id =
            parseInt(e.target.getAttribute("data-id"));

        const item =
            carrinho.find(i => i.id === id);

        item.quantidade++;

    }

    if (e.target.classList.contains("btn-diminuir")) {

        const id =
            parseInt(e.target.getAttribute("data-id"));

        const idx =
            carrinho.findIndex(i => i.id === id);

        if (carrinho[idx].quantidade > 1) {

            carrinho[idx].quantidade--;

        } else {

            carrinho.splice(idx, 1);

        }

    }

    atualizarInterface();
    renderizarCarrinhoModal();

});

// ================================
// FINALIZAR PEDIDO
// ================================
btnFinalizarPedido.addEventListener("click", () => {

    if (carrinho.length === 0) {

        alert("Seu carrinho está vazio!");
        return;

    }

    if (inputEndereco.value.trim() === "") {

        avisoEndereco.classList.remove("hidden");
        inputEndereco.classList.add("border-red-500");

        return;

    }

    avisoEndereco.classList.add("hidden");
    inputEndereco.classList.remove("border-red-500");

    let mensagem =
        `🍕 *LA VENEZA PIZZARIA FORNO A LENHA* 🍕\n\n`;

    carrinho.forEach(item => {

        mensagem +=
            `• ${item.quantidade}x ${item.nome} - R$ ${(item.preco * item.quantidade).toFixed(2)}\n`;

    });

    const total =
        carrinho.reduce((acc, item) => {
            return acc + item.preco * item.quantidade;
        }, 0);

    mensagem +=
        `\n💰 *Total:* R$ ${total.toFixed(2)}`;

    mensagem +=
        `\n📍 *Endereço:* ${inputEndereco.value}`;

    mensagem +=
        `\n\n📞 *Pedidos:* (11) 93938-1081`;

    const telefone = "5511939381081";

    const url =
        `https://api.whatsapp.com/send?phone=${telefone}&text=${encodeURIComponent(mensagem)}`;

    window.open(url, "_blank");

});

// ================================
// INICIAR
// ================================
renderizarCardapio();
