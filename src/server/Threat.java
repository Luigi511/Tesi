package server;

public class Threat {
	private String threatname;
	private String threatdescription;
	private String threatcat;
	private int idthreats;
	private String stride;
	private String question;
	private String source;
	
	public void setname(String n){this.threatname=n;}
	public void setdescr(String d){this.threatdescription=d;}
	public void setid(int a){this.idthreats=a;}
	public void setCat(String c){this.threatcat=c;}
	public void setSTRIDE(String string) {this.stride=string;}
	public void setquestion(String q){this.question=q;}
	public void setsource(String ss){this.source=ss;}
	
	
	public String getname(){return threatname;}
	public String getdescr(){return threatdescription;}
	public String getcat(){return threatcat;}
	public int getIdThreat(){return idthreats;}
	public String getSTRIDE(){return stride;}
	public String getquestion(){return question;}
	public String getsource(){return source;}


}
