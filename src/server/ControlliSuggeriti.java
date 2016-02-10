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

public class ControlliSuggeriti {
	
	private int id; //id dell'associazione
	private String control;
	private String controlname;
	private String controldesc;
	private int minrisk;
	private int threatid;
	
	private String threatname;
	private String threatdescription;
	private String stride;
	

	public void setID(int i){this.id=i;}
	public void setControl(String c){this.control=c;}
	public void setControlName(String cn){this.controlname=cn;}
	public void setControldesc(String cd){this.controldesc=cd;}
	public void setThreatname(String t){this.threatname=t;}
	public void setThreatDesc(String d){this.threatdescription=d;}
	public void setStride(String s){this.stride=s;}
	public void setMinrisk(int ni){this.minrisk=ni;}
	public void setThreatID(int idt){this.threatid=idt;}
	
	
	public String getControl(){return control;}
	public String getControlname(){return controlname;}
	public String getControldesc(){return controldesc;}
	public int 	getid(){return id;}
	public String getthreatname(){return threatname;}
	public String getthreatdesc(){return threatdescription;}
	public String getStride(){return stride;}
	public int getminrisk(){return minrisk;}
	public int gethreatid(){return threatid;}

}
