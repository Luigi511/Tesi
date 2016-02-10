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
