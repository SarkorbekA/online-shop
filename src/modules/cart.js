import renderCart from "./renderCart"
import postData from "./postData"

const cart = () => {
    let cartBtn = document.querySelector('.navbar-nav__cart')
    let cartBtnFixed = document.querySelector('.card__btn-fixed')
    let cartModal = document.querySelector('.cart-modal')
    let cartModalClose = document.querySelector('.cart-modal__close')
    let cartModalBtnClose = document.querySelector('.cart-modal__btn--close')
    let cartModalNext = document.querySelector('.cart-modal__next')
    let cartModalForm = document.querySelector('.cart-modal__form')
    let cartSend = cartModalForm.querySelector('.cart-modal__form--send')
    let cartModalList = document.querySelector('.cart-modal__list')
    let cartTotal = document.getElementById('cartSpan')
    let productsWrapper = document.querySelector('.products-content__wrapper')
    let cardModalOk = document.querySelector('.card-modal__ok')

    // console.log(cartTotal);


    let openCart = () => {
        cartModal.style.display = 'flex'
        document.body.style = 'overflow: hidden;'

        const cart = localStorage.getItem('cart') ?
            JSON.parse(localStorage.getItem('cart')) : []

        renderCart(cart)

        cartTotal.textContent = cart.reduce((sum, productsItem) => {
            return sum + +productsItem.price
        }, 0)
    }


    cartBtnFixed.addEventListener('click', openCart)

    cartBtn.addEventListener('click', openCart)

    cartModalClose.addEventListener('click', () => {
        cartModal.style.display = 'none'
        document.body.style = ''

        cartModalForm.classList.remove('active')
        cartModalForm.style.display = 'none'
        cartModalNext.innerHTML = 'Оформить заказ'

        cartModalList.classList.remove('active')
    })

    cartModalBtnClose.addEventListener('click', () => {
        cartModal.style.display = 'none'
        document.body.style = ''

        cartModalForm.classList.remove('active')
        cartModalForm.style.display = 'none'
        cartModalNext.innerHTML = 'Оформить заказ'

        cartModalList.classList.remove('active')
    })

    cartModalNext.addEventListener('click', () => {
        if (cartModalForm.classList.contains('active')) {
            cartModalForm.classList.remove('active')
            cartModalForm.style.display = 'none'
            cartModalNext.innerHTML = 'Оформить заказ'
            cartModalList.classList.remove('active')
        } else {
            cartModalForm.classList.add('active')
            cartModalForm.style.display = 'flex'
            cartModalNext.innerHTML = 'Назад'
            cartModalList.classList.add('active')
        }

        if (JSON.parse(localStorage.getItem('cart'))) {
            if (JSON.parse(localStorage.getItem('cart')).length <= 0 && cartModalNext.textContent.trim() == 'Оформить заказ') {
                cartModalNext.disabled = true
            } else if (JSON.parse(localStorage.getItem('cart')).length > 0 && !cartModalNext.textContent.trim() == 'Назад') {
                cartModalNext.disabled = false
            }
        } else {
            cartModalNext.disabled = true
        }
    })

    productsWrapper.addEventListener('click', (event) => {
        if (event.target.classList.contains('products-content__item--btn')) {
            const card = event.target.closest('.products-content__item')
            const key = card.dataset.key
            const products = JSON.parse(localStorage.getItem('products'))
            const cart = localStorage.getItem('cart') ?
                JSON.parse(localStorage.getItem('cart')) : []
            const productsItem = products.find((item) => {
                return item.id === +key
            })
            cart.push(productsItem)
            localStorage.setItem('cart', JSON.stringify(cart))

            localStorage.setItem('cart', JSON.stringify(cart))

            if (JSON.parse(localStorage.getItem('cart')).length > 0 || cartModalNext.textContent.trim() == 'Оформить заказ') {
                cartModalNext.disabled = false
            } else {
                cartModalNext.disabled = true
            }
        }
    })
    cartModalList.addEventListener('click', (event) => {
        if (event.target.classList.contains('products-content__item--btn')) {
            const cart = localStorage.getItem('cart') ?
                JSON.parse(localStorage.getItem('cart')) : []
            const card = event.target.closest('.products-content__item')
            const key = card.dataset.key
            const index = cart.findIndex((item) => {
                return item.id === +key
            })

            cart.splice(index, 1)

            localStorage.setItem('cart', JSON.stringify(cart))

            if (JSON.parse(localStorage.getItem('cart')).length > 0 && !cartModalNext.textContent.trim() == 'Назад' && cartModalNext.textContent.trim() == 'Оформить заказ') {
                cartModalNext.disabled = false
            } else if (JSON.parse(localStorage.getItem('cart')).length <= 0 && cartModalNext.textContent.trim() == 'Оформить заказ') {
                cartModalNext.disabled = true
            }

            renderCart(cart)

            cartTotal.textContent = cart.reduce((sum, productsItem) => {
                return sum + +productsItem.price
            }, 0)
        }
    })
    cartModalForm?.addEventListener('submit', (event) => {
        event.preventDefault();
        const cart = localStorage.getItem('cart') ?
            JSON.parse(localStorage.getItem('cart')) : []

        // console.log(cart);

        const formData = new FormData(event.target);

        const data = {
            user_name: formData.get('name'),
            contact: formData.get('contact'),
            address: formData.get('address'),
            items: []
        };

        for (let i = 0; i < cart.length; i++) {
            const el = cart[i];

            const existingItem = data.items.find(item => item.product_id === el.id);

            if (existingItem) {
                existingItem.quantity++;
                existingItem.price += el.price;
            } else {
                data.items.push({
                    product_name: el.title,
                    product_id: el.id,
                    quantity: 1,
                    price: el.price
                });
            }
        }

        postData(data)
            .then(() => {
                localStorage.removeItem('cart')
                renderCart([])
                cartTotal.textContent = 0
                cartModalForm.reset();
                cardModalOk?.classList.add('active');

                setTimeout(() => {
                    cardModalOk?.classList.remove('active');
                }, 2500);
            })
            .catch((error) => {
                console.error('Ошибка при отправке данных:', error);
                cardModalOk.innerHTML = 'Ошибка при оформлении, повторите попытку'
                cardModalOk.style.backgroundColor = 'red';
                cardModalOk.classList.add('active');

                setTimeout(() => {
                    cardModalOk?.classList.remove('active');
                }, 2500);
                cardModalOk.innerHTML = 'Заказ оформлен успешно!';
            });
    })
}

export default cart