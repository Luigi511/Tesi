# README #

This README would normally document whatever steps are necessary to get your application up and running.

## Installation ##

**Compile and install from source**

The following are the prerequisites to compile and install the Web Container App:

Prerequisites:

* a Git client;
* Apache Maven 3.3.x;
* Oracle Java JDK 7;
* Java Servlet/Web Container (recommended: Apache Tomcat 7.0.x);
** MYSQL CLIENT


Installation steps:

1) clone the Bitbucket repository:
2) configure-> convert to maven project;
3) run as ->mvn install
4) importare database in allegato (db.sql) in mysql

NOTA: Quando importi il db, mysql ti chiede di assegnare un nome al db! Il nome che sceglierai deve essere
inserito all'interno del file di configurazione situato al path: 

/threatapplication/src/config.properties

nella stringa url=jdbc:mysql://localhost:3306/{{nomedb}} 

5) run as-> run on server (tomcat server)


The installation generates a web application archive (war) file, under the â/targetâ subfolder. In order to use the component, the war file has to be deployed in the java servlet/web container. If Apache Tomcat 7.0.x is used, the war file needs to be copied into the â/webappsâ folder inside the home directory (CATALINA_HOME) of Apache Tomcat 7.0.x.