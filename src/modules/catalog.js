import getData from "./getData"
import renderGoods from "./renderGoods"
import { categoryFillter } from "./fillters"
const catalog = () => {
    // растянуть текст категории (спан) во весь блок через стилистику что бы нажималось на весь блок !
    const catalogItem = document.querySelectorAll('.category-content__item span')

    catalogItem.forEach(item => {
        // console.log(catalogItem);
        item.addEventListener('click', () => {
            const text = item.textContent;
            // console.log(text);
            getData().then((data) => {
                renderGoods(categoryFillter(data, text))
            })
        })
    })
}

export default catalog