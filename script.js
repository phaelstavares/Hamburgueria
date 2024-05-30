const menu = document.getElementById("menu")
const cartBtn = document.getElementById("cart-btn")
const cartModal = document.getElementById("cart-modal")
const cartItemsContainer = document.getElementById("cart-items")
const cartTotal = document.getElementById("cart-total")
const checkoutBtn = document.getElementById("checkout-btn")
const closeModalBtn = document.getElementById("close-modal-btn")
const cartCounter = document.getElementById("cart-count")
const addressInput = document.getElementById("address")
const addressWarn = document.getElementById("address-warn")

let cart = []

// Abrir o modal do carrinho
cartBtn.addEventListener("click", function() {
    updateCartModal();

    cartModal.style.display = "flex"
})

// Fechar o modal do carrinho (parte de fora do modal)
cartModal.addEventListener("click", function(event) {
    if(event.target === cartModal) {
        cartModal.style.display = "none"
    }
})

// Fechar o modal do carrinho (botão Fechar)
closeModalBtn.addEventListener("click", function() {
    cartModal.style.display = "none"
})

// Função para pegar name e price do produto
menu.addEventListener("click", function(event) {
    let parentButton = event.target.closest(".add-to-cart")
    
    if(parentButton) {
        const name = parentButton.getAttribute("data-name")
        const price = parseFloat(parentButton.getAttribute("data-price"))

        addToCart(name, price)
    }
})

// Função para adicionar no carrinho
function addToCart(name, price) {
    const existingItem = cart.find(item => item.name === name)

    if(existingItem) {
        // se o item já existe, aumenta apenas a quantidade + 1
        existingItem.quantity += 1;
    }else {
        cart.push({
            name,
            price,
            quantity: 1,
        })
    }

    updateCartModal()
}

// Atualiza o carrinho
function updateCartModal() {
    cartItemsContainer.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        const cartItemElement = document.createElement("div");
        cartItemElement.classList.add("flex", "justify-between", "mb-4", "flex-col")

        cartItemElement.innerHTML = `
            <div class="flex items-center justify-between mt-2">
                <div>
                    <p class="font-bold">${item.name}</p>
                    <p>Quantidade: ${item.quantity}</p>
                    <p class="font-medium mt-1">${
                            item.price.toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL"
                        })
                        }
                    </p>
                </div>

                <button class="remove-from-cart-btn" data-name="${item.name}">
                    Remover
                </button>
            </div>
        `

        total += item.price * item.quantity

        cartItemsContainer.appendChild(cartItemElement)
    })

    cartTotal.textContent = total.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });

    cartCounter.innerHTML = cart.length;
}

// Função para remover o item do carrinho
cartItemsContainer.addEventListener("click", function(event) {
    if(event.target.classList.contains("remove-from-cart-btn")) {
        const name = event.target.getAttribute("data-name")

        removeItemCart(name);
    }
})

function removeItemCart(name) {
    const index = cart.findIndex(item => item.name  === name);

    if(index !== -1) {
        const item = cart[index];
        
        if(item.quantity > 1) {
            item.quantity -= 1;
            updateCartModal();
            return;
        }

        cart.splice(index, 1);
        updateCartModal();
    }
}