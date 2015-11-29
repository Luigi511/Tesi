package server;

public class Threat {
	private String threatname;
	private String threatdescription;
	private String threatcat;
	private int idthreats;
	private String stride;
	
	public void setname(String n){this.threatname=n;}
	public void setdescr(String d){this.threatdescription=d;}
	public void setid(int a){this.idthreats=a;}
	public void setCat(String c){this.threatcat=c;}
	public void setSTRIDE(String string) {this.stride=string;}
	
	
	public String getname(){return threatname;}
	public String getdescr(){return threatdescription;}
	public String getcat(){return threatcat;}
	public int getIdThreat(){return idthreats;}
	public String getSTRIDE(){return stride;}


}
