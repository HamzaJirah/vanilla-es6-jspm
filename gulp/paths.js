'use strict';

const paths = {
  gulpfile: 'gulpfile.js',
  /**
   * This is a collection of file patterns that refer to our app code (the
   * stuff in `src/`). These file paths are used in the configuration of
   * build tasks.
   *
   * - 'styles'       contains all project css styles
   * - 'images'       contains all project images
   * - 'fonts'        contains all project fonts
   * - 'scripts'      contains all project javascript except config-env.js and unit test files
   * - 'html'         contains main html files
   * - 'templates'    contains all project html templates
   */
  app: {
    basePath: 'src/',
    styles: 'src/styles/**/*.scss',
    fonts: [
      'src/fonts/**/*.{eot,svg,ttf,woff}',
      'jspm_packages/**/*.{eot,svg,ttf,woff}'
    ],
    images: 'src/images/**/*.{png,gif,jpg,jpeg}',
    scripts: ['src/app/**/*.js'],
    html: 'src/index.html',
    templates: 'src/app/**/*.html'
  },
  /**
   * The 'tmp' folder is where our html templates are compiled to JavaScript during
   * the build process and then they are concatenating with all other js files and
   * copy to 'dist' folder.
   */
  tmp: {
    basePath: '.tmp/',
    styles: '.tmp/styles/',
    scripts: '.tmp/scripts/'
  },
  build: {
    basePath: 'build/',
    dist: {
      basePath: 'build/dist/',
      fonts: 'build/dist/fonts/',
      images: 'build/dist/images/',
      styles: 'build/dist/styles/',
      scripts: 'build/dist/scripts/'
    },
    docs: 'build/docs/'
  },
  test: {
    basePath: 'test/',
    config: {
      karma: 'karma.conf.js',
      jspmOverride: 'test/jspm.override.json',
      e2e: 'protractor.config.js'
    },
    unit: 'test/unit/**/*.js',
    fixtures: 'test/fixtures/**/*.html',
    e2e: 'test/e2e/**/*.js',
    stubs: 'test/stubs/**/*.js'
  }
};

export default paths;
