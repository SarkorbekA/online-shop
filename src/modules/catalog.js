import getData from "./getData"
import renderGoods from "./renderGoods"
import { categoryFillter } from "./fillters"
const catalog = () => {
    // растянуть текст категории (спан) во весь блок через стилистику что бы нажималось на весь блок !
    const catalogItem = document.querySelectorAll('.category-filter')

    catalogItem.forEach(item => {
        // console.log(catalogItem);
        item.addEventListener('click', () => {
            // const text = item.textContent;
            const text = item.getAttribute('data-category');
            getData().then((data) => {
                renderGoods(categoryFillter(data, text))
            })
        })
    })
}

export default catalog