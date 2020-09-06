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

        <!-- Modal -->
        <v-dialog v-model="dialog" persistent max-width="600px">
            <v-card>
                <v-card-title>
                    <span class="headline">
                        {{title}}
                    </span>
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

                            <v-col cols="12">
                                <v-select
                                    v-model="form.category.id"
                                    label="Category*"
                                    :error="form.errors.has('category.id')"
                                    :error-messages="form.errors.get('category.id')"
                                    persistent-hint
                                    required
                                    :items="categories"
                                    item-text="name"
                                    item-value="id"
                                ></v-select>
                            </v-col>

                            

                            <v-col cols="12">
                                <v-text-field
                                    v-model="form.descrip"
                                    label="Description"
                                    :error="form.errors.has('descrip')"
                                    :error-messages="form.errors.get('descrip')"
                                    persistent-hint
                                    required
                                ></v-text-field>
                            </v-col>

                            <v-col cols="12" sm="6">
                                <v-text-field
                                    v-model="form.price"
                                    label="Price*"
                                    :error="form.errors.has('price')"
                                    :error-messages="form.errors.get('price')"
                                    persistent-hint
                                    required
                                ></v-text-field>
                            </v-col>

                            <v-col cols="12" sm="6">
                                <v-text-field
                                    v-model="form.price_ref"
                                    label="Price Ref"
                                    :error="form.errors.has('price_ref')"
                                    :error-messages="form.errors.get('price_ref')"
                                    persistent-hint
                                    required
                                ></v-text-field>
                            </v-col>

                            <v-col cols="12">
                                <v-select
                                    v-model="form.tags"
                                    label="Tags"
                                    :error="form.errors.has('tags')"
                                    :error-messages="form.errors.get('tags')"
                                    persistent-hint
                                    required
                                    :items="tags"
                                    item-text="name"
                                    item-value="id"
                                    multiple chips
                                ></v-select>
                            </v-col>

                            <v-col cols="12">
                                <v-file-input
                                    v-model="form.new_photos"
                                    small-chips 
                                    multiple label="New Photos"
                                ></v-file-input>
                            </v-col>

                            <v-col cols="12">
                                <v-progress-linear v-model="uploading"  height="25" v-if="uploading!==-1">
                                    <template v-slot="{ value }">
                                        <strong>{{ Math.ceil(value) }}%</strong>
                                    </template>
                                </v-progress-linear>
                            </v-col>

                        </v-row>

                        <v-row>
                            <v-col cols="12" sm="6" v-for="photo in form.photos" :key="photo.id">
                                <a href="#" @click.prevent="deletePhoto(photo)" title="delete">
                                    <v-img :src="photo.url" 
                                        height="125" 
                                        contain style="border: 4px solid #ddd;"> 
                                    </v-img>
                                </a>
                            </v-col>
                        </v-row>
                    </v-container>
                    <small>*indicates required field</small>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn @click="dialog = false">close</v-btn>
                    <v-btn @click="save('create')" :disabled="saving" v-if="actionCreate">create</v-btn>
                    <v-btn @click="save('delete')" :disabled="saving" v-if="!actionCreate">delete</v-btn>
                    <v-btn @click="save('edit')" :disabled="saving" v-if="!actionCreate">edit</v-btn>

                </v-card-actions>
            </v-card>
        </v-dialog>

        <!-- Table -->
        <v-card>
            <v-card-title>
                {{title}} <v-chip small class="ma-2 primary" @click="openForm()">New</v-chip>
                <v-spacer></v-spacer>
                <v-text-field
                    v-model="search"
                    label="Search"
                    append-icon="mdi-magnify"
                    single-line
                    hide-details
                    v-on:keyup.enter="getItems()"
                ></v-text-field>
            </v-card-title>
            <v-data-table
                :headers="headers"
                :items="dataItems.data"
                :loading="loading"
                hide-default-footer
                loading-text="wait...">

                <template v-slot:[`item.actions`]="{ item }">
                    <v-icon small class="mr-2" @click="openForm(item)">fa-pen</v-icon>
                    <v-icon small class="mr-2" @click="openForm(item)">mdi-pencil</v-icon>
                </template>

                <template v-slot:[`item.discount`]="{ item }">
                    <v-chip class="success" small v-if="item.discount!==null">{{item.discount.toFixed(2)}}</v-chip>
                </template>


            </v-data-table>


            <div class="text-center">
                <v-pagination
                v-model="dataItems.meta.current_page"
                :length="dataItems.meta.last_page"
                :total-visible="7"
                @input="getItems(dataItems.meta.current_page)"
                ></v-pagination>
            </div>
        </v-card>
    </div>
</template>

<script>
import { objectToFormData  } from 'object-to-formdata';

export default {

    data() {
        return {
            title: 'PRODUCTS',
            search: '',
            dataItems: { data: [], meta: {} },
            categories: [],
            tags: [],
            dialog: false,
            actionCreate: true,
            uploading: -1,
            loading: false, //only for photos porpuse
            saving: false,


            snackbar: {
                show: false,
                message: 'snackbar',
                color: 'success', //info, danger
                timeout: 3000,
            },

            form: new this.$Form({
                id: '',
                name: '',
                price: '',
                price_ref: '',
                descrip: '',
                category: {},
                photos: [],
                tags: [],
                new_photos: [], //store photos in server
                _method: ''
            }),

            headers: [
                { text: 'ID', value: 'id' },
                { text: 'Category', value: 'category.name' },
                { text: 'Name', value: 'name' },
                { text: 'Price (s/)', value: 'price' },
                { text: 'Price Ref (s/)', value: 'price_ref' },
                { text: 'discount (%)', value: 'discount' },
                { text: 'Actions', value: 'actions', sortable: false },
            ],
        }
    },

    mounted() {
        this.getItems()
        this.getCategories()
        this.getTags()
    },

    methods: {

        deletePhoto( photo ) {
            const index = this.form.photos.indexOf(photo)
            this.form.photos.splice(index, 1);
        },

        openForm( item={} ) {
            this.actionCreate = Object.keys(item).length===0
            this.form.clear() // clear errors
            this.form.reset() //reset fields
            if( !this.actionCreate ) {
                this.form.fill( JSON.parse(JSON.stringify(item)) )
                this.form.tags = this.form.tags.map( tag => {
                    return tag.id
                })
            }
            this.dialog = true
        },

        save( action='create') {

            console.log('form', this.form)
            
            if( action==='delete' ) if( confirm('Delete item?')===false) return true;

            this.saving = true
            this.form._method = action==='create'? 'POST': (action==='edit'? 'PUT': 'DELETE')
            let url = action==='create'? 'products': `products/${this.form.id}`

            this.form.submit('post', url, {
                headers: { 'X-Content-Type-Options': 'nosniff', },
                transformRequest: [function (data, headers) {

                    console.log('data', data)


                    return objectToFormData(data);
                }],
                onUploadProgress: e => { 
                    this.uploading = (e.loaded/e.total)*100
                }
            })
            .then( res => {

                this.snackbar.color = 'success'
                this.uploading = -1
                this.saving = false
                this.snackbar.message = action==='create'? 'saved!': (action==='edit'? 'updated!': 'deleted!')
                this.snackbar.show = true

                if( action!=='delete'){
                    this.form.fill(res.data)
                    this.form.tags = this.form.tags.map( tag => {
                        return tag.id
                    })
                    this.getItems(this.dataItems.current_page)
                    this.actionCreate = !action==='create'
                }else{
                    this.dialog = false;
                    this.getItems()
                }
            })
            .catch( err => {
                this.snackbar.color = 'error'
                this.uploading = -1
                this.saving = false
                if ( err.response.status!==422){
                    this.snackbar.show = true
                    this.snackbar.message = err.response.statusText
                }
            })
        },

        async getItems(page=1){
            this.loading = true
            let params = { page: page, search: this.search}
            let dataItems = await this.$store.dispatch('product/getDataItems', params)
            this.dataItems = dataItems.data
            this.loading = false
        },

        async getCategories(page=1){
            let res = await this.$store.dispatch('repository/getAllCategories', {})
            this.categories = res.data
        },

        async getTags(page=1){
            let res = await this.$store.dispatch('repository/getAllTags', {})
            this.tags = res.data
        },

    },
}
</script>

<style>

</style>