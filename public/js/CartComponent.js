Vue.component('cart', {
	data(){
		return {
			cart: [],
			isVisibleCart: false,
			totalPrice: 0,
			imgCart: 'https://placehold.it/50x100',
			cartUrl: '/getBasket.json',
		}
	},
	methods: {
		addProduct(product) {
			let find = this.cart.find(el => el.id_product === product.id_product);
			if(find){
				this.$parent.putJson(`/api/cart/${find.id_product}`, {quantity: 1})
					.then(data => {
						if(data.result){
							find.quantity++;
						}
					})
			} else {
				let prod = Object.assign({quantity: 1}, product);
				this.$parent.postJson(`/api/cart`, prod)
					.then(data => {
						if(data.result){
							this.cart.push(prod);
						}
					})
			}
        },
        removeProduct(product) {
			let find = this.cart.find(el => el.id_product === product.id_product);
			if(find){
				this.$parent.putJson(`/api/cart/${find.id_product}`, {quantity: -1})
					.then(data => {
						if(data.result){
							if (product.quantity > 1) {
								product.quantity--;
							} else {
								this.$parent.delJson(`/api/cart/${find.id_product}`, contents[find]);
								this.cart.splice(this.cart.indexOf(product), 1);
							}
						}
					})
			}
            this.total();
        },
        total() {
            this.totalPrice = 0;
            for (i = 0; i < this.cart.length; i++) {
                this.totalPrice += this.cart[i].price * this.cart[i].quantity;
            }
        },
    },
    mounted(){
    	this.$parent.getJson(`/api/cart`)
    	.then(data => {
    		for (let el of data.contents) {
    			this.cart.push(el);
    		}
    	});
    },
    template: `<div>
     	<button class="btn-cart" type="button" @click="isVisibleCart = !isVisibleCart">Корзина</button>
        <div class="cart__flex" v-if="isVisibleCart">
            <div id="cart__product">
                <div v-if="cart.length === 0" class="cart__void"><h2>Корзина пуста</h2></div>
                <cart-item
                v-for="el of cart" 
                :key="el.id_product"
                :cart-item="el"
                :img="imgCart"
                @removeProduct="removeProduct"></cart-item>
            </div>
            <div class="check">
                <div class="check__total">
                    <span class="check__text">TOTAL</span>
                    <span class="check__text" id="cart_sum">{{this.totalPrice}} ₽</span>
                </div>
                <a href="#" class="check__button">Go to cart</a>
            </div>
        </div>
    </div>`
});

Vue.component('cart-item', {
	props: ['cartItem', 'img'],
	template: `<div class="cart__product-item">
                    <img :src="img" :alt="cartItem.product_name">
                    <div class="desc">
                        <h3>{{cartItem.product_name}}</h3>
                        <p>{{cartItem.price}} ₽</p>
                        <p>{{cartItem.quantity}} шт.</p>
                        <button class="buy-btn" @click="$emit('removeProduct', cartItem)">&times</button>
                    </div>
                </div>`
})