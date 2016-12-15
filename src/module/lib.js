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
	},
	
    createWebsocket(option) {
        if(!option.url) {
            throw '未设置url';
        } else if(!option.onmessage) {
            throw '未设置消息处理函数: onmessage';
        }

        var wsTime = {
            connect : function() {
                try {
                    this.ws = new WebSocket(option.url);
                    this.ws.onopen = this.onopen;
                    this.ws.onmessage = this.onmessage;
                    this.ws.onclose = this.onclose;
                    this.ws.onerror = this.onerror;
                } catch(exception) {
                    console.log(exception);
                }
            },

            onopen : function() {
                option.onopen && option.onopen();
            },

            onerror : function(evt) {
                option.onerror && option.onerror(evt);
            },

            onmessage : function(m) {
                option.onmessage && option.onmessage(m);
            },

            onclose : function(closeEvent) {
                var codeMap = {};
                codeMap[1000] = "(NORMAL)";
                codeMap[1001] = "(ENDPOINT_GOING_AWAY)";
                codeMap[1002] = "(PROTOCOL_ERROR)";
                codeMap[1003] = "(UNSUPPORTED_DATA)";
                codeMap[1004] = "(UNUSED/RESERVED)";
                codeMap[1005] = "(INTERNAL/NO_CODE_PRESENT)";
                codeMap[1006] = "(INTERNAL/ABNORMAL_CLOSE)";
                codeMap[1007] = "(BAD_DATA)";
                codeMap[1008] = "(POLICY_VIOLATION)";
                codeMap[1009] = "(MESSAGE_TOO_BIG)";
                codeMap[1010] = "(HANDSHAKE/EXT_FAILURE)";
                codeMap[1011] = "(SERVER/UNEXPECTED_CONDITION)";
                codeMap[1015] = "(INTERNAL/TLS_ERROR)";
                var codeStr = codeMap[closeEvent.code];

                option.onclose && option.onclose(codeStr);

                if(closeEvent.code != 1000) {
                    setTimeout(function() {
                        wsTime.connect();
                    }, 1000);
                }
            }
        };

        wsTime.connect();
    }

};

vue.directive('kf-auth', function(val) {
	if(!kfService.hasAuthority(lagouUserInfo, val)) {
		this.el.remove();
	}
});

export {_, vue, vuex, vueResource, kfModal, kfTable, kfTree, kfToaster, kfService, kfFile, kfMenu};
