export const state = () => ({

})

export const getters = {

}

export const mutations = {
    
}

export const actions = {
    
    getAllCategories(params) {
        return new Promise( (resolve, reject) => {
            this.$axios.get('repository?resource=all-categories')
            .then( res => { resolve(res) })
            .catch( err => { reject(err) })
        })
    },

    getAllTags(params) {
        return new Promise( (resolve, reject) => {
            this.$axios.get('repository?resource=all-tags')
            .then( res => { resolve(res) })
            .catch( err => { reject(err) })
        })
    },

}
