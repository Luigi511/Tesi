/*App Module */

angular.module('underscore', [])
	.factory('_', function () {
		return window._; // assumes underscore has already been loaded on the page
	});

//NECESSARIO!!!!
//Define an angular module for our app
angular.module('SlaApp', [//'SlaApp.ranking', 
                          'SlaApp.negotiate',
                          'ngCookies',
                          //'SlaApp.sign', 
                          //'SlaApp.implement', 
                          //'SlaApp.monitor', 
                          'SlaApp.controllers', 'SlaApp.directives', 'SlaApp.config', 'SlaApp.filters', 'SlaApp.services',
                          'SlaApp.sign.factories', 'SlaApp.implement.factories', 
                           'ngAnimate', 'ui.router', 'angular-loading-bar', 'underscore'])

                           
                           
                           
                           
// Stati definiti dalla barra in alto
// Vai a vedere il file navigation.html
.config(function ($stateProvider, $urlRouterProvider) {
  
    $stateProvider
    	//ritorna alla home
        .state('welcome', {
            url: '/welcome',
            templateUrl: 'resources/views/welcome.html',
            controller: 'SlaCtrl'
        })
        
        //inizio wizard
        .state('negotiate', {
            url: '/negotiate',
            abstract: true,
            templateUrl: 'resources/views/form.html',
            controller: 'NegotiateCtrl'
        })
        
        
        .state('sign', {
            url: '/sign',
            templateUrl: 'resources/views/form-start-sign.html',
            controller: 'SignCtrl'
        })
        
        
        .state('implement', {
            url: '/implement',
            templateUrl: 'resources/views/form-start-implement.html',
            controller: 'ImplementCtrl'
        })
        
        
        .state('monitor', {
            url: '/monitor',
            template: '<div>monitor</div>',
            //controller: 'MonitorCtrl'
        });
        
        
/*        
        .state('ranking', {
            url: '/',
            template: '<div>ranking</div>',
            //controller: 'IndexCtrl'
        })
        */
        

        
        $urlRouterProvider.otherwise('/welcome');
})

.config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeSpinner = false;
}])

;


// Stati definiti dalla barra di navigazione (wizard)
// Vai a vedere il file navbar.html
angular.module('SlaApp.negotiate', ['SlaApp.negotiate.controllers', 'SlaApp.negotiate.factories', 'ngAnimate', 'ui.router'])
.config(function ($stateProvider) {
  
    $stateProvider
        .state('negotiate.start', {
            url: '/start',
            templateUrl: 'resources/views/form-start.html',
            controller: 'StartCtrl'
        })
 
        .state('negotiate.insert', {
            url: '/insert',
            templateUrl: 'resources/views/form-insert.html',
            controller: 'InsertCtrl'
        })
        .state('negotiate.threat', {
            url: '/threat',
            templateUrl: 'resources/views/form-threat.html',
            controller: 'ThreatCtrl'
        })
        .state('negotiate.ranking', {
            url: '/threat',
            templateUrl: 'resources/views/form-ranking.html',
            controller: 'RankCtrl'
        })
        .state('negotiate.security', {
            url: '/security',
            templateUrl: 'resources/views/form-security.html',
            controller: 'SecurityCtrl'
        })
        .state('negotiate.agreement', {
            url: '/agreement',
            templateUrl: 'resources/views/form-agreement.html',
            controller: 'AgreementCtrl'
        })
        .state('negotiate.overview', {
            url: '/overview',
            templateUrl: 'resources/views/form-overview.html',
            controller: 'OverviewCtrl'
        })
        
        /*        
        .state('negotiate.service', {
            url: '/service',
            templateUrl: 'resources/views/form-service.html',
            controller: 'ServiceCtrl'
        })
        .state('negotiate.capability', {
            url: '/capability',
            templateUrl: 'resources/views/form-capability.html',
            controller: 'CapabilityCtrl'
        })
*/
        
});


