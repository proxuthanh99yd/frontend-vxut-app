import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue } from 'bootstrap-vue'
import "./assets/_global.scss";
import router from "./router/routes";
import VueRouter from "vue-router";
import store from "./store/index";
import VueFormulate from '@braid/vue-formulate'
import vSelect from 'vue-select'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from "axios";
import { BootstrapVueIcons } from 'bootstrap-vue';
import VueCountdownTimer from 'vuejs-countdown-timer';
import CKEditor from 'ckeditor4-vue';

Vue.use(CKEditor);
Vue.use(VueCountdownTimer);

Vue.use(BootstrapVueIcons)
import locale from 'element-ui/lib/locale/lang/en'

axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status === 422) {
      store.commit("setErrors", error.response.data.errors);
    } else if (error.response.status === 401) {
      store.commit("auth/setUserData", null);
      localStorage.removeItem("authToken");
      router.push({ name: "Login" });
    } else {
      return Promise.reject(error);
    }
  }
);

axios.interceptors.request.use(function (config) {
  config.headers.common = {
    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    "Content-Type": "application/json",
    Accept: "application/json"
  };

  return config;
});


Vue.use(ElementUI, { locale });


Vue.component('v-select', vSelect)
Vue.use(VueFormulate)
Vue.use(VueRouter);


// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)



Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
