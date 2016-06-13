import 'font-awesome';
import vue from 'vue';
import vueResource from 'vue-resource';
import vuex from 'vuex';
import _ from 'lodash';
import './form/form';
import kfModal from './modal/modal';
import './pager/pager';
import './style/style';
import './tab/tab';
import './loading/loading';
import kfTable from './table/table';
import kfTree from './tree/tree';
import kfToaster from './toaster/toaster';

vue.use(vueResource);

var kfService = {
	requestAPI: function(url, data, success, error)  {
		vue.http.post(url, data, {
			emulateJSON: true,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		}).then(function(result) {
			success(result.data);
		}, function(result) {
	                   if(!error) {
	                        	alert('错误! ' + result.status);
	                   } else {
	                       	if(result.status == 401) {
	                            		error('权限错误!');
	                        	} else if(result.status == 500) {
	                            		error('系统内部错误!');
	                        	} else if(result.status == 404) {
	                            		error('请求路径不存在!');
	                        	} else {
	                            		error('网络错误! ' + result.status);
	                        	}
	                   }
		});
	}
};

export {_, vue, vuex, vueResource, kfModal, kfTable, kfTree, kfToaster, kfService};
