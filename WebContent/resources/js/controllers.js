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



angular.module('SlaApp.controllers', [])

.config(['$compileProvider', function ($compileProvider) {
	$compileProvider.aHrefSanitizationWhitelist(/^\s*(|blob|):/);
}])

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
		$cookieStore.remove('finitometriche2');
		$cookieStore.remove('questionario');
		$cookieStore.remove('tastoselezionatutti');
		$cookieStore.remove('tastoselezionatutti2');
		$cookieStore.remove('singolarmente');
		$cookieStore.remove('nextmetrics2');


		localStorage.removeItem('imgData');
		localStorage.removeItem('selection');
		localStorage.removeItem('controlselection');
		localStorage.removeItem('SLA');
		localStorage.removeItem('metriche');
		localStorage.removeItem('altremetriche');
		localStorage.removeItem('threatlist');
		localStorage.removeItem('valoriSTRIDE');
		localStorage.removeItem('metrichescelte');
		localStorage.removeItem('altremetrichescelte');
		console.log("cookie rimossi");


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

/////////////////////////////////////////////////////////////////


//controller pagina iniziale di registrazione (salvataggio cookie)

.controller('StartCtrl', function ($scope, $rootScope, $cookieStore, $location, $http, $window, $state, StartFactory) {


	//prelevo dati cookie; 
	$scope.user_name=	$cookieStore.get('name');
	$scope.user_surname=$cookieStore.get('surname');
	$scope.user_id=		$cookieStore.get('id_utente');
	$scope.allUsers = [];
	$scope.allSessions = [];
	
	if($cookieStore.get('pulsante') == undefined){$scope.boolean=false;}
	else{$scope.boolean = $cookieStore.get('pulsante');}

	StartFactory.getUsers()
	.success(function (data, status, headers, config) {
		$scope.allUsers = data;
	}).error(function (statusText) {
		$scope.errorMessage =  "Server Connection Error!";
		$scope.alertMessage = "";
	});

	$scope.add_user = function () {
		//lo faccio solo se gli input sono validi
		console.log($scope.user_name);
		console.log($scope.user_surname);
		if(($scope.user_name!=undefined)&&($scope.user_surname!=undefined)){

			//salvo cookie
			$cookieStore.put('name', $scope.user_name);
			$cookieStore.put('surname', $scope.user_surname);

			StartFactory.add($scope.user_name, $scope.user_surname)
			.success(function (data, status, headers, config) {
				console.log("User added");
				console.log("Get user id");
				$http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";

				StartFactory.getId($scope.user_name, $scope.user_surname)
				.success(function (data, status, headers, config) {
					$scope.user_id=data;
					console.log('id utente='+$scope.user_id);
					$cookieStore.put('id_utente',$scope.user_id); //id utente ---> chiave esterna

					$scope.boolean=true;
					$cookieStore.put('pulsante',$scope.boolean);

					//vai direttamente alla pagina dopo se è tutto ok
					$state.go('negotiate.insert');  		
				}).error(function (statusText) {
					$scope.errorMessage =  "Server Connection Error!";
					$scope.alertMessage = "";
				});
			})
			.error(function (statusText) {
				$scope.errorMessage =  "Server Connection Error!";
				$scope.alertMessage = "";
			});   

		}
	}
	
	$scope.updateSessions = function(userSel){
		
		StartFactory.getUserSession(userSel.name, userSel.cognome)
		.success(function (data, status, headers, config) {
			console.log("Data recived: "+data);
			$scope.allSessions = data;
		}).error(function (statusText) {
			$scope.errorMessage =  "Server Connection Error!";
			$scope.alertMessage = "";
		});
	}
	
	$scope.submitSession = function(){
		console.log("User selected name: "+$scope.allUsers.selectedUser.name)
		

		$scope.user_name=$scope.allUsers.selectedUser.name;
		$scope.user_surname=$scope.allUsers.selectedUser.cognome;
		console.log('name user='+$scope.user_name);
		console.log('surname user='+$scope.user_surname);
		$cookieStore.put('name', $scope.user_name);
		$cookieStore.put('surname', $scope.user_surname);
		
		$scope.user_id=$scope.allUsers.selectedUser.selectedSession;
		console.log('id user='+$scope.user_id);
		$cookieStore.put('id_utente',$scope.user_id); //id utente ---> chiave esterna
		
		$scope.boolean=true;
		$cookieStore.put('pulsante',$scope.boolean);

		//vai direttamente alla pagina dopo se è tutto ok
		$state.go('negotiate.insert');  
		
	}
})




//controller per l'inserimento dei componenti del sistema 
.controller("InsertCtrl",function($scope,$http,$cookieStore,$location,$window,$timeout,InsertFactory) {


	//prelevo dati cookie; 
	$scope.user_name=	$cookieStore.get('name');
	$scope.user_surname=$cookieStore.get('surname');
	$scope.user_id=		$cookieStore.get('id_utente');
	$scope.boolean1=	$cookieStore.get('check1'); //gestisce pressione upload
	$scope.boolean2=	$cookieStore.get('check2'); //gestisce inserimento pezzi
	$scope.boolean3=	$cookieStore.get('check3'); //gestisce pressione next


	$scope.alert=false;

	$scope.ThreatFromDB=JSON.parse(localStorage.getItem('threatlist'));
	$scope.ListSTRIDE=JSON.parse(localStorage.getItem('valoriSTRIDE'));

	if($scope.ThreatFromDB==null){
		$scope.ThreatFromDB=[];
	}
	if($scope.ListSTRIDE==null){
		$scope.ListSTRIDE=[];
	}


	//inizializzo già adesso la tabella per il ranking
	$scope.ListSTRIDEtemp = 
		[
		 {	'name':'SPOOFING',
			 'description':"Threat action aimed to illegally access and use another user's credentials, such as username and password.",
			 //likehood
			 'skill':0,'motive':0,'opportunity':0,'size':0,
			 'discover':0,'ease':0,'aware':0,'id':0,
			 //technical impacts
			 'confide':0,'integri':0,'avalai':0,'accounta':0,
			 //business impacts
			 'financial':0,'reputation':0,'noncompliance':0,'privacy':0},

			 {	'name':'TAMPERING',
				 'description':"Threat action aimed to maliciously change/modify persistent data, such as persistent data in a database, and the alteration of data in transit between two computers over an open network, such as the Internet.",
				 //likehood
				 'skill':0,'motive':0,'opportunity':0,'size':0,
				 'discover':0,'ease':0,'aware':0,'id':0,
				 //technical impacts
				 'confide':0,'integri':0,'avalai':0,'accounta':0,
				 //business impacts
				 'financial':0,'reputation':0,'noncompliance':0,'privacy':0},

				 {	'name':'REPUDIATION',
					 'description':"Threat action aimed to perform illegal operations in a system that lacks the ability to trace the prohibited operations.	",
					 //likehood
					 'skill':0,'motive':0,'opportunity':0,'size':0,
					 'discover':0,'ease':0,'aware':0,'id':0,
					 //technical impacts
					 'confide':0,'integri':0,'avalai':0,'accounta':0,
					 //business impacts
					 'financial':0,'reputation':0,'noncompliance':0,'privacy':0},

					 {	'name':'INFORMATION DISCLOSURE',
						 'description':"Threat action to read a file that one was not granted access to, or to read data in transit.",
						 //likehood
						 'skill':0,'motive':0,'opportunity':0,'size':0,
						 'discover':0,'ease':0,'aware':0,'id':0,
						 //technical impacts
						 'confide':0,'integri':0,'avalai':0,'accounta':0,
						 //business impacts
						 'financial':0,'reputation':0,'noncompliance':0,'privacy':0},

						 {	'name':'DENIAL OF SERVICE',
							 'description':"Threat aimed to deny access to valid users, such as by making a web server temporarily unavailable or unusable.",
							 //likehood
							 'skill':0,'motive':0,'opportunity':0,'size':0,
							 'discover':0,'ease':0,'aware':0,'id':0,
							 //technical impacts
							 'confide':0,'integri':0,'avalai':0,'accounta':0,
							 //business impacts
							 'financial':0,'reputation':0,'noncompliance':0,'privacy':0},

							 {	'name':'ELEVATION OF PRIVILEGES',
								 'description':"Threat aimed to gain privileged access to resources for gaining unauthorized access to information or to compromise a system.",
								 //likehood
								 'skill':0,'motive':0,'opportunity':0,'size':0,
								 'discover':0,'ease':0,'aware':0,'id':0,
								 //technical impacts
								 'confide':0,'integri':0,'avalai':0,'accounta':0,
								 //business impacts
								 'financial':0,'reputation':0,'noncompliance':0,'privacy':0}];



	//recupero la foto dal localstorage
	var dataImage = localStorage.getItem('imgData');
	bannerImg = document.getElementById('tableBanner');
	bannerImg.src = "data:image/png;base64," + dataImage;


	//get threat categories
	InsertFactory.getCategories()
	.success(function (data, status, headers, config) {
		console.log("Categories setted");
		$scope.categories = data;
	}).error(function (statusText) {
		$scope.errorMessage =  "Server Connection Error!";
		$scope.alertMessage = "";
	});

	//update components table
	$scope.updateOnScreen = function() {
		//prelevo i componenti dell'utente
		InsertFactory.getComponents($scope.user_id)
		.success(function (data, status, headers, config) {
			$scope.ListComponentFromDB = data;
			console.log('User\'s components setted');
			if($scope.ListComponentFromDB[0]==undefined){
				$scope.boolean2=false;
			}
		}).error(function (statusText) {
			$scope.errorMessage =  "Server Connection Error!";
			$scope.alertMessage = "";
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

		InsertFactory.uploadFile($scope.user_id, fd)
		.success(function (data, status, headers, config) {
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
		}).error(function (statusText) {
			$scope.errorMessage =  "Server Connection Error!";
			$scope.alertMessage = "";
		});
	};

	///////////////////////////////////////////////////////
	// upload componenti


	//upload nome e descr
	$scope.component = {};
	/*    $scope.component.name = "";
    $scope.component.description = "";*/
	$scope.componentList = [];



	//funzione invocata quando aggiungo il componente
	$scope.add2=function(){

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
		if(($scope.component.name!=undefined)&&($scope.component.category!=undefined)&&($scope.error_name!=true)){

			$http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";

			var data = {};
			data.name = $scope.component.name;
			data.dept = $scope.component.description;
			data.type = $scope.component.category; 

			$scope.componentList.push(data); //aggiorno la tabella a schermo

			//invio al server i dati da archiviare nel dbms
			InsertFactory.addComponent($scope.user_id, data.name, data.dept, data.type)
			.success(function (data, status, headers, config) {
				console.log("inserimento riuscito");
				$cookieStore.remove('buttonthreat');
				$cookieStore.remove('done');


				//aggiorno i componenti a schermo
				$scope.updateOnScreen();
				$scope.boolean2=true;
				$cookieStore.put('check2',$scope.boolean2);


				//ricavo id componente dal db
				$http.get("rest/compid/"+$scope.component.name+'/'+$scope.user_id).
				success(function(result) {
					$scope.idcomponente=result;
					console.log($scope.idcomponente);
					//prevelo tutti i threats associati alla categoria componente
					$http.get("rest/threats/"+$scope.component.category).
					success(function(result) {

						//inizializzazione parametri di visualizzazione
						angular.forEach(result,function(value,key){
							value.show='true';
							value.componentid=$scope.idcomponente;
							value.componentname=$scope.component.name;
							value.user=$scope.user_id;
						});
						$scope.ThreatFromDB=$scope.ThreatFromDB.concat(result);
						//faccio visualizzare il questionario 
						document.getElementById('light').style.display='block';document.getElementById('fade').style.display='block';

						//subito dopo aver inserito il componente, lo aggiungo pure nella lista per il ranking
						$scope.ListSTRIDE.push(
								{	'component':$scope.component.name,
									'componentid':$scope.idcomponente,
									'type':$scope.component.category,
									'punteggi':$scope.ListSTRIDEtemp,
								});
						//e la memorizzo
						localStorage.setItem("valoriSTRIDE", JSON.stringify($scope.ListSTRIDE));

					});

				});
			}).error(function (statusText) {
				$scope.errorMessage =  "Server Connection Error!";
				$scope.alertMessage = "";
			});

			/*//ricavo id componente dal db
           $http.get(urlBase+"/rest/compid/"+$scope.component.name+'/'+$scope.user_id).
	    	success(function(result) {
	    		$scope.idcomponente=result;
	    		console.log($scope.idcomponente);
	    	});

    	    //prevelo tutti i threats associati alla categoria componente
    	    $http.get(urlBase+"/rest/threats/"+$scope.component.category).
    	    	success(function(result) {

    	    		//inizializzazione parametri di visualizzazione
    	    		angular.forEach(result,function(value,key){
    	    			value.show='true';
    	    			value.componentid=$scope.idcomponente;
    	    			value.user=$scope.user_id;
    	    		});
    	    		$scope.ThreatFromDB=$scope.ThreatFromDB.concat(result);
    	    });

    	    $timeout(200);
    		//faccio visualizzare il questionario 
    		document.getElementById('light').style.display='block';document.getElementById('fade').style.display='block';*/

		}//fine if di validazione

	}//fine metodo add2


	//funzione aggiungi in tabella (e in db)
	$scope.add = function(){
		//resetto i campi
		$scope.component = {};

		localStorage.setItem("threatlist", JSON.stringify($scope.ThreatFromDB));
		document.getElementById('light').style.display='none';document.getElementById('fade').style.display='none';
	}//fine metodo add


	$scope.add3=function(componente){
		$scope.component.id=componente;
		//prima faccio visualizzare il questionario e blocco tutto con una variabile booleana
		document.getElementById('light2').style.display='block';document.getElementById('fade').style.display='block';
	}//fine metodo add3

	$scope.close3=function(){
		//salvo e chiudo
		localStorage.setItem("threatlist", JSON.stringify($scope.ThreatFromDB));
		$scope.component={};//resetto
		document.getElementById('light2').style.display='none';document.getElementById('fade').style.display='none';
	}//fine metodo close3







	//funzione di ricerca di un elemento nella lista
	function arrayObjectIndexOf(myArray, searchTerm1, property1) {
		for(var i = 0, len = myArray.length; i < len; i++) {
			if (myArray[i][property1] === searchTerm1) return i;
		}
		return -1;
	}



	//funzione rimuovi da tabella
	$scope.remove = function(obj,id,name,description){

		$scope.alert=true;
		//per cancellare un componente devi prima rimuovere l'associazione con i threat!!
		for(var i = $scope.ThreatFromDB.length - 1; i >= 0; i--) {
			if($scope.ThreatFromDB[i].componentid === id) {
				$scope.ThreatFromDB.splice(i, 1);
			}
		}
		localStorage.setItem("threatlist", JSON.stringify($scope.ThreatFromDB));

		//rimuovo da db
		$http.post('rest/delete/'+id).
		success(function(data) {
			//rimuovo da tab a schermo
			if(obj != -1) {
				$scope.componentList.splice(obj, 1);
			}
		}).error(function(data) {

			//in caso di errore mando un alert perchè probabilmente sto cercando di cancellare
			//senza aver cancellato prima le associazioni!

		});


		//aggiorno i componenti dell'utente
		$scope.updateOnScreen();

		//adesso elimino elemento nella tabella STRIDE
		for(var i = $scope.ListSTRIDE.length - 1; i >= 0; i--) {
			if($scope.ListSTRIDE[i].componentid === id) {
				$scope.ListSTRIDE.splice(i, 1);
			}
		}
		localStorage.setItem("valoriSTRIDE", JSON.stringify($scope.ListSTRIDE));

	}//fine metodo remove




	$scope.next = function(){
		//sono andato avanti, quindi faccio sparire il form della foto (per evitare cambi)
		$scope.boolean3=true;
		$cookieStore.put('check3',$scope.boolean3);

	}

	$scope.nonMostrareALL=function(valore){
		if(valore=='all'){
			return true;
		}else {return false;}
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
	$scope.questionario=	$cookieStore.get('questionario');

	//$scope.selection=$cookieStore.get('selection');
	$scope.selection=JSON.parse(localStorage.getItem('selection'));
	//tutti i threat sono caricati nella pagina precedente!
	$scope.ThreatFromDB=JSON.parse(localStorage.getItem('threatlist'));


	if($scope.selection==null){
		$scope.selection=[];
	}


	console.log("utente="+$scope.user_name+" "+$scope.user_surname+" id= "+$scope.user_id);

	//recupero la foto dal localstorage (invece che dal db)
	var dataImage = localStorage.getItem('imgData');
	bannerImg = document.getElementById('tableBanner');
	bannerImg.src = "data:image/png;base64," + dataImage;


	$scope.options = [{ label: 'NO', val: false }, { label: 'YES', val: true }];

	//prevelo tutti i threats
	$scope.getThreats = function() {
		$http.get("rest/threats").
		success(function(result) {
			$scope.ThreatFromDB = result;
			console.log('threat prelevati');
			//inizializzazione parametri di visualizzazione
			angular.forEach($scope.ThreatFromDB,function(value,key){
				value.show='true';
			});
		});
	};

	$scope.mostraThreat= function(valore){
		if(valore=='true'){
			return true;
		}
		else {
			return false;
		}
	}

	$scope.nonMostrareALL=function(valore){
		if(valore=='all'){
			return true;
		}else {return false;}
	}

	$scope.sendquestionnaire=function(){
		$scope.questionario=true;
		$cookieStore.put('questionario',$scope.questionario);
		//salvo anche i threat con il questionario nel localstorage
		localStorage.setItem("threatlist", JSON.stringify($scope.ThreatFromDB));

		$window.location.reload();

	}


	//prelevo i componenti dell'utente
	$scope.ListComponentFromDB = [];
	$http.get("rest/components/"+$scope.user_id).
	success(function(data) {
		$scope.ListComponentFromDB = data;
		console.log('componenti utente prelevati');

		//angular.forEach($scope.ListComponentFromDB, function(value, key){
		//console.log(value.type); il tipo di ogni componente

		//ho deciso di prelevarli tutti direttamente per poi filtrarli (più semplice)		
	});

	//se non sono nel localstorage allora li carico dal db
	if($scope.ThreatFromDB==null){
		$scope.getThreats(); //carico tutti i threats
	}


	//$scope.selection = [];
	//funzione ricerca doppia
	function arrayObjectIndexOf(myArray, searchTerm1, property1, searchTerm2, property2) {
		for(var i = 0, len = myArray.length; i < len; i++) {
			if ((myArray[i][property1] === searchTerm1)&&(myArray[i][property2] === searchTerm2)) return i;
		}
		return -1;
	}

	//raccolgo i threat selezionati
	$scope.toggleSelection = function toggleSelection(componentName,componentid,threatName,threatid,stride,descr,sourc) {
		//dato che ho apportato una modifica, elimino il tasto next in ranking e in questa pagina (forzo a fare save)
		var fattoo=false;
		$cookieStore.put('done',fattoo);
		$scope.booleanthreat=false;

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
						'source':sourc,

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

		//pulisco prima TUTTO il db
		angular.forEach($scope.ListComponentFromDB,function(value,key){
			//elimino prima le possibili associazioni create in avanti nel wizard 
			$http.post('rest/delassocControl/'+value.id).
			success(function(data) {
				console.log("elimino dal db i controlli associati ad ogni componente!");
			});

			//elimino le associazioni create in precedenza in questa pagina
			$http.post('rest/delassoc/'+value.id).
			success(function(data) {
				console.log("elimino dal db le associazioni Threats-componente id="+value.id);

			});
		});
		//provo a mettere un timeout di 2 secondi per evitare sovrapposizioni
		$timeout(saveSelection2, 2000); 
	}

	function saveSelection2(){

		//salvo anche i threat con il questionario nel localstorage
		localStorage.setItem("threatlist", JSON.stringify($scope.ThreatFromDB));

		localStorage.setItem("selection", JSON.stringify($scope.selection));

		localStorage.removeItem('controlselection'); //pulizia per dopo...
		localStorage.removeItem('SLA');
		localStorage.removeItem('metriche');
		localStorage.removeItem('altremetriche');
		$cookieStore.remove('finitometriche');
		$cookieStore.remove('finitometriche2');

		console.log("salvato nel localstorage");

		angular.forEach($scope.selection,function(valore,chiave){

			$http.post('rest/assoc/'+valore.componentid+'/'+valore.threatid).
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
		$scope.booleanthreat=false;

		if($scope.tastoselezione=='Select All'){
			//devo prima resettare tutta la lista
			$scope.selection=[];

			angular.forEach($scope.ThreatFromDB,function(threat,key2){
				//per ogni threat
				if(threat.show=='true'){

					$scope.selection.push(
							{	'component':threat.componentname,
								'componentid':threat.componentid,
								'threat':threat.name,
								'threatid':threat.idThreat,
								'stride':threat.stride,
								'description':threat.descr,
								'source':threat.source,

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
	$scope.ListSTRIDE=		JSON.parse(localStorage.getItem('valoriSTRIDE'));

	$scope.done=			$cookieStore.get('done');

	$scope.singolarmente=	$cookieStore.get('singolarmente'); //permette il ranking x ogni threat
	if(($scope.singolarmente==false)||($scope.singolarmente==undefined)){$scope.valutazione='NO';}
	else{$scope.valutazione='YES';}


	$scope.switchRiskRating=function(){
		if(($scope.singolarmente==false)||($scope.singolarmente==undefined)){$scope.singolarmente=true;$scope.valutazione='YES';}
		else{$scope.singolarmente=false;$scope.valutazione='NO';}
	}


	//prelevo i componenti dell'utente
	$scope.ListComponentFromDB = [];
	$http.get("rest/components/"+$scope.user_id).
	success(function(data) {
		$scope.ListComponentFromDB = data;
		console.log('componenti utente prelevati');		
	});

	//inizializzazione dati nelle tabelle dei threat
	angular.forEach($scope.selection, function(value, key){
		if($scope.done==undefined){
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

	//inizializzazione dati nelle tabelle STRIDE
	angular.forEach($scope.ListSTRIDE, function(v, k){
		angular.forEach(v.punteggi, function(value, key){
			if($scope.done==undefined){
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
	});





	$scope.saveRating = function(){

		$scope.done=true;
		$cookieStore.put('done',$scope.done);
		$cookieStore.put('singolarmente',$scope.singolarmente);

		//salvataggio dati dei 2 tipi di ranking
		if($scope.singolarmente==true){
			//caso 1
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
		}else{
			//caso 2 devo salvare le categorie e poi assegnare lo stesso punteggio ad ogni threat della categoria
			angular.forEach($scope.ListSTRIDE, function(v, k){
				angular.forEach(v.punteggi, function(value, key){
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
				});});

			//assegno il punteggio della categoria al threat
			angular.forEach($scope.selection, function(threat, k){
				angular.forEach($scope.ListSTRIDE, function(cat, ke){
					if(threat.componentid==cat.componentid){

						angular.forEach(cat.punteggi, function(categoria, key){
							if(categoria.name==threat.stride){
								//likehood
								threat.skill=categoria.skill;
								threat.motive=categoria.motive;
								threat.opportunity=categoria.opportunity;
								threat.size=categoria.size;
								threat.discover=categoria.discover;
								threat.ease=categoria.ease;
								threat.aware=categoria.aware;
								threat.id=categoria.id;
								//technical impacts
								threat.confide=categoria.confide;
								threat.integri=categoria.integri;
								threat.avalai=categoria.avalai;
								threat.accounta=categoria.accounta;
								//business impacts
								threat.financial=categoria.financial;
								threat.reputation=categoria.reputation;
								threat.noncompliance=categoria.noncompliance;
								threat.privacy=categoria.privacy;
								//altro
								threat.totaleLikehood=categoria.totaleLikehood;
								threat.totaleImpactBusiness=categoria.totaleImpactBusiness;
								threat.totaleImpactTechnical=categoria.totaleImpactTechnical;
								threat.totaleImpact=categoria.totaleImpact;
								threat.risk=categoria.risk;
								threat.riskNum=categoria.riskNum;
							}
						});
					}	
				});
			});


		}//fine else

		//salvo i valori inseriti per mantenere anche le tabelle
		//$cookieStore.put('selection',$scope.selection);
		localStorage.setItem("selection", JSON.stringify($scope.selection));
		localStorage.setItem("valoriSTRIDE", JSON.stringify($scope.ListSTRIDE));
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



	$scope.solosecisonoThreat=function(idcomp){
		//conto se ci sono associazioni comp-Threats
		$scope.i=0;
		angular.forEach($scope.selection,function(t,k){
			if(t.componentid==idcomp){$scope.i++;}
		});
		var bool;
		if($scope.i==0){bool=false;}
		else{bool=true;} 
		return bool;
	}


	$scope.solosecisonoThreatSTRIDE=function(categoria,componente){
		var trovato=false;
		angular.forEach($scope.selection,function(t,k){
			if((t.stride==categoria)&&(t.componentid==componente)){trovato=true;}
		});
		return trovato;
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
	$scope.selezionatitutti=$cookieStore.get('tastoselezionatutti');


	$scope.controlselection=JSON.parse(localStorage.getItem('controlselection'));

	if($scope.controlselection==null){
		$scope.controlselection=[];
		$scope.controlselected=false;
	}





	//prelevo i componenti dell'utente
	$scope.ListComponentFromDB = [];
	$http.get("rest/components/"+$scope.user_id).
	success(function(data) {
		$scope.ListComponentFromDB = data;
		console.log('componenti utente prelevati');	
		//all'inizio non applicato il filtraggio dei controlli necessari!
		angular.forEach($scope.ListComponentFromDB, function(com, key1){
			com.variabile=false;
			com.nomepulsantefiltro='Only Required?  NO';
		});
		console.log('aggiunte info tasti');
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
	$http.get("rest/controls/").
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

	//funzione di inserimento di tutti i controlli suggeriti
	$scope.toggleSelectionALL = function toggleSelection(control,name,component,desc,threatid) {


		//gestisco selezione e deselezione indipendentemente con la variabile booleana nei cookie
		if($scope.selezionatitutti!=true){
			//cioè devo solo aggiungerli tutti

			var idx = arrayObjectIndexOf($scope.controlselection,control,'control',component,'component');
			// is currently selected
			if (idx > -1) {

				//$scope.controlselection.splice(idx, 1);
				//non faccio nulla altrimenti in caso di duplicati la spunta viene tolta quando premo select all
				//ATTENZIONE COSì se 2 threat dello stesso comp hanno anche lo stesso controllo associato, allora
				//mi seleziono il controllo una sola volta(giusto) ma per i diversi tid (mi porto avanti solo il primo!)
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
		}else{

			//devo solo eliminarli tutti
			var idx = arrayObjectIndexOf($scope.controlselection,control,'control',component,'component');
			// is currently selected
			if (idx > -1) {

				$scope.controlselection.splice(idx, 1);

			}
			// is newly selected
			else {
				//non posso aggiungerlo se non l'ho trovato
				/*
			    	$scope.controlselection.push(
		   		    		   {	'control':control,
		   		    			    'controlname':name,
		   		    			   	'component':component,
		   		    			   	'description':desc,
		   		    			   	'tid':threatid,
		   		    		});*/
			}

		}
	};//fine metodo



	//funzione di inserimento del controllo selezionato con la spunta
	$scope.toggleSelection = function toggleSelection(control,name,component,desc,threatid) {
		//forzo next
		$scope.controlselected=false;
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



	//funzione di inserimento con presenza di duplicati
	$scope.toggleSelectionSEMPRE = function toggleSelection(control,name,component,desc,threatid) {
		//forzo next
		$scope.controlselected=false;
		var idx = arrayObjectIndexOf($scope.controlselection,control,'control',component,'component');
		// is currently selected
		if (idx > -1) {
			//$scope.controlselection.splice(idx, 1);
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

		//se sono tornato indietro devo resettare le metriche e lo SLA
		$cookieStore.remove('finitometriche');
		$cookieStore.remove('finitometriche2');
		localStorage.removeItem('SLA');
		localStorage.removeItem('metriche');
		localStorage.removeItem('altremetriche');


		//salvo di nuovo quindi pulisco prima TUTTO
		angular.forEach($scope.ListComponentFromDB,function(value,key){
			$http.post('rest/delassocControl/'+value.id).
			success(function(data) {
				console.log("elimino dal db i controlli associati al comp");
			});
		});

		//provo a mettere un timeout di 2 secondi per evitare sovrapposizioni
		$scope.controlselected=false;
		$cookieStore.put('controls',$scope.controlselected);
		$timeout(saveSelection2, 200);


	}//fine funzione di salvataggio


	function saveSelection2(){

		localStorage.setItem("controlselection", JSON.stringify($scope.controlselection));
		console.log("salvato nel localstorage");

		angular.forEach($scope.controlselection,function(valore,chiave){
			//salvo associazione controllo- componente (id utente non necessario)

			$http.post('rest/assocControl/'+valore.control+'/'+valore.component).
			success(function(data) {
				console.log("associazione controlli-componente correttamente inserita");

				$scope.controlselected=true;
				$cookieStore.put('controls',$scope.controlselected);});

		});

	}//fine saveselection



	//per nascondere le tab 1
	$scope.toggleTable1=function(component){
		document.getElementById(component+'tasto2').style.color = "black";
		document.getElementById(component+'tasto1').style.color = "red";
		$scope.nasconditasti=false;

		if (document.getElementById(component+'tab1').style.display == "table" ) { //se la tabella 1 c'è
			//document.getElementById(component+'tab1').style.display="none";  //tutto ok
		} else {
			document.getElementById(component+'tab1').style.display="table";  //la mostro
			document.getElementById(component+'tab2').style.display="none";   //e nascondo la 2
		}
	}
	//per nascondere le tab 2
	$scope.toggleTable2=function(component){
		document.getElementById(component+'tasto1').style.color = "black";
		document.getElementById(component+'tasto2').style.color = "red";
		$scope.nasconditasti=true;

		if (document.getElementById(component+'tab2').style.display == "table" ) { //se c'è la tabella 2
			//document.getElementById(component+'tab2').style.display="none"; //ok
		} else {
			document.getElementById(component+'tab2').style.display="table";  //la mostro
			document.getElementById(component+'tab1').style.display="none";    //e nascondo la 1
		}
	}




	//all'avvio scarico la lista di tutti i controlli suggeriti
	$scope.controllisuggeriti = [];
	$http.get("rest/controllisuggeriti").
	success(function(eccolo) {
		$scope.controllisuggeriti = eccolo;
		console.log('lista di controlli suggeriti ricevuta');		
	});




	//funzione switch filtro
	$scope.cambiofiltro=function(idcomp){
		angular.forEach($scope.ListComponentFromDB,function(value,key){
			if(value.id==idcomp){ //matching
				if(value.variabile==true){
					value.variabile=false;
					value.nomepulsantefiltro='Only Required?  NO';
				}
				else{
					value.variabile=true;
					value.nomepulsantefiltro='Only Required? YES';
				}
			}});
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



	//funzione di selezione di tutti i controlli required
	//provo a farla lavorare sulla lista dei controlli suggeriti senza duplicati
	$scope.selezionatuttiRequired= function(){
		//forzo next
		$scope.controlselected=false;
		//$scope.controlselection=[];

		angular.forEach($scope.ListComponentFromDB, function(componente, key1){
			angular.forEach($scope.selection, function(threat, key2){
				if(threat.componentid==componente.id){
					angular.forEach($scope.controllisuggeriti, function(controllo, key3){
						if(controllo.hreatid==threat.threatid){
							if(threat.riskNum>=controllo.minrisk){
								//devo selezionarlo
								$scope.toggleSelectionALL(controllo.control,controllo.controlname, componente.id, controllo.controldesc,threat.threatid);
							}
						}
					});
				}
			});
		});
		//switch pressione tasto
		if($scope.selezionatitutti==true){
			$scope.selezionatitutti=false;
		}else{$scope.selezionatitutti=true;}
		$cookieStore.put('tastoselezionatutti',$scope.selezionatitutti);
	}//fine funzione



	$scope.selezionatutti= function(componente,compid){
		//forzo next
		$scope.controlselected=false;

		//funzionamento dipende dalla lista
		if(document.getElementById(componente+'tasto1').style.color == "red"){
			//lista1
			angular.forEach($scope.ListComponentFromDB,function(value,key){
				if(compid==value.id){ //matching
					if(value.variabile==true){
						//lista1 - seleziona tutti i required
						angular.forEach($scope.selection, function(threat, key2){
							if(threat.componentid==compid){
								angular.forEach($scope.controllisuggeriti, function(controllo, key3){
									if(controllo.hreatid==threat.threatid){
										if(threat.riskNum>=controllo.minrisk){
											//devo selezionarlo SEMPRE
											$scope.toggleSelectionSEMPRE(controllo.control,controllo.controlname, compid, controllo.controldesc,threat.threatid);
										}
									}
								});
							}
						});
					}
					else{
						//lista1 -seleziona tutto
						angular.forEach($scope.selection, function(threat, key2){
							if(threat.componentid==compid){
								angular.forEach($scope.controllisuggeriti, function(controllo, key3){
									if(controllo.hreatid==threat.threatid){	
										//devo selezionarlo SEMPRE
										$scope.toggleSelectionSEMPRE(controllo.control,controllo.controlname, compid, controllo.controldesc,threat.threatid);
									}
								});
							}
						});	
					}
				}
			});
		}
		else{
			//lista2
		}
	}

	$scope.puliscitutti= function(componente,compid){
		//forzo next
		$scope.controlselected=false;
		//lista1 - clear all
		angular.forEach($scope.selection, function(threat, key2){
			if(threat.componentid==compid){
				angular.forEach($scope.controllisuggeriti, function(controllo, key3){
					if(controllo.hreatid==threat.threatid){	
						//devo cancellare
						var idx = arrayObjectIndexOf($scope.controlselection,controllo.control,'control',compid,'component');
						// is currently selected
						if (idx > -1) {    	
							$scope.controlselection.splice(idx, 1);
						}
					}
				});
			}
		});
	}


	//funzione deseleziona tutto	
	$scope.pulizia=function(){
		$scope.controlselection=[];
		//forzo next
		$scope.controlselected=false;
		$scope.selezionatitutti=false;
	}




})







.controller('MetricsCtrl', function ($scope, $http, $cookieStore, $filter, $location, $timeout, $parse, $state) {

	//prelevo dati cookie; 
	$scope.user_name=		$cookieStore.get('name');
	$scope.user_surname=	$cookieStore.get('surname');
	$scope.user_id=			$cookieStore.get('id_utente');
	$scope.controlselected=	$cookieStore.get('controls');
	$scope.finito= 			$cookieStore.get('finitometriche');

	$scope.selection=		JSON.parse(localStorage.getItem('selection'));
	$scope.controlselection=JSON.parse(localStorage.getItem('controlselection'));

	$scope.metricheassociate=JSON.parse(localStorage.getItem('metriche'));
	$scope.selezionemetriche=JSON.parse(localStorage.getItem('metrichescelte'));

	$scope.listacontrolli=false;
	$scope.mostralistacontrolli=function(){
		if($scope.listacontrolli==false){$scope.listacontrolli=true;}
		else{$scope.listacontrolli=false;}
	}

	if($scope.metricheassociate==null){
		$scope.metricheassociate=[];
	}

	if($scope.selezionemetriche==null){
		$scope.selezionemetriche=[];
	}




	//funzione ricerca doppia
	function arrayObjectIndexOf(myArray, searchTerm1, property1, searchTerm2, property2) {
		for(var i = 0, len = myArray.length; i < len; i++) {
			if ((myArray[i][property1] === searchTerm1)&&(myArray[i][property2] === searchTerm2)) return i;
		}
		return -1;
	}

	//raccolgo solo le metriche selezionate
	$scope.toggleSelection = function toggleSelection(metrica) {

		var idx = arrayObjectIndexOf($scope.selezionemetriche,metrica.componenteid,'componenteid',metrica.metricname,'metricname');
		// is currently selected
		if (idx > -1) {
			$scope.selezionemetriche.splice(idx, 1);
		}
		// is newly selected
		else {
			$scope.selezionemetriche.push(metrica);
		}
	};//fine metodo

	//funzione associata alla checkbox
	$scope.find = function(componenteid,metricname){
		var i = arrayObjectIndexOf($scope.selezionemetriche,componenteid,'componenteid',metricname,'metricname');
		//è già selezionato
		if (i > -1) {
			return true;
		}
		// is newly selected
		else {
			return false;
		}

	}







	$scope.SLAs=[];


	//prelevo i componenti dell'utente
	$scope.ListComponentFromDB = [];
	$http.get("rest/components/"+$scope.user_id).
	success(function(data) {
		$scope.ListComponentFromDB = data;
		console.log('componenti utente prelevati');	

		//adesso per ogni componente recupero le metriche (senza duplicati)
		angular.forEach($scope.ListComponentFromDB,function(valore,chiave){
			$scope.ListMetrics = [];
			$http.get("rest/metrics/"+valore.id).
			success(function(dat) {
				$scope.ListMetrics = dat;
				console.log('metriche prelevate per componente '+valore.id);
				if($scope.finito!=true){
					//inizializzazione dati metriche in tabella
					angular.forEach($scope.ListMetrics,function(temp,c){

						switch(true){
						case(temp.value=='yes / no'): //tipo 1

							if((temp.def=='yes')||(temp.def=='no')){
								temp.outputYES_NO=temp.def;}
						break;


						case((temp.value=='integer')&&(temp.unit=='%')): //tipo 2
							temp.N=0;
						temp.T=0;
						break;


						case((temp.value=='integer')&&(temp.unit=='number')): //tipo 3

							if(temp.def!='n/a'){temp.N=parseInt(temp.def, 10);}
						break;

						case((temp.value=='integer')&&(temp.unit=='levels')): //tipo 4

							if(temp.def!='n/a'){temp.N=parseInt(temp.def, 10);}
						break;

						}
						//per ogni metrica scarico la lista dei controlli associati al componente
						$http.get("rest/metricControls/"+temp.metricname+'/'+valore.id).
						success(function(data) {
							//console.log(data);
							temp.listacontrolli=data;

						});


					});
					//provo a filtrare
					//var elenco=_.uniq($scope.ListMetrics, JSON.stringify); //provo ad ignorare i duplicati
					//console.log(elenco);

					console.log('metriche inizializzate');
					$scope.metricheassociate=$scope.metricheassociate.concat($scope.ListMetrics);


				}
			});//fine get
		});//fine ciclo esterno	
	});


	$scope.getcompname= function(idcomponente){
		$scope.nomecomp='';
		angular.forEach($scope.ListComponentFromDB,function(valore,chiave){

			if(valore.id==idcomponente){
				$scope.nomecomp=valore.name;
			}
		});		
		return $scope.nomecomp;
	}


	//mi restituisce la metrica associata al controllo di sicurezza
	$scope.getmetric= function(controllo){
		angular.forEach($scope.metricheassociate,function(val,ch){
			if(val.metrica.nist==controllo){
				$scope.metrica=val.metrica;
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
			if((val.N==0)&&(val.T==0)){
				val.Percent=0;
			}
		});

		//salvataggio nel localstorage
		localStorage.setItem("metriche", JSON.stringify($scope.metricheassociate));
		localStorage.setItem("metrichescelte", JSON.stringify($scope.selezionemetriche));
		console.log("metriche salvate nel localstorage");
		$scope.finito=true;
		$cookieStore.put('finitometriche',$scope.finito);
		localStorage.removeItem('SLA');	

		if($scope.metricheassociate.length==0){
			//caso particolare 0 metriche vai avanti direttamente
			$state.go('negotiate.metrics2');
		}
	}//fine savemetrics


	$scope.nessunametrica=function(idcomponente){
		var bool=false;
		angular.forEach($scope.metricheassociate,function(val,ch){
			if(val.componenteid==idcomponente){bool=true;}
		});
		return bool;
	}




})//fine controller metriche1


.controller('MetricsCtrl2', function ($scope, $http, $cookieStore, $filter, $location, $timeout, $parse) {

	//prelevo dati cookie; 
	$scope.user_name=		$cookieStore.get('name');
	$scope.user_surname=	$cookieStore.get('surname');
	$scope.user_id=			$cookieStore.get('id_utente');
	$scope.controlselected=	$cookieStore.get('controls');
	$scope.finito= 			$cookieStore.get('finitometriche2');
	$scope.nextbutton=		$cookieStore.get('nextmetrics2');



	$scope.selection=		JSON.parse(localStorage.getItem('selection'));
	$scope.controlselection=JSON.parse(localStorage.getItem('controlselection'));

	$scope.metricheassociate=JSON.parse(localStorage.getItem('metrichescelte'));
	$scope.altremetriche=JSON.parse(localStorage.getItem('altremetriche'));
	$scope.selezionemetriche=JSON.parse(localStorage.getItem('altremetrichescelte'));


	if($scope.metricheassociate==null){
		$scope.metricheassociate=[];
	}

	if($scope.altremetriche==null){
		$scope.altremetriche=[];
	}

	if($scope.selezionemetriche==null){
		$scope.selezionemetriche=[];
	}

	if(JSON.parse(localStorage.getItem('SLA'))==null){
		//non posso far apparire next
		$scope.nextbutton=false;
	}



	//funzione ricerca doppia
	function arrayObjectIndexOf(myArray, searchTerm1, property1, searchTerm2, property2) {
		for(var i = 0, len = myArray.length; i < len; i++) {
			if ((myArray[i][property1] === searchTerm1)&&(myArray[i][property2] === searchTerm2)) return i;
		}
		return -1;
	}

	//raccolgo solo le metriche selezionate
	$scope.toggleSelection = function toggleSelection(metrica) {

		var idx = arrayObjectIndexOf($scope.selezionemetriche,metrica.componenteid,'componenteid',metrica.metricname,'metricname');
		// is currently selected
		if (idx > -1) {
			$scope.selezionemetriche.splice(idx, 1);
		}
		// is newly selected
		else {
			$scope.selezionemetriche.push(metrica);
		}
	};//fine metodo

	//funzione associata alla checkbox
	$scope.find = function(componenteid,metricname){
		var i = arrayObjectIndexOf($scope.selezionemetriche,componenteid,'componenteid',metricname,'metricname');
		//è già selezionato
		if (i > -1) {
			return true;
		}
		// is newly selected
		else {
			return false;
		}

	}








	//prelevo i componenti dell'utente
	$scope.ListComponentFromDB = [];
	$http.get("rest/components/"+$scope.user_id).
	success(function(data) {
		$scope.ListComponentFromDB = data;
		console.log('componenti utente prelevati');
	});

	if($scope.finito!=true){
		//prelevo le metriche associate a i Threats: quindi per ogni threat recupero le metrice
		angular.forEach($scope.selection,function(valore,chiave){
			$http.get("rest/altremetrice/"+valore.threat).
			success(function(data) {
				//console.log(data);
				//per ogni metrica ricevuta verifico che non sia già stata inserita, poi associo il comp e inizializzo
				angular.forEach(data,function(val,ch){

					val.componenteid=valore.componentid;

					var trovato=false;

					angular.forEach($scope.metricheassociate,function(v,c){
						var compid=parseInt(v.componenteid, 10);
						//console.log('comp: '+val.metricname+' con '+v.metricname);
						if((val.metricname==v.metricname)&&(val.componenteid==compid)){trovato=true;console.log('trovato!');}
					});

					if(trovato==true){
						//metrica non valida
					}
					else{

						//inizializzazione dati metrica
						switch(true){
						case(val.value=='yes / no'): //tipo 1

							if((val.def=='yes')||(val.def=='no')){
								val.outputYES_NO=val.def;}
						break;


						case((val.value=='integer')&&(val.unit=='%')): //tipo 2
							val.N=0;
						val.T=0;
						break;


						case((val.value=='integer')&&(val.unit=='number')): //tipo 3

							if(val.def!='n/a'){val.N=parseInt(val.def, 10);}
						break;

						case((val.value=='integer')&&(val.unit=='levels')): //tipo 4

							if(val.def!='n/a'){val.N=parseInt(val.def, 10);}
						break;
						}

						//la metrica è valida e inizializzata quindi la salvo
						$scope.altremetriche=$scope.altremetriche.concat(val);

					}//fine else
				});//fine loop data



			});
		});

	}//fine if






	$scope.savemetrics=function(){

		angular.forEach($scope.altremetriche,function(val,ch){
			//calcolo le percentuali
			if((val.N!=undefined)&&(val.T!=undefined)){
				val.Percent=(val.N/val.T)*100;
				val.Percent=Math.round(val.Percent*100)/100;
			}
			if((val.N==0)&&(val.T==0)){
				val.Percent=0;
			}
		});

		localStorage.setItem("altremetriche", JSON.stringify($scope.altremetriche));
		localStorage.setItem("altremetrichescelte", JSON.stringify($scope.selezionemetriche));

		//tutte le metriche
		var Allmetrics=$scope.metricheassociate.concat($scope.selezionemetriche);

		console.log("le altre metriche sono state salvate nel localstorage");
		$scope.finito=true;
		$cookieStore.put('finitometriche2',$scope.finito);

		//pulisco il vecchio SLA
		localStorage.removeItem('SLA');

		//costruisco lo sla
		$scope.SLAs=[];
		$scope.capabilities='';
		$scope.capability='';
		$scope.threatsss='';
		$scope.musaThreat='';

		$scope.j=0;


		angular.forEach($scope.ListComponentFromDB,function(valore,chiave){

			$scope.controlstring='';$scope.controlstring2='';$scope.musaThreat='';$scope.SLO='';
			var i=0;


			$scope.inizioGaranteeTerm='\n				</specs:serviceDescription>\n			</wsag:ServiceDescriptionTerm>\n\n			<wsag:GuaranteeTerm wsag:Name="//specs:capability[@name='+valore.name+']" wsag:Obligated="">\n\n				<wsag:ServiceLevelObjective>\n					<wsag:CustomServiceLevel>\n						<specs:objectiveList>\n';

			angular.forEach($scope.selection,function(v,c){
				//per ogni threat


				if(v.componentid==valore.id){ //match idcomponente nelle 2 liste

					/*var string='<specs:capability name="'+v.threat+'" description="'+v.description+'" >'+'\n'+
						'<specs:controlFramework id="NIST_800_53_r4" frameworkName="NIST Control framework 800-53 rev. 4">';*/

					$scope.stringcapability='                        <specs:capability id="" name="Requested capability for component '+valore.name+'" description="'+'"  mandatory="">'+'\n'+
					'                            <specs:controlFramework id="NIST_800_53_r4" frameworkName="NIST Control framework 800-53 rev. 4">\n';

					$scope.musaThreat=$scope.musaThreat+'                            <MUSA:Threat name="'+v.threat+'" source='+v.source+'/>\n';

					angular.forEach($scope.controlselection,function(val,ch){


						//solo se l'associazione per il componente c'è
						if((val.tid==v.threatid)&&(val.component==valore.id)){

							//devo fare la get per ricavare le info aggiuntive del controllo
							var family=val.control.charAt(0)+val.control.charAt(1);

							if(val.control.charAt(4)!='('){var cifra2=val.control.charAt(4);}else{var cifra2='';}
							var code=val.control.charAt(3)+cifra2;

							var rischio=v.risk;
							switch(v.risk){	
							case('VERY LOW'): rischio='LOW';break;
							case('CRITICAL'): rischio='HIGH';break;	
							}


							var temp='\n                                <specs:NISTsecurityControl id="'+val.control+'" name="'+val.controlname+'" control_family="'+family+'" securityControl="'+code+'" control_enhancement="'+'">\n                                    <nist:description> '/*+val.description*/+'\n                                    </nist:description>\n                                    <nist:importance_weight>'+rischio+'</nist:importance_weight>\n                                </specs:NISTsecurityControl>';
							$scope.controlstring=$scope.controlstring+temp;
						}
						else{

							//gli altri controlli non associati ad un threat specifico
							if((val.tid==undefined)&&(val.component==valore.id)&&(i==0)){

								//devo fare la get per ricavare le info aggiuntive del controllo
								var family=val.control.charAt(0)+val.control.charAt(1);

								if(val.control.charAt(4)!='('){var cifra2=val.control.charAt(4);}else{var cifra2='';}
								var code=val.control.charAt(3)+cifra2;

								var rischio=v.risk;
								switch(v.risk){	
								case('VERY LOW'): rischio='LOW';break;
								case('CRITICAL'): rischio='HIGH';break;	
								}

								var temp2='\n                                <specs:NISTsecurityControl id="'+val.control+'" name="'+val.controlname+'" control_family="'+family+'" securityControl="'+code+'" control_enhancement="'+'">\n                                    <nist:description> '/*+val.description*/+'\n                                    </nist:description>\n                                    <nist:importance_weight>'+rischio+'</nist:importance_weight>\n                                </specs:NISTsecurityControl>';
								$scope.controlstring2=$scope.controlstring2+temp2;
							}

							$scope.controlstring=$scope.controlstring;
						}

					});i++; //mi serve per scaricarmi i controlli aggiuntivi solo una volta!

					$scope.threatsss=$scope.threatsss+'\n'+$scope.controlstring+'\n';
					$scope.controlstring=''; temp='';
				}
			});

			$scope.capability=$scope.threatsss+'                                <!-- Other Controls selected-->\n'+$scope.controlstring2+'\n\n                            </specs:controlFramework>\n                        </specs:capability>\n';
			$scope.threatsss='';$scope.controlstring2='';temp2='';


			//costruzione parte metriche
			$scope.SLA_metriche='                    <specs:security_metrics>\n';
			$scope.tempmet='';


			angular.forEach(Allmetrics,function(val,ch2){

				//verifico se la metrica è associata al componente		
				if(val.componenteid==valore.id){

					var start='\n\n						<specs:Metric name="'+val.metricname+'" referenceId="">\n							<specs:MetricDefinition>\n';
					var metric='';
					var param='';
					var SLO='';
					var robavuota='';

					//gestisco le 4 tipologie
					switch(true){

					case(val.value=='yes / no'): 	//fatto								
						metric='								<specs:unit name="'+val.unit+'">\n									<specs:enumUnit>\n										<specs:enumItemsType>string</specs:enumItemsType>\n										<specs:enumItems>\n											<specs:enumItem>\n												<specs:value>yes</specs:value>\n												<specs:description></specs:description>\n											</specs:enumItem>\n											<specs:enumItem>\n												<specs:value>no</specs:value>\n												<specs:description></specs:description>\n											</specs:enumItem>\n										</specs:enumItems>\n									</specs:enumUnit>\n								</specs:unit>\n								<specs:scale>\n									<specs:Qualitative>Nominal</specs:Qualitative>\n								</specs:scale>\n								<specs:expression></specs:expression>';
					robavuota='							<specs:AbstractMetricRuleDefinition>\n								<specs:RuleDefinition name="" referenceId="">\n									<specs:definition></specs:definition>\n									<specs:note></specs:note>\n								</specs:RuleDefinition>\n							</specs:AbstractMetricRuleDefinition>\n							<specs:AbstractMetricParameterDefinition>\n								<specs:ParameterDefinition name="" referenceId="">\n									<specs:definition></specs:definition>\n									<specs:parameterType></specs:parameterType>\n									<specs:note></specs:note>\n								</specs:ParameterDefinition>\n							</specs:AbstractMetricParameterDefinition>\n\n							<specs:MetricRules>\n								<specs:MetricRule>\n									<specs:ruleDefinitionId></specs:ruleDefinitionId>\n									<specs:value></specs:value>\n									<specs:note></specs:note>\n								</specs:MetricRule>\n							</specs:MetricRules>';
					param=robavuota+'\n							<specs:MetricParameters>\n								<specs:MetricParameter>\n									<specs:parameterDefinitionId></specs:parameterDefinitionId>\n									<specs:value>'+val.outputYES_NO+'</specs:value>\n									<specs:note></specs:note>\n								</specs:MetricParameter>\n							</specs:MetricParameters>\n';
					SLO='\n							<specs:SLO SLO_ID="'+$scope.j+'">\n						<specs:MetricREF>'+val.metricname+'</specs:MetricREF>\n						<specs:SLOexpression>\n							<specs:oneOpExpression operator="'+val.op+'" operand="'+val.outputYES_NO+'"/>\n						</specs:SLOexpression>\n						<specs:importance_weight>MEDIUM</specs:importance_weight>\n					</specs:SLO>\n';
					break;

					case((val.value=='integer')&&(val.unit=='%')):    //fatto
						metric='								<specs:unit name="'+val.unit+'">\n									<specs:intervalUnit>\n										<specs:intervalItemsType>'+val.value+'</specs:intervalItemsType>\n										<specs:intervalItemStart>0</specs:intervalItemStart>\n										<specs:intervalItemStop>100</specs:intervalItemStop>\n										<specs:intervalItemStep>1</specs:intervalItemStep>\n									</specs:intervalUnit>\n								</specs:unit>\n								<specs:scale>\n									<specs:Quantitative>Ratio</specs:Quantitative>\n								</specs:scale>\n								<specs:expression>'+val.formula+'</specs:expression>';
					robavuota='							<specs:AbstractMetricRuleDefinition>\n								<specs:RuleDefinition name="" referenceId="">\n									<specs:definition></specs:definition>\n									<specs:note></specs:note>\n								</specs:RuleDefinition>\n							</specs:AbstractMetricRuleDefinition>\n							<specs:AbstractMetricParameterDefinition>\n								<specs:ParameterDefinition name="N" referenceId="">\n									<specs:definition>'+val.input1+'</specs:definition>\n									<specs:parameterType></specs:parameterType>\n									<specs:note></specs:note>\n								</specs:ParameterDefinition>\n								<specs:ParameterDefinition name="T" referenceId="">\n									<specs:definition>'+val.input2+'</specs:definition>\n									<specs:parameterType>integer</specs:parameterType>\n									<specs:note></specs:note>\n								</specs:ParameterDefinition>\n							</specs:AbstractMetricParameterDefinition>\n\n							<specs:MetricRules>\n								<specs:MetricRule>\n									<specs:ruleDefinitionId></specs:ruleDefinitionId>\n									<specs:value></specs:value>\n									<specs:note></specs:note>\n								</specs:MetricRule>\n							</specs:MetricRules>';
					param=robavuota+'\n							<specs:MetricParameters>\n								<specs:MetricParameter>\n									<specs:parameterDefinitionId>Result</specs:parameterDefinitionId>\n									<specs:value>'+val.Percent+'</specs:value>\n									<specs:note>It is the percent parameter.</specs:note>\n								</specs:MetricParameter>\n							</specs:MetricParameters>\n							<specs:note></specs:note>\n';
					SLO='\n							<specs:SLO SLO_ID="'+$scope.j+'">\n						<specs:MetricREF>'+val.metricname+'</specs:MetricREF>\n						<specs:SLOexpression>\n							<specs:oneOpExpression operator="'+val.op+'" operand="'+val.Percent+'"/>\n						</specs:SLOexpression>\n						<specs:importance_weight>MEDIUM</specs:importance_weight>\n					</specs:SLO>\n';
					break;

					case((val.value=='integer')&&(val.unit=='number')): //fatto
						metric='								<specs:unit name="'+val.unit+'">\n									<specs:intervalUnit>\n										<specs:intervalItemsType>'+val.value+'</specs:intervalItemsType>\n										<specs:intervalItemStart>'+val.min+'</specs:intervalItemStart>\n										<specs:intervalItemStop>'+val.max+'</specs:intervalItemStop>\n										<specs:intervalItemStep>1</specs:intervalItemStep>\n									</specs:intervalUnit>\n								</specs:unit>\n								<specs:scale>\n									<specs:Quantitative>Ratio</specs:Quantitative>\n								</specs:scale>\n								<specs:expression> </specs:expression>';
					robavuota='							<specs:AbstractMetricRuleDefinition>\n								<specs:RuleDefinition name="" referenceId="">\n									<specs:definition></specs:definition>\n									<specs:note></specs:note>\n								</specs:RuleDefinition>\n							</specs:AbstractMetricRuleDefinition>\n							<specs:AbstractMetricParameterDefinition>\n								<specs:ParameterDefinition name="" referenceId="">\n									<specs:definition></specs:definition>\n									<specs:parameterType></specs:parameterType>\n									<specs:note></specs:note>\n								</specs:ParameterDefinition>\n							</specs:AbstractMetricParameterDefinition>\n\n							<specs:MetricRules>\n								<specs:MetricRule>\n									<specs:ruleDefinitionId></specs:ruleDefinitionId>\n									<specs:value></specs:value>\n									<specs:note></specs:note>\n								</specs:MetricRule>\n							</specs:MetricRules>';
					param=robavuota+'\n							<specs:MetricParameters>\n								<specs:MetricParameter>\n									<specs:parameterDefinitionId></specs:parameterDefinitionId>\n									<specs:value>'+val.N+'</specs:value>\n									<specs:note></specs:note>\n								</specs:MetricParameter>\n							</specs:MetricParameters>\n							<specs:note></specs:note>\n';
					SLO='\n							<specs:SLO SLO_ID="'+$scope.j+'">\n						<specs:MetricREF>'+val.metricname+'</specs:MetricREF>\n						<specs:SLOexpression>\n							<specs:oneOpExpression operator="'+val.op+'" operand="'+val.N+'"/>\n						</specs:SLOexpression>\n						<specs:importance_weight>MEDIUM</specs:importance_weight>\n					</specs:SLO>\n';
					break;

					case((val.value=='integer')&&(val.unit=='levels')): 	//fatto		
						metric='								<specs:unit name="level">\n									<specs:intervalUnit>\n										<specs:intervalItemsType>'+val.value+'</specs:intervalItemsType>\n										<specs:intervalItemStart>'+val.min+'</specs:intervalItemStart>\n										<specs:intervalItemStop>'+val.max+'</specs:intervalItemStop>\n										<specs:intervalItemStep>1</specs:intervalItemStep>\n									</specs:intervalUnit>\n								</specs:unit>\n								<specs:scale>\n									<specs:Quantitative>Ratio</specs:Quantitative>\n								</specs:scale>\n								<specs:expression> </specs:expression>';
					robavuota='							<specs:AbstractMetricRuleDefinition>\n								<specs:RuleDefinition name="" referenceId="">\n									<specs:definition></specs:definition>\n									<specs:note></specs:note>\n								</specs:RuleDefinition>\n							</specs:AbstractMetricRuleDefinition>\n							<specs:AbstractMetricParameterDefinition>\n								<specs:ParameterDefinition name="Level" referenceId="">\n									<specs:definition>This integer indicates the chosen level.</specs:definition>\n									<specs:parameterType></specs:parameterType>\n									<specs:note></specs:note>\n								</specs:ParameterDefinition>\n							</specs:AbstractMetricParameterDefinition>\n\n							<specs:MetricRules>\n								<specs:MetricRule>\n									<specs:ruleDefinitionId></specs:ruleDefinitionId>\n									<specs:value></specs:value>\n									<specs:note></specs:note>\n								</specs:MetricRule>\n							</specs:MetricRules>';
					param=robavuota+'\n							<specs:MetricParameters>\n								<specs:MetricParameter>\n									<specs:parameterDefinitionId></specs:parameterDefinitionId>\n									<specs:value>'+val.N+'</specs:value>\n									<specs:note></specs:note>\n								</specs:MetricParameter>\n							</specs:MetricParameters>\n							<specs:note></specs:note>\n';
					SLO='\n							<specs:SLO SLO_ID="'+$scope.j+'">\n						<specs:MetricREF>'+val.metricname+'</specs:MetricREF>\n						<specs:SLOexpression>\n							<specs:oneOpExpression operator="'+val.op+'" operand="'+val.N+'"/>\n						</specs:SLOexpression>\n						<specs:importance_weight>MEDIUM</specs:importance_weight>\n					</specs:SLO>\n';
					break;
					}

					var end=start+metric+'\n								<specs:definition>'+val.metricdescr+'</specs:definition>\n								<specs:note></specs:note>\n							</specs:MetricDefinition>\n'+param+'						</specs:Metric>\n\n';
					$scope.tempmet=$scope.tempmet+end;
					$scope.SLO=$scope.SLO+SLO;
					$scope.j++;
				}//fine if interno
			});//fine loop tutte le metriche



			$scope.SLA_metriche=$scope.SLA_metriche+$scope.tempmet+'\n					</specs:security_metrics>';

			$scope.musa='                <MUSA:Components>\n                    <MUSA:Component name="'+valore.name+'" type="'+valore.type+'">\n                        <MUSA:ComponentProperty name="'+valore.name+'"/>\n                        <MUSA:Description>'+valore.description+'</MUSA:Description>\n';
			$scope.musaThreatPRE='                        <MUSA:Threats>\n';
			$scope.musaThreatPOST='                            </MUSA:Threats>\n                    </MUSA:Component>\n                </MUSA:Components>\n';

			//risultato finale
			$scope.capabilities='\n'+$scope.musa+''+$scope.musaThreatPRE+$scope.musaThreat+$scope.musaThreatPOST+'\n                    <specs:capabilities>\n'+$scope.stringcapability+$scope.capability+'                    </specs:capabilities>\n\n'+$scope.SLA_metriche+'\n';


			$scope.capabilities=$scope.capabilities+$scope.inizioGaranteeTerm+$scope.SLO+'						</specs:objectiveList>\n					</wsag:CustomServiceLevel>\n				</wsag:ServiceLevelObjective>\n				<wsag:BusinessValueList></wsag:BusinessValueList>\n			</wsag:GuaranteeTerm>';


			$scope.SLAs.push({	'component'	:valore.name,
				'sla'		:$scope.capabilities,
				'comptype'	:valore.type,
			});





		});//fine loop componente



		//salvo gli SLA nel localstorage
		localStorage.setItem("SLA", JSON.stringify($scope.SLAs));


		console.log('SLA costruito e salvato nel localstorage');
		$scope.nextbutton=true;
		$cookieStore.put('nextmetrics2',$scope.nextbutton);


	}


	$scope.getnumberofmetrics=function(cat,component){
		var i=0;
		angular.forEach($scope.altremetriche,function(val,ch){
			if((val.componenteid==component)&&(val.stride==cat)){i++;}
		});
		return i;
	}



})//fine controller metriche2




.controller('OverviewCtrl', function ($scope, $http, $cookieStore, $filter, $location, $timeout, $parse,$window) {

	//prelevo dati cookie; 
	$scope.user_name=		$cookieStore.get('name');
	$scope.user_surname=	$cookieStore.get('surname');
	$scope.user_id=			$cookieStore.get('id_utente');
	$scope.controlselected=	$cookieStore.get('controls');

	$scope.selection=		JSON.parse(localStorage.getItem('selection'));
	$scope.controlselection=JSON.parse(localStorage.getItem('controlselection'));

	//recupero lo SLA
	$scope.capabilities=JSON.parse(localStorage.getItem('SLA'));


	/*    //prelevo i componenti dell'utente
	$scope.ListComponentFromDB = [];
	$http.get(urlBase+"/rest/components/"+$scope.user_id).
		success(function(data) {
			$scope.ListComponentFromDB = data;
			console.log('componenti utente prelevati');		
	});*/

	$scope.stringa_template_pre='<?xml version="1.0" encoding="UTF-8"?>\n<wsag:AgreementOffer \n    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" \n    xmlns:wsag="http://schemas.ggf.org/graap/2007/03/ws-agreement" \n    xmlns:specs="http://www.specs-project.eu/resources/schemas/xml/SLAtemplate" \n    xmlns:nist="http://www.specs-project.eu/resources/schemas/xml/control_frameworks/nist"\n\n    xsi:schemaLocation=\n    "http://schemas.ggf.org/graap/2007/03/ws-agreement wsag.xsd\n    http://www.specs-project.eu/resources/schemas/xml/SLAtemplate SLAtemplate.xsd\n    http://www.specs-project.eu/resources/schemas/xml/control_frameworks/nist nist.xsd">\n\n\n    <wsag:Name>MUSA_SLA_TEMPLATE</wsag:Name>\n    <wsag:Context>\n        <wsag:AgreementInitiator>$SPECS-CUSTOMER</wsag:AgreementInitiator>\n        <wsag:AgreementResponder>$SPECS-APPLICATION</wsag:AgreementResponder>\n        <wsag:ServiceProvider>AgreementResponder</wsag:ServiceProvider>\n        <wsag:ExpirationTime>2014-02-02T06:00:00</wsag:ExpirationTime>\n        <wsag:TemplateName>SPECS_TEMPLATE_v1</wsag:TemplateName>\n    </wsag:Context>\n\n    <wsag:Terms>\n        <wsag:All>\n            <wsag:ServiceDescriptionTerm wsag:Name="';
	$scope.stringa_template_pre2='" wsag:ServiceName="';
	$scope.stringa_template_pre3='">\n                <specs:serviceDescription>';
	$scope.stringa_template_post='\n		</wsag:All>\n	</wsag:Terms>\n</wsag:AgreementOffer>';


	$scope.submitSLA=function(){
		//niente al momento
	}


	//per nascondere gli sla
	$scope.toggleTable=function(component){
		if (document.getElementById(component).style.display == "block") {
			document.getElementById(component).style.display="none";
		} else {
			document.getElementById(component).style.display="block";
		}
	}


	$scope.downloadSLA=function(sla){

		var data=$scope.stringa_template_pre+sla.component+$scope.stringa_template_pre2+sla.comptype+$scope.stringa_template_pre3+sla.sla+$scope.stringa_template_post;
		blob = new Blob([data], { type: 'text/plain' }),
		url = $window.URL || $window.webkitURL;                                
		$scope.fileUrl = url.createObjectURL(blob);


	}





});//fine controller



