-- MySQL dump 10.13  Distrib 5.7.9, for Win64 (x86_64)
--
-- Host: localhost    Database: threatapplication
-- ------------------------------------------------------
-- Server version	5.7.9-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `category` (
  `categoryname` varchar(45) NOT NULL,
  PRIMARY KEY (`categoryname`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES ('custom web app'),('external software as service'),('storage as service');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `components`
--

DROP TABLE IF EXISTS `components`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `components` (
  `idcomponents` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `description` text NOT NULL,
  `id_utente` int(11) NOT NULL,
  `componentcat` varchar(45) NOT NULL,
  PRIMARY KEY (`idcomponents`),
  UNIQUE KEY `idcomponents_UNIQUE` (`idcomponents`),
  KEY `id_utente_idx` (`id_utente`),
  KEY `componentcat_idx` (`componentcat`),
  CONSTRAINT `componentcat` FOREIGN KEY (`componentcat`) REFERENCES `category` (`categoryname`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `id_utente` FOREIGN KEY (`id_utente`) REFERENCES `users` (`idusers`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `components`
--

LOCK TABLES `components` WRITE;
/*!40000 ALTER TABLE `components` DISABLE KEYS */;
/*!40000 ALTER TABLE `components` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `threats`
--

DROP TABLE IF EXISTS `threats`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `threats` (
  `idthreats` int(11) NOT NULL AUTO_INCREMENT,
  `threatname` varchar(45) NOT NULL,
  `threatdescription` longtext,
  `threatcat` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idthreats`),
  KEY `cat_idx` (`threatcat`),
  CONSTRAINT `threatcat` FOREIGN KEY (`threatcat`) REFERENCES `category` (`categoryname`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `threats`
--

LOCK TABLES `threats` WRITE;
/*!40000 ALTER TABLE `threats` DISABLE KEYS */;
INSERT INTO `threats` VALUES (1,'Injection','Le Injection Flaws, come SQL Injection, OS Injection e LDAP Injection, si verificano quando dati non validati sono inviati come parte di un comando o di una query al loro interprete. Il dato infetto può quindi ingannare tale interprete, eseguendo comandi non previsti o accedendo a dati per i quali non si ha l’autorizzazione.','custom web app'),(2,'Broken Authentication and Session Management','Le procedure applicative relative all’autenticazione e alla gestione della sessione sono spesso implementate in modo non corretto, permettendo agli attaccanti di compromettere password, chiavi, token di sessione o sfruttare debolezze implementative per assumere l’identità di altri utenti.','custom web app'),(3,'Cross-Site Scripting (XSS)','Le falle di tipo XSS si verificano quando un’applicazione web riceve dei dati, provenienti da fonti non affidabili, e li invia ad un browser senza una opportuna validazione e/o “escaping”. Il XSS permette agli attaccanti di eseguire degli script malevoli sui browser delle vittime; tali script possono dirottare la sessione dell’utente, defacciare il sito web o re-indirizzare l’utente su un sito malevolo','custom web app'),(4,'Insecure Direct Object References','Quando uno sviluppatore espone un riferimento all’implementazione interna di un oggetto, come un file, una directory o una chiave di un database, si ha un riferimento diretto ad un oggetto. Senza un opportuno controllo degli accessi o altre protezioni, gli attaccanti possono manipolare questi riferimenti in modo da accedere a dati non autorizzati.','external software as service'),(5,'Security Misconfiguration','Una buona sicurezza richiede un’opportuna configurazione impostata e sviluppata per applicazioni, framework, server applicativi, webserver, database e piattaforme. Tutte le configurazioni devono essere definite, implementate e manutenute in quanto le configurazioni di default non sono sempre sicure. Inoltre, tutto il software deve essere sempre aggiornato.','external software as service'),(6,'Sensitive Data Exposure','Molte applicazioni web non proteggono adeguatamente dati quali numeri di carte di credito o credenziali di autenticazione. Gli attaccanti possono impossessarsi di tali dati o approfittare dei punti deboli nelle misure di protezione per il furto di credenziali, per operazioni fraudolente con CdC, ecc. Questo tipo di dati, necessitano di misure di protezione ulteriori, come la crittografia anche per i dati in transito, nonché speciali precauzioni quando vengono scambiati con il browser','external software as service'),(7,'Missing Function Level Access Control','Molte applicazioni verificano il livello dei diritti di accesso prima che la relativa funzionalità sia resa visibile nell’interfaccia utente. Tuttavia, le applicazioni devono eseguire il controllo accessi sul server ogni volta che la funzionalità è acceduta. Se le richieste di accesso non sono verificate, gli attaccanti possono falsificarle per accedere senza autorizzazione alle funzionalità.','storage as service'),(8,'Cross-Site Request Forgery (CSRF)','Un attacco CSRF forza il browser della vittima ad inviare una richiesta HTTP opportunamente forgiata, includendo i cookie di sessione della vittima ed ogni altra informazione di autenticazione, ad una applicazione web vulnerabile. Questo permette all’attaccante di forzare il browser della vittima a generare richieste che l’applicazione vulnerabile crederà legittimamente inviate dalla vittima.',NULL),(9,'Using Known Vulnerable Components','Componenti quali librerie, framework e altri moduli software sono quasi sempre eseguiti con i privilegi più alti. Sfruttando un componente vulnerabile, un attaccante potrebbe ottenere dei dati o accedere al server. Le applicazioni che utilizzano componenti con vulnerabilità note possono minare le loro difese agevolando molte tipologie di attacco con impatti notevoli.',NULL),(10,'Unvalidated Redirects and Forwards','Le applicazioni web spesso reindirizzano (redirect) o inoltrano (forward) gli utenti verso altre pagine o siti ed usano dati non validati per determinare le pagine di destinazione. Senza un’opportuna validazione, gli attaccanti possono re-indirizzare le vittime verso siti di phishing o di malware o utilizzare il forward per accedere a pagine non autorizzate.',NULL),(11,'DENIAL OF SERVICE','DoS and DDoS are both denial-of-service attacks. The attacks work by requesting more resources from a server than the server has available. In the case of DoS, it is an attack that originates from a single device, as opposed to DDoS which is distributed and relies on multiple devices.',NULL),(23,'SHARED TECHNOLOGY ISSUES','At the heart of cloud computing is the premise of sharing underlying infrastructure components. lf security requirements and protocols are not integrated into the shared infrastructure at multiple levels (i.e. computing iresources, storage, and networking) then vulnerabilities could exist.',NULL),(24,'SYSTEM AND APPLICATION VULNERABILITIES','Vulnerabilities are known to exist in operating systems or applications - whether those vulnerabilities are intended or not - the software will be open to attack by malicious users. For example, not keeping the system up to date with security patches.',NULL),(25,'DATA BREACHES','A data breach is an incident in which sensitive, protected or confidential data has potentially been viewed, stolen or used by an individuai unauthorised lo do so. Data breaches may involve persona! health information (PHI), personally identifiable information (PII ), trade secrets or intellectual property.',NULL),(26,'DATA LOSS','Data loss is an error condition in information systems in which information is destroyed by failures or neglect in storage, transmission, or ,processing. lnformation systems implement backup and disaster recovery equipment and processes to prevent data loss or restore lost data.',NULL),(27,'ACCOUNT HIJACKING','In account hijacking, a hacker uses a compromised account to impersonate the account owner. Typically, account hijacking is carried out through social engineering, phishing, sending spoofed emails to the user, password guessing or a number of other hacking tactics. In many cases, the outcome of an account hijacking is the hacker will have full system access and the ability to laterally access other systems on the target user network. The effective breach scope may expand to other services, such as financial and social networks, due to password re-use across services.',NULL),(28,'INSUFFICIENT DUE DILIGENCE','Businesses and their legai departments often have limited time and resources to devote to cloud due diligence. Developing a good roadmap and checklist for due diligence on a CSP is essential. Due diligence should involve a team-based approach that includes IT, legal, compliance and other appropriate business units of a company.',NULL),(29,'MALICIOUS INSIDERS','A malicious insider threat to an organization is :a current or former employee, contractor, or\nother business partner who has or had authorised access to an organization\'s network, system, or data and intentionally exceeded or misused that access in a manner that negatively affected the confidentiality, integrity, or availability of the organization\'s information or information systems.',NULL),(30,'INSECURE APls','An Application Program lnterface (API), is a set of routines, protocols, and tools for building software applications. The API specifies how software components should interact and APls are used when programming graphical user interface (GUI) and scripted components. Examples of insecure APls are non-encrypted data transfer, not validating users and transfer of authentication credentials through non-encrypted connections, etc.',NULL),(31,'MISALIGNED OR MISSING CLOUD STRATEGY','Business Strategy are the choices made by executives on where to engage the business and how to win to maximize shareholder value. IT exists to suppor! business and therefore its strategy needs to be in alignment. In today\'s environment the Cloud is an Il/Business strategie disruptor for which an approach needs to be implemented in order for an organization to be successful.',NULL),(32,'ADVANCED PERSISTENT THREATS (APTs)','An advanced persistent threat (APT) is a systern attack in which an unauthorized actor gains access to the infrastructure and remains undetected. The intention of an APT attack is to locate and steal data and evade detection, rather than to cause damage to the network or organization. APT attacks target organizations in sectors with high-value information, such as national defence, manufacturing, infrastructure, medical, scientific, and the financial industry.',NULL),(33,'WEAK IDENTITY, CREDENTIAL & ACCESS MANAGEMENT','Lack of highly scalable identity access management systems, lack of multi-factor authentication capabilities, weak password usage, and lack of ongoing automated rotation of cryptographic keys, passwords, and certificates. Furthermore, hygiene of credentials ranging from embedding in source code and distribution in publicly available source code may be considerations.',NULL),(34,'ABUSE AND NEFARIOUS USE OF CLOUD SERVICES','Poorly secured ctoud servlce deployments, free cloud servlce trlals, and lraudulent account sign ups, open cloud computing models such as laaS and PaaS to malicious attacks by crlminals who can leverage those teohnologies to target users, cloud provlders, host malidous conteni, or attack other entltles on the Internet.',NULL),(35,'Unauthorized access to admin interface',' ',NULL),(36,'Man in the Middle attack','MITM is an attack where the attacker secretly relays and possibly alters the communication between two parties who believe they are directly communicating with each other.',NULL),(37,'Over-privileged application and accounts',' ',NULL);
/*!40000 ALTER TABLE `threats` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `threats_per_component`
--

DROP TABLE IF EXISTS `threats_per_component`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `threats_per_component` (
  `idtpc` int(11) NOT NULL AUTO_INCREMENT,
  `component` int(11) NOT NULL,
  `threat` int(11) NOT NULL,
  PRIMARY KEY (`idtpc`),
  KEY `component_idx` (`component`),
  KEY `tr_idx` (`threat`),
  CONSTRAINT `cp` FOREIGN KEY (`component`) REFERENCES `components` (`idcomponents`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `tr` FOREIGN KEY (`threat`) REFERENCES `threats` (`idthreats`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `threats_per_component`
--

LOCK TABLES `threats_per_component` WRITE;
/*!40000 ALTER TABLE `threats_per_component` DISABLE KEYS */;
/*!40000 ALTER TABLE `threats_per_component` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `idusers` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(25) NOT NULL,
  `surname` varchar(45) NOT NULL,
  `image` mediumblob,
  PRIMARY KEY (`idusers`)
) ENGINE=InnoDB AUTO_INCREMENT=67 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2015-11-28 16:05:29
