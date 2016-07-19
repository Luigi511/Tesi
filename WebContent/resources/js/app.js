/* 
 
Copyright 2015 SPECS Project - CeRICT

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

@author  Massimiliano Rak massimiliano.rak@unina2.it
@author  Luigi De Matteis luigi.dematteis2@studenti.unina2.it

 */




/*App Module */

angular.module('underscore', [])
	.factory('_', function () {
		return window._; // assumes underscore has already been loaded on the page
	});

//NECESSARIO!!!!
//Define an angular module for our app
angular.module('SlaApp', [
                          'SlaApp.negotiate',
                          'ngCookies',
                          'SlaApp.controllers', 'SlaApp.directives', 'SlaApp.config', 'SlaApp.filters', 'SlaApp.services',
                          
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
        //pagina dettagli
        .state('luigi', {
            url: '/luigi',
            templateUrl: 'resources/views/luigi.html',
            controller: 'Luigi'
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
            url: '/ranking',
            templateUrl: 'resources/views/form-ranking.html',
            controller: 'RankCtrl'
        })
        .state('negotiate.security', {
            url: '/security',
            templateUrl: 'resources/views/form-security.html',
            controller: 'SecurityCtrl'
        })
        .state('negotiate.metrics', {
            url: '/metrics',
            templateUrl: 'resources/views/form-metrics.html',
            controller: 'MetricsCtrl'
        })
        .state('negotiate.metrics2', {
            url: '/metrics2',
            templateUrl: 'resources/views/form-metrics2.html',
            controller: 'MetricsCtrl2'
        })
        
        .state('negotiate.overview', {
            url: '/overview',
            templateUrl: 'resources/views/form-overview.html',
            controller: 'OverviewCtrl'
        })

        
        

        
});


