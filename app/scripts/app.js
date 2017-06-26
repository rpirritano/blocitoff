var app = angular.module("blocitoff", ['firebase']);

app.controller("HomeCtrl", function($scope, $firebaseObject, $firebaseArray) {
  var ref = firebase.database().ref().child("tasks");
  // download the data into a local object
  $scope.tasks = $firebaseArray(ref);
  // $scope.newTask = null;


  $scope.addTask = function(){
    $scope.tasks.$add({
      name: $scope.newTask,
      completed: false,
      expired: false,
      createdAt: firebase.database.ServerValue.TIMESTAMP
    });
  };
  
  $scope.expiredTask = function(task) {
    var currentTime = new Date();
    if ((currentTime - task.createdAt) >= 604800000){
      return true;
    } else {
      return false;
    }
  };
  

  //window.somedayAFormSubmission = function(){
    //$scope.tasks.$add({task: "Create a form to do this!"})
  //}
  // $scope.foo = $scope.data

  // window.foo = $scope.data
  // putting a console.log here won't work, see below
});


