class Products {
    constructor(container=`.products`){
        this.container = container;
        this.data = [];
        this.allProduct = [];
        this.init();
    }
    init(){
        this._fetchProducts();
        this._render();
        this.countAllProductPrice();
    }
    _fetchProducts(){
        this.data = [
            {id: 1, title: 'Notebook', price: 2000},
            {id: 2, title: 'Keyboard', price: 200},
            {id: 3, title: 'Mouse', price: 47},
            {id: 4, title: 'Gamepad', price: 87},
            {id: 5, title: 'Chair', price: 187},
        ];
    }
    countAllProductPrice() {
        let result = 0;
        for (let i = 0; i < this.allProduct.length; i++)
            result += +this.allProduct[i].price;
        console.log(result);
        const cartHeader = document.querySelector('.products-sum');
        cartHeader.innerHTML = `Сумма всех товаров: ${result} ₽`;
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
        this.title = el.title;
        this.id = el.id;
        this.price = el.price;
        this.img = img;
    }
    render() {
        return `<div class="product-item">
                 <img src="${this.img}" alt="${this.title}" class="item-img">
                 <div class="desc">
                     <h3>${this.title}</h3>
                     <p>${this.price} ₽</p>
                     <button class="buy-btn">Купить</button>
                 </div>
             </div>`
    }
}

class Cart {
    constructor(){
        // this.cart Массив с добавленными в корзину товарами
        // this.quantityItem Количество товаров в корзине
        // this.cartSum Стоимость корзины
    }
    renderCart() {
        // Шаблон разметки выпадающей корзины
    }
    renderCartArea() {
        // Рисует разметку корзины при клике на кнопку
    }
    renderItem() {
        // Шаблон разметки для товара в корзине
    }
    renderItemCart() {
        // Рисует разметку для каждого товара в корзине
        // Добавляет кнопку быстрого уменьшнгия/удаления товара из корины по средствам removeItemCart()
    }
    removeItemCart() {
        // Уменьшение/удаление товара из корзины
    }
    addItemCart() {
        // Добавление в корзину
    }
    cartPrice() {
        // пересчитывает и выводит стоимось корзины с помощью Products().countAllProductPrice()
    }
}
new Products();