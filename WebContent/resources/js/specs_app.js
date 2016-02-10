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


	
	var _slaID;
	var _slaTEMPLATE;
	var _slaOFFER;
	
	function getSlaTemplate(template) {
		var json = JSON.parse(ajaxCall(
				'services/rest/slaTemplate', 'GET', '', null,false));
		_slaID = json.id;
		_slaTEMPLATE = json.xml;
	}
	
	
	function submitSLA() {
		var json = new Object();
		json.id = _slaID;
		json.xml = _slaOFFER;
		ajaxCall('services/rest/submit', 'POST', JSON
				.stringify(json), 'application/json',false);
	}
	
	function signSLA(id) {
		var json = new Object();
		json.id = id;
		json.xml = null;
		ajaxCall('services/rest/sign', 'POST', JSON
				.stringify(json), 'application/json',false);
	}
	
	function getDateFromLong(date){
		var d = new Date(date);
		var myDate = d.getDate() + '/' + (d.getMonth()+1) + '/' + d.getFullYear()+" - "+ d.getHours()+":"+d.getMinutes()+":"+d.getSeconds();
		return myDate;
	}
	
	function implementSLA(id) {
		 
		ajaxCall('services/rest/implement', 'POST', id, 'text/plain',true);
	}

	
	function slaInfo(id) {
		return ajaxCall('services/rest/implementedInfo', 'POST', id, 'text/plain',false);
	}
	
/*************************/
	function ajaxCall(url, method, body, contenttype,asynch) {
	
		var xmlhttp;
	
		if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
			xmlhttp = new XMLHttpRequest();
		} else {// code for IE6, IE5
			xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		}
	
		/* 		xmlhttp.onreadystatechange = function() {
						 if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
						 document.getElementById("result").innerHTML = xmlhttp.responseText;
						 }
						 } */
		/***************************************************************************/
		xmlhttp.open(method, url, asynch);
	
		if (contenttype != null)
			xmlhttp.setRequestHeader("Content-type", contenttype);
	
		xmlhttp.send(body);
		return xmlhttp.responseText;
	}
	
	
	/**********************************/
	function parseXML(string) {

		if (window.DOMParser) {
			parser = new DOMParser();
			return xmlDoc = parser.parseFromString(string, "text/xml");

		} else {// Internet Explorer

			xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
			xmlDoc.async = false;
			return xmlDoc.loadXML(string);
		}
	}
