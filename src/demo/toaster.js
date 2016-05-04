import vue from 'vue';
import toaster from '../module/toaster/toaster';

export default {
  show: function(tip){
    if(!tip) return;
    var o = {
      success: true,
      tip: tip
    };
    toaster.add(this, o);
  },
  showError: function(tip){
    if(!tip) return;
    var o = {
      success: false,
      tip: tip
    };
    toaster.add(this, o);
    console.log(this);
  }
};
