package server;

public class User {
	
	private String nome;
	private String cognome;
	private int id;

	
	public String getname(){return nome;}
	public String getcognome(){return cognome;}
	public int getid(){return id;}
	
	public void setnome(String n){this.nome=n;}
	public void setcognome(String c){this.cognome=c;}

}
