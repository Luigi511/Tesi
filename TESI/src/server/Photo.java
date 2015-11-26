package server;

import java.io.File;
import java.io.FileInputStream;

import com.mysql.jdbc.Blob;

public class Photo {
	
    private byte[] fileData;
    
    public Photo(byte[] fileData){
    	
    	this.fileData=fileData;
    }

	
	public byte[] getPhoto(){
		return fileData;
	}

}
