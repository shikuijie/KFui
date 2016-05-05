var fs = require('fs'),
    path = require('path'),
    exec = require('child_process').exec,
    gulp = require('gulp'),
    del = require('del'),
    watch = require('gulp-watch'),
    through2 = require('through2'),
    mkdirp = require('mkdirp'),
    connect = require('gulp-connect'),
    reload = require('require-nocache')(module),
    rename = require('gulp-rename'),
    gutil = require('gulp-util'),
    minifyImg = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    sprite = require('gulp.spritesmith-multi'),
    hash = require('hash-file'),
    less = require('gulp-less'),
    postcss = require('gulp-postcss'),
    cssAutoprefixer = require('autoprefixer'),
    cssmodules = require('postcss-modules'),
    cssPlugins = [cssAutoprefixer(),
                  cssmodules({
                      getJSON: function(cssFileName, json) {
                          var basename = path.basename(cssFileName, '.css'),
                              dirname = path.dirname(cssFileName),
                              cssmap = path.join(dirname, basename + '.css.map.js');
                          fs.writeFileSync(cssmap, 'export default ' + JSON.stringify(json));
                      }
                  })],

    jspmCfg = 'jspm.config.js',
    mockDir = 'mock',
    srcDir = 'src',
    distDir = 'dist',

    mockJs = path.join(mockDir, '/**/*.js'),
    srcHtml = path.join(srcDir, '/**/*.html'),
    srcJs = path.join(srcDir, '/**/*.js'),
    srcCss = path.join(srcDir, '/**/*.css'),
    srcAll = path.join(srcDir, '/**/*'),
    srcLess = path.join(srcDir, '/**/*.less');

/** 获取命令行参数 **/
var type = process.argv[2];
var paramGroups = process.argv.slice(3).reduce(function(grps, elem) {
    if(/^--/.test(elem)) {
        grps.push([elem.replace(/^-*/, '')]);
    } else {
        grps[grps.length - 1].push(elem);
    }

    return grps;
}, []);

var params = {};
params[type] = paramGroups.reduce(function(res, grp) {
  res[grp[0]] = !grp[1] && true || grp[1];

  return res;
}, {});
/*****************/

gulp.task('dev', ['dev:init', 'dev:css', 'dev:watch', 'dev:reload', 'server']);

/** 初始化, 比如生成文件夹 **/
gulp.task('dev:init', function() {
  mkdirp.sync(srcDir);
  mkdirp.sync(mockDir);
});
/************************/

/** 处理.less文件 **/
gulp.task('dev:css', function(cb) {
  gulp.src(srcLess)
      .pipe(less())
      .pipe(rename({extname: '.css'}))
      .pipe(postcss(cssPlugins))
      .pipe(gulp.dest(srcDir))
      .on('end', function() {
          cb();
      });
});
/****************************/

/** 自动刷新页面 **/
gulp.task('dev:reload', function() {
  gulp.src([srcJs, srcCss, srcHtml])
      .pipe(watch([srcJs, srcCss, srcHtml]))
      .pipe(connect.reload());

  gulp.src(mockJs)
      .pipe(watch(mockJs))
      .pipe(connect.reload());
});
/***************/

/** 监听文件变化 **/
gulp.task('dev:watch', function() {
  function getPaths(absPath) {
    var filePath = absPath.substr(path.join(__dirname, srcDir).length);
    return {
        filePath: filePath,
        srcPath: path.join(srcDir, filePath)
    };
  }

  watch(srcAll)
    .on('change', function(absFilePath) {
      var paths = getPaths(absFilePath);

      console.log(paths.srcPath + ' changed');
    })
    .on('add', function(absFilePath) {
      var paths = getPaths(absFilePath);

      console.log(paths.srcPath + ' added');
    })
    .on('unlink', function(absFilePath) {
      var paths = getPaths(absFilePath);

      console.log(paths.srcPath + ' deleted');
    });

  watch(srcLess)
    .on('change', function(absFilePath) {
      var paths = getPaths(absFilePath);

      gulp.src(paths.srcPath)
          .pipe(less())
          .pipe(rename({extname: '.css'}))
          .pipe(postcss(cssPlugins))
          .pipe(gulp.dest(path.dirname(paths.srcPath)));
    })
    .on('add', function(absFilePath) {
      var paths = getPaths(absFilePath);

      gulp.src(paths.srcPath)
          .pipe(less())
          .pipe(rename({extname: '.css'}))
          .pipe(postcss(cssPlugins))
          .pipe(gulp.dest(path.dirname(paths.srcPath)));
    })
    .on('unlink', function(absFilePath) {
      var paths = getPaths(absFilePath);

      del(paths.srcPath.replace('.less', '.css'));
      del(paths.srcPath.replace('.less', '.css.map.js'));
    });
});
/****************/

/** 启动本地服务器 **/
gulp.task('server', function() {
  connect.server({
    host: '0.0.0.0',
    root: './',
    port: params.dev.port || 8080,
    livereload: {
      port: params.dev.reload || 35730
    },
    middleware: function() {
      var middlewares = [];

      middlewares.push(function(req, res, next) {
        var url = req.url;
        var match = url.match(/\.json$|\.jsonp\?callback=(\w+)/);
        if(match) {
          url = url.replace(/\//g, '-');
          url = url.replace(/^-|-$/, '');
          url = url.replace(/\.json$|\.jsonp\?callback=(\w+)$/, '');

          var filePath = path.join(mockDir, url + '.js');
          fs.exists(filePath, function (exist) {
            if (!exist) {
              fs.writeFileSync(filePath, 'module.exports = {\n};');
            }

            res.setHeader('Content-Type', 'application/json;charset="UTF-8"');
            if(match[1]) {
              res.end(match[1] + '(' + JSON.stringify(reload('./' + filePath)) + ')');
            } else {
              res.end(JSON.stringify(reload('./' + filePath)));
            }
          });
        } else if(/\.upload/.test(req.url)) {
          setTimeout(function() {
            res.end('OK');
          }, 1000);
        } else {
          next();
        }
      });

      return middlewares;
    }
  });
});
/******************/

/** 生成精灵图 **/
gulp.task('sprite', function() {
  var dir = params.sprite && params.sprite.dir;
  console.log(dir)
  if(dir) {
    gulp.src(path.join(dir, '/**/*.png'))
        .pipe(sprite())
        .on('error', function(err) {
          console.log(err);
        })
        .pipe(gulp.dest(dir));
  } else {
    console.log('请指定精灵图所在的文件夹');
  }
});
/***************/

gulp.task('dist', ['dist:version', 'dist:image']);

/** 生成版本号 **/
gulp.task('dist:version', ['dist:bundle'], function() {
  var dir = params.dist && params.dist.dir || srcDir;
  dir = path.join(distDir, dir.slice(srcDir.length));
  var targetHtml = path.join(dir, '/**/*.html');

  var vRe = /(['"])(\S+)([&?])v=\$version\$(\S*)\1/g;

  gulp.src(targetHtml)
      .pipe(through2.obj(function(file, encoding, done) {
        var dir = path.dirname(file.path.slice(__dirname + 1));
        var contents = String(file.contents);
        contents = contents.replace(vRe, function(s0, s1, s2, s3, s4) {
          var p = path.join(dir, s2);
          var v = hash.sync(p);

          return '"' + s2 + s3 + 'v=' + v + s4 + '"';
        });

        file.contents = new Buffer(contents);
        this.push(file);
        done();
      }))
      .pipe(gulp.dest(dir));
});
/*****************/

/** 针对ES6模块进行打包操作 **/
gulp.task('dist:bundle', ['dist:url'], function(cb) {
  var dir = params.dist && params.dist.dir || srcDir;
  dir = path.join(distDir, dir.slice(srcDir.length));
  var targetHtml = path.join(dir, '/**/*.html');

  gulp.src(targetHtml)
      .pipe(through2.obj(function(file, encoding, done) {
        var self = this;
        var contents = String(file.contents);

        var importRe = /System.import\s*\(\s*(['"])\s*(\S*)\s*\1\s*\)/;
        var entryJs = contents.match(importRe);
        if(!entryJs) {
          self.push(file);
          done();
          return;
        }

        entryJs = entryJs[2];
        var pathJs = /\.js$/.test(entryJs) ? entryJs : (entryJs + '.js');
        entryJs = path.join(path.dirname(file.path.slice(__dirname.length + 1)), pathJs);

        var bundleJs = entryJs.replace('.js', '.bundle.js');
        var cmd = 'jspm bundle ' + entryJs + ' ' + bundleJs + ' --minify';

        exec(cmd, function(err) {
          if(err) {
            console.log(err);

            self.push(file);
            done();
            return;
          }

          console.log(cmd);

          var headTail = /<\/\s*head\s*>/;
          var footTail = /<\s*script\s*>/;
          var pathCssBundle = pathJs.replace('.js', '.bundle.css');
          var pathJsBundle = pathJs.replace('.js', '.bundle.js');

          contents = contents.replace(headTail, function(s0) {
            var cssLink = '<link rel="stylesheet" href="' + pathCssBundle + '"/>';
            return cssLink + '\n' + s0;
          });
          contents = contents.replace(footTail, function(s0) {
            var jsScript = '<script src="' + pathJsBundle + '"></script>';
            return jsScript + '\n' + s0;
          });

          file.contents = new Buffer(contents);
          self.push(file);
          done();
        });
      }))
      .pipe(through2.obj(function(file, encoding, done) {
        var dir = path.dirname(file.path.slice(__dirname + 1));
        var contents = String(file.contents);

        var importRe = /System.import\s*\(\s*(['"])\s*(\S*)\s*\1\s*\)/;
        if(!contents.match(importRe)) {
          this.push(file);
          done();
          return;
        }

        contents = contents.replace(importRe, function(s0, s1, s2) {
          s1 = /\.js$/.test(s2) ? s2 : (s2 + '.js');
          var p = path.join(dir, s2);
          var v = hash.sync(p);
          return "System.import('" + s2 + '?v=' + v + "')";
        });

        contents = contents.replace(/<link rel="stylesheet" href="([^"]+\.bundle\.css)"\/>/, function(s0, s1) {
          var p = path.join(dir, s1);
          if(fs.existsSync(p)) {
            var v = hash.sync(p);
            return '<link rel="stylesheet" href="' + s1 + '?v=' + v + '"/>';
          } else {
            return s0;
          }
        });

        contents = contents.replace(/<script src="([^"]+\.bundle\.js)"><\/script>/, function(s0, s1) {
          var p = path.join(dir, s1);
          var v = hash.sync(p);
          return '<script src="' + s1 + '?v=' + v + '"></script>';
        });

        contents = contents.replace(/<script\s*src=\s*(['"])\s*([./]+jspm\.config\.js)\s*\1\s*>\s*<\/\s*script\s*>/, function(s0, s1, s2) {
          var p = path.join(dir, s2);
          var v = hash.sync(p);
          return '<script src="' + s2 + '?v=' + v + '"></script>';
        });

        file.contents = new Buffer(contents);
        this.push(file);
        done();
      }))
      .pipe(gulp.dest(dir))
      .on('end', function() {
        cb();
      });
});
/*******************/

/** 修改 jspm.config.js中的baseURL **/
gulp.task('dist:url', ['dist:copy'], function(cb) {
  gulp.src(jspmCfg)
      .pipe(through2.obj(function(file, encoding, done) {
        var contents = String(file.contents);
        contents = contents.replace(/baseURL: "[^"]+"/, function() {
          return 'baseURL: "' + path.join('/', params.dist.url || '') + '"';
        });

        file.contents = new Buffer(contents);
        this.push(file);
        done();
      }))
      .pipe(gulp.dest('.'))
      .on('end', function() {
        cb();
      });
});
/**********************************/

/** 压缩图片 **/
gulp.task('dist:image', ['dist:copy'], function(cb) {
  var targetDir = params.dist && params.dist.dir || srcDir;
  var targetPng = path.join(targetDir, '/**/*.png');

  var targetDistDir = path.join(distDir, targetDir.slice(srcDir.length));

  gulp.src([targetPng])
      .pipe(minifyImg({
        progressive: true,
        svgoPlugins: [{removeViewBox: false}],
        use: [pngquant()]
      }))
      .pipe(gulp.dest(targetDistDir))
      .on('end', function() {
        cb();
      });
});
/*******************/

/** 拷贝源代码到编译目录 **/
gulp.task('dist:copy', ['dist:clean'], function(cb) {
  var targetDir = params.dist && params.dist.dir || srcDir;
  var targetAll = path.join(targetDir, '/**/*.*');
  var targetLess = path.join(targetDir, '/**/*.less');

  var targetDistDir = path.join(distDir, targetDir.slice(srcDir.length));

  gulp.src([targetAll, '!' + targetLess])
      .pipe(gulp.dest(targetDistDir))
      .on('end', function() {
        cb();
      });
});
/*********************/

/** 在编译之前先将 dist 目录删掉 **/
gulp.task('dist:clean', function(cb) {
  del(distDir).then(function() {
    cb();
  });
});
/*****************************/
