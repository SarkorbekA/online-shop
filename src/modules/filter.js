import getData from "./getData"
import renderGoods from "./renderGoods"
import { priseFillter, checkedFillter } from "./fillters"
const filter = () => {
    let filter = document.querySelector('.navbar-nav__filter')
    let filterWrapper = document.querySelector('.navbar-nav__filter--wrapper')
    let filterLabel = document.querySelector('.navbar-nav__filter--list--label')
    let filterCheckbox = document.getElementById('discount')
    let filterChecked = document.querySelector('.navbar-nav__filter--list--checked')
    let minInput = document.getElementById('min')
    let maxInput = document.getElementById('max')


    function formatNumber(input) {
        let value = input.value;
        value = value.replace(/\D/g, '');
        if (value.length > 3) {
            value = value.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        }
        input.value = value;
    }

    filterWrapper.addEventListener('click', () => {
        filter.classList.toggle('active')
    })

    filterLabel.addEventListener('click', () => {
        if (filterCheckbox.checked) {
            filterChecked.style = 'display: block'
        } else {
            filterChecked.style = 'display: none'
        }
    })

    minInput.addEventListener('input', () => {
        formatNumber(minInput);
        getData().then((data) => {
            renderGoods(priseFillter(checkedFillter(data, filterCheckbox.checked), minInput.value, maxInput.value))
        })
    })

    maxInput.addEventListener('input', () => {
        formatNumber(maxInput);
        getData().then((data) => {
            renderGoods(priseFillter(checkedFillter(data, filterCheckbox.checked), minInput.value, maxInput.value))
        })
    })

    filterCheckbox.addEventListener('change', () => {
        getData().then((data) => {
            renderGoods(priseFillter(checkedFillter(data, filterCheckbox.checked), minInput.value, maxInput.value))
        })
    })

}

export default filter