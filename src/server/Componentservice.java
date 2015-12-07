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
		  PreparedStatement preparedStatement = connection.prepareStatement("SELECT control_suggested.id, controls.idControl, controls.controlName, controls.controlDescription, threats.threatname, threats.threatdescription, threats.stride FROM (threatapplication.control_suggested INNER JOIN controls on control_suggested.control=controls.idControl) inner join threats on control_suggested.threat=threats.idthreats;");
		  ResultSet rs = preparedStatement.executeQuery();
		  while (rs.next()) {
			  ControlliSuggeriti cs = new ControlliSuggeriti();
			  
			  cs.setID(rs.getInt("id"));
			  
			  cs.setControl(rs.getString("idControl"));
			  cs.setControlName(rs.getString("controlName"));
			  cs.setControldesc(rs.getString("controlDescription"));

			  cs.setThreatname(rs.getString("threatname"));
			  cs.setThreatDesc(rs.getString("threatdescription"));
			  cs.setStride(rs.getString("stride"));

			  li.add(cs);

		  } System.out.println("prelevati i controlli suggeriti");
	} catch (SQLException e) {
		  e.printStackTrace();
	}
	return li;
	}




 
 
/* public void archiveTask(int taskId) {
  try {
   PreparedStatement preparedStatement = connection
     .prepareStatement("update task_list set task_archived=true where task_id=?");
   // Parameters start with 1
   preparedStatement.setInt(1, taskId);
   preparedStatement.executeUpdate();
  } catch (SQLException e) {
   e.printStackTrace();
  }
 }*/
 
 
 
/* public void updateTask(Component comp) throws ParseException {
  try {
   PreparedStatement preparedStatement = connection
     .prepareStatement("update Components set comp_name=?, comp_description=?, comp_image=?" +
       "where comp_id=?");
   preparedStatement.setString(1, comp.getName());
   preparedStatement.setString(2, comp.getDescription());
   InputStream inputStream= null;
   //preparedStatement.setBinaryStream(3, (InputStream) inputStream, (int) (comp.getImage().length()));
   preparedStatement.executeUpdate();
  } catch (SQLException e) {
   e.printStackTrace();
  }
 }*/



 
/* 
 public void changeTaskStatus(int taskId,String status) throws ParseException {
   try {
    PreparedStatement preparedStatement = connection
      .prepareStatement("update task_list set task_status=? where task_id=?");
    preparedStatement.setString(1,status);
    preparedStatement.setInt(2, taskId);
    preparedStatement.executeUpdate();
   } catch (SQLException e) {
    e.printStackTrace();
   }
  }*/
 
 
/* public List<Task> getAllTasks() {
  List<Task> tasks = new ArrayList<Task>();
  try {
   Statement statement = connection.createStatement();
   ResultSet rs = statement.executeQuery("select * from task_list where task_archived=0");
   while (rs.next()) {
    Task task = new Task();
    task.setTaskId(rs.getInt("task_id"));
    task.setTaskName(rs.getString("task_name"));
    task.setTaskDescription(rs.getString("task_description"));    
    task.setTaskPriority(rs.getString("task_priority"));
    task.setTaskStatus(rs.getString("task_status"));
    tasks.add(task);
   }
  } catch (SQLException e) {
   e.printStackTrace();
  }
  return tasks;
 }*/
 
 
/* public Task getTaskById(int taskId) {
  Task task = new Task();
  try {
   PreparedStatement preparedStatement = connection.
     prepareStatement("select * from task_list where task_id=?");
   preparedStatement.setInt(1, taskId);
   ResultSet rs = preparedStatement.executeQuery();
   if (rs.next()) {
     task.setTaskId(rs.getInt("task_id"));
     task.setTaskName(rs.getString("task_name"));
     task.setTaskDescription(rs.getString("task_description"));    
     task.setTaskPriority(rs.getString("task_priority"));
     task.setTaskStatus(rs.getString("task_status"));
   }
  } catch (SQLException e) {
   e.printStackTrace();
  }
  return task;
 }*/
 
 
}