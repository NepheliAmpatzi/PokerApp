module.exports = function(karma) {
  karma.set({
    basePath: './',
    frameworks: ['browserify', 'jasmine'],
    files: ['./Tests/*.spec.js'],
    preprocessors: {
      './Tests/*.spec.js': ['browserify']
    },
    browsers: ['ChromeHeadless'],
    singleRun: true,
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-browserify'),
    ],
    browserify: {
      debug: true,
      watch: true,
    },
  });
};