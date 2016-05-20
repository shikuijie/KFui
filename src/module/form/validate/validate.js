import vue from 'vue';
import _ from 'lodash';
import cls from './validate.css.map';
import './validate.css!';

function getErrorMsg(msgs, name, type, def) {
  return msgs[name] && msgs[name][type] || def;
}

let formMap = new Map();

vue.directive('kf-form', {
  bind: function(val) {
    let el = this.el;
    let node = el.nodeName.toLowerCase();
    if(node != 'form') {
      return;
    }

    let that = new vue();
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
      let name = el.getAttribute('name');

      let type = el.getAttribute('type');
      if((type == 'text') || (type == 'email') || (type == 'url')) {
        el.onchange = function(event) {
          el.__VALUE = el.value;
          toggleError(el);
          that.info[name].value = el.value;
        };
      }
    });

    that.$on('kf.form.change', function(el, val) {
      let name = el.getAttribute('name');

      el.__VALUE = val;
      toggleError(el);
      that.info[name].value = val;
    });

    function toggleError(target) {
      if(target.__NOERR) {
        that.errorEls.get(target).innerHTML = '';
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
        msg = getErrorMsg(that.info, name, errorType, target.validationMessage);
      }

      if(that.info[name] && that.info[name].validation) {
        msg = that.info[name].validation(target.__VALUE) || '';
      }

      that.errorEls.get(target).innerHTML = msg;
      return msg;
    };

    that.errorEls = new Map();

    _.forEach(that.inputs, function(input) {
      let span = document.createElement('strong');
      span.className = cls.error;
      input.parentElement.appendChild(span);
      that.errorEls.set(input, span);
    });

    that.submit = that.el.querySelector('input[type=submit]');
    that.submitFunc = function(event) {
      let valid = true;
      _.forEach(that.inputs, function(input) {
        let msg = toggleError(input);

        if(msg) {
          valid = false;
        }
      });

      if(valid) {
        event.formData = _.reduce(that.inputs, function(res, el) {
          let name = el.getAttribute('name');
          res[name] = that.info[name].value;
          return res;
        }, {})
      }
    };
    that.submit.addEventListener('click', that.submitFunc);

    that.reset = that.el.querySelector('input[type=reset]');
    that.resetFunc = function(event) {
      _.forEach(that.el.querySelectorAll('.' + cls.error), function(error) {
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
    that.info = val;

    _.forEach(that.inputs, function(el) {
      let type = el.getAttribute('type');
      let name = el.getAttribute('name');
      if(!name) {
        throw el + '必须有name属性！';
      }

      that.info[name] = that.info[name] || {};
      if(_.isUndefined(that.info[name].value)) return;
      if((type == 'text') || (type == 'email') || (type == 'url')) {
        el.value = that.info[name].value;
      } else {
        el.__PARENT && el.__PARENT.$emit('kf.form.init', that.info[name].value);
      }
    });
  },
  unbind: function() {
    let el = this.el;
    if(el.nodeName.toLowerCase() != 'form') {
      return;
    }

    let that = formMap.get(el);
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
