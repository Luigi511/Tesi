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

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;

import org.springframework.web.multipart.MultipartFile;

public class BASE64DecodedMultipartFile implements MultipartFile
{
        private final byte[] imgContent;

        public BASE64DecodedMultipartFile(byte[] imgContent)
        {
           this.imgContent = imgContent;
            }

        @Override
            public String getName()
        {
               // TODO - implementation depends on your requirements 
                   return null;
        }

        @Override
            public String getOriginalFilename()
        {
            // TODO - implementation depends on your requirements
                return null;
        }

        @Override
        public String getContentType()
        {
            // TODO - implementation depends on your requirements
            return null;
        }

        @Override
        public boolean isEmpty()
        {
            return imgContent != null && imgContent.length > 0;
        }

        @Override
        public long getSize()
        {
            return imgContent.length;
        }

        @Override
        public byte[] getBytes() throws IOException
        {
            return imgContent;
        }

        @Override
        public InputStream getInputStream() throws IOException
        {
            return new ByteArrayInputStream(imgContent);
        }

        @Override
        public void transferTo(File dest) throws IOException, IllegalStateException
        { 
            new FileOutputStream(dest).write(imgContent);
        }
    }