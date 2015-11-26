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