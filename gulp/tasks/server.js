'use strict';

import gulp from 'gulp';
import util from 'gulp-util';
import modRewrite  from 'connect-modrewrite';
import browserSync from 'browser-sync';

import jspmOverride from '../../test/unit/jspm.override.json';

import path from '../paths';

//=============================================
//            PROXY CONFIGURATION
//=============================================

/**
 * Launches a browserSync server
 * Injecting `env` as a global variable + overriding jspm.config.js if in test
 * @param env dev/test/prod
 * @param baseDir
 * @param files
 * @param browser
 */
function startBrowserSync(env, baseDir, files, browser) {
  env = env.toLowerCase();
  browser = browser === undefined ? 'default' : browser;
  files = files === undefined ? 'default' : files;

  var config = {
    files: files,
    port: 9000,
    notify: false,
    server: {
      baseDir: baseDir,
      middleware: [
        //proxyMiddleware,
        modRewrite(['!\\.\\w+$ /index.html [L]']) // require for HTML5 mode
      ]
    },
    browser: browser
  };

  /**
   * Replace the tag <!-- inject-browser-sync --> with some specific js code
   * injecting what we need (env var, jspm.config override ...)
   *
   * Only used on dev and test
   */
  if (env.toLowerCase() !== 'prod') {
    var injectBrowserSync = [];
    injectBrowserSync.push('window.env = "' + env + '";');
    injectBrowserSync.push('console.log("Launch in ' + env + ' mode");');
    switch (env) {
      case 'test':
        injectBrowserSync.push('console.warn("Overriding jspm.config.js");');
        injectBrowserSync.push('System.config(' + JSON.stringify(jspmOverride) + ');');
        injectBrowserSync.push('console.log("Using following System.paths",System.paths);');
        break;
    }
    injectBrowserSync = '<script id="inject-browser-sync">' + injectBrowserSync.join('') + '</script>';
    config.rewriteRules = [
      {
        match: /<!-- inject-browser-sync -->/g,
        fn: function (match) {
          return injectBrowserSync;
        }
      }
    ];
  }

  browserSync(config);
}

//=============================================
//                 TASKS
//=============================================

/**
 * The 'serve' task serve the dev environment.
 */
gulp.task('serve', ['sass', 'watch'], () => {
  startBrowserSync('dev', ['.tmp', 'src', 'jspm_packages', './']);
});

/**
 * The 'serve' task adding the overrides to the jspm configuration for mocks and stubs
 *
 * This is for dev purpose of the tests. Launch the tests with `npm test` or `npm test-unit`
 *
 * @todo this task is not complete yet : System.paths is not correctly overriden
 */
gulp.task('serve:test', () => {
  startBrowserSync('test', ['.tmp', 'src', 'jspm_packages', './']);
});

/**
 * The 'serve' task serve the prod environment (you need to build before)
 */
gulp.task('serve:prod', () => {
  startBrowserSync('prod', ['./build/dist']);
});
