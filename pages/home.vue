<template>
    <div>
        <div v-if="this.$auth.loggedIn">
            {{ this.$auth.user.name }}
            <!-- <img :src="this.$auth.user.picture.data.url" /> -->
        </div>

        <div v-else>
            No logeado
        </div>
    </div>
</template>

<script>

export default {
    mounted() {
        console.log('auth', this.$auth)
        // console.log('token', this.$auth.getToken('laravel.passport') )
        this.getUser()
        this.getCategories()
        this.getCategories2()
    },

    methods: {
        getUser(){
            this.$axios.get('user')
            .then( res => {
                console.log('user', res)
            })
            .catch( err => {
                console.log('err', err)
            })
        },

        getCategories() {
            this.$axios.get('categories')
            .then( res => {
                console.log('category', res)
            })
            .catch( err => {
                console.log('err', err)
            })
        },

        async getCategories2() {
            let dataItems = await this.$store.dispatch('category/getDataItems', {page:1})
            console.log('category2', dataItems)
        }
    }
}
</script>
