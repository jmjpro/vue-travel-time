// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import store from './store'
import TravelTime from './TravelTime'
import VeeValidate from 'vee-validate'

const validationConfig = {
  errorBagName: 'errors', // change if property conflicts.
  fieldsBagName: 'fields',
  delay: 0,
  locale: 'en',
  dictionary: null,
  strict: true
}

Vue.use(VeeValidate, validationConfig)

/* eslint-disable no-new */
new Vue({
  store, // inject store to all children
  el: '#travel_time',
  template: '<TravelTime/>',
  components: { TravelTime }
})
