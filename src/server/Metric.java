package server;

public class Metric {
	
	private int idmetrics;
	private String metricname;
	private String metricdescr;
	private String formula;
	private String input1;
	private String input2;
	private String value;
	private String unit;
	private String defaultt;
	private String min;
	private String max;
	private String operator;
	private String nistcontrol;
	private String componente_id;
	private String threatname;
	private String STRIDE;
	
	public void setid(int m){this.idmetrics=m;}
	public void setname(String n){this.metricname=n;}
	public void setdes(String d){this.metricdescr=d;}
	public void setformula(String f){this.formula=f;}
	public void setinput1(String i1){this.input1=i1;}
	public void setinput2(String i2){this.input2=i2;}
	public void setvalue(String v){this.value=v;}
	public void setunit(String u){this.unit=u;}
	public void setdefault(String df){this.defaultt=df;}
	public void setmin(String mi){this.min=mi;}
	public void setmax(String ma){this.max=ma;}
	public void setope(String op){this.operator=op;}
	public void setnist(String ni){this.nistcontrol=ni;}
	public void setcomponenteid(String cid){this.componente_id=cid;}
	public void setThreatname(String tn){this.threatname=tn;}
	public void setSTRIDE(String st){this.STRIDE=st;}
	
	
	public int getid(){return idmetrics;}
	public String getmetricname(){return metricname;}
	public String getmetricdescr(){return metricdescr;}
	public String getformula(){return formula;}
	public String getinput1(){return input1;}
	public String getinput2(){return input2;}
	public String getvalue(){return value;}
	public String getunit(){return unit;}
	public String getdef(){return defaultt;}
	public String getmin(){return min;}
	public String getmax(){return max;}
	public String getop(){return operator;}
	public String getnist(){return nistcontrol;}
	public String getcomponenteid(){return componente_id;}
	public String getThreatname(){return threatname;}
	public String getSTRIDE(){return STRIDE;}
	

}
