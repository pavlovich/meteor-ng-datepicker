Package.describe({
  name: 'sgi:ng-datepicker',
  version: '0.0.2',
  summary: 'Luis Farzati angularization of bootstrap-daterangepicker by Dan Grossman, repackaged for meteor.',
  git: 'http://github.com/pavlovich/meteor-ng-datepicker',
  documentation: 'README.md'
});

Package.on_use(function (api) {
    api.versionsFrom('METEOR@1.0.3');
    //api.use('angular:angular@1.4.0');
    api.use('momentjs:moment@2.8.4');

    // Files to load in Client only.
    api.addFiles([
        'lib/daterangepicker.js',
        'lib/daterangepicker-bs3.css',
        'lib/ng-bs-daterangepicker.js',
        'meteor-ng-datepicker.js'
	], 'client');

    // Exports the ngMeteor package scope
    //api.export('ngMeteor', 'client');
    api.export('moment');
});
