import Vue from 'vue'
import 'element-ui/lib/theme-chalk/index.css'

import{
    Form,
    FormItem,
    Container,
    Input,
    Select,
    Option,
    Button,
    Header,
    Aside,
    Main,
    DatePicker,
    Message
}from 'element-ui';

Vue.use(Form);
Vue.use(FormItem);
Vue.use(Container);-
Vue.use(Input);
Vue.use(Select);
Vue.use(Option);
Vue.use(Button);
Vue.use(Header);
Vue.use(Aside);
Vue.use(Main);
Vue.use(DatePicker)

Vue.prototype.$message=Message
