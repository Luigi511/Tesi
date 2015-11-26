angular.module('NegotiationApp.config', [])
	.constant('NEGOTIATION_API', {

		UrlBase: 'http://www.sla-negotiation.com/api/',
        Services: 'http://localhost:8080/specs-app-webcontainer-rev2/rest/services/',
//   Services: 'http://localhost:8080/specs-app-webcontainer-rev2-0.0.1-SNAPSHOT/rest/services/',
        Capabilities: 'http://localhost:8080/specs-app-webcontainer-rev2/rest/capabilities/', 
//   Capabilities: 'http://localhost:8080/specs-app-webcontainer-rev2-0.0.1-SNAPSHOT/rest/capabilities/', 
        Securities: 'http://localhost:8080/specs-app-webcontainer-rev2/rest/securities/',
//   Securities: 'http://localhost:8080/specs-app-webcontainer-rev2-0.0.1-SNAPSHOT/rest/securities/',
        Agreements: 'http://localhost:8080/specs-app-webcontainer-rev2/rest/agreements/',
        Overview: 'http://localhost:8080/specs-app-webcontainer-rev2/rest/overview/'
	})
;
