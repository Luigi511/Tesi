package server;

public class AssociationControl {
	private String controllo;
	private int componente;
	
	public AssociationControl(String c, int u){
		this.controllo=c;
		this.componente=u;
	}
	
	public String getcontrol(){return controllo;}
	public int getcomponente(){return componente;}

}
