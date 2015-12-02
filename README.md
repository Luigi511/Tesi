# README #

This README would normally document whatever steps are necessary to get your application up and running.

You can try a demo updated every 2-3 days with latest functionality at:
https://threatapplication-luigidm91.rhcloud.com/TESI-0.0.1-SNAPSHOT/    (new demo!)

## Installation ##

**Compile and install from source**

The following are the prerequisites to compile and install the Web Container App:

Prerequisites:

* a Git client;
* Apache Maven 3.3.x;
* Oracle Java JDK 7;
* Java Servlet/Web Container (recommended: Apache Tomcat 7.0.x);
* MYSQL


Installation steps:

1) clone the Bitbucket repository:
2) convert to maven project;
3) mvn install
4) import database (db.sql) in mysql

NOTE: importing the database you are asked to assign a name; this must be equal to that present in

/threatapplication/src/config.properties

at the line: url=jdbc:mysql://localhost:3306/{{nomedb}} 

5) run on server (tomcat server) 