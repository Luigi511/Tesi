package server;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.Properties;

public class DBUtility {
 private static Connection connection = null;
 
 
    public static Connection getConnection() {
        if (connection != null)
            return connection;
        else {
            try {
             Properties prop = new Properties();
                InputStream inputStream = DBUtility.class.getClassLoader().getResourceAsStream("/config.properties");
                prop.load(inputStream);
                String driver = prop.getProperty("driver");
                //String url = prop.getProperty("url");
                
                //per openshift
                String host = System.getenv("OPENSHIFT_MYSQL_DB_HOST");
                String port = System.getenv("OPENSHIFT_MYSQL_DB_PORT");
                String url = String.format("jdbc:mysql://%s:%s/threatapplication", host, port);

                
                String user = prop.getProperty("user");
                String password = prop.getProperty("password");
                Class.forName(driver);
                connection = DriverManager.getConnection(url, user, password);
                System.out.println("connesso a : "+url+"("+user+","+password+")");
            } 
            
              catch (ClassNotFoundException e) {
                e.printStackTrace();
            } catch (SQLException e) {
                e.printStackTrace();
            } catch (FileNotFoundException e) {
                e.printStackTrace();
            } catch (IOException e) {
                e.printStackTrace();
            }
            return connection;
        }
    }
}