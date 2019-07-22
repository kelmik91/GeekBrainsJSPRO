Vue.component('fil', {
    data(){
        return {
            searchLine: '',
        }
    },
    template: `<div><form action="#" method="post" class="search-form">
                <input type="text" class="search-field" v-model="searchLine">
                <button class="btn-search" type="submit" @click.prevent="$root.$refs.products.filterGoods()">
                    <i class="fas fa-search"></i>
                </button>
            </form></div>`
});