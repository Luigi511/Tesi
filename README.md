# README #

This README would normally document whatever steps are necessary to get your application up and running.

### What is this repository for? ###
## Installation ##

**Compile and install from source**

The following are the prerequisites to compile and install the Web Container App:

Prerequisites:

* a Git client;
* Apache Maven 3.3.x;
* Oracle Java JDK 7;
* Java Servlet/Web Container (recommended: Apache Tomcat 7.0.x);

Installation steps:

1) clone the Bitbucket repository:
2) configure-> convert to maven project;
3) run as ->mvn install


The installation generates a web application archive (war) file, under the â/targetâ subfolder. In order to use the component, the war file has to be deployed in the java servlet/web container. If Apache Tomcat 7.0.x is used, the war file needs to be copied into the â/webappsâ folder inside the home directory (CATALINA_HOME) of Apache Tomcat 7.0.x.