import Vue from 'vue'
import { Form, HasError, AlertError } from 'vform'
Vue.component(HasError.name, HasError)
Vue.component(AlertError.name, AlertError)

export default (context, inject) => {

    inject("Form", Form)
    context.$Form = Form
}