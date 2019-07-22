Vue.component('products' ,{
	data(){
		return {
			catalogUrl: '/catalogData.json',
        	products: [],
        	filteredProducts: [],
        	imgCatalog: 'https://placehold.it/130x100',
		}
	},
	methods: {
		filterGoods() {
            let regexp = new RegExp(app.$refs.fil.searchLine, 'i');
            this.filteredProducts = this.products.filter(el => regexp.test(el.product_name));
        },
	},
	mounted() {
        this.$parent.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                    this.filteredProducts.push(el);
                }
            });
        this.$parent.getJson(`getProducts.json`)
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                    this.filteredProducts.push(el);
                }
            })
    },
    template: `<div class="products">
            <div v-if="products.length === 0">Нет данных</div>
            <product 
            v-for="el of filteredProducts" 
            :key="el.id_product"
            :img="imgCatalog"
            :product="el"></product>
        </div>`
});

Vue.component('product', {
	props: ['product', 'img'],
	template: `<div class="product-item">
                <img :src="img" :alt="product.product_name" class="item-img">
                <div class="desc">
                    <h3>{{product.product_name}}</h3>
                    <p>{{product.price}} ₽</p>
                    <button class="buy-btn" @click="$root.$refs.cart.addProduct(product)">Купить</button>
                </div>
            </div>`
});