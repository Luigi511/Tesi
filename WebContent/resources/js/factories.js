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



angular.module('SlaApp.negotiate.factories', [])
.factory('StartFactory', function ($http,START_API) {
	return {
		add: function (name, surname) {
            return $http.post(START_API.AddUser+name+"/"+surname, {
				timeout: 5000
			});
		},
		getId: function (name, surname) {
            return $http.get(START_API.GetUserId+name+"/"+surname, {
				timeout: 5000
			});
		},
		getUsers: function () {
            return $http.get(START_API.GetUsers, {
				timeout: 5000
			});
		},
		getUserSession: function (name, surname) {
            return $http.get(START_API.GetUsers+"/"+name+"/"+surname+"/sessions", {
				timeout: 5000
			});
		}
	}
})
.factory('SecurityFactory', function ($http,NEGOTIATION_API) {
	return {
		submit: function (capabilitiesObj) {
			return $http.post(NEGOTIATION_API.Securities,capabilitiesObj,{timeout:5000})
//          return $http.get('data/securitycontrols.json',{timeout:5000})
		}
      
	}
})
.factory('InsertFactory', function ($http,INSERT_API) {
	return {
		getCategories: function () {
            return $http.get(INSERT_API.Categories, {
				timeout: 5000
			});
		},
		getComponents: function (userId) {
            return $http.get(INSERT_API.Components+userId, {
				timeout: 5000
			});
		},
		uploadFile: function (userId, fd) {
			return $http.post(INSERT_API.UpFile+userId, fd, {
				transformRequest : angular.identity,
				headers : {
					'Content-Type' : undefined
				}
			})
		},
		addComponent: function (userId, name, dept, type) {
            return $http.post(INSERT_API.AddComponent+name+"/"+dept+"/"+userId+"/"+type, {
				timeout: 5000
			});
		}
	}
})
;
