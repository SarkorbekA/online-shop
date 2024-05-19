import { toFormat } from "./fillters"


const renderGoods = (products) => {
    const productsWrapper = document.querySelector('.products-content__wrapper')

    localStorage.setItem('products', JSON.stringify(products))

    productsWrapper.innerHTML = ''

    let lang = localStorage.getItem('lang');

    if (lang == 'ru') {
        products.forEach((productsItem) => {
            productsWrapper.insertAdjacentHTML('beforeend', `
            <div class="products-content__item products-content__item--scroll" data-key="${productsItem.id}">
                ${productsItem.sale ? '<div class="products-content__item--sale"><span>Акция</span></div>' : ''}
                <div class="products-content__box">
                    <img src="${productsItem.img}" alt="img" class="products-content__item--img">
                    <h3 class="products-content__item--name">${productsItem.title}</h3>
                    <div class="products-content__item--discount">
                        <span class="products-content__item--price">${toFormat(productsItem.price)} сум</span>
                        <span class="products-content__item--price--old">${productsItem.sale ? toFormat(productsItem.count) + ' сум' : ''}</span>
                    </div>
                </div>
                <button type="button" class="btn products-content__item--btn">В корзину</button>
            </div>
            `)
        })
    } else if (lang == 'uz') {
        products.forEach((productsItem) => {
            productsWrapper.insertAdjacentHTML('beforeend', `
            <div class="products-content__item products-content__item--scroll" data-key="${productsItem.id}">
                ${productsItem.sale ? '<div class="products-content__item--sale"><span>Aksiya</span></div>' : ''}
                <div class="products-content__box">
                    <img src="${productsItem.img}" alt="img" class="products-content__item--img">
                    <h3 class="products-content__item--name">${productsItem.title}</h3>
                    <div class="products-content__item--discount">
                        <span class="products-content__item--price">${toFormat(productsItem.price)} sum</span>
                        <span class="products-content__item--price--old">${productsItem.sale ? toFormat(productsItem.count) + ' sum' : ''}</span>
                    </div>
                </div>
                <button type="button" class="btn products-content__item--btn">Savatga</button>
            </div>
            `)
        })
    }


    const modal = document.querySelector('.product__modal');
    const modalContent = document.querySelector('.product__modal-wrapper');


    function openModal(product) {
        modalContent.setAttribute('data-key', product.id);

        if (lang == 'ru') {
            modalContent.innerHTML = `
                <span class="product__modal-close">
                    <img src="./assets/img/icon-close.svg" alt="">
                </span>
                <div class="product__modal-content" id="product__modal-content">
                    <div class="product__modal-img">
                        <img src="${product.img}" alt="img">
                    </div>
                    <div class="product__modal-details">
                        <h3 class="product__modal-title">Название: <span>${product.title}</span> </h3>
                        <div class="product__modal-block">
                            <span class="product__modal-price">Цена: <span>${toFormat(product.price)} сум</span></span>
                            <span class="product__modal-count">${product.sale ? toFormat(product.count) + ' сум' : ''}</span>
                        </div>
                        <button type="button" class="product__modal-btn btn">В корзину</button>
                    </div>
                </div>
            `;
        } else if (lang == 'uz') {
            modalContent.innerHTML = `
                ${product.sale ? '<div class="product__modal-sale"><span>Aksiya</span></div>' : ''}
                <span class="product__modal-close">
                    <img src="./assets/img/icon-close.svg" alt="">
                </span>
                <div class="product__modal-content" id="product__modal-content">
                    <div class="product__modal-img">
                        <img src="${product.img}" alt="img">
                    </div>
                    <div class="product__modal-details">
                        <h3 class="product__modal-title">Nomi: <span>${product.title}</span> </h3>
                        <div class="product__modal-block">
                            <span class="product__modal-price">Narxi: <span>${toFormat(product.price)} sum</span></span>
                            <span class="product__modal-count">${product.sale ? toFormat(product.count) + ' sum' : ''}</span>
                        </div>
                        <button type="button" class="product__modal-btn btn">Savatga</button>
                    </div>
                </div>
            `;
        }
        modal.style.display = 'flex';
    }

    document.addEventListener('click', function (event) {
        if (event.target.closest('.products-content__box')) {
            const productId = event.target.closest('.products-content__item').getAttribute('data-key');
            const product = products.find(p => p.id == productId);
            openModal(product);
        }
    });

    modalContent.addEventListener('click', (event) => {
        if (event.target.closest('.product__modal-close')) {
            document.getElementById('product__modal').style.display = 'none';
        }
    })

    const closeLayer = document.querySelectorAll('.product__modal-filter');

    closeLayer.forEach(el => {
        el.addEventListener('click', function () {
            document.getElementById('product__modal').style.display = 'none';
        });
    });
}

export default renderGoods