var app = angular.module("blocitoff", ['firebase']);

app.controller("HomeCtrl", function($scope, $firebaseObject, $firebaseArray) {
  var ref = firebase.database().ref().child("tasks");
  // download the data into a local object
  $scope.tasks = $firebaseArray(ref);
  // $scope.newTask = null;

  window.bar = $scope.tasks

  $scope.completedTasks = $firebaseArray(ref.orderByChild("completed").equalTo(true))

  

 //to change button text
 var textChange = $("a");
$("a").on("click", function() {
  var expiredLink = $(this);
  if (expiredLink.text() == expiredLink.data("text-swap")) {
    expiredLink.text(expiredLink.data("text-original"));
  } else {
    expiredLink.data("text-original", expiredLink.text());
    expiredLink.text(expiredLink.data("text-swap"));
  }
});
 
  //to hide/show completed tasks
  $scope.completed = "taskObject.expired && taskObject.completed";
  $scope.toggle = function() {
    $scope.completed = !$scope.completed;
  
  };




  $scope.addTask = function(){
    $scope.tasks.$add({
      name: $scope.newTask,
      priority: $scope.priority,
      completed: false,
      expired: false,
      createdAt: firebase.database.ServerValue.TIMESTAMP
    });
  };
  
  $scope.expiredTask = function(taskObject) {
    var currentTime = Date.now();

    if ((currentTime - taskObject.createdAt) >= 604800000){
      //console.log(1)
      return true;
    } else {
     // console.log(2)
      return false;
    }
  };
  
  $scope.priority = function(taskObject) {

  }

  $scope.complete = function(taskObject) {
    taskObject.completed = true
    $scope.tasks.$save(taskObject)

  }
  
  
  //window.somedayAFormSubmission = function(){
    //$scope.tasks.$add({task: "Create a form to do this!"})
  //}
  // $scope.foo = $scope.data

  // window.foo = $scope.data
  // putting a console.log here won't work, see below
});


