import vue from 'vue';
import _ from 'lodash';
import cls from './validate.css.map';
import './validate.css!';

function getErrorMsg(msgs, name, type, def) {
  return msgs[name] && msgs[name][type] || msgs[name] || msgs[type] || def;
}

vue.directive('kf-validate', {
  bind: function(val) {
    let self = this;

    this.toggleError = function(target, name, type) {
      let validity = target.validity;
      let msg = '', errorType = '';

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
        msg = self.errorMsg[name].validation() || '';
      }

      self.errorEls[name].innerHTML = msg;
      return msg;
    };

    this.inputs = _.reduce(this.el.querySelectorAll('input[name]'), function(res, input) {
      if(!res.length) {
        res.push(input);
      } else {
        if(input.getAttribute('name') != res[res.length - 1].getAttribute('name')) {
          res.push(input);
        }
      }

      return res;
    }, []);
    this.names = _.map(this.inputs, function(input) {
      return input.getAttribute('name');
    });
    this.types = _.map(this.inputs, function(input) {
      return input.getAttribute('type') || 'text';
    });
    this.errorEls = {};
    this.blurs = {};

    _.forEach(this.inputs, function(input, i) {
      let name = self.names[i],
          type = self.types[i];

      let span = document.createElement('span');

      span.className = cls.error;
      input.parentElement.appendChild(span);
      self.errorEls[name] = span;
      self.blurs[name] = function(event) {
        self.toggleError(event.target, name, type);
      };

      input.addEventListener('blur', self.blurs[name]);
    });

    let submit = this.el.querySelector('input[type=submit]');
    submit.addEventListener('click', function(event) {
      let valid = true;
      _.forEach(self.inputs, function(input, j) {
        let msg = self.toggleError(input, self.names[j], self.types[j]);

        if(msg) {
          valid = false;
        }
      });

      self.errorMsg.formValid = valid;
    });

    let reset = this.el.querySelector('input[type=reset]');
    reset.addEventListener('click', function(event) {
      _.forEach(self.el.querySelectorAll('.' + cls.error), function(error) {
        error.innerHTML = '';
      });
    });
  },
  update: function(val) {
    this.errorMsg = val;
  },
  unbind: function() {
    let self = this;
    _.forEach(this.inputs, function(input) {
      let name = input.getAttribute('name');
      input.removeEventListener('blur', self.blurs[name]);
    });
    _.forEach(this.errorEls, function(el) {
      el.remove();
    });
  }
});
