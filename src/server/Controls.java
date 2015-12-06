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
