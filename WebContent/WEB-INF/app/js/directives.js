angular.module('NegotiationApp.directives', [])
   
.directive('compNavbar', function(){
return {
    restrict: 'E',
    replace: true,
    transclude: true,
    scope: true,
    templateUrl: 'resources/views/navbar.html',
    controller: function($scope, $element, $location){
        $scope.isActive = function(viewLocation){

            var active = false;

            if(viewLocation === $location.path()){
                active = true;
            }

            return active;

        }
    }
 }
});