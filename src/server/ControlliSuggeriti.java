package server;

public class ControlliSuggeriti {
	
	private int id; //id dell'associazione
	private String control;
	private String controlname;
	private String controldesc;
	
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
	
	
	public String getControl(){return control;}
	public String getControlname(){return controlname;}
	public String getControldesc(){return controldesc;}
	public int 	getid(){return id;}
	public String getthreatname(){return threatname;}
	public String getthreatdesc(){return threatdescription;}
	public String getStride(){return stride;}

}
