package server;

import java.awt.Image;
import java.io.File;

public class Component {
	
	  private int idcomponents; //per me non serve perchè autoaggiornante
	  private String name;
	  private String description;
	  private int id_utente;
	  private String componentcat;

	  
	  
	  public int getId() {
	   return idcomponents;
	  }
	  public void setId(int n) {
	   this.idcomponents = n;
	  }
	  public String getName() {
	   return name;
	  }
	  public void setName(String nome) {
	   this.name = nome;
	  }
	  public String getDescription() {
	   return description;
	  }
	  public void setDescription(String descr) {
	   this.description = descr;
	  }
	  
	  public void setIDUser(int i){this.id_utente=i;}
	  public int getIDUser(){return id_utente;}

	  
	/*  @Override
	  public String toString() {
	   return "Component [id=" + component_id + ", name=" + component_name
	     + ", description=" + component_description + "]";
	  }*/
	  
	  public void setType(String type) {
		this.componentcat=type;	}
	
	  public String getType(){return componentcat;}
	
	}