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



package client;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class WebController {
	
	
	
	@RequestMapping("/index")
    public ModelAndView helloWorld(Model model) {
        model.addAttribute("message", "Hello World!");
        return new ModelAndView("index", "message", model);
        //attenzione: l'interfaccia grafica ritorna /resources/index.jsp
    }
	
	
/*	@RequestMapping("/welkome")
    public ModelAndView hello(Model model) {
        model.addAttribute("message", "Hello World!");
        return new ModelAndView("welkome", "message", model);
    }*/
	
	/**
	 * Il metodo helloWorld() (che gestisce tutte le richieste del client che 
	 * iniziano con il pattern /welcome) ritorna al chiamante (al Front Controller, quindi al nostro 
	 * oggetto istanza di DispatcherServlet) un oggetto ModelAndView.
	 * Tale oggetto ModelAndView prova a risolvere ad una view chiamata “welcome” ed il data model viene passato 
	 * indietro al browser così da poter accedere ai dati all’interno della JSP.
	 * Il nome logico della view (“welcome”) viene risolto concretamente in “/WEB-INF/jsp/index.jsp”.
	 */
}