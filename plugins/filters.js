import Vue from 'vue';

Vue.filter('capitalize', function (value) {
    if (!value) return ''
    value = value.toString()
    return value.charAt(0).toUpperCase() + value.slice(1)
})

Vue.filter('upper', function (value) {
    return value.toUpperCase()
})

Vue.filter('lower', function (value) {
    return value.toLowerCase()
})

Vue.filter('trimNameProduct', function(value) {
    const max = 34
    if( value.length > max ){
        return value.substring(0, max) + '...'
    }
    return value
})
