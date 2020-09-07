export const state = () => ({
    count: 1,
})

export const actions = {
    getDataItems(context, params) {
        return new Promise( (resolve, reject) => {
            this.$axios.get('catalog', {params})
            .then( res => { resolve(res) })
            .catch( err => { reject(err) })
        })
    },

    getDataItem(context, params) {
        return new Promise( (resolve, reject) => {
            this.$axios.get(`catalog/${params.id}`)
            .then( res => { resolve(res) })
            .catch( err => { reject(err) })
        })
    },

    getRelatedProducts(context, params ) {
        console.log('aki', params)
        return new Promise( (resolve, reject) => {
            this.$axios.get(`catalog/${params.id}/related`)
            .then( res => { resolve(res) })
            .catch( err => { reject(err) })
        })
    }
}
