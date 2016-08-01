import 'font-awesome';
import vue from 'vue';
import vueResource from 'vue-resource';
import vuex from 'vuex';
import _ from 'lodash';
import './form/date/date';
import './form/checkbox/checkbox';
import './form/radio/radio';
import './form/select/select';
import kfFile from './form/file/file';
import './form/validate/validate';
import './form/autoinput/autoinput';
import kfModal from './modal/modal';
import './pager/pager';
import './style/style';
import './tab/tab';
import './loading/loading';
import kfTable from './table/table';
import kfTree from './tree/tree';
import kfToaster from './toaster/toaster';
import kfMenu from './menu/menu';

//add promise related runtime js into kfui
Promise.all([Promise.resolve(1), Promise.reject(2)]).then(() => {}, () => {});

vue.use(vueResource);

var kfService = {
	hasAuthority: function(user, targetUrl, authUrl) {
		return user.urls.indexOf(targetUrl) !== -1;
	},

	requestAPI: function(url, data, success, error)  {
		if(_.isFunction(data)) {
			error = success;
			success = data;
			data = {};
		}
		if(!error) {
			error = window.alert;
		}
		if(!_.isObject(data)) {
			return error('数据必须是js对象！');
		}

		vue.http.post(url, data, {
			emulateJSON: true,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		}).then(function(result) {
			success && success(result.data);
		}, function(result) {
           	if(result.status == 401) {
        		error && error('权限错误!');
        	} else if(result.status == 500) {
        		error && error('系统内部错误!');
        	} else if(result.status == 404) {
        		error && error('请求路径不存在!');
        	} else if(result.status == 400) {
        		error && error('操作错误！');
        	} else {
        		error && error('网络错误!');
        	}
		});
	}
};

vue.directive('kf-auth', function(val) {
	if(!kfService.hasAuthority(lagouUserInfo, val)) {
		this.el.remove();
	}
});

export {_, vue, vuex, vueResource, kfModal, kfTable, kfTree, kfToaster, kfService, kfFile, kfMenu};
