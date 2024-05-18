const renderGoods = (products) => {
    const productsWrapper = document.querySelector('.products-content__wrapper')

    function toFormat(str) {
        return str.split('').reverse().join('')
            .match(/\d{0,3}/g).join(' ')
            .split('').reverse().join('').trim()
    }

    localStorage.setItem('products', JSON.stringify(products))

    productsWrapper.innerHTML = ''

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


    function openModal(product) {
        const modal = document.querySelector('.product__modal');
        const modalContent = document.getElementById('product__modal-content');
        modalContent.innerHTML = `
            <div class="product__modal-img">
                <img src="${product.img}" alt="img">
            </div>
            <h3 class="product__modal-title">${product.title}</h3>
            <div class="product__modal-block">
                <span class="product__modal-price">${toFormat(product.price)} сум</span>
                <span class="product__modal-count">${product.sale ? toFormat(product.count) + ' сум' : ''}</span>
            </div>
        `;
        modal.style.display = 'flex';
    }

    document.addEventListener('click', function (event) {
        if (event.target.closest('.products-content__box')) {
            const productId = event.target.closest('.products-content__item').getAttribute('data-key');
            const product = products.find(p => p.id == productId);
            openModal(product);
        }
    });

    // Закрытие модального окна
    document.querySelector('.product__modal-close').addEventListener('click', function () {
        document.getElementById('product__modal').style.display = 'none';
    });

    // Закрытие модального окна при клике вне его
    window.addEventListener('click', function (event) {
        const modal = document.getElementById('product__modal');
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });
}

export default renderGoods