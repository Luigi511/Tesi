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

public class Controls {
	
	private String idControl;
	private String controlName;
	private String familyId;
	private String familyName;
	private int control;
	private int enhancement;
	private String controlDescription;
	
	private String controlid;
	private int id;
	private String StrideCat;
	
	
	public void setIDCONTROL(String idc){this.idControl=idc;}
	public void setcontrolname(String cn){this.controlName=cn;}
	public void setfamilyID(String fid){this.familyId=fid;}
	public void setfamilyName(String fn){this.familyName=fn;}
	public void setcontrolDescr(String cd){this.controlDescription=cd;}
	public void setcontrol(int c){this.control=c;}
	public void setenh(int en){this.enhancement=en;}
	
	public void setControlID(String ci){this.controlid=ci;}
	public void setid(int i){this.id=i;}
	public void setStrideCat(String ca){this.StrideCat=ca;}
	
	public String getIDCONTROL(){return idControl;}
	public String getcontrolName(){return controlName;}
	public String getfamilyID(){return familyId;}
	public String getfamilyName(){return familyName;}
	public String getDesc(){return controlDescription;}
	public int getcontrol(){return control;}
	public int getenhancement(){return enhancement;}

	public String getControlID(){return controlid;}
	public int getid(){return id;}
	public String getStrideCat(){return StrideCat;}



}
