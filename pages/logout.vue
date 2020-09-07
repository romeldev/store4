<template>
    <div>
        Logout...
    </div>
</template>

<script>
export default {
    beforeCreate() {
        this.$auth.logout().then( () => {
            this.$router.replace('login')
        })
    },
}
</script>

<style>

</style>