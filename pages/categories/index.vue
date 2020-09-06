<template>
    <div>
        <!-- Alert -->
        <v-snackbar
            v-model="snackbar.show"
            :color="snackbar.color"
            :timeout="snackbar.timeout"
            :top="true" :right="true"
            >
            {{ snackbar.message }}
            <template v-slot:action="{ attrs }">
                <v-btn dark text v-bind="attrs" @click="snackbar.show = false">Close</v-btn>
            </template>
        </v-snackbar>

        <!-- Modall -->
        <v-dialog v-model="dialog" persistent max-width="600px">
            <v-card>
                <v-card-title>
                    <span class="headline">{{title}}</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-text-field
                                    v-model="form.name"
                                    label="Name*"
                                    :error="form.errors.has('name')"
                                    :error-messages="form.errors.get('name')"
                                    persistent-hint
                                    required
                                ></v-text-field>
                            </v-col>
                        </v-row>
                    </v-container>
                    <small>*indicates required field</small>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text  outlined  @click="dialog = false">close</v-btn>
                    <v-btn color="primary" outlined  @click="save('create')" v-if="actionCreate">create</v-btn>
                    <v-btn color="error" outlined  @click="save('delete')" v-if="!actionCreate">delete</v-btn>
                    <v-btn color="success" outlined  @click="save('edit')" v-if="!actionCreate">edit</v-btn>

                </v-card-actions>
            </v-card>
        </v-dialog>

        <!-- List -->
        <v-card class="mx-auto" max-width="500" tile>
            <v-list :two-line="true">
                <v-subheader>{{ title }}
                    <v-chip class="ma-2 primary" small @click="openForm()">NEW</v-chip>
                </v-subheader>

                <v-list-item-group color="primary">
                
                    <v-list-item v-for="form in dataItems.data" :key="form.id" @click="openForm(form)">
                        <v-list-item-content>
                            <v-list-item-title v-html="form.name"></v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                
                </v-list-item-group>

                    <v-list-item>
                        <v-list-item-content>
                            
                            <div class="text-center">
                                <v-pagination
                                v-model="dataItems.current_page"
                                :length="dataItems.last_page"
                                :total-visible="7"
                                @input="getItems(dataItems.current_page)"
                                ></v-pagination>
                            </div>

                        </v-list-item-content>
                    </v-list-item>
            </v-list>
        </v-card>
    </div>

    
</template>

<script>
export default {

    data() {
        return {
            title: 'CATEGORIES',
            
            dataItems: {},
            dialog: false,
            actionCreate: true,

            snackbar: {
                show: false,
                message: 'snackbar',
                color: 'success', //info, danger
                timeout: 3000,
            },

            form: new this.$Form({ 
                id: '', 
                name: '', 
                _method: ''
            }),
        }
    },

    created() {
        this.getItems()
    },

    methods: {
        openForm( item={} ) {
            this.actionCreate = Object.keys(item).length===0
            this.form.clear() // clear errors
            this.form.reset() //reset fields
            if( !this.actionCreate ) this.form.fill(item)
            console.log(this.form)
            this.dialog = true
        },

        save( action='create') {

            this.form._method = action==='create'? 'POST': (action==='edit'? 'PUT': 'DELETE')
            
            let url = action==='create'? 'categories': `categories/${this.form.id}`

            this.form.post(url)
            .then( res => {
                this.snackbar.message = action==='create'? 'saved!': (action==='edit'? 'updated!': 'deleted!')
                this.snackbar.show = true
                this.dialog = false
                this.getItems( action==='delete'? 1: this.dataItems.current_page)
            })
            .catch( err => {
                if ( err.response.status!==422){
                    this.snackbar.show = true
                    this.snackbar.color = 'error'
                    this.snackbar.message = err.response.statusText
                }
            })

        },

        async getItems(page=1){
            let dataItems = await this.$store.dispatch('category/getDataItems', {page})
            this.dataItems = dataItems.data
        }
    },


}
</script>

<style>

</style>