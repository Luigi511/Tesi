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



package server;

import java.text.ParseException;
import java.util.List;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import utility.PropertiesManager;


@RestController
public class ServerREST {

	Componentservice service=new Componentservice();


	//API aggiungi componente
	@RequestMapping(value="/components/{Name}/{Desc}/{id}/{type}",method = RequestMethod.POST,headers="Accept=application/json")
	public void addComponent(@PathVariable String Name,@PathVariable String Desc, @PathVariable int id, @PathVariable String type) throws ParseException { 
		Component cp = new Component();
		cp.setName(Name);
		cp.setDescription(Desc);
		cp.setIDUser(id);
		cp.setType(type);
		service.addComponent(cp);
		//return taskmanagerservice.getAllTasks(); void secondo me perch� gli passo i dati e non deve tornare niente!
	}


	//API componenti associati all'utente
	@RequestMapping(value="/components/{id}",method = RequestMethod.GET,headers="Accept=application/json")
	public List<Component> getComponents(@PathVariable int id) throws ParseException { 
		List<Component> cp=service.getAllComponents(id);
		return cp;
	}

	//API id componente dell'utente
	@RequestMapping(value="/compid/{name}/{id}",method = RequestMethod.GET,headers="Accept=application/json")
	public int getComponentID(@PathVariable String name, @PathVariable int id) throws ParseException { 
		int i=service.getComponentID(name,id);
		return i;
	}

	//API tutti i threats
	@RequestMapping(value="/threats",method = RequestMethod.GET,headers="Accept=application/json")
	public List<Threat> getThreats() throws ParseException { 
		List<Threat> cp=service.getAllThreats();
		return cp;
	}

	//API tutti i threats per categoria componente
	@RequestMapping(value="/threats/{cat}",method = RequestMethod.GET,headers="Accept=application/json")
	public List<Threat> getThreatsxCAT(@PathVariable String cat) throws ParseException { 
		List<Threat> cp=service.getThreatsxCAT(cat);
		return cp;
	}

	//API aggiungi associazione componente-threat
	@RequestMapping(value="/assoc/{Component}/{Threat}",method = RequestMethod.POST,headers="Accept=application/json")
	public void addAssociation(@PathVariable int Component,@PathVariable int Threat) throws ParseException { 
		Association a = new Association();
		a.setcomponent(Component);
		a.setthreat(Threat);
		service.addAssociation(a);
	}
	/*	  
	  //API trova associazione componente-threat
	  @RequestMapping(value="/assoc/{Component}/{Threat}",method = RequestMethod.GET,headers="Accept=application/json")
	  public boolean getAssociation(@PathVariable int Component,@PathVariable int Threat) throws ParseException { 
	  boolean trovato=service.FindAssociation(Component,Threat);
	  return trovato;
	  }*/

	//API rimuovi associazione componente-threat
	@RequestMapping(value="/delassoc/{Component}",method = RequestMethod.POST,headers="Accept=application/json")
	public void delAssociation(@PathVariable int Component) throws ParseException { 
		service.DelAssociation(Component);
	}





	//API aggiungi utente
	@RequestMapping(value="/user/{Name}/{Surname}",method = RequestMethod.POST,headers="Accept=application/json")
	public void addUser(@PathVariable String Name,@PathVariable String Surname) throws ParseException { 
		User u = new User();
		u.setnome(Name);
		u.setcognome(Surname);
		service.addUser(u);
	}

	//API recuperare id utente dati nome e cognome
	@RequestMapping(value="/user/{Name}/{Surname}",method = RequestMethod.GET,headers="Accept=application/json")
	public int getUserId(@PathVariable String Name,@PathVariable String Surname) throws ParseException { 
		int id =service.getUserID(Name,Surname);
		return id;
	}

	//API get all users
	@RequestMapping(value="/users",method = RequestMethod.GET,headers="Accept=application/json")
	public List<User> getUsers() throws ParseException { 
		return service.getUsers();
	}

	//API get all user sessions
	@RequestMapping(value="/users/{name}/{surname}/sessions",method = RequestMethod.GET,headers="Accept=application/json")
	public List<Integer> getUserSessions(@PathVariable String name,@PathVariable String surname) throws ParseException { 
		return service.getUserSessions(name, surname);
	}



	//API POST foto: 
	@RequestMapping(value = "/upload/{id_user}", method = RequestMethod.POST)
	public void handleFileUpload(
			@RequestParam(value="file", required=true) MultipartFile file, @PathVariable int id_user ) {
		try {
			System.out.println("ricevuto file, adesso lo invio al db");
			Photo p = new Photo(file.getBytes());
			service.addPhoto(p,id_user);
		} catch (RuntimeException e) {
			//LOG.error("Error while uploading.", e);
			throw e;
		} catch (Exception e) {
			//LOG.error("Error while uploading.", e);
			throw new RuntimeException(e);
		}      
	}

	//api GET FOTO by ID
	@RequestMapping(value = "/upload/{id_user}", method = RequestMethod.GET)
	public byte[] getPhoto(@PathVariable int id_user ){

		byte[] f = service.getPhotoByID(id_user);
		//MultipartFile file=new BASE64DecodedMultipartFile(f);

		return f;
	}



	//API elimina componente
	@RequestMapping(value="/delete/{id}",method = RequestMethod.POST,headers="Accept=application/json")
	public void deleteComponent(@PathVariable int id) throws ParseException { 
		service.deleteComponent(id);
	}


	//API RICHIESTA ELENCO CATEGORIE DI THREATS
	@RequestMapping(value="/categories",method = RequestMethod.GET,headers="Accept=application/json")
	public List<String> getAllCat() {  
		List<String> cat=service.getAllCat();
		return cat;
	}


	//API tutti i threats
	@RequestMapping(value="/controls",method = RequestMethod.GET,headers="Accept=application/json")
	public List<Controls> getControls() throws ParseException { 
		List<Controls> ctr=service.getAllControls();
		return ctr;
	}




	//API aggiungi associazione controllo-componente
	@RequestMapping(value="/assocControl/{Control}/{comp}",method = RequestMethod.POST,headers="Accept=application/json")
	public void addAssociationControl(@PathVariable String Control,@PathVariable int comp) throws ParseException { 
		AssociationControl a = new AssociationControl(Control,comp);

		service.addAssociationControl(a);
	}

	//API rimuovi associazione controlli-componente
	@RequestMapping(value="/delassocControl/{comp}",method = RequestMethod.POST,headers="Accept=application/json")
	public void delAssociationControl(@PathVariable int comp) throws ParseException { 
		service.DelAssociationControl(comp);
	}




	//API tutti i controlli suggeriti
	@RequestMapping(value="/controllisuggeriti",method = RequestMethod.GET,headers="Accept=application/json")
	public List<ControlliSuggeriti> getControlsSug() throws ParseException { 
		List<ControlliSuggeriti> cs=service.getControlsSugg();
		return cs;
	}


	//API dammi gli schemi implementativi
	@RequestMapping(value="/foto",method = RequestMethod.GET,headers="Accept=application/json")
	public List<Photo> getallfoto() throws ParseException {
		List <Photo> p1=service.getallfoto();
		return p1;
	}



	//API tutte le metriche del comp
	@RequestMapping(value="/metrics/{id}",method = RequestMethod.GET,headers="Accept=application/json")
	public List<Metric> getMetrics(@PathVariable int id) throws ParseException { 

		List<Metric> m=service.getAllMetrics(id);
		return m;
	}

	//API tutte le metriche del comp
	@RequestMapping(value="/altremetrice/{threat}",method = RequestMethod.GET,headers="Accept=application/json")
	public List<Metric> getOtherMetrics(@PathVariable String threat) throws ParseException { 

		List<Metric> ml=service.getOtherMetrics(threat);
		return ml;
	}

	//API tutti gli id dei controlli per metrica
	@RequestMapping(value="/metricControls/{metrica}/{comp}",method = RequestMethod.GET,headers="Accept=application/json")
	public List<String> getmetricControls(@PathVariable String metrica,@PathVariable int comp) throws ParseException { 

		List<String> mc=service.getmetricControls(comp,metrica);
		return mc;
	}

	//API POST sla: 
	@RequestMapping(value = "/upload/sla", method = RequestMethod.POST)
	public ResponseEntity<?> putSla(
			@RequestParam(value = "body") String sla) {

		String slaPulito =sla;

		RestTemplate restPutSla = new RestTemplate();

		String slaManager = PropertiesManager.getProperty("sla_manager.basepath");

		String urlToUpdateSla = slaManager
				+ "/sla-manager/cloud-sla/slas";

		HttpHeaders headersPutSla = new HttpHeaders();
		headersPutSla.setContentType(MediaType.TEXT_XML);
		HttpEntity entityPuSla = new HttpEntity(slaPulito, headersPutSla);
		return restPutSla.exchange(urlToUpdateSla, HttpMethod.POST, entityPuSla,
				String.class);


	}


}