/* 
 
Copyright 2015 SPECS Project - CeRICT

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

@author  Massimiliano Rak massimiliano.rak@unina2.it
@author  Luigi De Matteis luigi.dematteis2@studenti.unina2.it

 */



package server;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

import utility.PropertiesManager;

public class DBUtility {
 private static Connection connection = null;
 
 
    public static Connection getConnection() {
        if (connection != null)
            return connection;
        else {
            try {
                String driver = PropertiesManager.getProperty("driver");
                String url = PropertiesManager.getProperty("url");
                

                
                //per openshift
                /*String host = System.getenv("OPENSHIFT_MYSQL_DB_HOST");
                String port = System.getenv("OPENSHIFT_MYSQL_DB_PORT");
                String url = String.format("jdbc:mysql://%s:%s/threatapplication", host, port);*/

                
                String user = PropertiesManager.getProperty("user");
                String password = PropertiesManager.getProperty("password");
                Class.forName(driver);
                connection = DriverManager.getConnection(url, user, password);
                System.out.println("connesso a : "+url+"("+user+","+password+")");
            } 
            
              catch (ClassNotFoundException e) {
                e.printStackTrace();
                
            } catch (SQLException e) {
                e.printStackTrace();
                
            }
            return connection;
        }
    }
}