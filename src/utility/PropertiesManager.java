package utility;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

public class PropertiesManager {

	public static String getProperty(String key){
		Properties prop = new Properties();
		try {

			//load a properties file from class path, inside static method
			try{
				prop.load(new FileInputStream("/opt/apache-tomcat-7.0.70/webapps/sla_generator.properties"));
			}catch(FileNotFoundException e){
				InputStream input = null;
				input = PropertiesManager.class.getClassLoader().getResourceAsStream("config.properties");
				if(input==null){
					System.out.println("Sorry, unable to find config.properties");
					return "";
				}
				//load a properties file from class path, inside static method
				prop.load(input);
			}
			String propertyValue = prop.getProperty(key);
			if(propertyValue.contains("$")){
				String[] innerValue = propertyValue.split("\\$\\{")[1].split("\\}");
				return getProperty(innerValue[0])+innerValue[1];
			}else{
				return propertyValue;
			}

		} catch (IOException ex) {
			ex.printStackTrace();
		}

		return "";
	}
}

