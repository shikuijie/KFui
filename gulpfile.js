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
    distDir = 'dist',
    libJs = 'lib.js',

    mockJs = path.join(mockDir, '/**/*.js');

gulp.task('dev', ['dev:css', 'dev:watch', 'dev:reload', 'server']);

/** 初始化, 比如生成文件夹 **/
gulp.task('dev:init', function(cb) {
  mkdirp.sync(mockDir);

  srcDir = process.argv[3] && process.argv[3].replace('--', '') || 'src';
  mkdirp.sync(srcDir);

  srcHtml = path.join(srcDir, '/**/*.html'),
  srcJs = path.join(srcDir, '/**/*.js'),
  srcCss = path.join(srcDir, '/**/*.css'),
  srcAll = path.join(srcDir, '/**/*'),
  srcLess = path.join(srcDir, '/**/*.less');

  cb();
});
/************************/

/** 处理.less文件 **/
gulp.task('dev:css', ['dev:init'], function(cb) {
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
gulp.task('dev:reload', ['dev:init'], function() {
  gulp.src([srcJs, srcCss, srcHtml])
      .pipe(watch([srcJs, srcCss, srcHtml]))
      .pipe(connect.reload());

  gulp.src(mockJs)
      .pipe(watch(mockJs))
      .pipe(connect.reload());
});
/***************/

/** 监听文件变化 **/
gulp.task('dev:watch', ['dev:init'], function() {
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
    port: 8080,
    livereload: {
      port: 35730
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
  var dir = process.argv[3] && process.argv[3].replace('--', '');
  if(dir) {
    console.log(dir)
    gulp.src(path.join(dir, '/**/*.png'))
        .pipe(sprite())
        .on('error', function(err) {
          console.log(err);
        })
        .pipe(gulp.dest(dir));
  } else {
    console.log('请指定精灵图所在的文件夹[npm run sprite -- --xxx]');
  }
});
/***************/

/** 压缩图片 **/
gulp.task('image', function(cb) {
  var targetPng = path.join(srcDir, '/**/*.png');

  gulp.src([targetPng])
      .pipe(minifyImg({
        progressive: true,
        svgoPlugins: [{removeViewBox: false}],
        use: [pngquant()]
      }))
      .pipe(rename({extname: '.min.png'}))
      .pipe(gulp.dest(srcDir))
      .on('end', function() {
        cb();
      });
});
/*******************/

gulp.task('bundle', function() {
  var entryJs = process.argv[3] && process.argv[3].replace('--', '');
  if(!entryJs) {
    console.log('请指定需要打包的文件路径[npm run bundle -- --xxx]');
    return;
  }
  var bundleJs = entryJs.replace('.js', '.bundle.js');
  var cmd = 'jspm bundle ' + entryJs + ' - kfui ' + bundleJs + ' --minify --inject';
  console.log(cmd);

  var self = this;
  exec(cmd, function(err) {
    if(err) {
      console.log(err);
      self.push(file);
      done();
    }
  });
});

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
