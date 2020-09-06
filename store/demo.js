import axios from 'axios'
axios.defaults.baseURL = process.env.URL_API

export const state = () => ({
    count: 1,
    items: [],
})

// calcular el estado derivado en función del estado de la tienda
export const getters = {
    getCount:  (state) => {
        return state.count
    }
}


// La única forma de cambiar el estado en una tienda Vuex es realizando una mutación
// Las mutaciones deben ser sincrónicas
export const mutations = {
    increment( state, amount=1 ) {
        state.count = state.count+amount
    }
}

// Las acciones cometen muaciones
// Las acciones pueden ser asincronicas
// El 'context' expone: context.commit, context.state, context.getters, context.dispatch
export const actions = {
    increment (context, amount=1) {
        context.commit('increment', amount)
    },

    save(context, params) {
        let item = params.params
        let url = item.id===''? 'categories': `categories/${item.id}`
        return new Promise( (resolve, reject) => {
            axios.post(url, item)
            .then( res => {
                resolve(res)
            })
            .catch( err => {
                reject(err)
            })
        })
    },

    getDataItems(context, params) {
        return new Promise( (resolve, reject) => {
            axios.get('categories', {params})
            .then( res => {
                resolve(res)
            })
            .catch( err => {
                reject(err)
            })
        })
    },



    getDataItem(context, params) {
        return new Promise( (resolve, reject) => {
            axios.get(`categories/${params.id}`)
            .then( res => {
                resolve(res)
            })
            .catch( err => {
                reject(err)
            })
        })
    }
}
