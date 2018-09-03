angular.module('listings').controller('ListingsController', ['$scope', 'Listings', 
  function($scope, Listings) {
    $scope.listings = Listings;
    $scope.detailedInfo = undefined;
    $scope.query = undefined;

    $scope.defaultListing = {
      "code": "", 
      "name": "", 
      "coordinates": {
          "latitude": undefined, 
          "longitude": undefined
      }, 
      "address": ""
    };

    $scope.newListing = angular.copy($scope.defaultListing);

    $scope.addListing = function() {
      if ($scope.newListing.code == "" || $scope.newListing.name == "") {
        alert("Listing must have a code and name.");
      }
      else {
        $scope.listings.splice(0, 0, $scope.newListing);
        $scope.listings.sort(function(a, b){
          if (a.code.toUpperCase() == b.code.toUpperCase()) 
            return 0; 
          else if (a.code.toUpperCase() > b.code.toUpperCase()) 
            return 1; 
          else 
            return -1;
          }
        );
        $scope.resetNewListingForm();  
      }
    };
    $scope.deleteListing = function(index) {
      if (confirm('Do you want to delete building ' + $scope.listings[index].code + '?')) {
        $scope.listings.splice(index, 1);
        $scope.detailedInfo = angular.copy($scope.defaultListing);;
      }
    };
    $scope.showDetails = function(index) {
      $scope.detailedInfo = $scope.listings[index];
    };

    $scope.resetNewListingForm = function() {
      $scope.newListing = angular.copy($scope.defaultListing);
    };

    $scope.codeToIndex = function(code) {
      return $scope.listings.findIndex(function(a) {
        return a.code == code;
      });
    };
  }
]);