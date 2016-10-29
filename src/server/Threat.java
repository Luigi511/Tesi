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
	
	private Integer skill_level;
	private Integer motive;
	private Integer opportunity;
	private Integer size;
	private Integer ease_of_discovery;
	private Integer ease_of_exploit;
	private Integer awareness;
	private Integer intrusion_detection;
	private Integer loss_of_confidentiality;
	private Integer loss_of_integrity;
	private Integer loss_of_availability;
	private Integer loss_of_accountability;

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
	
	public Integer getSkill_level() {
		return skill_level;
	}
	public void setSkill_level(Integer skill_level) {
		this.skill_level = skill_level;
	}
	public Integer getMotive() {
		return motive;
	}
	public void setMotive(Integer motive) {
		this.motive = motive;
	}
	public Integer getOpportunity() {
		return opportunity;
	}
	public void setOpportunity(Integer opportunity) {
		this.opportunity = opportunity;
	}
	public Integer getSize() {
		return size;
	}
	public void setSize(Integer size) {
		this.size = size;
	}
	public Integer getEase_of_discovery() {
		return ease_of_discovery;
	}
	public void setEase_of_discovery(Integer ease_of_discovery) {
		this.ease_of_discovery = ease_of_discovery;
	}
	public Integer getEase_of_exploit() {
		return ease_of_exploit;
	}
	public void setEase_of_exploit(Integer ease_of_exploit) {
		this.ease_of_exploit = ease_of_exploit;
	}
	public Integer getAwareness() {
		return awareness;
	}
	public void setAwareness(Integer awareness) {
		this.awareness = awareness;
	}
	public Integer getIntrusion_detection() {
		return intrusion_detection;
	}
	public void setIntrusion_detection(Integer intrusion_detection) {
		this.intrusion_detection = intrusion_detection;
	}
	public Integer getLoss_of_confidentiality() {
		return loss_of_confidentiality;
	}
	public void setLoss_of_confidentiality(Integer loss_of_confidentiality) {
		this.loss_of_confidentiality = loss_of_confidentiality;
	}
	public Integer getLoss_of_integrity() {
		return loss_of_integrity;
	}
	public void setLoss_of_integrity(Integer loss_of_integrity) {
		this.loss_of_integrity = loss_of_integrity;
	}
	public Integer getLoss_of_availability() {
		return loss_of_availability;
	}
	public void setLoss_of_availability(Integer loss_of_availability) {
		this.loss_of_availability = loss_of_availability;
	}
	public Integer getLoss_of_accountability() {
		return loss_of_accountability;
	}
	public void setLoss_of_accountability(Integer loss_of_accountability) {
		this.loss_of_accountability = loss_of_accountability;
	}
	
}
