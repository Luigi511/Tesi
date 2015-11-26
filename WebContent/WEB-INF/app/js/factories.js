angular.module('NegotiationApp.factories', [])

.factory('ServiceFactory', function ($http,NEGOTIATION_API) {
	return {
		all: function () {
            return $http.get(NEGOTIATION_API.Services, {
//			return $http.get('data/services.json', {
				timeout: 5000
			});
		}
	}
})
.factory('CapabilityFactory', function ($http,NEGOTIATION_API) {
	return {
		all: function (serviceId) {
			return $http.get(NEGOTIATION_API.Capabilities, {
//          return $http.get('data/capabilities.json', {
				timeout: 5000
			})
		},
        get: function (serviceId) {
			return $http.get(NEGOTIATION_API.Capabilities + serviceId, {
//          return $http.get('data/capabilities.json', {
				timeout: 5000
			})
		}
	}
})
.factory('SecurityFactory', function ($http,NEGOTIATION_API) {
	return {
		submit: function (capabilitiesObj) {
			return $http.post(NEGOTIATION_API.Securities,capabilitiesObj,{timeout:5000})
          //return $http.get('data/securitycontrols.json',{timeout:5000})
		}
      
	}
})
.factory('AgreementFactory', function ($http,NEGOTIATION_API) {
	return {
		submit: function (securitiesObj) {
			 return $http.post(NEGOTIATION_API.Agreements,securitiesObj,{timeout:5000})
          //return $http.get('data/metrics.json',{timeout:5000})
		}
      
	}
})
.factory('OverviewFactory', function ($http,NEGOTIATION_API) {
	return {
		submit: function (agreementsObj) {
			 return $http.post(NEGOTIATION_API.Overview,agreementsObj,{timeout:5000})
          //return $http.get('data/metrics.json',{timeout:5000})
		}
      
	}
})

;