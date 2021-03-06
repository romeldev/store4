import colors from 'vuetify/es5/util/colors'
require('dotenv').config()

export default {
    /*
    ** Nuxt rendering mode
    ** See https://nuxtjs.org/api/configuration-mode
    */
    mode: 'universal',
    /*
    ** Nuxt target
    ** See https://nuxtjs.org/api/configuration-target
    */
    target: 'server',
    /*
    ** Headers of the page
    ** See https://nuxtjs.org/api/configuration-head
    */
    head: {
        // titleTemplate: '%s - ' + process.env.npm_package_name,
        title: process.env.npm_package_name || '',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
        ]
    },
    /*
    ** Global CSS
    */
    css: [
        '~/assets/fonts.css'
    ],
    /*
    ** Plugins to load before mounting the App
    ** https://nuxtjs.org/guide/plugins
    */
    plugins: [
        '@/plugins/filters.js',
        '@/plugins/vform.js',
        '@/plugins/icons.js',
    ],
    /*
    ** Auto import components
    ** See https://nuxtjs.org/api/configuration-components
    */
    components: true,
    /*
    ** Nuxt.js dev-modules
    */
    buildModules: [
        '@nuxtjs/vuetify',
        '@nuxtjs/dotenv',
    ],
    /*
    ** Nuxt.js modules
    */
    modules: [
        // Doc: https://axios.nuxtjs.org/usage
        '@nuxtjs/axios',
        // '@nuxtjs/pwa',
        ['@nuxtjs/pwa', {icon: false }],
        '@nuxtjs/auth',
    ],

    auth: {
        strategies: {
            facebook: {
                client_id: process.env.FACEBOOK_CLIENT_ID,//app_id
                userinfo_endpoint: process.env.FACEBOOK_USER_ENDPOINT,
                scope: ['public_profile', 'email', 'user_birthday']
            },
            'laravel.passport': {
                url: process.env.URL_API,
                client_id: process.env.PASSPORT_CLIENT_ID,
                client_secret: process.env.PASSPORT_CLIENT_SECRET,
                userinfo_endpoint: process.env.URL_API+'/api/user',
            },
        }
    },
    /*
    ** Axios module configuration
    ** See https://axios.nuxtjs.org/options
    */
    axios: {
        baseURL: process.env.URL_API+'/api/',
        // credentials: true,
    },

    

    /*
    ** vuetify module configuration
    ** https://github.com/nuxt-community/vuetify-module
    */
    vuetify: {
        defaultAssets:false, //ofline
        customVariables: ['~/assets/variables.scss'],
        theme: {
            dark: false,
            themes: {
                dark: {
                    primary: colors.blue.darken2,
                    accent: colors.grey.darken3,
                    secondary: colors.amber.darken3,
                    info: colors.teal.lighten1,
                    warning: colors.amber.base,
                    error: colors.deepOrange.accent4,
                    success: colors.green.accent3
                }
            }
        },

        icons: {
            iconfont: 'mdiSvg',
        },
    },
    /*
    ** Build configuration
    ** See https://nuxtjs.org/api/configuration-build/
    */
    build: {
    }
}
