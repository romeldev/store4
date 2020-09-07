<template>
    <v-app dark>
        <!-- Navegacion izquierda -->
        <v-navigation-drawer v-model="drawer" :mini-variant="miniVariant" :clipped="clipped" fixed app>
            <v-list>
                <v-list-item v-for="(item, i) in items" :key="i" :to="item.to" router exact>
                    <v-list-item-action>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title v-text="item.title" />
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>

        <!-- Navegacion head -->
        <v-app-bar :clipped-left="clipped" fixed app>
            <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
            <v-btn icon @click.stop="miniVariant = !miniVariant">
                <v-icon>fas fa-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
            </v-btn>
            <v-btn icon @click.stop="clipped = !clipped">
                <v-icon>far fa-window-maximize</v-icon>
            </v-btn>
            <v-btn icon @click.stop="fixed = !fixed">
                <v-icon>fas fa-minus</v-icon>
            </v-btn>
            <v-toolbar-title v-text="title">
            </v-toolbar-title>
            <span class="ml-3">
                Login: {{ this.$auth.loggedIn }}
            </span>

            <v-spacer />
            <v-btn icon @click.stop="rightDrawer = !rightDrawer">
                <v-icon>fas fa-bars</v-icon>
            </v-btn>
        </v-app-bar>

        <!-- Main Content -->
        <v-main>
            <v-container>
                <nuxt />
            </v-container>
        </v-main>
    
        <!-- Navegacion derecha -->
        <v-navigation-drawer v-model="rightDrawer" :right="right" temporary fixed>
            <v-list>
                <v-list-item @click.native="right = !right">
                    <v-list-item-action>
                        <v-icon light>fas fa-redo</v-icon>
                    </v-list-item-action>
                    <v-list-item-title>Switch drawer (click me)</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>

        <!-- Footer -->
        <v-footer :absolute="!fixed" app>
            <span>&copy; {{ new Date().getFullYear() }}</span>
        </v-footer>
    </v-app>

    
</template>

<script>
export default {
    data () {
        return {
            clipped: false,
            drawer: false,
            fixed: false,
            items: [
                { title: 'Home', to: '/home', icon: 'fas fa-home' },
                { title: 'Catalog', to: '/catalog', icon: 'fas fa-th-list' },
                { title: 'Products', to: '/products', icon: 'fas fa-box-open' },
                { title: 'Categories', to: '/categories', icon: 'fas fa-folder-open' },
                { title: 'Tags', to: '/tags', icon: 'fas fa-tags' },
                { title: 'Logout', to: '/logout', icon: 'fas fa-sign-out-alt' },
            ],
            miniVariant: false,
            right: true,
            rightDrawer: false,
            title: 'MyStore'
        }
    },

    computed: {

    },

    methods: {

    }
}
</script>
