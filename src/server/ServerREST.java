package server;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileNotFoundException;
import java.text.ParseException;
import java.util.List;

import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.FormParam;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javassist.bytecode.Descriptor.Iterator;
import server.Componentservice;
import server.Component;
import java.io.IOException;
import java.util.Calendar;


import javax.servlet.http.HttpServletResponse;
 
import org.springframework.stereotype.Controller;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.util.FileCopyUtils;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.List;
import java.util.Map;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.MultivaluedMap;
import javax.ws.rs.core.Response;

import org.jboss.resteasy.plugins.providers.multipart.InputPart;
import org.jboss.resteasy.plugins.providers.multipart.MultipartFormDataInput;


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
	  //return taskmanagerservice.getAllTasks(); void secondo me perchè gli passo i dati e non deve tornare niente!
	  }
	  
	  
	  //API componenti associati all'utente
	  @RequestMapping(value="/components/{id}",method = RequestMethod.GET,headers="Accept=application/json")
	  public List<Component> getComponents(@PathVariable int id) throws ParseException { 
		  List<Component> cp=service.getAllComponents(id);
		  return cp;
	  }
	  
	  //API tutti i threats
	  @RequestMapping(value="/threats",method = RequestMethod.GET,headers="Accept=application/json")
	  public List<Threat> getThreats() throws ParseException { 
		  List<Threat> cp=service.getAllThreats();
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
	  
	  
	  
	  
	  
/*	  //prova
	  @RequestMapping(value="/hello/{Name}/{Desc}")
	  public void hello(@PathVariable String Name,@PathVariable String Desc) throws ParseException{
		  System.out.println("hello");
		  Component cp = new Component();
		  cp.setName(Name);
		  cp.setDescription(Desc);
		  service.addComponent(cp);
	  }*/
	  
 
 //API RICHIESTA ELENCO COMPONENTI
/*  @RequestMapping(value="/tasks",method = RequestMethod.GET,headers="Accept=application/json")
  public List<task> getAllTasks() {  
   List<task> tasks=taskmanagerservice.getAllTasks();
   return tasks;
  }*/
 

 
 
/*  @RequestMapping(value="/tasks/{taskId}/{taskStatus}",method = RequestMethod.POST,headers="Accept=application/json")
  public List<task> changeTaskStatus(@PathVariable int taskId,@PathVariable String taskStatus) throws ParseException { 
   taskmanagerservice.changeTaskStatus(taskId,taskStatus);   
   return taskmanagerservice.getAllTasks();
  }*/
 
 
         
}