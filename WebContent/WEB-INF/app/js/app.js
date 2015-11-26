/*App Module */

//angular.module('LoadingBarExample', ['chieffancypants.loadingBar', 'ngAnimate'])
//  .config(function(cfpLoadingBarProvider) {
//    cfpLoadingBarProvider.includeSpinner = false;
//  });

// Ionic Starter App
angular.module('underscore', [])
	.factory('_', function () {
		return window._; // assumes underscore has already been loaded on the page
	});

//Define an angular module for our app
angular.module('NegotiationApp',['NegotiationApp.controllers',
                                 'NegotiationApp.factories',
                                 'NegotiationApp.config',
                                 'NegotiationApp.directives',
                                 'NegotiationApp.filters',
                                 'ngAnimate','ui.router','angular-loading-bar','underscore'])

// configuring our routes 
// =============================================================================
.config(function($stateProvider, $urlRouterProvider) {
    
    $stateProvider
    // route to show our basic form (/form)
        .state('welcome', {
            url: '/welcome',
            templateUrl: 'views/welcome.html',
            //controller: 'WelcomeCtrl'
        })
    
        // route to show our basic form (/form)
        .state('form', {
            url: '/form',
            abstract: true,
            templateUrl: 'views/form.html',
            controller: 'formController'
        })
        
        // nested states 
        // each of these sections will have their own view
        // url will be nested (/form/profile)
        .state('form.start', {
            url: '/start',
            templateUrl: 'views/form-start.html',
            controller: 'StartCtrl'
      
        })
        
        // url will be /form/interests
        .state('form.service', {
            url: '/service',
            templateUrl: 'views/form-service.html',
            controller: 'ServiceCtrl'
      
        })
        
        // url will be /form/payment
        .state('form.capability', {
            url: '/capability',
            templateUrl: 'views/form-capability.html',
      controller: 'CapabilityCtrl'
        })
  // url will be /form/payment
        .state('form.security', {
            url: '/security',
            templateUrl: 'views/form-security.html',
       controller: 'SecurityCtrl'
        })
    // url will be /form/payment
        .state('form.agreement', {
            url: '/agreement',
            templateUrl: 'views/form-agreement.html',
       controller: 'AgreementCtrl'
        })
       // url will be /form/payment
        .state('form.overview', {
            url: '/overview',
            templateUrl: 'views/form-overview.html',
       controller: 'OverviewCtrl'
        })
    // catch all route
    // send users to the form page 
    $urlRouterProvider.otherwise('/welcome');
})

.config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeSpinner = false;
}])

;
