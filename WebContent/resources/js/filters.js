angular.module('SlaApp.filters', [])

.filter('isIdExisting', function() {
    return function(sourceObj, targetArray) {
       var found = false;
       for (index in targetArray){
          if(sourceObj.id == targetArray[index].id){
             found = true;
             break;
          }
       }
       return found;
    }
    })

;
