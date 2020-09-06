<template>
    <div>
        <v-row>
            <v-col cols="12" sm="6">
                <v-carousel
                    height="400"
                    show-arrows-on-hover
                    reverse-transition="fade-transition"
                    continuous
                >
                    <v-carousel-item v-for="photo in item.photos" :key="photo.id" >
                        <v-img height="400" contain :src="photo.url"></v-img>
                    </v-carousel-item>
                </v-carousel>
            </v-col>

            <v-col cols="12" sm="6">
                <v-card>
                    <v-card-title class="card-title p-0" :title="item.name">{{item.name | capitalize }}</v-card-title>
                    <v-card-text>
                        <p> {{item.descrip}}</p>

                        <div class="subtitle-2" v-if="item.price_ref!==null">
                            S/. <span class="text-decoration-line-through">{{item.price_ref}}</span>
                            <v-chip small class="success">{{item.discount.toFixed(0)}}%</v-chip>
                        </div>

                        <div class=" subtitle-1 red--text">
                            S/. {{item.price}}
                        </div>

                        <v-row class="mt-1">
                            <v-col cols="12" sm="4">
                                <v-select
                                v-model="amount"
                                :items="amount_options"
                                label="Amount*"
                                dense
                                outlined
                                small
                                ></v-select>
                            </v-col>
                            <v-col cols="12" sm="8">
                                <v-btn color="warning" dark block >Add to card</v-btn>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>

        <v-divider></v-divider>
        <h3 class="my-5">{{ 'related products that might interest you' | upper }}</h3>
        <v-row>
            <v-col cols="12" sm="6" md="4" lg="3" v-for="item in related_items" :key="item.id">
                <ProductCatalog :item="item" />
            </v-col>
        </v-row>

        

    </div>
</template>

<script>

export default {

    data() {
        return {
            title: 'product',
            item: {},
            meta: [],
            amount_options: [1,2,3,4,5],
            amount: 1,
            related_items: [],
        }
    },

    head() {
        let head = {}
        head.title = this.item.name
        
        head.meta = [
            {
                hid: 'title',
                name: 'title',
                content: this.item.name,
            },
            {
                hid: 'description',
                name: 'description',
                content: this.item.descrip
            },
            {
                hid: 'image',
                name: 'image',
                content: this.item.image
            }
        ]

        return head
    },

    async asyncData({  app, params, store }) {
        let item =  await store.dispatch('catalog/getDataItem', params)
        item = item.data.data;
        return { item }
    },

    mounted() {
        this.getRelatedProducts();
    },

    methods: {
        async getRelatedProducts(){
            let params = this.$route.params
            let dataItems = await this.$store.dispatch('catalog/getRelatedProducts', params)
            this.related_items = dataItems.data.data;
        }
    },

}
</script>

<style>

</style>