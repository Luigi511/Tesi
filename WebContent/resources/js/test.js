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


function fillMetric(securityControlId, metricObj, targetObject) {
       var found = false;
       for(capabilityIterator in targetObject.capabilities){
//          console.log("capabilities[capabilityIterator]");
//          console.log(targetObject.capabilities[capabilityIterator]);
          for(frameworkIterator in targetObject.capabilities[capabilityIterator].frameworks){
//               console.log("targetObject.capabilities[capabilityIterator].frameworks[frameworkIterator]");
//               console.log(targetObject.capabilities[capabilityIterator].frameworks[frameworkIterator]);
               for(securityControlIterator in targetObject.capabilities[capabilityIterator].frameworks[frameworkIterator].securityControls){
                  
                  if(targetObject.capabilities[capabilityIterator].frameworks[frameworkIterator].securityControls[securityControlIterator].metrics == null)
                     targetObject.capabilities[capabilityIterator].frameworks[frameworkIterator].securityControls[securityControlIterator].metrics = [];
                  
                  console.log("LOOP"+ securityControlIterator + ": " + targetObject.capabilities[capabilityIterator].frameworks[frameworkIterator].securityControls[securityControlIterator].id);
                  //targetObject.capabilities[capabilityIterator].frameworks[frameworkIterator].securityControls[securityControlIterator].metrics = {};
//                  console.log("targetObject.capabilities[capabilityIterator].frameworks[frameworkIterator].securityControls[securityControlIterator]");
//                  console.log(targetObject.capabilities[capabilityIterator].frameworks[frameworkIterator].securityControls[securityControlIterator]); 
                  if(securityControlId == targetObject.capabilities[capabilityIterator].frameworks[frameworkIterator].securityControls[securityControlIterator].id){
                     console.log("ID TROVATO: " + targetObject.capabilities[capabilityIterator].frameworks[frameworkIterator].securityControls[securityControlIterator].id);
                     //targetObject.capabilities[capabilityIterator].frameworks[frameworkIterator].securityControls.push(metricObj);
                     console.log("securityControlIterator: " + securityControlIterator);
                     //found = true;
                     //targetObject.capabilities[capabilityIterator].frameworks[frameworkIterator].securityControls[securityControlIterator].metrics = [];
                     targetObject.capabilities[capabilityIterator].frameworks[frameworkIterator].securityControls[securityControlIterator].metrics.push(metricObj);
                     //console.log("Metrica Inserita per securityControl: " + securityControlId);
                     break;
                  }
               }
               
          }
          
       }
       
       
       
       
       
       
       

       console.log("targetObject: ");
       console.log(targetObject);
        return targetObject;
    }