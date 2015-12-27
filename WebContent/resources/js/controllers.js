angular.module('SlaApp.controllers', [])

//VADO A DEFINIRE TUTTI I CONTROLLER DELLA BARRA IN ALTO
//OGNI CONTROLLER E' ASSOCIATO AD UNA PAGINA HTML NEL FILE app.js

.controller('SlaCtrl', function ($scope, $cookieStore, $location, $tabActive, $state) {
  
  $scope.tabActive = function(viewLocation){
    return $tabActive.get(viewLocation, $location.path());
  }
  
  $scope.go = function(route){
	  	//reset quando premo il tasto start dopo aver gia cominciato 
	  	$cookieStore.remove('name');
		$cookieStore.remove('surname');
		$cookieStore.remove('id_utente');
		$cookieStore.remove('pulsante');
		$cookieStore.remove('check1');
		$cookieStore.remove('check2');
		$cookieStore.remove('check3');
		$cookieStore.remove('booleanthreat');
		$cookieStore.remove('done');
		//$cookieStore.remove('selection');
		$cookieStore.remove('buttonthreat');
		$cookieStore.remove('controls');
		$cookieStore.remove('tastoselezionatutto');
		$cookieStore.remove('finitometriche');
		
		localStorage.removeItem('imgData');
		localStorage.removeItem('selection');
		localStorage.removeItem('controlselection');
		localStorage.removeItem('SLA');
		localStorage.removeItem('metriche');
		console.log("cookie rimossi");
	  
	  
        $state.go(route);
  } 
  
  
  
  
})

//controller pagina dettagli implementazione
.controller('Luigi', function ($scope, SecurityFactory, cfpLoadingBar, $tabActive, $http, $cookieStore, $location, $timeout) {
	
    if($location.$$host=='localhost'){
    	var urlBase="http://localhost:8080/TESI";
    }
    else {
    	var urlBase="https://threatapplication.herokuapp.com";
    }
	
	//devo scaricare le foto dal db
	$http.get(urlBase+"/rest/foto").
	success(function(data) {
		console.log("foto 1 scaricata");
		$scope.fotolist=data;
	});
	

	
	
})
//fine controller mio




////////////////////////////
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

/////////////////////////////////////////////////////////////////


//controller pagina iniziale di registrazione (salvataggio cookie)

.controller('StartCtrl', function ($scope, $rootScope, $cookieStore, $location, $http, $window) {
	

	//prelevo dati cookie; 
	$scope.user_name=	$cookieStore.get('name');
    $scope.user_surname=$cookieStore.get('surname');
    $scope.user_id=		$cookieStore.get('id_utente');
    
    if($cookieStore.get('pulsante')==undefined){$scope.boolean=false;}
    else{$scope.boolean=		$cookieStore.get('pulsante');}
    
    

	
	
    $scope.add_user = function () {
    //lo faccio solo se gli input sono validi
    	console.log($scope.user_name);
    	console.log($scope.user_surname);
    	if(($scope.user_name!=undefined)&&($scope.user_surname!=undefined)){
    		
    		
    
    	//salvo cookie
        $cookieStore.put('name', $scope.user_name);
        $cookieStore.put('surname', $scope.user_surname);
        
        //adesso registro utente nel db

        if($location.$$host=='localhost'){
        	var urlBase="http://localhost:8080/TESI";
        }
        else {
        	var urlBase="https://threatapplication.herokuapp.com";
        }

 	   	console.log("inserito nella tabella url:"+urlBase + '/rest/user/' +$scope.user_name+'/'+$scope.user_surname)
 	   	$http.post(urlBase + '/rest/user/'+$scope.user_name+'/'+$scope.user_surname).
 	   	success(function(data) {
 	   		console.log("utente correttamente inserito");
 	   		
 	   		
 	   		console.log("Acquisisco id utente");
 	   		$http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
 	   		$http.get(urlBase+'/rest/user/'+$scope.user_name+'/'+$scope.user_surname).
 	   		success(function(data) {
 	   			$scope.user_id=data;
 	   			console.log('id utente='+$scope.user_id);
 	 	   		$cookieStore.put('id_utente',$scope.user_id); //id utente ---> chiave esterna
 	 	   		
 	 	   		$scope.boolean=true;
 	 	   		$cookieStore.put('pulsante',$scope.boolean);
 	   		})
 	   		.error(function() {$scope.user_id=0;});

 	   		
 	   		
 	   		
       });    
    }}
})




//controller per l'inserimento dei componenti del sistema 
.controller("InsertCtrl",function($scope,$http,$cookieStore,$location,$window,$timeout) {
	
	
	//prelevo dati cookie; 
	$scope.user_name=	$cookieStore.get('name');
    $scope.user_surname=$cookieStore.get('surname');
    $scope.user_id=		$cookieStore.get('id_utente');
    $scope.boolean1=	$cookieStore.get('check1'); //gestisce pressione upload
    $scope.boolean2=	$cookieStore.get('check2'); //gestisce inserimento pezzi
    $scope.boolean3=	$cookieStore.get('check3'); //gestisce pressione next

        
    if($location.$$host=='localhost'){
    	var urlBase="http://localhost:8080/TESI";
    }
    else {
    	var urlBase="https://threatapplication.herokuapp.com";
    }
    
    //recupero la foto dal localstorage
    var dataImage = localStorage.getItem('imgData');
    bannerImg = document.getElementById('tableBanner');
    bannerImg.src = "data:image/png;base64," + dataImage;
    
    
    //prelevo tutte le categorie di threat
    $http.get(urlBase+"/rest/categories").
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
    	$http.get(urlBase+"/rest/components/"+$scope.user_id).
    		success(function(data) {
    			$scope.ListComponentFromDB = data;
    			console.log('componenti utente prelevati');
    			
    	        //se la lista di componenti resta vuota non devo abilitare il next button
    			//console.log($scope.ListComponentFromDB[0]);
    	        if($scope.ListComponentFromDB[0]==undefined){
    	        	$scope.boolean2=false;
    	        }
    				    			
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
			
/*			//provo a salvarla nel localstorage
			bannerImage = document.getElementById('blah');
			imgData = getBase64Image(bannerImage);
			localStorage.setItem("imgData", imgData);
			console.log('foto salvata nel localstorage');*/
			
			

			//la carico nel db
			var file = $scope.myFile;
			
			
			var fd = new FormData();
			fd.append('file', file);

			//fd.append('person', name);
			//fd.append('date', date);
			$http.post(urlBase+'/rest/upload/'+$scope.user_id, fd, {
				transformRequest : angular.identity,
				headers : {
					'Content-Type' : undefined
				}
			}).success(function() {
				console.log("file inviato="+$scope.myFile);
				
				$scope.boolean1=true;
				$cookieStore.put('check1',$scope.boolean1);
				
				//adesso la metto nel localstorage e la mostro a schermo
				bannerImage = document.getElementById('blah');
				imgData = getBase64Image(bannerImage);
				localStorage.setItem("imgData", imgData);
				console.log('foto salvata nel localstorage');
				
			    //recupero la foto dal localstorage
			    var dataImage = localStorage.getItem('imgData');
			    bannerImg = document.getElementById('tableBanner');
			    bannerImg.src = "data:image/png;base64," + dataImage;
				
				
			}).error(function() {
			});	
		};

	///////////////////////////////////////////////////////
	// upload componenti
	

	//upload nome e descr
    $scope.component = {};
/*    $scope.component.name = "";
    $scope.component.description = "";*/
    $scope.componentList = [];
    


    
    //funzione aggiungi in tabella (e in db)
    $scope.add = function(){
    	
    	$scope.error_name=false;
    	
    	//validazione
    	console.log($scope.component.name);
    	console.log($scope.component.description);
    	console.log($scope.component.category);
    	
    	//verifico che il nome non sia già presente
    	angular.forEach($scope.ListComponentFromDB,function(value,key){
    		console.log("verifico match nome: inserito="+$scope.component.name+" in tabella="+value.name);
    		if(value.name==$scope.component.name){
    			$scope.error_name=true;
    		}

    	});
    	$timeout(1000);
    	
    	
/*    	if($scope.component.description==""){
    		$scope.component.description="not defined";	
    	}*/
    	
    	if(($scope.component.name!=undefined)&&($scope.component.category!=undefined)&&($scope.error_name!=true)){
    	
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
       
       
    	}//fine if 

       
    }
    
    ///////////////////////////////////////////////////////////////////
    //funzione rimuovi da tabella
    $scope.remove = function(obj,id,name,description){
    	
    	//per cancellare un componente devi prima rimuovere l'associazione con i threat!!
    	
    	//rimuovo da db
        console.log(urlBase + '/rest/delete/'+id);
        $http.post(urlBase + '/rest/delete/'+id).
        success(function(data) {
            //rimuovo da tab a schermo
            if(obj != -1) {
    	    $scope.componentList.splice(obj, 1);
            }
        }).error(function() {
        	
        	//in caso di errore mando un alert perchè probabilmente sto cercando di cancellare
        	//senza aver cancellato prima le associazioni!        	
        	});
        
        
      //aggiorno i componenti dell'utente
        $scope.updateOnScreen();
        

    }

    
    $scope.next = function(){
    	//sono andato avanti, quindi faccio sparire il form della foto (per evitare cambi)
    	$scope.boolean3=true;
    	$cookieStore.put('check3',$scope.boolean3);
    	
    }
    
    
})






//controller threat modeling
.controller('ThreatCtrl', function ($scope, $rootScope, $cookieStore, $location, $http, $window, $timeout) {
	
	//prelevo dati cookie; 
	$scope.user_name=		$cookieStore.get('name');
    $scope.user_surname=	$cookieStore.get('surname');
    $scope.user_id=			$cookieStore.get('id_utente');
    $scope.boolean1=		$cookieStore.get('check1'); //se la foto c'è allora è true
    $scope.booleanthreat=	$cookieStore.get('buttonthreat');
    
    if($location.$$host=='localhost'){
    	var urlBase="http://localhost:8080/TESI";
    }
    else {
    	var urlBase="https://threatapplication.herokuapp.com";

    }
    
    //$scope.selection=$cookieStore.get('selection');
    $scope.selection=JSON.parse(localStorage.getItem('selection'));
    
    if($scope.selection==null){
    	$scope.selection=[];
    }
   
   
    
    
    console.log("utente="+$scope.user_name+" "+$scope.user_surname+" id= "+$scope.user_id);
    
    //recupero la foto dal localstorage (invece che dal db)
    var dataImage = localStorage.getItem('imgData');
    bannerImg = document.getElementById('tableBanner');
    bannerImg.src = "data:image/png;base64," + dataImage;
    
    
    //prevelo tutti i threats
    $scope.getThreats = function() {
    	$http.get(urlBase+"/rest/threats").
    		success(function(result) {
    			$scope.ThreatFromDB = result;
    			console.log('threat prelevati');		    			
    		});
    };
    
    
  //prelevo i componenti dell'utente
	$scope.ListComponentFromDB = [];
	$http.get(urlBase+"/rest/components/"+$scope.user_id).
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
	  $scope.toggleSelection = function toggleSelection(componentName,componentid,threatName,threatid,stride,descr) {
		  	
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
	   		    			   	'threatid':threatid,
	   		    			   	'stride':stride,
	   		    			   	'description':descr,
	   		    				
	   		    			   	'skill':0,
	   		    			   	'motive':0,
	   		    			   	'opportunity':0,
	   		    			   	'size':0,
	   		    			   	'discover':0,
	   		    			   	'ease':0,
	   		    			   	'aware':0,
	   		    			   	'id':0,
	   					
	   		    			   	//technical impacts
	   		    			   	'confide':0,
	   		    			   	'integri':0,
	   		    			   	'avalai':0,
	   		    			   	'accounta':0,
	   					
	   		    			   	//business impacts
	   		    			   	'financial':0,
	   		    			   	'reputation':0,
	   		    			   	'noncompliance':0,
	   		    			   	'privacy':0
	   		    		   }
	   		       );
		    }
	  };//fine metodo
	  
		  	

	  
	   //funzione salvataggio dati
	   $scope.saveSelection = function(){
		   
		   if($scope.booleanthreat==true){
		   		//salvo di nuovo quindi pulisco prima TUTTO
			   	angular.forEach($scope.ListComponentFromDB,function(value,key){
			   		
			   		//elimino prima le possibili associazioni create in avanti nel wizard 
			   		$http.post(urlBase+'/rest/delassocControl/'+value.id).
			   			success(function(data) {
			   				console.log("elimino dal db i controlli associati ad ogni componente!");
					 });
					  
					//elimino le associazioni create in questa pagina
					$http.post(urlBase+'/rest/delassoc/'+value.id).
				 	  	success(function(data) {
				 	   		console.log("elimino dal db il componente id="+value.id);
				 	   		
				 	   		
				 	   		//$cookieStore.put('buttonthreat',$scope.booleanthreat);
				 	   		});
				  });
		   //provo a mettere un timeout di 2 secondi per evitare sovrapposizioni
			   	$scope.booleanthreat=false;
			   	$timeout(saveSelection2, 2000);
		   }
		   else{
			   saveSelection2();
		   }
	   }
	   
	   
	   function saveSelection2(){
		   
			   localStorage.setItem("selection", JSON.stringify($scope.selection));
			   localStorage.removeItem('controlselection'); //pulizia per dopo...

			   console.log("salvato nel localstorage");
		   
			   angular.forEach($scope.selection,function(valore,chiave){
			  
				   $http.post(urlBase+'/rest/assoc/'+valore.componentid+'/'+valore.threatid).
		 	   		success(function(data) {
		 	   		console.log("associazione correttamente inserita componente id="+valore.componentid+" threat id= "+valore.threatid);
		 	   		
		 	   		$scope.booleanthreat=true;
		 	   		$cookieStore.put('buttonthreat',$scope.booleanthreat);});
			  
			   });
		   
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
	   
	   
	   //inizializzazione tasto
	   if($cookieStore.get('tastoselezionatutto')==undefined){
		   $scope.tastoselezione='Select All';
	   }
	   else{
		   $scope.tastoselezione=$cookieStore.get('tastoselezionatutto');
	   }
	   
	   
	   
	   //funzione tasto seleziona tutto
	   $scope.all=function(){
		   
		   if($scope.tastoselezione=='Select All'){
		   //devo prima resettare tutta la lista
		   $scope.selection=[];
		   
		   angular.forEach($scope.ListComponentFromDB,function(comp,key1){
			   //per ogni componente
			   angular.forEach($scope.ThreatFromDB,function(threat,key2){
				   //per ogni threat
				   if(comp.type==threat.cat){
					   
					   $scope.selection.push(
		   		    		   {	'component':comp.name,
		   		    			   	'componentid':comp.id,
		   		    			   	'threat':threat.name,
		   		    			   	'threatid':threat.idThreat,
		   		    			   	'stride':threat.stride,
		   		    			   	'description':threat.descr,
		   		    				
		   		    			   	'skill':0,
		   		    			   	'motive':0,
		   		    			   	'opportunity':0,
		   		    			   	'size':0,
		   		    			   	'discover':0,
		   		    			   	'ease':0,
		   		    			   	'aware':0,
		   		    			   	'id':0,
		   					
		   		    			   	//technical impacts
		   		    			   	'confide':0,
		   		    			   	'integri':0,
		   		    			   	'avalai':0,
		   		    			   	'accounta':0,
		   					
		   		    			   	//business impacts
		   		    			   	'financial':0,
		   		    			   	'reputation':0,
		   		    			   	'noncompliance':0,
		   		    			   	'privacy':0
		   		    		   }
		   		       );
				   }
				   
			   });
			   
			   
		   });
		   
		   $scope.tastoselezione='Clear all';
		   $cookieStore.put('tastoselezionatutto',$scope.tastoselezione);
		   }
		   
		   else if($scope.tastoselezione=='Clear all'){
			   
			   $scope.selection=[];
			   $scope.tastoselezione='Select All';
			   $cookieStore.put('tastoselezionatutto',$scope.tastoselezione);
		   }
	   }
	   	


	
})//fine


//controller ranking
.controller('RankCtrl', function ($scope, $rootScope, $cookieStore, $location, $http, $window) {
	
	//prelevo dati cookie; 
	$scope.user_name=		$cookieStore.get('name');
    $scope.user_surname=	$cookieStore.get('surname');
    $scope.user_id=			$cookieStore.get('id_utente');
    
    //$scope.selection=		$cookieStore.get('selection');
    $scope.selection=		JSON.parse(localStorage.getItem('selection'));
    $scope.done=			$cookieStore.get('done');
    
    if($location.$$host=='localhost'){
    	var urlBase="http://localhost:8080/TESI";
    }
    else {
    	var urlBase="https://threatapplication.herokuapp.com";

    }
    
    //prelevo i componenti dell'utente
	$scope.ListComponentFromDB = [];
	$http.get(urlBase+"/rest/components/"+$scope.user_id).
		success(function(data) {
			$scope.ListComponentFromDB = data;
			console.log('componenti utente prelevati');		
	});
    
    //inizializzazione dati in tabella
	angular.forEach($scope.selection, function(value, key){
		
		if(($scope.done==false)||($scope.done==undefined)){
			
			//inizializzazione
			value.skill=0;
			value.motive=0;
			value.opportunity=0;
			value.size=0;
			value.discover=0;
			value.ease=0;
			value.aware=0;
			value.id=0;
			
			//technical impacts
			value.confide=0;
			value.integri=0;
			value.avalai=0;
			value.accounta=0;
			
			//business impacts
			value.financial=0;
			value.reputation=0;
			value.noncompliance=0;
			value.privacy=0;
		}
		
		
		value.totaleLikehood=(value.skill+value.motive+value.opportunity+value.size+value.discover+value.ease+value.aware+value.id)/8;
		
		value.totaleImpactBusiness=(value.financial+value.reputation+value.noncompliance+value.privacy)/4;
		value.totaleImpactTechnical=(value.confide+value.integri+value.avalai+value.accounta)/4;
		if(value.totaleImpactBusiness==0){
			value.totaleImpact=value.totaleImpactTechnical;
		}else{
			value.totaleImpact=value.totaleImpactBusiness;
		}
		
		//combinazione dei rischi
		switch(true){
			case((value.totaleImpact>=6)&&(value.totaleImpact<9)): //HIGH
				switch(true){
				case value.totaleLikehood<3: value.risk='MEDIUM';break;
				case (value.totaleLikehood>=3)&&(value.totaleLikehood<6): value.risk='HIGH';break;
				case (value.totaleLikehood>=6)&&(value.totaleLikehood<9): value.risk='CRITICAL';break;
				}
			break;
			
			case((value.totaleImpact>=3)&&(value.totaleImpact<6)): //MEDIUM
				switch(true){
				case value.totaleLikehood<3: value.risk='LOW';break;
				case (value.totaleLikehood>=3)&&(value.totaleLikehood<6): value.risk='MEDIUM';break;
				case (value.totaleLikehood>=6)&&(value.totaleLikehood<9): value.risk='HIGH';break;
				}
			break;
			
			case(value.totaleImpact<3): //LOW
				switch(true){
				case value.totaleLikehood<3: value.risk='VERY LOW';break;
				case (value.totaleLikehood>=3)&&(value.totaleLikehood<6): value.risk='LOW';break;
				case (value.totaleLikehood>=6)&&(value.totaleLikehood<9): value.risk='MEDIUM';break;
				}
			break;
		}
		
		
		
	});
    
    $scope.saveRating = function(){
    	
    	$scope.done=true;
    	$cookieStore.put('done',$scope.done);
    	
    	angular.forEach($scope.selection, function(value, key){
    		value.totaleLikehood=(value.skill+value.motive+value.opportunity+value.size+value.discover+value.ease+value.aware+value.id)/8;		
    	
    		value.totaleImpactBusiness=(value.financial+value.reputation+value.noncompliance+value.privacy)/4;
    		value.totaleImpactTechnical=(value.confide+value.integri+value.avalai+value.accounta)/4;
    		if(value.totaleImpactBusiness==0){
    			value.totaleImpact=value.totaleImpactTechnical;
    		}else{
    			value.totaleImpact=value.totaleImpactBusiness;
    		}
    		
    		//combinazione dei rischi x ogni threat
    		
    		//Per il rischio totale ho bisogno di classificare numericamente da 1 a 9:
    		//VERY LOW	=1
    		//LOW		=3
    		//MEDIUM	=5
    		//HIGH		=7
    		//CRITICAL	=9
    		
    		switch(true){
    			case((value.totaleImpact>=6)&&(value.totaleImpact<=9)): //HIGH
    				switch(true){
    				case value.totaleLikehood<3: value.risk='MEDIUM';value.riskNum=5;break;
    				case (value.totaleLikehood>=3)&&(value.totaleLikehood<6): value.risk='HIGH';value.riskNum=7;break;
    				case (value.totaleLikehood>=6)&&(value.totaleLikehood<=9): value.risk='CRITICAL';value.riskNum=9;break;
    				}
    			break;
    			
    			case((value.totaleImpact>=3)&&(value.totaleImpact<6)): //MEDIUM
    				switch(true){
    				case value.totaleLikehood<3: value.risk='LOW';value.riskNum=3;break;
    				case (value.totaleLikehood>=3)&&(value.totaleLikehood<6): value.risk='MEDIUM';value.riskNum=5;break;
    				case (value.totaleLikehood>=6)&&(value.totaleLikehood<=9): value.risk='HIGH';value.riskNum=7;break;
    				}
    			break;
    			
    			case(value.totaleImpact<3): //LOW
    				switch(true){
    				case value.totaleLikehood<3: value.risk='VERY LOW';value.riskNum=1;break;
    				case (value.totaleLikehood>=3)&&(value.totaleLikehood<6): value.risk='LOW';value.riskNum=3;break;
    				case (value.totaleLikehood>=6)&&(value.totaleLikehood<=9): value.risk='MEDIUM';value.riskNum=5;break;
    				}
    			break;
    		}
    		
    		
    	});
    	

    	
    	
    	
    	//salvo i valori inseriti per mantenere anche le tabelle
    	//$cookieStore.put('selection',$scope.selection);
    	
    	localStorage.setItem("selection", JSON.stringify($scope.selection));
    }
    
    
    //funzione che mi ritorna il livello complessivo per metodologia stride e componente
    $scope.getRisk = function(componente,stride){
    	var temp=0; var i=0;
		angular.forEach($scope.selection, function(value, key){
			if((value.component==componente)&&(value.stride==stride)){
				temp=temp+value.riskNum;
				i++;
			}

			
		});
		
		//media aritmetica
		temp=temp/i;
		//ho il valore di rischio complessivo: voglio una stringa
		switch(true){
		case((temp>=0)&&(temp<2)): var stringa="VERY LOW";break;
		case((temp>=2)&&(temp<4)): var stringa="LOW";break;
		case((temp>=4)&&(temp<6)): var stringa="MEDIUM";break;
		case((temp>=6)&&(temp<8)): var stringa="HIGH";break;
		case((temp>=8)&&(temp<10)): var stringa="CRITICAL";break;
		
		}

    	return stringa;
    }
    
    
    
    $scope.button='Show Results';
    $scope.showresults = function(){
    	
    	if(($scope.vedirisultati==undefined)||($scope.vedirisultati==false)){
    		$scope.vedirisultati=true;
    		$scope.button='Show Threat Tables';}
    	else{
    		$scope.vedirisultati=false;
    		$scope.button='Show Results';
    	}
    }
    
    $scope.resetRating = function(){
    	$cookieStore.remove('done');
		$window.location.reload();
    	
    }
    
    $scope.set_color = function (comp,stride) {
    	
    	var risk=$scope.getRisk(comp,stride);
    	
    	switch(true){
    	case(risk=='VERY LOW'): $scope.color={ "background": "#00FF1A" };break;
    	case(risk=='LOW'): 		$scope.color={ "background": "#FFFC1A" };break;
    	case(risk=='MEDIUM'):	$scope.color={ "background": "#FFBA37" };break;
    	case(risk=='HIGH'): 	$scope.color={ "background": "#FF5035" };break;
    	case(risk=='CRITICAL'): $scope.color={ "background": "#FF68E4" };break;
    	
    	}
    	return $scope.color;
    	}
    
  
})//fine controller ranking



//controller selezione controlli di sicurezza
.controller('SecurityCtrl', function ($scope, SecurityFactory, cfpLoadingBar, $tabActive, $http, $cookieStore, $location, $timeout) {
	
	//prelevo dati cookie; 
	$scope.user_name=		$cookieStore.get('name');
    $scope.user_surname=	$cookieStore.get('surname');
    $scope.user_id=			$cookieStore.get('id_utente');
    $scope.selection=		JSON.parse(localStorage.getItem('selection'));
    $scope.controlselected=	$cookieStore.get('controls');
    
    
    
    if($location.$$host=='localhost'){
    	var urlBase="http://localhost:8080/TESI";
    }
    else {
    	var urlBase="https://threatapplication.herokuapp.com";
    }
    
    $scope.controlselection=JSON.parse(localStorage.getItem('controlselection'));
    
    if($scope.controlselection==null){
    	$scope.controlselection=[];
    }
    
    
    
    //prelevo i componenti dell'utente
	$scope.ListComponentFromDB = [];
	$http.get(urlBase+"/rest/components/"+$scope.user_id).
		success(function(data) {
			$scope.ListComponentFromDB = data;
			console.log('componenti utente prelevati');		
	});
	
	//funzione calcolo rischio complessivo STRIDE
    $scope.getRisk = function(componente,stride){
    	var temp=0; var i=0;
		angular.forEach($scope.selection, function(value, key){
			if((value.component==componente)&&(value.stride==stride)){
				temp=temp+value.riskNum;
				i++;
			}
		});
		//media aritmetica
		temp=temp/i;
		//ho il valore di rischio complessivo: voglio una stringa
		switch(true){
		case((temp>=0)&&(temp<2)): var stringa="VERY LOW";break;
		case((temp>=2)&&(temp<4)): var stringa="LOW";break;
		case((temp>=4)&&(temp<6)): var stringa="MEDIUM";break;
		case((temp>=6)&&(temp<8)): var stringa="HIGH";break;
		case((temp>=8)&&(temp<10)): var stringa="CRITICAL";break;
		}
    	return stringa;
    }
    
    //ricevo tutti i controlli
	$scope.controls = [];
	$http.get(urlBase+"/rest/controls/").
		success(function(data) {
			$scope.controls = data;
			console.log('controlli prelevati dal db');		
	});
	
	
	//funzione di ricerca nella lista
	function arrayObjectIndexOf(myArray, searchTerm1, property1, searchTerm2, property2) {
	    for(var i = 0, len = myArray.length; i < len; i++) {
	        if ((myArray[i][property1] === searchTerm1)&&(myArray[i][property2] === searchTerm2)) return i;
	    }
	    return -1;
	}
	
	//raccolgo i controlli di sicurezza selezionati
	  $scope.toggleSelection = function toggleSelection(control,name,component,desc,threatid) {
		  	
		  	var idx = arrayObjectIndexOf($scope.controlselection,control,'control',component,'component');
	   		// is currently selected
		    if (idx > -1) {
		       $scope.controlselection.splice(idx, 1);
		    }
		    // is newly selected
		    else {
		    	$scope.controlselection.push(
	   		    		   {	'control':control,
	   		    			    'controlname':name,
	   		    			   	'component':component,
	   		    			   	'description':desc,
	   		    			   	'tid':threatid,
	   		    		});
		    }
	  };//fine metodo
	
	  
	   //funzione associata alla checkbox
	   $scope.find = function(control,component){
		   var i = arrayObjectIndexOf($scope.controlselection,control,'control',component,'component');
		   //è già selezionato
		   if (i > -1) {
		       return true;
		    }
		    // is newly selected
		    else {
		    	return false;
		    }
	   }
	  
	   
	   
	   
	   //funzione salvataggio dati
	   $scope.saveSelection = function(){
		   
		   if($scope.controlselected==true){
		   		//salvo di nuovo quindi pulisco prima TUTTO

					   	angular.forEach($scope.ListComponentFromDB,function(value,key){
							  
							  $http.post(urlBase+'/rest/delassocControl/'+value.id).
						 	   	success(function(data) {
						 	   		console.log("elimino dal db i controlli associati");
						 	   		});
						  });
				 
		   //provo a mettere un timeout di 2 secondi per evitare sovrapposizioni
			   	$scope.controlselected=false;
			   	$timeout(saveSelection2, 2000);
		   }
		   else{
			   saveSelection2();
		   }
	   }
	   
	   
	   function saveSelection2(){
		   
			   localStorage.setItem("controlselection", JSON.stringify($scope.controlselection));
			   console.log("salvato nel localstorage");
		   
			   angular.forEach($scope.controlselection,function(valore,chiave){
				   //salvo associazione controllo- componente (id utente non necessario)
			  
				   $http.post(urlBase+'/rest/assocControl/'+valore.control+'/'+valore.component).
		 	   		success(function(data) {
		 	   		console.log("associazione controlli-componente correttamente inserita");
		 	   		
		 	   		$scope.controlselected=true;
		 	   		$cookieStore.put('controls',$scope.controlselected);});
			  
			   });
		   
	   }//fine saveselection
	   

	   
	   //per nascondere le tab 1
	   $scope.toggleTable1=function(component){
	      if (document.getElementById(component+'tab1').style.display == "table" ) {
	          document.getElementById(component+'tab1').style.display="none";
	      } else {
	         document.getElementById(component+'tab1').style.display="table";
	      }
	   }
	   //per nascondere le tab 2
	   $scope.toggleTable2=function(component){
	      if (document.getElementById(component+'tab2').style.display == "table" ) {
	          document.getElementById(component+'tab2').style.display="none";
	      } else {
	         document.getElementById(component+'tab2').style.display="table";
	      }
	   }

	   
	   
	   
	   //all'avvio scarico la lista di tutti i controlli suggeriti
		$scope.controllisuggeriti = [];
		$http.get(urlBase+"/rest/controllisuggeriti").
			success(function(eccolo) {
				$scope.controllisuggeriti = eccolo;
				console.log('lista di controlli suggeriti ricevuta');		
		});
	   
		
		//all'inizio non applicato il filtraggio dei controlli necessari!
		$scope.variabile=false;
		$scope.nomepulsantefiltro='Only Required?:  NO';
		//funzione switch filtro
		$scope.cambiofiltro=function(){
			if($scope.variabile==true){
				$scope.variabile=false;
				$scope.nomepulsantefiltro='Only Required?:  NO';

			}
			else{
				$scope.variabile=true;
				$scope.nomepulsantefiltro='Only Required?: YES';

			}
		}
		
		$scope.valoretestuale=function(numero){
			
			switch(numero){
			case(1): var string="VERY LOW";break;
			case(5): var string="MEDIUM";break;
			case(7): var string="HIGH";break;
			case(11): var string="NONE";break;
			}
		return string;	
		}

	
   
})




//////////////////////////////////////////////////////////////////////////////////


.controller('MetricsCtrl', function ($scope, $http, $cookieStore, $filter, $location, $timeout, $parse) {
  
	//prelevo dati cookie; 
	$scope.user_name=		$cookieStore.get('name');
    $scope.user_surname=	$cookieStore.get('surname');
    $scope.user_id=			$cookieStore.get('id_utente');
    $scope.controlselected=	$cookieStore.get('controls');
    $scope.finito= 			$cookieStore.get('finitometriche');
    
    $scope.selection=		JSON.parse(localStorage.getItem('selection'));
    $scope.controlselection=JSON.parse(localStorage.getItem('controlselection'));
    $scope.metricheassociate=JSON.parse(localStorage.getItem('metriche'));
    
    if($scope.metricheassociate==null){
    	$scope.metricheassociate=[];
    }
    
    
    if($location.$$host=='localhost'){
    	var urlBase="http://localhost:8080/TESI";
    }
    else {
    	var urlBase="https://threatapplication.herokuapp.com";
    }


    //prelevo i componenti dell'utente
	$scope.ListComponentFromDB = [];
	$http.get(urlBase+"/rest/components/"+$scope.user_id).
		success(function(data) {
			$scope.ListComponentFromDB = data;
			console.log('componenti utente prelevati');		
	});
	
	$scope.getcompname= function(idcomponente){
		
		angular.forEach($scope.ListComponentFromDB,function(valore,chiave){
			
			if(valore.id==idcomponente){
				$scope.nomecomp=valore.name;
			}
		});
		return $scope.nomecomp;
	}
	
	
	
	

	
	
	
	
	
	
	
	
	$scope.inizializza=function(listametriche){
		
	var elenco=[];
	//inizializzazione dati metriche in tabella
	angular.forEach($scope.controlselection,function(val,ch){
		
		var temp;//ricavo la metrica associata
		
		angular.forEach(listametriche,function(v,c){
			if(v.nist==val.control){
				temp=v;

				
				if(temp.value=='yes / no'){ //tipo 1
			
					if((temp.def=='yes')||(temp.def=='no')){
						temp.outputYES_NO=temp.def;}
					}
		
					if((temp.value=='integer')&&(temp.unit=='%')){ //tipo 2
						temp.N=0;
						temp.T=0;
					}
		
					if((temp.value=='integer')&&(temp.unit=='number')){ //tipo 3
			
						if(temp.def!='n/a'){temp.N=parseInt(temp.def, 10);}
					}
					
					if((temp.value=='integer')&&(temp.unit=='levels')){ //tipo 4
						
						if(temp.def!='n/a'){temp.N=parseInt(temp.def, 10);}
					}
				
				elenco.push(temp);
			}
		});
		
	});
	elenco=_.uniq(elenco, JSON.stringify);
	console.log(elenco);
	return elenco;
	}
	
	
	
    //prelevo le metriche
	$scope.ListMetrics = [];
	$http.get(urlBase+"/rest/metrics").
		success(function(dat) {
			$scope.ListMetrics = dat;
			console.log('metriche prelevate');
			if($scope.finito!=true){
				$scope.metricheassociate=$scope.inizializza($scope.ListMetrics); //inizializzo e filtro
				console.log('metriche inizializzate');
			}
	});
	
	
	//mi restituisce la metrica associata al controllo di sicurezza
	$scope.getmetric= function(controllo){
		angular.forEach($scope.metricheassociate,function(val,ch){
			if(val.nist==controllo){
				$scope.metrica=val;
			}
		});
		return $scope.metrica;
	}
	
	
	$scope.savemetrics=function(){
		
		angular.forEach($scope.metricheassociate,function(val,ch){
			//calcolo le percentuali
			if((val.N!=undefined)&&(val.T!=undefined)){
				val.Percent=(val.N/val.T)*100;
				val.Percent=Math.round(val.Percent*100)/100;
			}
		});
		
		//salvataggio nel localstorage
		localStorage.setItem("metriche", JSON.stringify($scope.metricheassociate));
		console.log("metriche salvate nel localstorage");
		$scope.finito=true;
		$cookieStore.put('finitometriche',$scope.finito);
		
		//costruisco lo sla
		$scope.capabilities='';
		$scope.capability='';
		$scope.threatsss='';
		
		$scope.getSLA=function(){
			
			angular.forEach($scope.ListComponentFromDB,function(valore,chiave){
				
				$scope.controlstring='';$scope.controlstring2='';
				var i=0;
				
				var stringacomp='<specs:COMPONENT name="'+valore.name+'" description="'+valore.description+'" >\n';
				
				angular.forEach($scope.selection,function(v,c){
					//per ogni threat
					
					
					if(v.componentid==valore.id){ //match idcomponente nelle 2 liste
						
						var string='<specs:capability name="'+v.threat+'" description="'+v.description+'" >'+'\n'+
						'<specs:controlFramework id="NIST_800_53_r4" frameworkName="NIST Control framework 800-53 rev. 4">';
				
						angular.forEach($scope.controlselection,function(val,ch){
							
					
							//solo se l'associazione per il componente c'è
							if((val.tid==v.threatid)&&(val.component==valore.id)){
						
								//devo fare la get per ricavare le info aggiuntive del controllo
								var family=val.control.charAt(0)+val.control.charAt(1);
						
								if(val.control.charAt(4)!='('){var cifra2=val.control.charAt(4);}else{var cifra2='';}
								var code=val.control.charAt(3)+cifra2;
						
						
								var temp='\n\n<specs:securityControl nist:id="'+val.control+'"\nnist:name="'+val.controlname+'"\nnist:securityControl="'+code+'"nist:control_family="'+family+'>\n<specs:description> '+val.description+'\n</specs:description>\n<specs:importance_weight> '+v.risk+' </specs:importance_weight>\n</specs:securityControl>';
								$scope.controlstring=$scope.controlstring+temp;
							}
							else{
								
								//gli altri controlli non associati ad un threat specifico
								if((val.tid==undefined)&&(val.component==valore.id)&&(i==0)){
							
									//devo fare la get per ricavare le info aggiuntive del controllo
									var family=val.control.charAt(0)+val.control.charAt(1);
							
									if(val.control.charAt(4)!='('){var cifra2=val.control.charAt(4);}else{var cifra2='';}
									var code=val.control.charAt(3)+cifra2;
							
							
									var temp2='\n\n<specs:securityControl nist:id="'+val.control+'"\nnist:name="'+val.controlname+'"\nnist:securityControl="'+code+'"nist:control_family="'+family+'>\n<specs:description> '+val.description+'\n</specs:description>\n</specs:securityControl>';
									$scope.controlstring2=$scope.controlstring2+temp2;
								}
								
								$scope.controlstring=$scope.controlstring;
							}
				
						});i++; //mi serve per scaricarmi i controlli aggiuntivi solo una volta!
						

						
						
						
						$scope.threatsss=$scope.threatsss+'\n'+string+$scope.controlstring+'\n</specs:controlFramework>\n</specs:capability>\n';
						$scope.controlstring=''; temp='';
					}
				});
						
				$scope.capability=$scope.capability+stringacomp+$scope.threatsss+'\n\n<!-- Other Controls selected-->\n<specs:controlFramework id="NIST_800_53_r4" frameworkName="NIST Control framework 800-53 rev. 4">'+$scope.controlstring2+'\n\n</specs:controlFramework>\n</specs:COMPONENT>\n\n\n\n\n';
				$scope.threatsss='';$scope.controlstring2='';temp2='';
			
			});
			$scope.capabilities=$scope.capability+'\n';
			
			//salvo lo SLA nel localstorage
			localStorage.setItem("SLA", JSON.stringify($scope.capabilities));

		}

		$scope.getSLA();
		console.log('SLA costruito e salvato nel localstorage')
	}
	
	
	
	
	
})//fine controller metriche



.controller('OverviewCtrl', function ($scope, $http, $cookieStore, $filter, $location, $timeout, $parse) {
   
	//prelevo dati cookie; 
	$scope.user_name=		$cookieStore.get('name');
    $scope.user_surname=	$cookieStore.get('surname');
    $scope.user_id=			$cookieStore.get('id_utente');
    $scope.controlselected=	$cookieStore.get('controls');
    
    $scope.selection=		JSON.parse(localStorage.getItem('selection'));
    $scope.controlselection=JSON.parse(localStorage.getItem('controlselection'));
    
    //recupero lo SLA
    $scope.capabilities=JSON.parse(localStorage.getItem('SLA'));
    
    
    if($location.$$host=='localhost'){
    	var urlBase="http://localhost:8080/TESI";
    }
    else {
    	var urlBase="https://threatapplication.herokuapp.com";
    }
    
    

	$scope.submitSLA=function(){
		//niente al momento
	}
	
	
	
	

    

	
});//fine controller



