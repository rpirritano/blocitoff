var app = angular.module("blocitoff", ['firebase']);

app.controller("SampleCtrl", function($scope, $firebaseObject, $firebaseArray) {
  var ref = firebase.database().ref().child("tasks");
  // download the data into a local object
  $scope.tasks = $firebaseArray(ref);
  // $scope.newTask = null;


  $scope.FormSubmission = function(foo){
    $scope.tasks.$add({task: foo})
  }
  //window.somedayAFormSubmission = function(){
    //$scope.tasks.$add({task: "Create a form to do this!"})
  //}
  // $scope.foo = $scope.data

  // window.foo = $scope.data
  // putting a console.log here won't work, see below
});


