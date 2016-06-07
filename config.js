System.config({
  baseURL: "/",
  defaultJSExtensions: true,
  transpiler: "babel",
  babelOptions: {
    "optional": [
      "runtime",
      "optimisation.modules.system"
    ]
  },
  paths: {
    "github:*": "jspm_packages/github/*",
    "npm:*": "jspm_packages/npm/*"
  },
  bundles: {
    "dist/kfui.bundle.js": [
      "src/module/lib.js",
      "npm:vuex@0.6.3.js",
      "npm:vue-resource@0.7.0.js",
      "src/module/form/form.js",
      "npm:vue@1.0.24.js",
      "npm:lodash@4.12.0.js",
      "src/module/pager/pager.js",
      "src/module/modal/modal.js",
      "src/module/style/style.js",
      "npm:font-awesome@4.6.1.js",
      "src/module/table/table.js",
      "src/module/loading/loading.js",
      "src/module/tab/tab.js",
      "src/module/tree/tree.js",
      "src/module/toaster/toaster.js",
      "npm:vuex@0.6.3/dist/vuex.js",
      "npm:vue-resource@0.7.0/src/index.js",
      "src/module/form/checkbox/checkbox.js",
      "src/module/form/select/select.js",
      "src/module/form/date/date.js",
      "src/module/form/radio/radio.js",
      "src/module/form/validate/validate.js",
      "src/module/form/autoinput/autoinput.js",
      "src/module/form/file/file.js",
      "npm:vue@1.0.24/dist/vue.common.js",
      "src/module/pager/pager.css.map.js",
      "src/module/table/table.css.map.js",
      "src/module/modal/modal.css.map.js",
      "src/module/tab/tab.css.map.js",
      "src/module/loading/loading.css.map.js",
      "src/module/code/code.js",
      "npm:lodash@4.12.0/lodash.js",
      "src/module/toaster/toaster.css.map.js",
      "src/module/tree/tree.css.map.js",
      "npm:font-awesome@4.6.1/css/font-awesome.css!github:systemjs/plugin-css@0.1.21.js",
      "src/module/modal/modal.css!github:systemjs/plugin-css@0.1.22.js",
      "src/module/pager/pager.css!github:systemjs/plugin-css@0.1.22.js",
      "src/module/style/reset/reset.css!github:systemjs/plugin-css@0.1.22.js",
      "src/module/style/button/button.css!github:systemjs/plugin-css@0.1.22.js",
      "src/module/style/clearfix/clearfix.css!github:systemjs/plugin-css@0.1.22.js",
      "src/module/style/form/form.css!github:systemjs/plugin-css@0.1.22.js",
      "src/module/style/grid/grid.css!github:systemjs/plugin-css@0.1.22.js",
      "src/module/style/input/input.css!github:systemjs/plugin-css@0.1.22.js",
      "src/module/style/panel/panel.css!github:systemjs/plugin-css@0.1.22.js",
      "src/module/table/table.css!github:systemjs/plugin-css@0.1.22.js",
      "src/module/loading/loading.css!github:systemjs/plugin-css@0.1.22.js",
      "src/module/tab/tab.css!github:systemjs/plugin-css@0.1.22.js",
      "src/module/toaster/toaster.css!github:systemjs/plugin-css@0.1.22.js",
      "src/module/tree/tree.css!github:systemjs/plugin-css@0.1.22.js",
      "src/module/form/checkbox/checkbox.css!github:systemjs/plugin-css@0.1.22.js",
      "src/module/form/select/select.css!github:systemjs/plugin-css@0.1.22.js",
      "src/module/form/date/date.css!github:systemjs/plugin-css@0.1.22.js",
      "src/module/form/radio/radio.css!github:systemjs/plugin-css@0.1.22.js",
      "src/module/form/validate/validate.css!github:systemjs/plugin-css@0.1.22.js",
      "src/module/form/file/file.css!github:systemjs/plugin-css@0.1.22.js",
      "src/module/form/autoinput/autoinput.css!github:systemjs/plugin-css@0.1.22.js",
      "npm:vue-resource@0.7.0/src/util.js",
      "src/module/form/checkbox/checkbox.css.map.js",
      "src/module/form/select/select.css.map.js",
      "src/module/form/date/date.css.map.js",
      "src/module/form/validate/validate.css.map.js",
      "src/module/form/radio/radio.css.map.js",
      "npm:vue-resource@0.7.0/src/resource.js",
      "npm:vue-resource@0.7.0/src/http/index.js",
      "npm:vue-resource@0.7.0/src/url/index.js",
      "npm:vue-resource@0.7.0/src/promise.js",
      "npm:babel-runtime@5.8.35/core-js/map.js",
      "src/module/form/date/rotator.js",
      "src/module/form/file/file.css.map.js",
      "src/module/form/autoinput/autoinput.css.map.js",
      "github:jspm/nodelibs-process@0.1.2.js",
      "github:jspm/nodelibs-buffer@0.1.0.js",
      "src/module/form/date/rotator.css!github:systemjs/plugin-css@0.1.22.js",
      "npm:vue-resource@0.7.0/src/http/client/index.js",
      "npm:vue-resource@0.7.0/src/http/timeout.js",
      "npm:vue-resource@0.7.0/src/http/method.js",
      "src/module/form/date/rotator.css.map.js",
      "npm:vue-resource@0.7.0/src/http/interceptor.js",
      "npm:vue-resource@0.7.0/src/http/before.js",
      "npm:vue-resource@0.7.0/src/http/header.js",
      "npm:vue-resource@0.7.0/src/http/jsonp.js",
      "npm:vue-resource@0.7.0/src/http/mime.js",
      "npm:vue-resource@0.7.0/src/http/cors.js",
      "npm:vue-resource@0.7.0/src/url/template.js",
      "npm:vue-resource@0.7.0/src/url/legacy.js",
      "npm:vue-resource@0.7.0/src/url/query.js",
      "npm:vue-resource@0.7.0/src/lib/promise.js",
      "npm:vue-resource@0.7.0/src/url/root.js",
      "npm:core-js@1.2.6/library/fn/map.js",
      "github:jspm/nodelibs-process@0.1.2/index.js",
      "github:jspm/nodelibs-buffer@0.1.0/index.js",
      "npm:core-js@1.2.6/library/modules/es6.object.to-string.js",
      "npm:vue-resource@0.7.0/src/lib/url-template.js",
      "npm:vue-resource@0.7.0/src/http/client/xhr.js",
      "npm:vue-resource@0.7.0/src/http/client/jsonp.js",
      "npm:vue-resource@0.7.0/src/http/client/xdr.js",
      "npm:core-js@1.2.6/library/modules/es6.string.iterator.js",
      "npm:core-js@1.2.6/library/modules/es7.map.to-json.js",
      "npm:core-js@1.2.6/library/modules/web.dom.iterable.js",
      "npm:core-js@1.2.6/library/modules/es6.map.js",
      "npm:core-js@1.2.6/library/modules/$.core.js",
      "npm:process@0.11.3.js",
      "npm:buffer@3.6.0.js",
      "npm:core-js@1.2.6/library/modules/$.string-at.js",
      "npm:core-js@1.2.6/library/modules/$.export.js",
      "npm:core-js@1.2.6/library/modules/$.collection-to-json.js",
      "npm:core-js@1.2.6/library/modules/$.iter-define.js",
      "npm:core-js@1.2.6/library/modules/$.iterators.js",
      "npm:core-js@1.2.6/library/modules/$.collection-strong.js",
      "npm:core-js@1.2.6/library/modules/$.collection.js",
      "npm:core-js@1.2.6/library/modules/es6.array.iterator.js",
      "npm:process@0.11.3/browser.js",
      "npm:buffer@3.6.0/index.js",
      "npm:core-js@1.2.6/library/modules/$.global.js",
      "npm:core-js@1.2.6/library/modules/$.defined.js",
      "npm:core-js@1.2.6/library/modules/$.to-integer.js",
      "npm:core-js@1.2.6/library/modules/$.ctx.js",
      "npm:core-js@1.2.6/library/modules/$.library.js",
      "npm:core-js@1.2.6/library/modules/$.has.js",
      "npm:core-js@1.2.6/library/modules/$.for-of.js",
      "npm:core-js@1.2.6/library/modules/$.classof.js",
      "npm:core-js@1.2.6/library/modules/$.hide.js",
      "npm:core-js@1.2.6/library/modules/$.redefine.js",
      "npm:core-js@1.2.6/library/modules/$.iter-create.js",
      "npm:core-js@1.2.6/library/modules/$.js",
      "npm:core-js@1.2.6/library/modules/$.set-to-string-tag.js",
      "npm:core-js@1.2.6/library/modules/$.wks.js",
      "npm:core-js@1.2.6/library/modules/$.strict-new.js",
      "npm:core-js@1.2.6/library/modules/$.iter-step.js",
      "npm:core-js@1.2.6/library/modules/$.uid.js",
      "npm:core-js@1.2.6/library/modules/$.is-object.js",
      "npm:core-js@1.2.6/library/modules/$.fails.js",
      "npm:core-js@1.2.6/library/modules/$.add-to-unscopables.js",
      "npm:core-js@1.2.6/library/modules/$.redefine-all.js",
      "npm:core-js@1.2.6/library/modules/$.set-species.js",
      "npm:core-js@1.2.6/library/modules/$.descriptors.js",
      "npm:core-js@1.2.6/library/modules/$.to-iobject.js",
      "npm:isarray@1.0.0.js",
      "npm:base64-js@0.0.8.js",
      "npm:ieee754@1.1.6.js",
      "npm:core-js@1.2.6/library/modules/$.a-function.js",
      "npm:core-js@1.2.6/library/modules/$.cof.js",
      "npm:core-js@1.2.6/library/modules/$.property-desc.js",
      "npm:core-js@1.2.6/library/modules/$.an-object.js",
      "npm:core-js@1.2.6/library/modules/$.is-array-iter.js",
      "npm:core-js@1.2.6/library/modules/$.iter-call.js",
      "npm:core-js@1.2.6/library/modules/$.to-length.js",
      "npm:core-js@1.2.6/library/modules/core.get-iterator-method.js",
      "npm:core-js@1.2.6/library/modules/$.shared.js",
      "npm:core-js@1.2.6/library/modules/$.iobject.js",
      "npm:ieee754@1.1.6/index.js",
      "npm:isarray@1.0.0/index.js",
      "npm:base64-js@0.0.8/lib/b64.js"
    ]
  },

  map: {
    "animate.css": "npm:animate.css@3.5.1",
    "babel": "npm:babel-core@5.8.35",
    "babel-runtime": "npm:babel-runtime@5.8.35",
    "clean-css": "npm:clean-css@3.4.12",
    "core-js": "npm:core-js@1.2.6",
    "css": "github:systemjs/plugin-css@0.1.22",
    "font-awesome": "npm:font-awesome@4.6.1",
    "image": "github:systemjs/plugin-image@0.1.0",
    "json": "github:systemjs/plugin-json@0.1.2",
    "kfui": "src/module/lib.js",
    "lodash": "npm:lodash@4.12.0",
    "reflect-metadata": "npm:reflect-metadata@0.1.3",
    "text": "github:systemjs/plugin-text@0.0.4",
    "vue": "npm:vue@1.0.24",
    "vue-resource": "npm:vue-resource@0.7.0",
    "vuex": "npm:vuex@0.6.3",
    "github:jspm/nodelibs-assert@0.1.0": {
      "assert": "npm:assert@1.4.0"
    },
    "github:jspm/nodelibs-buffer@0.1.0": {
      "buffer": "npm:buffer@3.6.0"
    },
    "github:jspm/nodelibs-events@0.1.1": {
      "events": "npm:events@1.0.2"
    },
    "github:jspm/nodelibs-http@1.7.1": {
      "Base64": "npm:Base64@0.2.1",
      "events": "github:jspm/nodelibs-events@0.1.1",
      "inherits": "npm:inherits@2.0.1",
      "stream": "github:jspm/nodelibs-stream@0.1.0",
      "url": "github:jspm/nodelibs-url@0.1.0",
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "github:jspm/nodelibs-https@0.1.0": {
      "https-browserify": "npm:https-browserify@0.0.0"
    },
    "github:jspm/nodelibs-os@0.1.0": {
      "os-browserify": "npm:os-browserify@0.1.2"
    },
    "github:jspm/nodelibs-path@0.1.0": {
      "path-browserify": "npm:path-browserify@0.0.0"
    },
    "github:jspm/nodelibs-process@0.1.2": {
      "process": "npm:process@0.11.3"
    },
    "github:jspm/nodelibs-stream@0.1.0": {
      "stream-browserify": "npm:stream-browserify@1.0.0"
    },
    "github:jspm/nodelibs-url@0.1.0": {
      "url": "npm:url@0.10.3"
    },
    "github:jspm/nodelibs-util@0.1.0": {
      "util": "npm:util@0.10.3"
    },
    "npm:amdefine@1.0.0": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "module": "github:jspm/nodelibs-module@0.1.0",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:assert@1.4.0": {
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "buffer-shims": "npm:buffer-shims@1.0.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "util": "npm:util@0.10.3"
    },
    "npm:babel-runtime@5.8.35": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:buffer-shims@1.0.0": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0"
    },
    "npm:buffer@3.6.0": {
      "base64-js": "npm:base64-js@0.0.8",
      "child_process": "github:jspm/nodelibs-child_process@0.1.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "ieee754": "npm:ieee754@1.1.6",
      "isarray": "npm:isarray@1.0.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:clean-css@3.4.12": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "commander": "npm:commander@2.8.1",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "http": "github:jspm/nodelibs-http@1.7.1",
      "https": "github:jspm/nodelibs-https@0.1.0",
      "os": "github:jspm/nodelibs-os@0.1.0",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "source-map": "npm:source-map@0.4.4",
      "url": "github:jspm/nodelibs-url@0.1.0",
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:commander@2.8.1": {
      "child_process": "github:jspm/nodelibs-child_process@0.1.0",
      "events": "github:jspm/nodelibs-events@0.1.1",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "graceful-readlink": "npm:graceful-readlink@1.0.1",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:core-js@1.2.6": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "systemjs-json": "github:systemjs/plugin-json@0.1.2"
    },
    "npm:core-util-is@1.0.2": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0"
    },
    "npm:envify@3.4.0": {
      "jstransform": "npm:jstransform@10.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "through": "npm:through@2.3.8"
    },
    "npm:esprima-fb@13001.1001.0-dev-harmony-fb": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:font-awesome@4.6.1": {
      "css": "github:systemjs/plugin-css@0.1.21"
    },
    "npm:graceful-readlink@1.0.1": {
      "fs": "github:jspm/nodelibs-fs@0.1.2"
    },
    "npm:https-browserify@0.0.0": {
      "http": "github:jspm/nodelibs-http@1.7.1"
    },
    "npm:inherits@2.0.1": {
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:jstransform@10.1.0": {
      "base62": "npm:base62@0.1.1",
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "esprima-fb": "npm:esprima-fb@13001.1001.0-dev-harmony-fb",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "source-map": "npm:source-map@0.1.31"
    },
    "npm:lodash@4.12.0": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:os-browserify@0.1.2": {
      "os": "github:jspm/nodelibs-os@0.1.0"
    },
    "npm:path-browserify@0.0.0": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:process@0.11.3": {
      "assert": "github:jspm/nodelibs-assert@0.1.0"
    },
    "npm:punycode@1.3.2": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:readable-stream@1.1.14": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "core-util-is": "npm:core-util-is@1.0.2",
      "events": "github:jspm/nodelibs-events@0.1.1",
      "inherits": "npm:inherits@2.0.1",
      "isarray": "npm:isarray@0.0.1",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "stream-browserify": "npm:stream-browserify@1.0.0",
      "string_decoder": "npm:string_decoder@0.10.31"
    },
    "npm:reflect-metadata@0.1.3": {
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:source-map@0.1.31": {
      "amdefine": "npm:amdefine@1.0.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:source-map@0.4.4": {
      "amdefine": "npm:amdefine@1.0.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:stream-browserify@1.0.0": {
      "events": "github:jspm/nodelibs-events@0.1.1",
      "inherits": "npm:inherits@2.0.1",
      "readable-stream": "npm:readable-stream@1.1.14"
    },
    "npm:string_decoder@0.10.31": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0"
    },
    "npm:through@2.3.8": {
      "process": "github:jspm/nodelibs-process@0.1.2",
      "stream": "github:jspm/nodelibs-stream@0.1.0"
    },
    "npm:url@0.10.3": {
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "punycode": "npm:punycode@1.3.2",
      "querystring": "npm:querystring@0.2.0",
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:util@0.10.3": {
      "inherits": "npm:inherits@2.0.1",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:vue@1.0.24": {
      "envify": "npm:envify@3.4.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    }
  }
});
