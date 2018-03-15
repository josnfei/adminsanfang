// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill';
import Vue from 'vue';
import App from './App';
//import Vuex from 'vuex';
import router from './router';
import store from './store';
import axios from 'axios';
import iView from 'iView';
import vueAMap from 'vue-amap';
import 'iview/dist/styles/iview.css'
import 'common/scss/reset.scss'
import 'common/scss/iconfont.scss'
import 'common/scss/loading.scss'
import { options } from './api/config'
import vueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'


Vue.config.productionTip = false;
Vue.use(iView)
Vue.use(vueAMap)
Vue.use(vueQuillEditor)

vueAMap.initAMapApiLoader({
key: 'dfaee2d616de7ddd29f6b50657fa7bd6',
plugin: ['Geocoder', 'MouseTool', 'MapType', 'DistrictSearch']
})

import 'common/scss/index.scss';

Vue.filter('datefmt', (input, fmtstring) => {
  var date = new Date(input);
  var y = date.getFullYear();
  var m = date.getMonth() + 1;
  var d = date.getDate();
  var h = date.getHours();
  var mm = date.getMinutes();
  var ss = date.getSeconds();
  if (m.toString().length == 1){
    m = '0' + m;
  }
  if (d.toString().length == 1) {
    d = '0' + d;
  }
  if (fmtstring == 'YYYY-MM-DD HH:mm:ss') {
    return y + '-' + m + '-' + d + ' ' + h + ':' + mm + ':' + ss;
  } else {
    return y + '-' + m + '-' + d;
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})