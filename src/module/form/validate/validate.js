import vue from 'vue';
import _ from 'lodash';
import cls from './validate.css.map';
import './validate.css!';

function getErrorMsg(msgs, name, type, def) {
  return msgs[name] && msgs[name][type] || msgs[name] || msgs[type] || def;
}

let formMap = new Map();

vue.directive('kf-form', {
  bind: function(val) {
    let el = this.el;
    let node = el.nodeName.toLowerCase();
    if(node != 'form') {
      return;
    }

    let that = new vue(), self = that;
    that.el = el;
    formMap.set(el, that);

    that.inputs = [];
    _.forEach(that.el.querySelectorAll('input'), function(input) {
      let type = input.getAttribute('type');
      if(type == 'submit' || type == 'reset') {
        return;
      }

      if(type == 'checkbox' || type == 'radio') {
        let last = that.inputs[that.inputs.length-1];
        if(input.parentElement.parentElement === last.parentElement.parentElement) {
          return;
        }
      }

      that.inputs.push(input);
    });

    _.forEach(that.inputs, function(el) {
      el.__BUS = that;

      let type = el.getAttribute('type');
      if((type == 'text') || (type == 'email') || (type == 'url')) {
        el.onchange = function(event) {
          el.__VALUE = el.value;
          toggleError(el);
          that.setfield(el.getAttribute('name'), el.value);
        };
      }
    });

    that.$on('kf.form.change', function(el, val) {
      el.__VALUE = val;
      toggleError(el);
      that.setfield(el.getAttribute('name'), val);
    });

    function toggleError(target) {
      if(target.__NOERR) {
        self.errorEls.get(target).innerHTML = '';
        return '';
      }

      let validity = target.validity;
      let msg = '', errorType = '';
      let name = target.getAttribute('name');
      let type = target.getAttribute('type');

      if(!validity.valid) {
        if(validity.valueMissing) {
          errorType = 'required';
        } else if(validity.typeMismatch) {
          errorType = type;
        } else if(validity.patternMismatch) {
          errorType = 'pattern';
        } else if(validity.tooShort) {
          errorType = 'minlength';
        }
        msg = getErrorMsg(self.errorMsg, name, errorType, target.validationMessage);
      }

      if(self.errorMsg[name] && self.errorMsg[name].validation) {
        msg = self.errorMsg[name].validation(target.__VALUE) || '';
      }

      self.errorEls.get(target).innerHTML = msg;
      return msg;
    };

    that.errorEls = new Map();

    _.forEach(that.inputs, function(input) {
      let span = document.createElement('strong');
      span.className = cls.error;
      input.parentElement.appendChild(span);
      self.errorEls.set(input, span);
    });

    that.submit = that.el.querySelector('input[type=submit]');
    that.submitFunc = function(event) {
      let valid = true;
      _.forEach(self.inputs, function(input) {
        let msg = toggleError(input);

        if(msg) {
          valid = false;
        }
      });

      self.errorMsg.alid = valid;
    };
    that.submit.addEventListener('click', that.submitFunc);

    that.reset = that.el.querySelector('input[type=reset]');
    that.resetFunc = function(event) {
      _.forEach(self.el.querySelectorAll('.' + cls.error), function(error) {
        error.innerHTML = '';
      });
    };
    that.reset.addEventListener('click', that.resetFunc);
  },
  update: function(val) {
    let el = this.el;
    if(el.nodeName.toLowerCase() != 'form') {
      return;
    }

    let that = formMap.get(el);
    let mds = Object.keys(this.modifiers);
    that.setfield = val.setfield;
    that.errorMsg = val.validator;
    if(!_.isFunction(val.setfield) || !_.isObject(val.validator)) {
      throw 'v-kf-form指令参数至少有两个成员：validator提供验证信息对象，setfield设置成员变量的函数';
    }
  },
  unbind: function() {
    let el = this.el;
    if(el.nodeName.toLowerCase() != 'form') {
      return;
    }

    let that = formMap.get(el), self = that;
    that.$off('kf.form.change');

    _.forEach(that.inputs, function(input) {
      let type = input.getAttribute('type');
      if(type == 'text' || type == 'email' || type == 'url') {
        input.onchange = null;
      }
    });

    _.forEach(that.errorEls, function(el) {
      el.remove();
    });

    that.submit && that.submit.removeEventListener('click', that.submitFunc);
    that.reset && that.reset.removeEventListener('click', that.resetFunc);

    formMap.delete(el);
  }
});
