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
.controller("InsertCtrl",function($scope,$http,$cookieStore,$location) {
	
	
	//prelevo dati cookie; 
	$scope.user_name=	$cookieStore.get('name');
    $scope.user_surname=$cookieStore.get('surname');
    $scope.user_id=		$cookieStore.get('id_utente');
    $scope.boolean1=	$cookieStore.get('check1');
    $scope.boolean2=	$cookieStore.get('check2');

        
    if($location.$$host=='localhost'){
    	var urlBase="http://localhost:8080/TESI";
    }
    else {
    	var urlBase="https://threatapplication.herokuapp.com";
    }
    
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
				
				
			}).error(function() {
			});	
		};

	///////////////////////////////////////////////////////
	// upload componenti
	

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
.controller('ThreatCtrl', function ($scope, $rootScope, $cookieStore, $location, $http, $window, $timeout) {
	
	//prelevo dati cookie; 
	$scope.user_name=		$cookieStore.get('name');
    $scope.user_surname=	$cookieStore.get('surname');
    $scope.user_id=			$cookieStore.get('id_utente');
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
					  
					  $http.post(urlBase+'/rest/delassoc/'+value.id).
				 	   	success(function(data) {
				 	   		console.log("elimino dal db il componente id="+value.id);
				 	   		
				 	   		
				 	   		//$cookieStore.put('buttonthreat',$scope.booleanthreat);
				 	   		});
				  });
		   //provo a mettere un timeout di 5 secondi per evitare sovrapposizioni
			   	$scope.booleanthreat=false;
			   	$timeout(saveSelection2, 3000);
		   }
		   else{
			   saveSelection2();
		   }
	   }
	   
	   
	   function saveSelection2(){
		   
			   localStorage.setItem("selection", JSON.stringify($scope.selection));
			   //$cookieStore.put('selection',$scope.selection);
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
	   	


	
})//fine


//controller ranking
.controller('RankCtrl', function ($scope, $rootScope, $cookieStore, $location, $http, $window) {
	
	//prelevo dati cookie; 
	$scope.user_name=		$cookieStore.get('name');
    $scope.user_surname=	$cookieStore.get('surname');
    $scope.user_id=			$cookieStore.get('id_utente');
    
    //$scope.selection=		$cookieStore.get('selection');
    $scope.selection=JSON.parse(localStorage.getItem('selection'));
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
    	$cookieStore.remove('done');
    	//$cookieStore.remove('selection');
    	$cookieStore.remove('buttonthreat');
    	
    	localStorage.removeItem('imgData');
    	localStorage.removeItem('selection');
    	console.log("cookie rimossi");
    	//ricarico la pagina
    	$window.location.reload();
    }
	
	
    $scope.add_user = function () {
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



