angular.module('SlaApp.controllers', [])

//VADO A DEFINIRE TUTTI I CONTROLLER DELLA BARRA IN ALTO
//OGNI CONTROLLER E' ASSOCIATO AD UNA PAGINA HTML NEL FILE app.js

.controller('SlaCtrl', function ($scope, $location, $tabActive, $state) {
  
  $scope.tabActive = function(viewLocation){
    return $tabActive.get(viewLocation, $location.path());
  }
  
  $scope.go = function(route){
        $state.go(route);
  } 
  
})

.controller('NegotiateCtrl', function ($scope, $location, $tabActive) {
  
  $scope.tabActive = function(viewLocation){
    return $tabActive.get(viewLocation, $location.path());
  }
  
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
  $scope.formOverview = {};
  $scope.formOverview_xml = {};

})

.controller('SignCtrl', function ($scope, $location, SignFactory, cfpLoadingBar, $tabActive, $state) {
  
  $scope.tabActive = function(viewLocation){
    return $tabActive.get(viewLocation, $location.path());
  }
  
  $scope.formSign = {};
  
  $scope.alertMessage = "There are no SLAs to sign!";
  cfpLoadingBar.start();
  SignFactory.get()
    .success(function (data, status, headers, config) {
       //console.log(data);
       //console.log(status);
       if(data.length == 0)
          $scope.alertMessage = "No data received from server.";
       else {
          $scope.signs = data.slas;
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
  
  
  $scope.signSLA = function() {
      
      //console.log($scope.formSign.SlaList);
      cfpLoadingBar.start();
      SignFactory.submit($scope.formSign.SlaList)
            .success(function (data, status, headers, config) {
               cfpLoadingBar.complete();
               goState('implement');
            })
            .error(function (statusText) {
               $scope.errorState = true;
               $scope.errorMessage = (statusText == null) ? "Server Connection Error!" : "Server Connection Error! " + statusText;
               // View error
               console.log("Errore di connessione al server: " + statusText);
               cfpLoadingBar.complete();
            }); 
  }
  
  function goState(route){
        $state.go(route);
  } 
  

})

.controller('ImplementCtrl', function ($scope, $location, ImplementFactory, cfpLoadingBar, $tabActive) {
  
  $scope.tabActive = function(viewLocation){
    return $tabActive.get(viewLocation, $location.path());
  }
  
  $scope.formImplement = {};
  
  $scope.alertMessage = "There are no SLAs to implement!";
  cfpLoadingBar.start();
  ImplementFactory.get()
    .success(function (data, status, headers, config) {
       //console.log(data);
       //console.log(status);
       if(data.length == 0)
          $scope.alertMessage = "No data received from server.";
       else {
          $scope.implements = data.slas;
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
  
  
  $scope.implementSLA = function() {
      
      //console.log($scope.formImplement.SlaList);
      cfpLoadingBar.start();
      ImplementFactory.submit($scope.formImplement.SlaList)
            .success(function (data, status, headers, config) {
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

})

;

//======================================================================================================================
//definizione di tutti i controlli della navbar

angular.module('SlaApp.negotiate.controllers', [])



//controller per l'inserimento dei componenti del sistema 
.controller("InsertCtrl",function($scope,$http,$cookieStore) {
	
	
	//prelevo dati cookie; 
	$scope.user_name=	$cookieStore.get('name');
    $scope.user_surname=$cookieStore.get('surname');
    $scope.user_id=		$cookieStore.get('id_utente');
    $scope.boolean1=$cookieStore.get('check1');
    $scope.boolean2=$cookieStore.get('check2');

        
    
    //prelevo tutte le categorie di threat
    $http.get("http://localhost:8080/TESI/rest/categories").
        success(function(data) {
            $scope.categories = data;
/*            for(var i=0;i<$scope.categories.length;i++){
                 console.log("categoria: "+$scope.categories[i]);
            }*/
            console.log("categorie prelevate correttamente");
       });
    
    
    
    
    //funzione di aggiornamento tabella dei componenti
    $scope.updateOnScreen = function() {
    	//prelevo i componenti dell'utente
    	$http.get("http://localhost:8080/TESI/rest/components/"+$scope.user_id).
    		success(function(data) {
    			$scope.ListComponentFromDB = data;
    			console.log('componenti utente prelevati');
    				    			
    		});
    };
    
    //all'avvio carico tutto dopodichè ricarico quando aggiungo/rimuovo
    $scope.updateOnScreen();

    //funzione di conversione
    function getBase64Image(img) {
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;

        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0,canvas.width,canvas.height);

        var dataURL = canvas.toDataURL("image/png");

        return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
        
    }
    	
    	
    	//upload schema
		$scope.uploadFile = function() {
			
			//provo a salvarla nel localstorage
			bannerImage = document.getElementById('blah');
			imgData = getBase64Image(bannerImage);
			localStorage.setItem("imgData", imgData);
			console.log('foto salvata nel localstorage');
			
			

			//la carico nel db
			var file = $scope.myFile;
			var uploadUrl = "/TESI/rest/upload";
			
			var fd = new FormData();
			fd.append('file', file);

			//fd.append('person', name);
			//fd.append('date', date);
			$http.post(uploadUrl+'/'+$scope.user_id, fd, {
				transformRequest : angular.identity,
				headers : {
					'Content-Type' : undefined
				}
			}).success(function() {
				console.log("file inviato="+$scope.myFile);
				
				$scope.boolean1=true;
				$cookieStore.put('check1',$scope.boolean1);
				
				
			}).error(function() {
			});	
		};

	///////////////////////////////////////////////////////
	// upload componenti
	var urlBase="http://localhost:8080/TESI";

	//upload nome e descr
    $scope.component = {};
    $scope.component.name = "";
    $scope.component.description = "";
    $scope.componentList = [];
     
    //funzione aggiungi in tabella (e in db)
    $scope.add = function(){
    	$http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";

        var data = {};
       data.name = $scope.component.name;
       data.dept = $scope.component.description;
       data.type = $scope.component.category;
       
       $scope.componentList.push(data); //aggiorno la tabella a schermo
	   console.log("inserisco nella tabella url:"+urlBase + '/rest/components/' +data.name+'/'+data.dept+'/'+$scope.user_id+'/'+data.type);

       //invio al server i dati da archiviare nel dbms
       $http.post(urlBase + '/rest/components/' +data.name+'/'+data.dept+'/'+$scope.user_id+'/'+data.type).
       success(function(data) {
    	   console.log("inserimento riuscito");
    	 //aggiorno i componenti a schermo
           $scope.updateOnScreen();
           $scope.boolean2=true;
           $cookieStore.put('check2',$scope.boolean2);
       });
       //resetto i campi
       $scope.component = {};
       
       
       

       
    }
    
    ///////////////////////////////////////////////////////////////////
    //funzione rimuovi da tabella
    $scope.remove = function(obj,name,description){
    	//rimuovo da db
        console.log(urlBase + '/rest/delete/' +name+'/'+description);
        $http.post(urlBase + '/rest/delete/' +name+'/'+description).
        success(function(data) {
            //rimuovo da tab a schermo
            if(obj != -1) {
    	    $scope.componentList.splice(obj, 1);
            }
        });     
      //aggiorno i componenti dell'utente
        $scope.updateOnScreen();
    }

    

    
    
})






//controller threat modeling
.controller('ThreatCtrl', function ($scope, $rootScope, $cookieStore, $location, $http, $window) {
	
	//prelevo dati cookie; 
	$scope.user_name=		$cookieStore.get('name');
    $scope.user_surname=	$cookieStore.get('surname');
    $scope.user_id=			$cookieStore.get('id_utente');
    $scope.booleanthreat=	$cookieStore.get('buttonthreat');
    
    $scope.selection=$cookieStore.get('selection');
    if($scope.selection==undefined){
    	$scope.selection=[];
    }
   
   
    
    
    console.log("utente="+$scope.user_name+" "+$scope.user_surname+" id= "+$scope.user_id);
    
    //recupero la foto dal localstorage (invece che dal db)
    var dataImage = localStorage.getItem('imgData');
    bannerImg = document.getElementById('tableBanner');
    bannerImg.src = "data:image/png;base64," + dataImage;
    
    
    //definisco prima la funzione che ritorna tutti i threats
    $scope.getThreats = function() {
    	$http.get("http://localhost:8080/TESI/rest/threats").
    		success(function(result) {
    			$scope.ThreatFromDB = result;
    			console.log('threat prelevati');		    			
    		});
    };
    
    
  //prelevo i componenti dell'utente
	$scope.ListComponentFromDB = [];
	$http.get("http://localhost:8080/TESI/rest/components/"+$scope.user_id).
		success(function(data) {
			$scope.ListComponentFromDB = data;
			console.log('componenti utente prelevati');
			
			//angular.forEach($scope.ListComponentFromDB, function(value, key){
				//console.log(value.type); il tipo di ogni componente
				
			//ho deciso di prelevarli tutti direttamente per poi filtrarli (più semplice)		
	});
	

	$scope.getThreats(); //carico tutti i threats
	
	//$scope.selection = [];
	//funzione ricerca doppia
	function arrayObjectIndexOf(myArray, searchTerm1, property1, searchTerm2, property2) {
	    for(var i = 0, len = myArray.length; i < len; i++) {
	        if ((myArray[i][property1] === searchTerm1)&&(myArray[i][property2] === searchTerm2)) return i;
	    }
	    return -1;
	}
	
	//raccolgo i threat selezionati
	  $scope.toggleSelection = function toggleSelection(componentName,componentid,threatName,threatid) {
		  	
		  	var idx = arrayObjectIndexOf($scope.selection,componentName,'component',threatName,'threat');
	   		// is currently selected
		    if (idx > -1) {
		       $scope.selection.splice(idx, 1);
		    }
		    // is newly selected
		    else {
		    	$scope.selection.push(
	   		    		   {	'component':componentName,
	   		    			   	'componentid':componentid,
	   		    			   	'threat':threatName,
	   		    			   	'threatid':threatid
	   		    		   }
	   		       );
		    }
	  };//fine metodo
	  
		  	
/*	        //adesso registro associazione nel db
	    	var urlBase="http://localhost:8080/TESI";
	    	console.log("http://localhost:8080/TESI"+ '/rest/assoc/'+componentName+'/'+threatName);
	 	   	$http.post(urlBase + '/rest/assoc/'+componentName+'/'+threatName).
	 	   	success(function(data) {
	 	   		console.log("associazione correttamente inserita");
	 	   		
	 	   		$scope.booleanthreat=true;
	 	   		$cookieStore.put('buttonthreat',$scope.booleanthreat);
	 	   		
	 	   		var idx = $scope.selection.indexOf({
				   component:componentName,
	   			   	threat:threatName 
	 	   		});
	 	   		// is currently selected
	 		     if (idx > -1) {
	 		       $scope.selection.splice(idx, 1);
	 		     }
	 		     // is newly selected
	 		     else {
	 		    	$scope.selection.push(
	 	   		    		   {	component:componentName,
	 	   		    			   	threat:threatName//,check:true
	 	   		    		   }
	 	   		       );
	 		     }	       
	 	   	});*/
	  
	  
	   //funzione salvataggio dati
	   $scope.saveSelection = function(){
		   $cookieStore.put('selection',$scope.selection);
		   console.log("salvato nei cookie");
		   
		  angular.forEach($scope.selection,function(value,key){
			  
			  $http.post('http://localhost:8080/TESI/rest/assoc/'+value.componentid+'/'+value.threatid).
		 	   	success(function(data) {
		 	   		console.log("associazione correttamente inserita");
		 	   		
		 	   		$scope.booleanthreat=true;
		 	   		$cookieStore.put('buttonthreat',$scope.booleanthreat);});
			  
		  });
		   
	   }//fine saveselection
	   
	   
	   //funzione reset dati associati
	   $scope.resetSelection = function(){
		  
		  angular.forEach($scope.selection,function(value,key){
			  
			  $http.post('http://localhost:8080/TESI/rest/delassoc/'+value.componentid+'/'+value.threatid).
		 	   	success(function(data) {
		 	   		//console.log("associazione correttamente inserita");
		 	   		
		 	   		$scope.booleanthreat=false;
		 	   		$cookieStore.put('buttonthreat',$scope.booleanthreat);});
		  });
		  
		  //pulizia
		  $cookieStore.remove('selection');
		  $window.location.reload();
	   }//fine saveselection
	   
	   
	   
	   
	   //funzione associata alla checkbox
	   $scope.find = function(componentName,threatName){
		   var i = arrayObjectIndexOf($scope.selection,componentName,'component',threatName,'threat');
		   //è già selezionato
		   if (i > -1) {
		       return true;
		    }
		    // is newly selected
		    else {
		    	return false;
		    }
		   
	   }
	   	


	
})//fine


//controller ranking
.controller('RankCtrl', function ($scope, $rootScope, $cookieStore, $location, $http, $window) {
	
	//prelevo dati cookie; 
	$scope.user_name=		$cookieStore.get('name');
    $scope.user_surname=	$cookieStore.get('surname');
    $scope.user_id=			$cookieStore.get('id_utente');
})



/////////////////////////////////////////////////////////////////
//controller pagina iniziale di registrazione (salvataggio cookie)

.controller('StartCtrl', function ($scope, $rootScope, $cookieStore, $location, $http, $window) {

	//prelevo dati cookie; 
	$scope.user_name=	$cookieStore.get('name');
    $scope.user_surname=$cookieStore.get('surname');
    $scope.user_id=		$cookieStore.get('id_utente');
    $scope.boolean=		$cookieStore.get('pulsante');
    
    
  //cancello tutti i cookie per ricominciare la sessione...
    $scope.reset = function(){
    	$cookieStore.remove('name');
    	$cookieStore.remove('surname');
    	$cookieStore.remove('id_utente');
    	$cookieStore.remove('pulsante');
    	$cookieStore.remove('check1');
    	$cookieStore.remove('check2');
    	$cookieStore.remove('booleanthreat');
    	$cookieStore.remove('selection');
    	
    	localStorage.removeItem('imgData');
    	console.log("cookie rimossi");
    	//ricarico la pagina
    	$window.location.reload();
    }
	
	
    $scope.add_user = function () {
    	//salvo cookie
        $cookieStore.put('name', $scope.user_name);
        $cookieStore.put('surname', $scope.user_surname);
        //adesso registro utente nel db
    	var urlBase="http://localhost:8080/TESI";

 	   	console.log("inserito nella tabella url:"+urlBase + '/rest/user/' +$scope.user_name+'/'+$scope.user_surname)
 	   	$http.post(urlBase + '/rest/user/'+$scope.user_name+'/'+$scope.user_surname).
 	   	success(function(data) {
 	   		console.log("utente correttamente inserito");
 	   		
 	   		console.log("Acquisisco id utente");
 	   		$http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
 	   		$http.get("http://localhost:8080/TESI"+'/rest/user/'+$scope.user_name+'/'+$scope.user_surname).
 	   		success(function(data) {
 	   			$scope.user_id=data;
 	   			console.log('id utente='+$scope.user_id);
 	 	   		$cookieStore.put('id_utente',$scope.user_id); //id utente ---> chiave esterna
 	 	   		
 	 	   		$scope.boolean=true;
 	 	   		$cookieStore.put('pulsante',$scope.boolean);
 	   		})
 	   		.error(function() {$scope.user_id=0;});

 	   		
 	   		
 	   		
       });    
    }
})



//////////////////////////////////////////////////////////////////////////////////
.controller('ServiceCtrl', function ($scope, $location, ServiceFactory, cfpLoadingBar, $tabActive) {
  
  //Set Negotiate Tab on the SLA NavBar
  $scope.$parent.tabActive = function(viewLocation){
    return $tabActive.set(viewLocation, '/negotiate/start');
  }
  
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

.controller('CapabilityCtrl', function ($scope, CapabilityFactory, cfpLoadingBar, $tabActive) {
  
  //Set Negotiate Tab on the SLA NavBar
  $scope.$parent.tabActive = function(viewLocation){
    return $tabActive.set(viewLocation, '/negotiate/start');
  }
   
  $scope.alertMessage = "You did not select any service, therefore no control is displayed.";

  if($scope.formService.SDT_list != null)
  {
     cfpLoadingBar.start();
     CapabilityFactory.get($scope.formService.SDT_list)
       .success(function (data, status, headers, config) {
          //console.log(data);
          //console.log(status);
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

})

.controller('SecurityCtrl', function ($scope,SecurityFactory, cfpLoadingBar, $tabActive) {
   
  //Set Negotiate Tab on the SLA NavBar
  $scope.$parent.tabActive = function(viewLocation){
    return $tabActive.set(viewLocation, '/negotiate/start');
  }
  
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

.controller('AgreementCtrl', function ($scope,AgreementFactory, cfpLoadingBar, $tabActive) {
  
  //Set Negotiate Tab on the SLA NavBar
  $scope.$parent.tabActive = function(viewLocation){
    return $tabActive.set(viewLocation, '/negotiate/start');
  }

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

.controller('OverviewCtrl', function ($scope, OverviewFactory, _, $filter, cfpLoadingBar, $tabActive, $state) {
   
  //Set Negotiate Tab on the SLA NavBar
  $scope.$parent.tabActive = function(viewLocation){
    return $tabActive.set(viewLocation, '/negotiate/start');
  }

  $scope.alertMessage = "You did not select any control.";
  fillMetrics();
  $scope.offerSubmitted = false;
  
  $scope.submitSLA = function() {
      
      if($scope.formData != null)
      {
          cfpLoadingBar.start();
          OverviewFactory.submit($scope.formData)
            .success(function (data, status, headers, config) {
                //console.log(data);
               $scope.offers = data.offers;
               $scope.idsla = data.idsla;
               $scope.offerArr = [];
               for(offer in $scope.offers)
               {
                 var offerObj = {};
                 offerObj.id = $scope.offers[offer].id;
                 offerObj.xml = "";
                 offerObj.idsla = $scope.idsla;
                 $scope.offerArr.push(offerObj);
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
          //console.log("MetricId: " + metricObj.id);
          metricObj.importance = $scope.formAgreementCtrl_Importance[mctrl];
          if(metricObj.importance == null){
            metricObj.importance = $scope.formAgreementCtrl_DefaultImportance[mctrl]; 
          }
          
          //console.log("MetricImportance: " + metricObj.importance); 
          metricObj.operator = $scope.formAgreementCtrl_Expression[mctrl];
            
          if(metricObj.operator == null)
            metricObj.operator = $scope.formAgreementCtrl_DefaultExpression[mctrl];
            
          //console.log("MetricExpression: " + metricObj.operator);
          metricObj.operand = $scope.formAgreementCtrl_Operand[mctrl];
          //console.log("MetricExpValue: " + metricObj.operand);
          metricObj.securityControls = $scope.formAgreementCtrl_SecurityControls[item][frm][mctrl];
         
          var targetMetricObj = new Object();
          targetMetricObj.id = metricObj.id;
          targetMetricObj.importance = metricObj.importance;
          targetMetricObj.operator = metricObj.operator;
          targetMetricObj.operand = metricObj.operand;
          //console.log(metricObj.securityControls);
          //console.log(JSON.stringify(targetMetricObj));
          for (secCtrlID in metricObj.securityControls) {
               
            //console.log("===================================== Loop su securityControl ID =======================================================");   
            var prop = 'id';
		    var search_obj = {};
		    search_obj[prop] = metricObj.securityControls[secCtrlID];
            //console.log("SecurityControl ID letto dall'array dei SecurityControls");
            var securityControlId = search_obj.id;
            //console.log(securityControlId);
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
                  
          //console.log("LOOP"+ securityControlIterator + ": " + targetObject.capabilities[capabilityIterator].frameworks[frameworkIterator].securityControls[securityControlIterator].id);

          if(securityControlId == targetObject.capabilities[capabilityIterator].frameworks[frameworkIterator].securityControls[securityControlIterator].id){
            //console.log("ID TROVATO: " + targetObject.capabilities[capabilityIterator].frameworks[frameworkIterator].securityControls[securityControlIterator].id);
            //console.log("securityControlIterator: " + securityControlIterator);
            var len = targetObject.capabilities[capabilityIterator].frameworks[frameworkIterator].securityControls[securityControlIterator].metrics.length;
                     
            if(len == 0 || !$filter('isIdExisting')(metricObj, targetObject.capabilities[capabilityIterator].frameworks[frameworkIterator].securityControls[securityControlIterator].metrics)){
              targetObject.capabilities[capabilityIterator].frameworks[frameworkIterator].securityControls[securityControlIterator].metrics.push(metricObj); 
              //console.log("Metrica con id: " + metricObj.id + " inserita per securityControl: " + securityControlId);
            }
            //console.log("Numero elementi Array Metriche: " + targetObject.capabilities[capabilityIterator].frameworks[frameworkIterator].securityControls[securityControlIterator].metrics.length);
            if(targetObject.capabilities[capabilityIterator].frameworks[frameworkIterator].securityControls[securityControlIterator].metrics.length > 0)
              $scope.processCompleted = true;
                     
            break;
          }
        }
      }  
    }
    //console.log("targetObject: ");
    //console.log(targetObject);
    return targetObject;
  } 
  
  $scope.submitOffer = function() {

    if($scope.formOverview.OfferList != null)
    {
       cfpLoadingBar.start();
       var offerObj = {};
       var index = _.findIndex($scope.offerArr, { id: $scope.formOverview.OfferList.id }); 
       if(index >= 0){
         offerObj = $scope.offerArr[index];
         //console.log("offerObj");
         //console.log(offerObj);
       }

       OverviewFactory.sendOffer(offerObj)
          .success(function (data, status, headers, config) {
             //console.log(data);
             cfpLoadingBar.complete();
             $scope.offerSubmitted = true;
             goState('sign');
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
  
  $scope.showXMLOffer = function() {

    if($scope.formOverview.OfferList != null)
    {
       if($scope.offerArr[_.findIndex($scope.offerArr, { id: $scope.formOverview.OfferList.id })].xml == "")
       {
         cfpLoadingBar.start();
         var offerIdentifier = $scope.idsla + "/" + $scope.formOverview.OfferList.id;
         OverviewFactory.get(offerIdentifier)
            .success(function (data, status, headers, config) {
               //console.log(data);
               cfpLoadingBar.complete();
                //Gestione popup per visualizzare xml
                $scope.offerSubmitted = true;
                $scope.formOverview_xml = LoadXMLString('XMLOffer',data);
                $scope.offerArr[_.findIndex($scope.offerArr, { id: $scope.formOverview.OfferList.id })].xml = data;

                //$scope.formOverview_xml = data;
                //$scope.formPopup = LoadXMLString('popup',data);
                //popupxml(data);
                //alert(data);

            })
            .error(function (statusText) {
               $scope.errorState = true;
               $scope.errorMessage = (statusText == null) ? "Server Connection Error!" : "Server Connection Error! " + statusText;
               // View error
               console.log("Errore di connessione al server: " + statusText);
               cfpLoadingBar.complete();
            }); 
       }
       else{
         $scope.formOverview_xml = LoadXMLString('XMLOffer',$scope.offerArr[_.findIndex($scope.offerArr, { id: $scope.formOverview.OfferList.id })].xml);
       }
    }
 }
  
  function goState(route){
        $state.go(route);
  }   

})
               
;



