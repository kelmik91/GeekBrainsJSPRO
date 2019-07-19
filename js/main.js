const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',
    data: {
        catalogUrl: '/catalogData.json',
        products: [],
        imgCatalog: 'https://placehold.it/130x100',
        cart: [],
        searchLine: '',
        filteredProducts: [],
        isVisibleCart: false,
        totalPrice: 0
    },
    methods: {
        getJson(url){
            return fetch(url)
                .then(result => result.json())
                .catch(error => console.log(error));
        },
        addProduct(product) {
            let find = this.cart.find(el => el.id_product === product.id_product);
            if (!find) {
                let cartPush = this.cart.push(product);
                this.cart[cartPush - 1].quantity = 1;
            } else {
                find.quantity++;
            }
            this.total();
        },
        removeProduct(product) {
            let find = this.cart.find(el => el.id_product === product.id_product);
            if (find.quantity === 1) {
                this.cart.splice(product, 1);
            } else {
                find.quantity--;
            }
            this.total();
        },
        filterGoods() {
            let regexp = new RegExp(this.searchLine, 'i');
            this.filteredProducts = this.products.filter(el => regexp.test(el.product_name));
        },
        total() {
            this.totalPrice = 0;
            for (i = 0; i < this.cart.length; i++) {
                this.totalPrice += this.cart[i].price * this.cart[i].quantity;
            }
        },
    },
    computed: {
    },
    mounted() {
        this.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                    this.filteredProducts.push(el);
                }
            });
        this.getJson(`getProducts.json`)
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                    this.filteredProducts.push(el);
                }
            })
    }
});