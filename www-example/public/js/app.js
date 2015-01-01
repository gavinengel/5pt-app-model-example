
var HegelApp = angular.module("HegelApp", ['ngRoute', 'HegelControllers', 'HegelServices']);


// added gje
HegelApp.config(['$httpProvider', function($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }
]);

angular.module('HegelApp').run(function($http) {

  $http.defaults.headers.common['X-Auth'] = 'Rope$Wing';

});


toggleSignup = true;


  HegelApp.config(function($routeProvider){

    $routeProvider
      .when('/',
      {
        controller: 'SubjectController',
        templateUrl: 'partials/subject.html'
        })
      .when('/isnot',
          {
            controller: 'IsNotController',
            templateUrl: 'partials/isnot.html'
          })
      .when('/truth',
          {
            controller: 'TruthController',
            templateUrl: 'partials/truth.html'
      })
      .when('/evolution',
        {
          controller: 'EvolutionController',
          templateUrl: 'partials/evolution.html'
        })
      .when('/signup',
        {
          controller: 'SubjectController',
          templateUrl: 'partials/signup.html'
        })
        .when('/profile',
        {
          templateUrl: 'partials/profile.html'
        })
      .otherwise({
        redirectTo: '/'
        });

    });


// directive to focus elements
// from http://angulartutorial.blogspot.com/2014/04/angular-js-auto-focus-for-input-box.html
angular.module('HegelApp').directive('focus', function($timeout) {
  return {
    scope : {trigger : '@focus'
      },
      link : function(scope, element) {
        scope.$watch('trigger', function(value) {
          if (value === "true") {
            $timeout(function() {
              element[0].focus();
            });
          }
        });
      }
    };
  }
);
