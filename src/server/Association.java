package server;

public class Association {
	
	private int id;
	private int comp;
	private int tr;

	public void setcomponent(int component) {
		this.comp=component;
	}
	public int getcomponent(){return comp;}

	public void setthreat(int threat) {
		this.tr=threat;		
	}
	public int getthreat(){return tr;}


}
