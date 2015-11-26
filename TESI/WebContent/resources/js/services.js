angular.module('SlaApp.services', [])

  .factory('$tabActive', [function () {
    
      return {
        get: function (viewLocation, locationPath) {
          //console.log("VIEW LOCATION: " + viewLocation);
          //console.log("LOCATION PATH: " + locationPath);
          var active = false;
          //if(viewLocation === $location.path()){
          if(viewLocation === locationPath){
            active = true;
          }
          return active;
		},
        set: function (viewLocation, locationTarget) {
          var active = false;
          if(viewLocation === locationTarget){
            active = true;
          }
			 return active;
		}
	}

}])









;