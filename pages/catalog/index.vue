<template>
    <v-row>
        <v-col cols="12" sm="6" md="4" lg="3" v-for="item in items" :key="item.id">
            <ProductCatalog :item="item" />
        </v-col>
    </v-row>
</template>

<script>
import ProductCatalog from '@/components/ProductCatalog'

export default {
    components: {
        ProductCatalog,
    },

    data() {
        return {
            title: 'CATALOG',
            search: '',
            items: [],
        }
    },

    async asyncData({ query, store }) {
        let params = {
            page: query.page==null? 1: query.page,
            search: query.search==null? '': query.search,
        }
        let dataItems = await store.dispatch('catalog/getDataItems', params )
        let items = dataItems.data.data;
        return { items }
    },

    head() {
        let head = {}
        head.title = this.title

        head.meta = [
            {
                hid: 'title',
                name: 'title',
                content: this.title,
            },
            {
                hid: 'description',
                name: 'description',
                content: 'Encuentra los mejores productos en nuestro catalago virtual!'
            },
            {
                property: 'og:image',
                content: 'https://greatperformersacademy.com/images/images/Articles_images/Top-products-sell-online-2018.jpg'
            }
        ]
        return head;
    },

    created() {
        // this.getItems()
    },

    methods: {
        async getItems(page=1){
            let params = {
                page: query.page==null? 1: query.page,
                search: this.search,
            }

            let dataItems = await this.$store.dispatch('catalog/getDataItems', params)
            this.items = dataItems.data.data;
        }
    },
}
</script>

<style>
    
</style>