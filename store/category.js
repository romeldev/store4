import axios from 'axios'
axios.defaults.baseURL = process.env.URL_API

export const state = () => ({
    items: [],
})

export const getters = {

}

export const mutations = {
    
}

export const actions = {

    getDataItems() {
        return new Promise( (resolve, reject) => {
            axios.get('categories')
            .then( res => { resolve(res) })
            .catch( err => { reject(err) })
        })
    },
}
