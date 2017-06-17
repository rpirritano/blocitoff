var app = angular.module("blocitoff", ['firebase']);

app.controller("SampleCtrl", function($scope, $firebaseObject, $firebaseArray) {
  var ref = firebase.database().ref();
  // download the data into a local object
  $scope.data = $firebaseArray(ref);


  $scope.foo = $scope.data

  window.foo = $scope.data
  // putting a console.log here won't work, see below
});


