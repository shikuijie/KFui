import vue from 'vue';
import 'font-awesome';

import './module/layout/layout';
import './module/tab/tab';
import './module/modal/modal';

import './module/style/clearfix.css!';
import './module/style/button.css!';
import './module/style/input.css!';
import './module/style/form.css!';
import './module/style/grid.css!';
import './module/style/reset.css!';
import './index.css!';

import {stable} from './demo/stable';

new vue({
  el: 'body',
  ready: function() {
    stable.onReady();
  },
  data: {
    stable: stable
  },
  methods: {
    blur: function(event) {
      console.log(event)
    }
  }
});
