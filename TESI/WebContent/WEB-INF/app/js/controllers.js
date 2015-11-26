angular.module('NegotiationApp.controllers', [])

// our controller for the form
// =============================================================================
.controller('formController', function ($scope, $location) {

  // we will store all of our form data in this object
  $scope.formData = {
		capabilities: [{
          frameworks:[{
            securityControls: [{
               metrics: [{}]
            }]
          }]
	   }]
  };
   
  $scope.formService = {};
  $scope.formCapabilities = {};
  $scope.formSecurities = {};
  $scope.formSecurityCtrl_SecurityControlWeight = {};
  $scope.formSecurityCtrl_DefaultSecurityControlWeight = {}; 
  $scope.formAgreements = {};
  $scope.formAgreementCtrl_Importance = {};
  $scope.formAgreementCtrl_Expression = {};
  $scope.formAgreementCtrl_DefaultImportance = {};
  $scope.formAgreementCtrl_DefaultExpression = {};
  $scope.formAgreementCtrl_Operand = {};
  $scope.formAgreementCtrl_SecurityControls = {};

})


.controller('StartCtrl', function ($scope, $location) {
  // we will store all of our form data in this object
  $scope.formData = {};
  $scope.formService = {};
  
})

.controller('ServiceCtrl', function ($scope, $location, ServiceFactory, cfpLoadingBar) {
   
  $scope.alertMessage = "Error: no service is displayed.";
  cfpLoadingBar.start();
  ServiceFactory.all()
    .success(function (data, status, headers, config) {
       //console.log(data);
       //console.log(status);
       if(data.length == 0)
          $scope.alertMessage = "No data received from server.";
       else {
          $scope.services = data.services;
          $scope.formData.idsla = data.idsla;
       }
       cfpLoadingBar.complete();
    })
    .error(function (statusText) {
       $scope.errorState = true;
       $scope.errorMessage = (statusText == null) ? "Server Connection Error!" : "Server Connection Error! " + statusText;
       // View error
       console.log("Errore di connessione al server: " + statusText);
       cfpLoadingBar.complete();
    });

})
  
.controller('CapabilityCtrl', function ($scope, CapabilityFactory, cfpLoadingBar) {
   
  //console.log($scope.formService.SDT_list);
  $scope.alertMessage = "You did not select any service, therefore no control is displayed.";

  if($scope.formService.SDT_list != null)
  {
     cfpLoadingBar.start();
     CapabilityFactory.get($scope.formService.SDT_list)
       .success(function (data, status, headers, config) {
          console.log(data);
          console.log(status);
          if(data.length == 0)
             $scope.alertMessage = "No data received from server.";      
          else {
             $scope.capabilities = data.capabilities;
             $scope.idsla = data.idsla;
             $scope.formService.idsla = data.idsla;
             $scope.formData.idsla = data.idsla;
          }
          cfpLoadingBar.complete();
       })
       .error(function (statusText) {
          $scope.errorState = true;
          $scope.errorMessage = (statusText == null) ? "Server Connection Error!" : "Server Connection Error! " + statusText;
          // View error
          console.log("Errore di connessione al server: " + statusText);
          cfpLoadingBar.complete();
       });
  }
//  else{
//    $scope.errorMessage = "You did not select any service, therefore no control is displayed.";
//  }

})

.controller('SecurityCtrl', function ($scope,SecurityFactory, cfpLoadingBar) {
   
  $scope.alertMessage = "You did not select any capability, therefore no control is displayed.";
  fillCapabilities();

  if($scope.formData != null && $scope.formData.capabilities.length)
  {
       cfpLoadingBar.start();
       SecurityFactory.submit($scope.formData)
          .success(function (data, status, headers, config) {
             //console.log(data);
             //console.log(status);
             if(data.length == 0)
                $scope.alertMessage = "No data received from server.";
             else{
                $scope.capabilities = data.capabilities;
                $scope.idsla = data.idsla;                  
             }
             cfpLoadingBar.complete();
          })
          .error(function (statusText) {
             $scope.errorState = true;
             $scope.errorMessage = (statusText == null) ? "Server Connection Error!" : "Server Connection Error! " + statusText;
             // View error
             console.log("Errore di connessione al server: " + statusText);
             cfpLoadingBar.complete();
          });

  }
   
   
  function fillCapabilities() {
    
    var capabilities = [];
    for (item in $scope.formCapabilities) {
       var tmpCap = {};
       tmpCap.id = item;
       capabilities.push(tmpCap);
    }
    $scope.formData.capabilities = capabilities;   
  }

})

.controller('AgreementCtrl', function ($scope,AgreementFactory, cfpLoadingBar) {
  
  $scope.alertMessage = "You did not select any security control, therefore no control is displayed.";
  $scope.operators = getSLOexpOperators();
  fillSecurityControls();

  if($scope.formData != null && $scope.formData.capabilities.length) {
       cfpLoadingBar.start();
       AgreementFactory.submit($scope.formData)
          .success(function (data, status, headers, config) {
             if(data.length == 0)
                $scope.alertMessage = "No data received from server.";
             else {
                $scope.capabilities = data.capabilities;
                $scope.idsla = data.idsla;                  
             }
             cfpLoadingBar.complete();
          })
          .error(function (statusText) {
             $scope.errorState = true;
             $scope.errorMessage = (statusText == null) ? "Server Connection Error!" : "Server Connection Error! " + statusText;
             // View error
             console.log("Errore di connessione al server: " + statusText);
             cfpLoadingBar.complete();
          });
    
  }
   

  function getSLOexpOperators() {
    return [{
       name: 'equal',
       value: 'eq'
       }, {
       name: 'less than',
       value: 'lt'
       }, {
       name: 'greater than',
       value: 'gt'
       }, {
       name: 'less or equal than',
       value: 'le'
       }, {
       name: 'greater or equal than',
       value: 'ge'
       }
    ];
  }
   
  function fillSecurityControls() {
      
    var capabilities = [];
    for (item in $scope.formSecurities) {

      var tmpCap = {};
      tmpCap.id = item;
      tmpCap.frameworks = [];

      for (frm in $scope.formSecurities[item]){

        var tmpFrm = {};
        tmpFrm.id = frm;
        tmpCap.frameworks.push(tmpFrm);
        tmpCap.frameworks[tmpCap.frameworks.length-1].securityControls = [];

        for (sctrl in $scope.formSecurities[item][frm]){

          var tmpSctrl = {};
          tmpSctrl.id = sctrl;
          tmpSctrl.weight = $scope.formSecurityCtrl_SecurityControlWeight[sctrl];

          if(tmpSctrl.weight == null)
            tmpSctrl.weight = $scope.formSecurityCtrl_DefaultSecurityControlWeight[sctrl];

          tmpCap.frameworks[tmpCap.frameworks.length-1].securityControls.push(tmpSctrl);
        }
      }
      capabilities.push(tmpCap);
    }
    $scope.formData.capabilities = capabilities;
  }
   
})

.controller('OverviewCtrl', function ($scope, OverviewFactory, _, $filter, cfpLoadingBar) {
   
  $scope.alertMessage = "You did not select any control.";
  fillMetrics();
  $scope.submitSLA = function() {
      
      if($scope.formData != null)
      {
         cfpLoadingBar.start();
         OverviewFactory.submit($scope.formData)
            .success(function (data, status, headers, config) {
               $scope.capabilities = data.capabilities;
               $scope.idsla = data.idsla;
               cfpLoadingBar.complete();
            })
            .error(function (statusText) {
               $scope.errorState = true;
               $scope.errorMessage = (statusText == null) ? "Server Connection Error!" : "Server Connection Error! " + statusText;
               // View error
               console.log("Errore di connessione al server: " + statusText);
               cfpLoadingBar.complete();
            });      
      }
      
   }
   
  function fillMetrics() {
      
    $scope.processCompleted = false;
   
    for (item in $scope.formAgreements) {
      
      var capabilityObj = new Object();
      capabilityObj.id = item;
      capabilityObj.frameworks = [];
       
      for (frm in $scope.formAgreements[item]){
         
        var frameworkObj = new Object();
        frameworkObj.id = frm;
        capabilityObj.frameworks.push(frameworkObj);
        capabilityObj.frameworks[capabilityObj.frameworks.length-1].metrics = [];
         
        for (mctrl in $scope.formAgreements[item][frm]){
         
          var metricObj = new Object();
          metricObj.id = mctrl;
          console.log("MetricId: " + metricObj.id);
          metricObj.importance = $scope.formAgreementCtrl_Importance[mctrl];
          if(metricObj.importance == null){
            metricObj.importance = $scope.formAgreementCtrl_DefaultImportance[mctrl];
                  //console.log("SONO NELL'IF");  
          }
          
          console.log("MetricImportance: " + metricObj.importance); 
          metricObj.operator = $scope.formAgreementCtrl_Expression[mctrl];
            
          if(metricObj.operator == null)
            metricObj.operator = $scope.formAgreementCtrl_DefaultExpression[mctrl];
            
          console.log("MetricExpression: " + metricObj.operator);
          metricObj.operand = $scope.formAgreementCtrl_Operand[mctrl];
          console.log("MetricExpValue: " + metricObj.operand);
          metricObj.securityControls = $scope.formAgreementCtrl_SecurityControls[item][frm][mctrl];
         
          var targetMetricObj = new Object();
          targetMetricObj.id = metricObj.id;
          targetMetricObj.importance = metricObj.importance;
          targetMetricObj.operator = metricObj.operator;
          targetMetricObj.operand = metricObj.operand;
          console.log(metricObj.securityControls);
          console.log(JSON.stringify(targetMetricObj));
          for (secCtrlID in metricObj.securityControls) {
               
            console.log("===================================== Loop su securityControl ID =======================================================");
               
            var prop = 'id';
		    var search_obj = {};
		    search_obj[prop] = metricObj.securityControls[secCtrlID];
            console.log("SecurityControl ID letto dall'array dei SecurityControls");
            var securityControlId = search_obj.id;
            console.log(securityControlId);
              
            $scope.formData = bindMetricToSecurityControl(securityControlId, targetMetricObj, $scope.formData);    
                         
          }
        }
      }
    }   
  }
   
  function bindMetricToSecurityControl(securityControlId, metricObj, targetObject) {

    for(capabilityIterator in targetObject.capabilities){
      for(frameworkIterator in targetObject.capabilities[capabilityIterator].frameworks){
        for(securityControlIterator in targetObject.capabilities[capabilityIterator].frameworks[frameworkIterator].securityControls){
                  
          if(targetObject.capabilities[capabilityIterator].frameworks[frameworkIterator].securityControls[securityControlIterator].metrics == null)
            targetObject.capabilities[capabilityIterator].frameworks[frameworkIterator].securityControls[securityControlIterator].metrics = [];
                  
          console.log("LOOP"+ securityControlIterator + ": " + targetObject.capabilities[capabilityIterator].frameworks[frameworkIterator].securityControls[securityControlIterator].id);

          if(securityControlId == targetObject.capabilities[capabilityIterator].frameworks[frameworkIterator].securityControls[securityControlIterator].id){
            console.log("ID TROVATO: " + targetObject.capabilities[capabilityIterator].frameworks[frameworkIterator].securityControls[securityControlIterator].id);
            console.log("securityControlIterator: " + securityControlIterator);
            var len = targetObject.capabilities[capabilityIterator].frameworks[frameworkIterator].securityControls[securityControlIterator].metrics.length;
                     
            if(len == 0 || !$filter('isIdExisting')(metricObj, targetObject.capabilities[capabilityIterator].frameworks[frameworkIterator].securityControls[securityControlIterator].metrics)){
              targetObject.capabilities[capabilityIterator].frameworks[frameworkIterator].securityControls[securityControlIterator].metrics.push(metricObj); 
              console.log("Metrica con id: " + metricObj.id + " inserita per securityControl: " + securityControlId);
            }
            console.log("Numero elementi Array Metriche: " + targetObject.capabilities[capabilityIterator].frameworks[frameworkIterator].securityControls[securityControlIterator].metrics.length);
            if(targetObject.capabilities[capabilityIterator].frameworks[frameworkIterator].securityControls[securityControlIterator].metrics.length > 0)
              $scope.processCompleted = true;
                     
            break;
          }
        }
      }  
    }
    console.log("targetObject: ");
    console.log(targetObject);
    return targetObject;
  } 
    

})

;