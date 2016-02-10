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



angular.module('SlaApp.config', [])
	.constant('NEGOTIATION_API', {

		UrlBase: 'http://www.sla-negotiation.com/api/',
        Services: 'http://194.102.62.151/:8080/specs-app-webcontainer-rev2/rest/services/',
        Capabilities: 'http://194.102.62.151/:8080/specs-app-webcontainer-rev2/rest/capabilities/',  
        Securities: 'http://194.102.62.151/:8080/specs-app-webcontainer-rev2/rest/securities/',
        Agreements: 'http://194.102.62.151/:8080/specs-app-webcontainer-rev2/rest/agreements/',
        Overview: 'http://194.102.62.151/:8080/specs-app-webcontainer-rev2/rest/overview/',
        Offer: 'http://194.102.62.151/:8080/specs-app-webcontainer-rev2/rest/submitOffer/',
        OfferXML: 'http://194.102.62.151/:8080/specs-app-webcontainer-rev2/rest/offerxml/'
	})

    .constant('SIGN_API', {
  
        Signs: 'http://194.102.62.151/:8080/specs-app-webcontainer-rev2/rest/incomplete/negotiating/',
        Sign: 'http://194.102.62.151/:8080/specs-app-webcontainer-rev2/rest/sign/'
    })

    .constant('IMPLEMENT_API', {
  
        Implements: 'http://194.102.62.151/:8080/specs-app-webcontainer-rev2/rest/incomplete/signed/',
        Implement: 'http://194.102.62.151/:8080/specs-app-webcontainer-rev2/rest/implement/'
    })
;