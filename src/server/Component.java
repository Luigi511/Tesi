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