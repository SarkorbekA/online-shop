import axios from 'axios';
import getData from "./getData";
import { searchFillter } from "./fillters";

const admin = () => {

    const storedPassword = localStorage.getItem('adminPassword');
    if (!storedPassword || storedPassword !== "123") {
        window.location.href = 'login.html';
    }

    const logOut = document.querySelector('.logout-btn');

    logOut.addEventListener('click', () => {
        localStorage.removeItem('adminPassword');
        window.location.href = 'login.html';
    })

    let form = document.querySelector('.admin__create-form');


    form?.addEventListener('submit', function (event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        let productId = formData.get('productId');

        let sale = formData.get('sale') === 'on';
        if (sale === true) {
            sale = 1
        } else if (sale === false) {
            sale = 0
        }
        formData.set('sale', sale);


        const imgFileInput = document.getElementById('img');
        const file = imgFileInput.files[0];
        formData.set('img', file);

        // const method = productId ? 'PUT' : 'POST';
        const method = 'POST';
        const url = productId ? `https://api.mirpodarkov-navoi.uz/api/products/${productId}?_method=PUT` : 'https://api.mirpodarkov-navoi.uz/api/products';


        axios({
            method: method,
            url: url,
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(function (response) {
                let message = response.data.message;
                console.log(response);
                productId = null;
                document.querySelector('.admin__create-log').innerHTML = message;
                document.querySelector('.admin__create-form').reset();

                getProducts()
            })
            .catch(function (error) {
                let errorMessage = 'Ошибка при ' + (method === 'POST' ? 'создании' : 'обновлении') + ' продукта';
                console.error(errorMessage + ':', error);
                document.querySelector('.admin__create-log').innerHTML = errorMessage;
            });
    });


    function updateProduct(productId) {
        console.log('Выбран продукт с ID:', productId);

        axios.get(`https://api.mirpodarkov-navoi.uz/api/products/${productId}`)
            .then(response => {
                const productData = response.data.data;

                document.getElementById('productId').value = productId;
                document.getElementById('title').value = productData.title;
                document.getElementById('price').value = productData.price;
                document.getElementById('sale').checked = productData.sale;
                document.getElementById('count').value = productData.count;
                // document.getElementById('img').files = 'http://127.0.0.1:8000/api/products/images/bhVuMtoQ4M8nLpZHGGLcqU842McEbmQlaw7m08nh.jpg';
                document.getElementById('category').value = productData.category


                var imageURL = productData.img;

                fetch(imageURL)
                    .then(response => response.blob())
                    .then(blob => {
                        console.log(blob);
                        var file = new File([blob], 'image.jpg', { type: 'image/jpeg' });
                        var fileList = new DataTransfer();
                        fileList.items.add(file);
                        var input = document.getElementById('img');
                        input.files = fileList.files;
                    })
                    .catch(error => console.error('Error:', error));

                // document.querySelector('#form').scrollIntoView({ behavior: 'smooth' })

                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });

            })
            .catch(error => {
                console.error('Ошибка при получении данных о продукте:', error);
            });
    }

    function deleteProduct(productId) {
        axios.delete(`https://api.mirpodarkov-navoi.uz/api/products/${productId}`)
            .then(response => {
                console.log('Продукт успешно удален');
                getProducts()
            })
            .catch(error => {
                console.error('Ошибка при удалении продукта:', error);
            });
    }

    let emptyProducts = document.querySelector('.products__list-empty');
    const productsBox = document.querySelector('.products__list');
    const searchInput = document.querySelector('.products__search-item')

    const search = () => {
        searchInput.addEventListener('input', (event) => {

            const valueInput = event.target.value;
            let searchedProducts;

            getData().then((data) => {
                searchedProducts = searchFillter(data, valueInput)
                if (searchedProducts.length > 0) {
                    emptyProducts.classList.add('active')
                    renderProducts(searchedProducts)
                } else {
                    productsBox.innerHTML = ''
                    emptyProducts.classList.remove('active')
                }
            })
        })
    }

    function getProducts() {
        getData().then((data) => {
            if (data.length > 0) {
                emptyProducts.classList.add('active')
                renderProducts(data)
                searchInput.disabled = false;
            } else {
                productsBox.innerHTML = ''
                emptyProducts.classList.remove('active')
                searchInput.disabled = true;
            }
        })
    }

    const renderProducts = (data) => {

        productsBox.innerHTML = ''

        data.forEach((productsItem) => {
            productsBox.insertAdjacentHTML('beforeend', `
            <li class="products__list-item">
                <div class="product__img">
                    <img src="${productsItem.img}" alt="img" class="product__img-item">
                </div>
                <div class="product-id">Id: ${productsItem.id}</div>
                <h3 class="product-title">Название: ${productsItem.title}</h3>
                <div class="product-price">Цена: ${productsItem.price} сум</div>
                <div class="product-price--old">Прежняя цена: ${productsItem.count ? productsItem.count : 'Актуальная цена'} сум</div>
                <div class="product-category">Категория: ${productsItem.category}</div>
                <div class="product-sale">Есть ли скидка: ${productsItem.sale ? 'Да' : 'Нет'}</div>
                <div class="product__buttons">
                <button class="product__buttons-item update-button" data-product-id="${productsItem.id}">Обновить</button>
                <button class="product__buttons-item delete-button" data-product-id="${productsItem.id}">Удалить</button>
                </div>
            </li>`)
        })


        const updateButton = productsBox.querySelectorAll('.update-button');
        for (let i = 0; i < updateButton.length; i++) {
            updateButton[i].addEventListener('click', function () {
                const productId = this.getAttribute('data-product-id');
                updateProduct(productId);
            });
        }

        const deleteButton = productsBox.querySelectorAll('.delete-button');
        for (let i = 0; i < updateButton.length; i++) {
            deleteButton[i].addEventListener('click', function () {
                const productId = this.getAttribute('data-product-id');
                deleteProduct(productId);
            });
        }
    }

    search()

    getProducts()
}

export default admin;

