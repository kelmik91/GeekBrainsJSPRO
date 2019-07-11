const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

// let makeGETRequest = (url) => {
//     return new Promise((resolve, reject) => {
//         let xhr = new XMLHttpRequest();
//         xhr.open('GET', url, true);
//         xhr.onreadystatechange = () => {
//             if (xhr.readyState === 4) {
//                 if (xhr.status !== 200) {
//                     reject(`error ${xhr.status} ${xhr.statusText}`);
//                 } else {
//                     resolve(xhr.responseText);
//                 }
//             }
//         };
//         xhr.send();
//     })
// };

class Products {
    constructor(container=`.products`){
        this.container = container;
        this.data = [];
        this.allProduct = [];
        this._getProducts()
            .then(() => this._render());
    }
    _getProducts(){
        return fetch(`${API}/catalogData.json`)
            .then(result => result.json())
            .then(data => {
                this.data = [...data];
                // this._render();
            })
            .catch(error => console.log(error));
    }
    countAllProductPrice() {
        let result = 0;
        for (let i = 0; i < this.allProduct.length; i++) {
            result += +this.allProduct[i].price;
        }
        console.log(result);
        return result;
    }
    _render(){
        const block = document.querySelector(this.container);
        for (let el of this.data) {
            const product = new ProductItem(el);
            this.allProduct.push(product);
            block.insertAdjacentHTML('beforeend', product.render())
        }
    }
}

class ProductItem {
    constructor(el, img='https://placehold.it/130x120'){
        this.product_name = el.product_name;
        this.id_product = el.id_product;
        this.price = el.price;
        this.img = img;
        this.quantity = el.quantityItem;
    }
    render() {
        return `<div class="product-item">
                 <img src="${this.img}" alt="${this.product_name}" class="item-img">
                 <div class="desc">
                     <h3>${this.product_name}</h3>
                     <p>${this.price} ₽</p>
                     <button class="buy-btn">Купить</button>
                 </div>
             </div>`
    }
    renderItem() {
        return `<div class="cart__item">
                    <a href="#"><img src="${this.img}" alt="cart item image"></a>
                        <div class="info__item">
                            <h3>${this.product_name}</h3>
                            <span class="info__check">${this.quantity}  x   ${this.price}</span>
                        </div>
                    <button class="button__cart-del"></button>
                </div>`
    }
}

class Cart {
    constructor(flex = `.cart__product`){
        this.flex = flex;
        this.data = [];
        this.quantityItem = Number;
        this.cartSum = Number;
        this._getCartProducts()
            .then(() => this.renderItemCart());
    }
    _getCartProducts(){
        return fetch(`${API}/getBasket.json`)
            .then(result => result.json())
            .then(data => {
                this.data = [...data];
            })
            .catch(error => console.log(error));
    }
    renderItemCart() {
        const cartItem = document.querySelector(this.flex);
        for (let el of this.data) {
            const produ = new ProductItem(el);
            this.allProdu.push(produ);
            block.insertAdjacentHTML('beforeend', produ.renderItem())
        }
        // ProductItem.renderItem() - Рисует разметку для каждого товара в корзине
        // Добавляет кнопку быстрого уменьшнгия/удаления товара из корины по средствам removeItemCart()
    }
    removeItemCart() {
        // Уменьшение/удаление товара из корзины
    }
    addItemCart() {
        // Добавление в корзину
    }
    cartPrice() {
        // this.cartSum пересчитывает стоимось корзины
        // выводит стоимось корзины с помощью Products().countAllProductPrice()
    }
}
new Products();
new Cart();