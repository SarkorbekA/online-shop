import { toFormat } from "./fillters"

const renderCart = (products) => {
    const cartWrapper = document.querySelector('.cart-modal__list')

    cartWrapper.innerHTML = '';
    let lang = localStorage.getItem('lang');

    if (products.length === 0) {
        cartWrapper.insertAdjacentHTML('beforeend', `
            <div class="cart-empty">
                Ваша корзина пустая
            </div>
        `)
    } else {
        if (lang == 'ru') {
            products.forEach((productsItem) => {
                cartWrapper.insertAdjacentHTML('beforeend', `
                <div class="products-content__item products-content__item--scroll" data-key="${productsItem.id}">
                    ${productsItem.sale ? '<div class="products-content__item--sale"><span>Акция</span></div>' : ''}
                    <img src="${productsItem.img}" alt="img" class="products-content__item--img">
                    <h3 class="products-content__item--name">${productsItem.title}</h3>
                    <div class="products-content__item--discount">
                        <span class="products-content__item--price">${toFormat(productsItem.price)} сум</span>
                        <span class="products-content__item--price--old">${productsItem.sale ? toFormat(productsItem.count) + ' сум' : ''}</span>
                    </div>
                    <div class="quantity-control">
                        <button type="button" class="btn quantity-control__btn quantity-control__btn--decrease">-</button>
                        <span class="quantity-control__quantity">${productsItem.quantity}</span>
                        <button type="button" class="btn quantity-control__btn quantity-control__btn--increase">+</button>
                    </div>
                </div>
                `)
            })
        } else if(lang == 'uz'){
            products.forEach((productsItem) => {
                cartWrapper.insertAdjacentHTML('beforeend', `
                <div class="products-content__item products-content__item--scroll" data-key="${productsItem.id}">
                    ${productsItem.sale ? '<div class="products-content__item--sale"><span>Aksiya</span></div>' : ''}
                    <img src="${productsItem.img}" alt="img" class="products-content__item--img">
                    <h3 class="products-content__item--name">${productsItem.title}</h3>
                    <div class="products-content__item--discount">
                        <span class="products-content__item--price">${toFormat(productsItem.price)} sum</span>
                        <span class="products-content__item--price--old">${productsItem.sale ? toFormat(productsItem.count) + ' sum' : ''}</span>
                    </div>
                    <div class="quantity-control">
                        <button type="button" class="btn quantity-control__btn quantity-control__btn--decrease">-</button>
                        <span class="quantity-control__quantity">${productsItem.quantity}</span>
                        <button type="button" class="btn quantity-control__btn quantity-control__btn--increase">+</button>
                    </div>
                </div>
                `)
            })
        }
    }
}

export default renderCart;
