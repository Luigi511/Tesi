<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>

<head>
  <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
  <!-- <title>SPECS DEMO Home</title>  -->
  <title>APPLICAZIONE...</title>
  
  


  <!-- Latest compiled and minified CSS -->
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
  <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/nav-wizard.bootstrap.css">
  <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/app.css">
  <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/angular-loading-bar/0.8.0/loading-bar.min.css' type='text/css' media='all' />
   <link rel='stylesheet' href='${pageContext.request.contextPath}/resources/css/my-loading-bar.css' type='text/css' media='all' />
	 <link rel='stylesheet' href='${pageContext.request.contextPath}/resources/css/XMLDisplay.css' type='text/css' media='all' />
	   <!-- load angular, nganimate, and ui-router -->
  <script src="${pageContext.request.contextPath}/resources/bower_components/angular/angular.js"></script>
  <script src="${pageContext.request.contextPath}/resources/bower_components/angular-ui-router/release/angular-ui-router.js"></script>
  <script src="${pageContext.request.contextPath}/resources/bower_components/angular-animate/angular-animate.js"></script>
   <script src="${pageContext.request.contextPath}/resources/bower_components/underscore/underscore-min.js"></script>
   <script src="${pageContext.request.contextPath}/resources/js/XMLDisplay.js"></script>
 <script  src='https://cdnjs.cloudflare.com/ajax/libs/angular-loading-bar/0.8.0/loading-bar.min.js'></script>


  <script src="${pageContext.request.contextPath}/resources/js/app.js"></script>
  <script src="${pageContext.request.contextPath}/resources/js/config.js"></script>
  <script src="${pageContext.request.contextPath}/resources/js/controllers.js"></script>
  <script src="${pageContext.request.contextPath}/resources/js/factories.js"></script>
  <script src="${pageContext.request.contextPath}/resources/js/directives.js"></script>
  <script src="${pageContext.request.contextPath}/resources/js/filters.js"></script>
  <script src="${pageContext.request.contextPath}/resources/js/services.js"></script>
  
  
  <!-- aggiunti da me  -->
  <script src="http://code.jquery.com/jquery-1.9.1.js"></script>
  <script src="http://malsup.github.com/jquery.form.js"></script>
  <script src="https://code.angularjs.org/1.4.8/angular-cookies.js"></script>
  
  
  
	
</head>

<body ng-app="SlaApp" >
      
  <div class="container">
    <div ui-view></div>
  </div>
</body>

</html>




