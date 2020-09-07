<template>

    <v-card max-width="300" class="mx-auto">
        <v-card-title primary-title class="text-center">
            <span class="text-center">Login</span>
        </v-card-title>
        <v-card-text >
            <v-btn  color="primary" dark block class=""  @click.prevent="loginFacebook">
                <v-icon class="mr-2">fab fa-facebook</v-icon>
                Facebook
            </v-btn>

            <v-btn  color="orange" dark block class="mt-3" @click.prevent="loginPassport">
                <v-icon class="mr-2">fab fa-laravel</v-icon>
                Passport
            </v-btn>
        </v-card-text>
    </v-card>
    

    

</template>

<script>
export default {

    methods: {
        loginFacebook() {
            this.$auth.loginWith('facebook')
        },
        loginPassport() {
            this.$auth.loginWith('laravel.passport')
        }
    }
}
</script>

<style>

</style>