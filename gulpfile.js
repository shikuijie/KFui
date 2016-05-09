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
    libJs = 'lib.js',

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

gulp.task('lib', function() {
  var bundleJs = libJs.replace('.js', '.bundle.js');
  var cmd = 'jspm bundle ' + libJs + ' ' + bundleJs + ' --minify --inject';
  console.log(cmd);

  var self = this;
  exec(cmd, function(err) {
    if(err) {
      console.log(err);

      self.push(file);
      done();
      return;
    } else {
      gulp.src(bundleJs)
          .pipe(through2.obj(function(file, encoding, done) {
            var contents = String(file.contents);
            contents = contents.replace(/url\(jspm_packages/g, 'url(/jspm_packages');
            file.contents = new Buffer(contents);
            this.push(file);
            done();
          }))
          .pipe(gulp.dest(path.dirname(bundleJs)));

      gulp.src(jspmCfg)
          .pipe(through2.obj(function(file, encoding, done) {
            var contents = String(file.contents);
            var bundleRe = new RegExp('(bundles:\\s*\\{\\s*[^\}]*,?"' + bundleJs + '":\\s*\\[\\s*"' + libJs + '"),?\\s*[^\\]]*\\]');
            contents = contents.replace(bundleRe, function(s0, s1) {
              console.log(s1)
              return s1 + '\n\t\t]';
            });

            file.contents = new Buffer(contents);
            this.push(file);
            done();
          }))
          .pipe(gulp.dest(path.dirname(jspmCfg)));
    }
  });
});
