angular.module('SlaApp.negotiate.factories', [])


.factory('ServiceFactory', function ($http,NEGOTIATION_API) {
	return {
		all: function () {
            return $http.get(NEGOTIATION_API.Services, {
			//return $http.get('data/services.json', {
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
          //return $http.get('data/capabilities.json', {
				timeout: 5000
			})
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
.factory('AgreementFactory', function ($http,NEGOTIATION_API) {
	return {
		submit: function (securitiesObj) {
			 return $http.post(NEGOTIATION_API.Agreements,securitiesObj,{timeout:5000})
//          return $http.get('data/metrics.json',{timeout:5000})
		}
      
	}
})
.factory('OverviewFactory', function ($http,NEGOTIATION_API) {
	return {
		submit: function (agreementsObj) {
			 return $http.post(NEGOTIATION_API.Overview,agreementsObj,{timeout:5000})
//          return $http.get('data/offers.json',{timeout:5000})
		},
        get: function (offerIdentifier) {
			return $http.get(NEGOTIATION_API.OfferXML + offerIdentifier, {
//          return $http.get('data/offer.xml', {
				timeout: 5000
			})
		},
        sendOffer: function (offerObj) {
			 return $http.post(NEGOTIATION_API.Offer,offerObj,{timeout:5000})
		},
	}
})

;



angular.module('SlaApp.sign.factories', [])

.factory('SignFactory', function ($http,SIGN_API) {
	return {
		get: function () {
            return $http.get(SIGN_API.Signs, {
//			return $http.get('data/signs.json', {
				timeout: 5000
			});
		},
        submit: function (signId) {
			 return $http.post(SIGN_API.Sign + signId, null,{timeout:5000})
		}
	}
})

;


angular.module('SlaApp.implement.factories', [])

.factory('ImplementFactory', function ($http,IMPLEMENT_API) {
	return {
		get: function () {
            return $http.get(IMPLEMENT_API.Implements, {
//			return $http.get('data/implements.json', {
				timeout: 5000
			});
		},
        submit: function (implementId) {
			 return $http.post(IMPLEMENT_API.Implement + implementId, null,{timeout:5000})
		}
	}
})

;