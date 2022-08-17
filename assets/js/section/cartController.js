import { db } from './products.js'

export const cartController = {
  items: window.localStorage.getItem('cart') ? JSON.parse(window.localStorage.getItem('cart')) : [],
  methods: {
    add: (id, quantity) => {
      const cartItem = cartController.methods.get(id)

      if (cartItem) {
        if (cartController.methods.hasInventory(id, quantity + cartItem.quantity)) {
          cartItem.quantity += quantity
        } else {
          window.alert('We do not have enough in stock')
        }
      } else {
        cartController.items.push({ id, quantity })
      }
    },
    remove: (id, quantity) => {
      const cartItem = cartController.methods.get(id)

      if (cartItem.quantity - quantity > 0) {
        cartItem.quantity -= quantity
      } else {
        cartController.items = cartController.items.filter(item => item.id !== id)
      }
    },
    removeAll: (id) => {
      cartController.items = cartController.items.filter(item => item.id !== id)
    },
    count: () => {
      return cartController.items.reduce((acc, item) => acc + item.quantity, 0)
    },
    get: (id) => {
      const index = cartController.items.findIndex(item => item.id === id)
      return index >= 0 ? cartController.items[index] : null
    },
    getAll: () => {
      return cartController.items
    },
    getTotal: () => {
      const total = cartController.items.reduce((acc, item) => {
        const itemDB = db.methods.find(item.id)
        return acc + (itemDB.price * item.quantity)
      }, 0)

      return total
    },
    hasInventory: (id, quantity) => {
      return db.methods.find(id).quantity - quantity >= 0
    },
    purchase: () => {
      db.methods.remove(cartController.items)
      cartController.items = []
    }
  }
}

export function renderCart () {
  const cartContainer = document.querySelector('#shop-container')
  const cartItems = cartController.methods.getAll()
  let html = ''

  if (cartItems.length > 0) {
    cartItems.forEach(item => {
      const product = db.methods.find(item.id)
      html += `
        <article class="cart__card">
          <div class="cart__box">
            <img src="${product.image}" alt="${product.name}" class="cart__img">
          </div>
  
          <div class="cart__details">
            <h3 class="cart__title">${product.name}</h3>
            <span class="cart__stock">Stock: ${product.quantity} | <span class="cart__price">${product.price}</span></span>
            <span class="cart__subtotal">
              Subtotal: ${item.quantity * product.price}
            </span>
  
            <div class="cart__amount">
              <div class="cart__amount-content">
                <span class="cart__amount-box minus" data-id="${product.id}">
                <i class='bx bx-minus'></i>
                </span>
  
                <span class="cart__amount-number">${item.quantity} units</span>
  
                <span class="cart__amount-box plus" data-id="${product.id}">
                <i class='bx bx-plus'></i>
                </span>
              </div>
  
              <i class='bx bx-trash-alt cart__amount-trash' data-id="${product.id}"></i>
            </div>
          </div>
        </article>`
    })
  } else {
    html += `
      <div class="cart__empty">
        <img src="assets/images/empty-cart.png" alt="empty cart">
        <h2>Your cart is empty</h2>
        <p>You can add items to your cart by clicking on the "<i class="bx bx-plus"></i>" button on the product page.</p>
      </div>`
  }

  cartContainer.innerHTML = html

  const cartCount = document.getElementById('cart-count')
  const itemsCount = document.querySelector('.shop-resume__number')

  cartCount.innerHTML = cartController.methods.count()
  itemsCount.innerHTML = cartController.methods.count()

  const minusItems = document.querySelectorAll('.minus')
  const plusItems = document.querySelectorAll('.plus')
  const deleteButtons = document.querySelectorAll('.cart__amount-trash')
  const totalContainer = document.querySelector('.shop-resume__total')
  const checkoutButton = document.getElementById('cart-checkout')

  minusItems.forEach(item => {
    item.addEventListener('click', () => {
      const id = parseInt(item.getAttribute('data-id'))
      cartController.methods.remove(id, 1)
      renderCart()
    })
  })

  plusItems.forEach(item => {
    item.addEventListener('click', () => {
      const id = parseInt(item.getAttribute('data-id'))
      cartController.methods.add(id, 1)
      renderCart()
    })
  })

  deleteButtons.forEach(button => {
    button.addEventListener('click', () => {
      const id = parseInt(button.getAttribute('data-id'))
      cartController.methods.removeAll(id)
      renderCart()
    })
  })

  const total = cartController.methods.getTotal()
  totalContainer.innerHTML = total

  if (cartController.items.length > 0) {
    checkoutButton.removeAttribute('disabled')
  } else {
    checkoutButton.setAttribute('disabled', 'disabled')
  }

  checkoutButton.addEventListener('click', () => {
    cartController.methods.purchase()
    renderCart()
  })

  window.localStorage.setItem('products', JSON.stringify(db.items))
  window.localStorage.setItem('cart', JSON.stringify(cartController.items))
}