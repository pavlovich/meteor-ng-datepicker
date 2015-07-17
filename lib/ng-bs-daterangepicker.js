/**
 * @license ng-bs-daterangepicker v0.0.1
 * (c) 2013 Luis Farzati http://github.com/luisfarzati/ng-bs-daterangepicker
 * License: MIT
 */
(function (angular) {
    'use strict';

    angular.module('ngBsDatePicker', [])
    .directive('input', ['$compile', '$parse', function ($compile, $parse) {
        return {
            restrict: 'E',
            require: '?ngModel',
            link: function ($scope, $element, $attributes, ngModel) {
                if ((($attributes.type !== 'daterange') && ($attributes.type !== 'datetimerange') && ($attributes.type !== 'datesingle') && ($attributes.type !== 'datetimesingle')) || ngModel === null ) return;

                var options = {};
                options.timePicker = ($attributes.type == 'datetimesingle') || ($attributes.type == 'datetimerange');
                options.singleDatePicker = ($attributes.type == 'datesingle') || ($attributes.type == 'datetimesingle');
                options.format = $attributes.format || (options.timePicker ? 'YYYY-MM-DD HH:mm' : 'YYYY-MM-DD');
                options.separator = $attributes.separator || ' - ';
                options.minDate = $attributes.minDate && moment($attributes.minDate);
                options.maxDate = $attributes.maxDate && moment($attributes.maxDate);
                options.dateLimit = $attributes.limit && moment.duration.apply(this, $attributes.limit.split(' ').map(function (elem, index) { return index === 0 && parseInt(elem, 10) || elem; }) );
                options.ranges = $attributes.ranges && $parse($attributes.ranges)($scope);
                options.locale = $attributes.locale && $parse($attributes.locale)($scope);
                options.opens = $attributes.opens && $parse($attributes.opens)($scope);

                function format(date) {
                    return date.format(options.format);
                }

                function formatted(dates) {
                    if(dates.startDate.valueOf() == dates.endDate.valueOf()){
                        return format(dates.startDate);
                    }
                    return [format(dates.startDate), format(dates.endDate)].join(options.separator);
                }

                ngModel.$formatters.unshift(function (modelValue) {
                    if (!modelValue) return '';
                    return modelValue;
                });

                ngModel.$parsers.unshift(function (viewValue) {
                    return viewValue;
                });

                ngModel.$render = function () {
                    if (!ngModel.$viewValue || !ngModel.$viewValue.startDate) return;
                    $element.val(formatted(ngModel.$viewValue));
                };

                $scope.$watch($attributes.ngModel, function (modelValue) {
                    if (!modelValue) {
                        ngModel.$setViewValue({ startDate: moment().startOf('day'), endDate: moment().startOf('day') });
                        return;
                    }

                    if(!modelValue.startDate && moment.isMoment(modelValue)){
                        ngModel.$setViewValue({ startDate: modelValue, endDate: modelValue});
                        $element.data('daterangepicker').setStartDate(modelValue);
                        $element.data('daterangepicker').setEndDate(modelValue);
                    }else {
                        $element.data('daterangepicker').setStartDate(modelValue.startDate);
                        $element.data('daterangepicker').setEndDate(modelValue.endDate);
                    }
                    $element.data('daterangepicker').updateView();
                    $element.data('daterangepicker').updateCalendars();
                    $element.data('daterangepicker').updateInputText();
                });

                $element.daterangepicker(options, function(start, end) {
                    $scope.$apply(function () {
                        ngModel.$setViewValue({ startDate: start, endDate: end });
                        ngModel.$render();
                    });
                });
            }
        };
    }]);

})(angular);