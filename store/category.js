export const state = () => ({
    items: [],
})

export const getters = {

}

export const mutations = {
    
}

export const actions = {

    getDataItems( {commit}) {
        return new Promise( (resolve, reject) => {
            this.$axios.get('categories')
            .then( res => { resolve(res) })
            .catch( err => { reject(err) })
        })
    },
}
