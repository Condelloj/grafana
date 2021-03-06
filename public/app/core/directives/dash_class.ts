import $ from 'jquery';
import _ from 'lodash';
import coreModule from '../core_module';

/** @ngInject */
function dashClass($timeout) {
  return {
    link: ($scope, elem) => {
      const body = $('body');

      $scope.ctrl.dashboard.events.on('view-mode-changed', panel => {
        console.log('view-mode-changed', panel.fullscreen);
        if (panel.fullscreen) {
          body.addClass('panel-in-fullscreen');
        } else {
          $timeout(() => {
            body.removeClass('panel-in-fullscreen');
          });
        }
      });

      body.toggleClass('panel-in-fullscreen', $scope.ctrl.dashboard.meta.fullscreen === true);

      $scope.$watch('ctrl.dashboardViewState.state.editview', newValue => {
        if (newValue) {
          elem.toggleClass('dashboard-page--settings-opening', _.isString(newValue));
          setTimeout(() => {
            elem.toggleClass('dashboard-page--settings-open', _.isString(newValue));
          }, 10);
        } else {
          elem.removeClass('dashboard-page--settings-opening');
          elem.removeClass('dashboard-page--settings-open');
        }
      });
    },
  };
}

coreModule.directive('dashClass', dashClass);
