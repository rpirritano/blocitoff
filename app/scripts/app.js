var app = angular.module("blocitoff", ['firebase']);

app.controller("HomeCtrl", function($scope, $firebaseObject, $firebaseArray) {
  var ref = firebase.database().ref().child("tasks");
  // download the data into a local object
  $scope.tasks = $firebaseArray(ref.orderByChild("priority"));
  window.bar = $scope.tasks
  $scope.completedTasks = $firebaseArray(ref.orderByChild("completed").equalTo(true))

  //to change link text
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
   
      var taskObject = {
        name: $scope.newTask,
        priority: $scope.priority,
        completed: false,
        activeState: true,
        createdAt: firebase.database.ServerValue.TIMESTAMP
    };
      $scope.tasks.$add(taskObject);
      $scope.newTask = "";
      $scope.priority = "";
  }
  
  $scope.expiredTask = function(taskObject) {
    var currentTime = new Date();
    var sevenDays = 604800000;
    if ((currentTime.getTime() - taskObject.createdAt) >= sevenDays){
      taskObject.active = false;
      }
      $scope.tasks.$save(taskObject)
  };
  //marking task as complete
  $scope.complete = function(taskObject) {
    taskObject.completed = true
    $scope.tasks.$save(taskObject)
  }
  

  //remove task from database
  $scope.removeTask = function(taskObject) {
    $scope.tasks.$remove(taskObject);
  };

  

}); 
  //window.somedayAFormSubmission = function(){
    //$scope.tasks.$add({task: "Create a form to do this!"})
  //}
  // $scope.foo = $scope.data

  // window.foo = $scope.data
  // putting a console.log here won't work, see below



