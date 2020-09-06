import axios from 'axios'
axios.defaults.baseURL = process.env.URL_API

export const state = () => ({

})

export const getters = {

}

export const mutations = {
    
}

export const actions = {
    
    getAllCategories(params) {
        return new Promise( (resolve, reject) => {
            axios.get('repository?resource=all-categories')
            .then( res => { resolve(res) })
            .catch( err => { reject(err) })
        })
    },

    getAllTags(params) {
        return new Promise( (resolve, reject) => {
            axios.get('repository?resource=all-tags')
            .then( res => { resolve(res) })
            .catch( err => { reject(err) })
        })
    },

}
