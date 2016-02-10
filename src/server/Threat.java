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

public class Threat {
	private String threatname;
	private String threatdescription;
	private String threatcat;
	private int idthreats;
	private String stride;
	private String question;
	private String source;
	private String answer;
	
	public void setname(String n){this.threatname=n;}
	public void setdescr(String d){this.threatdescription=d;}
	public void setid(int a){this.idthreats=a;}
	public void setCat(String c){this.threatcat=c;}
	public void setSTRIDE(String string) {this.stride=string;}
	public void setquestion(String q){this.question=q;}
	public void setsource(String ss){this.source=ss;}
	public void setanswer(String ans){this.answer=ans;}
	
	
	public String getname(){return threatname;}
	public String getdescr(){return threatdescription;}
	public String getcat(){return threatcat;}
	public int getIdThreat(){return idthreats;}
	public String getSTRIDE(){return stride;}
	public String getquestion(){return question;}
	public String getsource(){return source;}
	public String getanswer(){return answer;}


}
