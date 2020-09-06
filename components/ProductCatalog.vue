<template>
    <v-card class="mx-auto" max-width="374" @click.prevent="goProduct()">
        <v-img height="160" contain :src="item.image"></v-img>

        <v-card-title class="card-title p-0" :title="item.name">{{item.name |trimNameProduct }}</v-card-title>

        <v-card-text class="card-body">
            <v-row align="center" class="mx-0" >
                <v-rating
                :value="4.5"
                color="amber"
                dense
                half-increments
                readonly
                size="14"
                ></v-rating>
                <div class="grey--text ml-4">4.5 (413)</div>
            </v-row>

            <div class="subtitle-2 " 
                v-if="item.price_ref!==null">
                S/. <span class="text-decoration-line-through">{{item.price_ref}}</span>
                <v-chip small class="success">{{item.discount.toFixed(0)}}%</v-chip>
            </div>

            <div class=" subtitle-1 red--text">
                S/. {{item.price}}
            </div>
        </v-card-text>

        <!-- <v-card-actions>
            <v-btn color="deep-purple lighten-2" text>show</v-btn>
        </v-card-actions> -->
    </v-card>
</template>

<script>
export default {
    props: ['item'],

    created() {
        console.log('aki',this.item);
    },

    methods: {
        goProduct( item ) {
            this.$router.push({ name: 'catalog-id', params: {id: this.item.id} })
        },
    }
}
</script>

<style>
    .card-title {
        min-height: 96px;
    }

    .card-body {
        min-height: 90px;
    }
</style>