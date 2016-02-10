package server;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.sql.Blob;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import server.*;

public class Componentservice {
	
 private Connection connection;
private int id;
 
 public Componentservice() {
  connection = DBUtility.getConnection();
 }
 
 
 public void addComponent(Component comp) {
    
  try {
   PreparedStatement preparedStatement = connection.prepareStatement("INSERT INTO components(name,description,id_utente,componentcat) VALUES (?,?,?,?)");
   System.out.println("Component:"+comp.getName()+", "+comp.getDescription());
   //conversione dei dati nei tipi definiti da mysql
   preparedStatement.setString(1, comp.getName());
   preparedStatement.setString(2, comp.getDescription());
   preparedStatement.setInt(3, comp.getIDUser());
   preparedStatement.setString(4, comp.getType());
   
   preparedStatement.executeUpdate();
   System.out.println("ho inviato il comando di inserimento comp a mysql");

  } catch (SQLException e) {
   e.printStackTrace();
  }
 }
 
 
 
 
 public void addPhoto(Photo p, int i) {
		  
	 try {
		 PreparedStatement preparedStatement = connection.prepareStatement("UPDATE users SET image=? WHERE idusers=?");
		 //il byte array viene salvato in mysql come LONGVARBINARY (BLOB)

		 preparedStatement.setBytes(1, p.getPhoto());
		 preparedStatement.setInt(2, i);
		 preparedStatement.executeUpdate();
		 System.out.println("ho inviato il comando di inserimento foto a mysql; foto="+p.getPhoto());
	  } catch (SQLException e) {
	  	e.printStackTrace();
	  }
 }


public void deleteComponent(int id) {
	try {
		 PreparedStatement preparedStatement = connection.prepareStatement("DELETE FROM components WHERE idcomponents=?");
		 preparedStatement.setInt(1, id);

		 preparedStatement.executeUpdate();
		 System.out.println("ho inviato il comando di cancellazione a mysql");
	  } catch (SQLException e) {
	  	e.printStackTrace();
	  }
	
}


public void addUser(User u) {

	  try {
	   PreparedStatement preparedStatement = connection.prepareStatement("INSERT INTO users(name,surname) VALUES (?,?)");
	   System.out.println("User:"+u.getname()+", "+u.getcognome());
	   
	   //conversione dei dati nei tipi definiti da mysql
	   preparedStatement.setString(1, u.getname());
	   preparedStatement.setString(2, u.getcognome());
	   preparedStatement.executeUpdate();
	   System.out.println("ho inviato il comando di inserimento utente a mysql");
	  } catch (SQLException e) {
	   e.printStackTrace();
	  }
	
}


public int getUserID(String name, String surname) {
	
	  try {
		   PreparedStatement preparedStatement = connection.prepareStatement("SELECT * FROM users WHERE name=? AND surname=?");
		   //attenzione sto ipotizzando che non esistano 2 persone con lo stesso nome e cognome!!!!!!! (username??)
		   
		   preparedStatement.setString(1, name);
		   preparedStatement.setString(2, surname);
		   ResultSet rs = preparedStatement.executeQuery();
		   while (rs.next()) {
			   id=rs.getInt("idusers");
		   }
		   System.out.println("User:"+name+" "+surname+" id="+id);
		  } catch (SQLException e) {
		   e.printStackTrace();
		   id=0;//in caso di errore
		  }
	

	return id;
}

//riceve tutte le categorie nel db
public List<String> getAllCat() {

List<String> cats = new ArrayList<String>(); int i=0;
try {
 Statement statement = connection.createStatement();
 ResultSet rs = statement.executeQuery("select * from category");
 while (rs.next()) {
  cats.add(rs.getString("categoryname"));
  //System.out.println("prelevata categoria= "+rs.getString("categoryname"));
  //cats.add(cat);
 }
} catch (SQLException e) {
 e.printStackTrace();
}
return cats;
}


public List<Component> getAllComponents(int id2) {
	List<Component> cp = new ArrayList<Component>();
	  try {
		  PreparedStatement preparedStatement = connection.prepareStatement("select * from components where id_utente=?");
		  preparedStatement.setInt(1, id2);
		  ResultSet rs = preparedStatement.executeQuery();
		  while (rs.next()) {
			  Component c = new Component();
			  c.setId(rs.getInt("idcomponents"));
			  c.setName(rs.getString("name"));
			  c.setDescription(rs.getString("description"));
			  c.setIDUser(rs.getInt("id_utente"));
			  c.setType(rs.getString("componentcat"));
			  cp.add(c);
			  System.out.println("prelevato componente= "+rs.getString("name")+rs.getString("description")+" id="+rs.getInt("idcomponents")+" categoria="+rs.getString("componentcat"));
			  //System.out.println("inoltro componente= "+c.getName()+c.getDescription()+" id="+c.getId()+" categoria="+c.getType());

		  }
	  } catch (SQLException e) {
		  e.printStackTrace();
	  }
	  return cp;
}


public List<Threat> getAllThreats() {
	List<Threat> ts = new ArrayList<Threat>();
	  try {
		  PreparedStatement preparedStatement = connection.prepareStatement("select * from threats");
		  ResultSet rs = preparedStatement.executeQuery();
		  while (rs.next()) {
			  Threat t = new Threat();
			  t.setid(rs.getInt("idthreats"));
			  t.setname(rs.getString("threatname"));
			  t.setdescr(rs.getString("threatdescription"));
			  t.setCat(rs.getString("threatcat"));
			  t.setSTRIDE(rs.getString("stride"));
			  t.setquestion(rs.getString("question"));
			  t.setsource(rs.getString("source"));
			  
			  ts.add(t);
			  System.out.println("prelevato threat= "+rs.getString("threatname")+" id="+rs.getInt("idthreats")+" STRIDE= "+rs.getString("stride"));
			  //System.out.println("inoltro componente= "+c.getName()+c.getDescription()+" id="+c.getId()+" categoria="+c.getType());

		  }
	  } catch (SQLException e) {
		  e.printStackTrace();
	  }
	  return ts;
}



public byte[] getPhotoByID(int id_user) {
	byte[] b =null;
	try {
		  PreparedStatement preparedStatement = connection.prepareStatement("select image from users where idusers=?");
		  preparedStatement.setInt(1, id_user);
		  ResultSet rs = preparedStatement.executeQuery();
		  while (rs.next()) {
			  
			  b=rs.getBytes("image");
			  System.out.println("foto scaricata:"+b);
		  }
	  } catch (SQLException e) {
		  e.printStackTrace();
	  }

	return b;
}


public void addAssociation(Association a) {
	  try {
		   PreparedStatement preparedStatement = connection.prepareStatement("INSERT INTO threats_per_component(component,threat) VALUES (?,?)");
		   
		   //conversione dei dati nei tipi definiti da mysql
		   preparedStatement.setInt(1, a.getcomponent());
		   preparedStatement.setInt(2, a.getthreat());
		   preparedStatement.executeUpdate();
		   System.out.println("ho inviato il comando di inserimento associazione a mysql");
		  } catch (SQLException e) {
		   e.printStackTrace();
		  }
		
	}


public boolean FindAssociation(int component, int threat) {
	boolean trovato=false;
	  try {
		   PreparedStatement preparedStatement = connection.prepareStatement("SELECT * FROM threats_per_component WHERE component=? AND threat=?");
		   
		   preparedStatement.setInt(1, component);
		   preparedStatement.setInt(2, threat);
		   ResultSet rs = preparedStatement.executeQuery();
		   while (rs.next()) {
			   trovato=true;
		   }

		  } catch (SQLException e) {
		   e.printStackTrace();

		  }
	

	return trovato;
}


public void DelAssociation(int component) {
	try {
		 PreparedStatement preparedStatement = connection.prepareStatement("DELETE FROM threats_per_component WHERE component=?");
		 preparedStatement.setInt(1, component);
		 preparedStatement.executeUpdate();
		 System.out.println("ho inviato il comando di cancellazione associazione a mysql");
	  } catch (SQLException e) {
	  	e.printStackTrace();
	  }
	
}


public List<Controls> getAllControls() {
List<Controls> lc = new ArrayList<Controls>();
try {
	  PreparedStatement preparedStatement = connection.prepareStatement("SELECT controls_per_threat.*,controls.* FROM controls_per_threat INNER JOIN controls on controls_per_threat.controlid=controls.idControl;");
	  ResultSet rs = preparedStatement.executeQuery();
	  while (rs.next()) {
		  Controls t = new Controls();
		  t.setControlID(rs.getString("controlid"));
		  t.setid(rs.getInt("id"));
		  t.setStrideCat(rs.getString("StrideCat"));
		  t.setIDCONTROL(rs.getString("idControl"));
		  t.setcontrolname(rs.getString("controlName"));
		  t.setfamilyID(rs.getString("familyId"));
		  t.setfamilyName(rs.getString("familyName"));
		  t.setcontrol(rs.getInt("control"));
		  t.setenh(rs.getInt("enhancement"));
		  t.setcontrolDescr(rs.getString("controlDescription"));
		  
		  
		  lc.add(t);

	  } System.out.println("prelevati i controlli");
} catch (SQLException e) {
	  e.printStackTrace();
}
return lc;
}


public void addAssociationControl(AssociationControl a) {
	  try {
		   PreparedStatement preparedStatement = connection.prepareStatement("INSERT INTO controls_selected_by_users(controlloscelto_id,componente_id) VALUES (?,?)");
		   
		   preparedStatement.setString(1, a.getcontrol());
		   preparedStatement.setInt(2, a.getcomponente());
		   preparedStatement.executeUpdate();
		   System.out.println("ho inviato il comando di inserimento associazione controlli a mysql");
		  } catch (SQLException e) {
		   e.printStackTrace();
		  }
		
	}


public void DelAssociationControl(int comp) {
	try {
		 PreparedStatement preparedStatement = connection.prepareStatement("DELETE FROM controls_selected_by_users WHERE componente_id=?");
		 preparedStatement.setInt(1, comp);
		 preparedStatement.executeUpdate();
		 System.out.println("ho inviato il comando di cancellazione dei controlli associati al componente");
	  } catch (SQLException e) {
	  	e.printStackTrace();
	  }
	
}


public List<ControlliSuggeriti> getControlsSugg() {
	List<ControlliSuggeriti> li = new ArrayList<ControlliSuggeriti>();
	try {
		  PreparedStatement preparedStatement = connection.prepareStatement("SELECT control_suggested.id, controls.idControl, controls.controlName, controls.controlDescription,controls.minrisk, threats.* FROM (control_suggested INNER JOIN controls on control_suggested.control=controls.idControl) inner join threats on control_suggested.threat=threats.idthreats;");
		  ResultSet rs = preparedStatement.executeQuery();
		  while (rs.next()) {
			  ControlliSuggeriti cs = new ControlliSuggeriti();
			  
			  cs.setID(rs.getInt("id"));
			  
			  cs.setControl(rs.getString("idControl"));
			  cs.setControlName(rs.getString("controlName"));
			  cs.setControldesc(rs.getString("controlDescription"));
			  cs.setMinrisk(rs.getInt("minrisk"));
			  
			  cs.setThreatname(rs.getString("threatname"));
			  cs.setThreatDesc(rs.getString("threatdescription"));
			  cs.setStride(rs.getString("stride"));
			  cs.setThreatID(rs.getInt("idthreats"));

			  li.add(cs);

		  } System.out.println("prelevati i controlli suggeriti");
	} catch (SQLException e) {
		  e.printStackTrace();
	}
	return li;
	}


public List<Photo> getallfoto() {
	List<Photo> p = new ArrayList<Photo>();
	
	try {
		  PreparedStatement preparedStatement = connection.prepareStatement("SELECT immagine FROM immagini");
		  ResultSet rs = preparedStatement.executeQuery();
		  while (rs.next()) {
			  Photo pp=new Photo(rs.getBytes("immagine"));
			  p.add(pp);
			  
		  }
	}catch (SQLException e) {
		  e.printStackTrace();
	}
	return p;
}


public List<Metric> getAllMetrics(int id_comp) {
	List<Metric> m = new ArrayList<Metric>();
	System.out.println("prova");
	
	try {
		  PreparedStatement preparedStatement = connection.prepareStatement("SELECT DISTINCT metrics.metricname, metrics.metricdescr,metrics.formula,metrics.input1,metrics.input2,metrics.value,metrics.unit,metrics.defaultt,metrics.min,metrics.max,metrics.operator,controls_selected_by_users.componente_id FROM metrics,controls_selected_by_users where metrics.nistcontrol=controls_selected_by_users.controlloscelto_id and controls_selected_by_users.componente_id=?");
		  preparedStatement.setInt(1, id_comp);
		  ResultSet rs = preparedStatement.executeQuery();
		  while (rs.next()) {
			  Metric mm=new Metric();
			  /*mm.setid(rs.getInt("idmetrics"));*/
			  mm.setname(rs.getString("metricname"));
			  mm.setdes(rs.getString("metricdescr"));
			  mm.setformula(rs.getString("formula"));
			  mm.setinput1(rs.getString("input1"));
			  mm.setinput2(rs.getString("input2"));
			  mm.setvalue(rs.getString("value"));
			  mm.setunit(rs.getString("unit"));
			  mm.setdefault(rs.getString("defaultt"));
			  mm.setmin(rs.getString("min"));
			  mm.setmax(rs.getString("max"));
			  mm.setope(rs.getString("operator"));
			  /*mm.setnist(rs.getString("nistcontrol"));*/
			  mm.setcomponenteid(rs.getString("componente_id"));

			  m.add(mm);
			  
		  }
	}catch (SQLException e) {
		  e.printStackTrace();
	}
	return m;
}


public List<Threat> getThreatsxCAT(String cat) {
	List<Threat> ts = new ArrayList<Threat>();
	  try {
		  PreparedStatement preparedStatement = connection.prepareStatement("SELECT * FROM threats WHERE threatcat=?");
		  preparedStatement.setString(1, cat);
		  ResultSet rs = preparedStatement.executeQuery();
		  while (rs.next()) {
			  Threat t = new Threat();
			  t.setid(rs.getInt("idthreats"));
			  t.setname(rs.getString("threatname"));
			  t.setdescr(rs.getString("threatdescription"));
			  t.setCat(rs.getString("threatcat"));
			  t.setSTRIDE(rs.getString("stride"));
			  t.setquestion(rs.getString("question"));
			  t.setsource(rs.getString("source"));
			  t.setanswer(rs.getString("answer"));
			  
			  ts.add(t);
			  System.out.println("prelevato threat= "+rs.getString("threatname")+" id="+rs.getInt("idthreats")+" STRIDE= "+rs.getString("stride"));
			  //System.out.println("inoltro componente= "+c.getName()+c.getDescription()+" id="+c.getId()+" categoria="+c.getType());

		  }
	  } catch (SQLException e) {
		  e.printStackTrace();
	  }
	  return ts;
}


public int getComponentID(String name, int idd) {
		int i = 0;
		  try {
			  PreparedStatement preparedStatement = connection.prepareStatement("select * from components where name=? AND id_utente=?");
			  preparedStatement.setString(1, name);
			  preparedStatement.setInt(2, idd);
			  ResultSet rs = preparedStatement.executeQuery();
			  while (rs.next()) {
				  Component c = new Component();
				  c.setId(rs.getInt("idcomponents"));
				  c.setName(rs.getString("name"));
				  c.setDescription(rs.getString("description"));
				  c.setIDUser(rs.getInt("id_utente"));
				  c.setType(rs.getString("componentcat"));
				  
				  
				  i=c.getId();
				  System.out.println("prelevato componente= "+rs.getString("name")+rs.getString("description")+" id="+rs.getInt("idcomponents")+" categoria="+rs.getString("componentcat"));
				  //System.out.println("inoltro componente= "+c.getName()+c.getDescription()+" id="+c.getId()+" categoria="+c.getType());

			  }
		  } catch (SQLException e) {
			  e.printStackTrace();
		  }
		  return i;
	}


public List<Metric> getOtherMetrics(String threat) {
	List<Metric> h = new ArrayList<Metric>();
	
	try {
		  PreparedStatement preparedStatement = connection.prepareStatement("SELECT * FROM metrics where metrics.threatname=?");
		  preparedStatement.setString(1, threat);
		  ResultSet rs = preparedStatement.executeQuery();
		  while (rs.next()) {
			  Metric mn=new Metric();
			  mn.setid(rs.getInt("idmetrics"));
			  mn.setname(rs.getString("metricname"));
			  mn.setdes(rs.getString("metricdescr"));
			  mn.setformula(rs.getString("formula"));
			  mn.setinput1(rs.getString("input1"));
			  mn.setinput2(rs.getString("input2"));
			  mn.setvalue(rs.getString("value"));
			  mn.setunit(rs.getString("unit"));
			  mn.setdefault(rs.getString("defaultt"));
			  mn.setmin(rs.getString("min"));
			  mn.setmax(rs.getString("max"));
			  mn.setope(rs.getString("operator"));
			  /*mm.setnist(rs.getString("nistcontrol"));*/
			  mn.setThreatname(rs.getString("threatname"));
			  mn.setSTRIDE(rs.getString("STRIDE"));
			  h.add(mn);
			  
		  }
	}catch (SQLException e) {
		  e.printStackTrace();
	}
	return h;
}


public List<String> getmetricControls(int comp,String metrica) {
List<String> h = new ArrayList<String>();
	
	try {
		  PreparedStatement preparedStatement = connection.prepareStatement("SELECT DISTINCT nistcontrol FROM metrics,controls,controls_selected_by_users,components where components.idcomponents=? and components.idcomponents=controls_selected_by_users.componente_id and controls_selected_by_users.controlloscelto_id=controls.idControl and metrics.nistcontrol=controls.idControl and metricname=? and nistcontrol is not null");
		  preparedStatement.setInt(1, comp);
		  preparedStatement.setString(2, metrica);
		  ResultSet rs = preparedStatement.executeQuery();
		  while (rs.next()) {
			  String s=rs.getString("nistcontrol");
			  h.add(s);
		  }
	}catch (SQLException e) {
		  e.printStackTrace();
	}
	return h;
}




 
 

 
 
}