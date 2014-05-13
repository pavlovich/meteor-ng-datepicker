Package.describe({
	summary: " Luis Farzati angularization of Dan Grossman's bootstrap-daterangepicker, repackaged for meteor."
});

Package.on_use(function (api) {
    api.use('ngMeteor', ['client']);
    api.use('moment', ['client']);

    // Files to load in Client only.
    api.add_files([
        'lib/daterangepicker.js',
        'lib/daterangepicker-bs3.css',
        'lib/ng-bs-daterangepicker.js',
        'meteor-ng-bootstrap-datepicker.js'
	], 'client');

    // Exports the ngMeteor package scope
    api.export('ngMeteor', 'client');
});
