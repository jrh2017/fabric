import Vue from 'vue';
import App from './App';
import iView from 'iview'
import router from './router';
import 'iview/dist/styles/iview.css';

import {Fabric } from '@/components';
// import '../dist/hg-vcomponents.min.css';

Vue.use(Fabric);
Vue.use(iView)

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
});