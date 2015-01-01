var apiURLBase = 'http://53greenst1-5003.terminal.com/api/';
var apiURLFull = apiURLBase+'hegels/';


//controller collection
var HegelControllers = angular.module('HegelControllers', []);

HegelControllers.controller('mainController', function ($scope, $http, $location, storageService, $rootScope) {
  $scope.toggleSignup = true;
  $scope.email = $rootScope.email = sessionStorage.email;

});

// added gje
HegelControllers.config(['$httpProvider', function($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }
]);

HegelControllers.controller('googleAuthController', function ($scope, $http, $location, storageService, $rootScope) {

  $scope.auth = function () {

    var config = {
      'client_id': '584820643006-nqsufdb0c9ou1o3cgfm1ed8ksgo506hg.apps.googleusercontent.com',
      'scope': 'https://www.googleapis.com/auth/plus.me'
    };

    gapi.auth.authorize(config, function() {
      console.log('login complete');

      var returnData = gapi.auth.getToken();

      sessionStorage.access_token = returnData.access_token;

      for (rd in returnData) {
        console.log(rd + '(success): ' + returnData[rd]);
        $rootScope.email = returnData.email;
      }
    });

    console.log('sessionStorage: ' + sessionStorage.access_token);

    // And send the token over to the server
    var req = new XMLHttpRequest();

    // consider using POST so query isn't logged
    if (sessionStorage.acess_token != '')  {
      $http.get('https://www.googleapis.com/oauth2/v1/tokeninfo?access_token='+sessionStorage.access_token)
      .success(function (data) {
        $scope.email = data.email;
        console.log('Success: ');
        for (d in data) {
          if (data.hasOwnProperty(d)) {
            console.log(d + '(success ng): ' + data[d]);
            sessionStorage.email = data.email;

          }
        }
      })
      .error(function (err) {
        console.log('Error: ');
        for (e in err) {
          if (err.hasOwnProperty(e)){
            console.log(e + ': ' + err[e]);
          }
        }
      });
    };
  };
});
/*

var req2 = new XMLHttpRequest();
  // consider using POST so query isn't logged
  if (sessionStorage.acess_token != '')  {
    req2.open('GET', 'https://www.googleapis.com/plus/v1/people/112626131499274726627?access_token='+sessionStorage.access_token);
  }

req2.onreadystatechange = function (e) {
  if (req2.readyState == 4) {
     if(req2.status == 200){
      console.log('response 2:  ' + req.responseText);
       window.location = window.location;
   }
  else if(req2.status == 400) {
        alert('There was an error processing the token.')
    }
    else {
      alert('something else other than 200 was returned')
    }
  }
};
req2.send(null);

*/



//Subject Controller
HegelControllers.controller('SubjectController', function ($scope, $http, $location, storageService, $rootScope) {

 //set the is/are variable
  $scope.tenses = "is not";
  //clear localStorage
  localStorage.clear();

$scope.usera = sessionStorage.usera;



  $scope.localLogin = function (email, password, username) {
    $http.post(apiURLBase+'signup', {"email": email, "password": password, "username": username})
    .success(function (data) {
      for (d in data){
        if (d == "email") {
          $rootScope.email = data[d].trim();
          sessionStorage.email = data[d].trim();
        }
        if (d == "username") {
          $scope.user = data[d].trim();
          sessionStorage.usera = data[d].trim();
        }
        console.log(d + data[d]);
      }
          $rootScope.toggleSignup = false;
          $location.path('/');
    })

    .error(function (err) {
      console.log('error: ' + err);

      for (e in err) {
        console.log(err[e]);
      }
    });


console.log('email: ' + email + 'password: ' + password);

  }

  $scope.toggleisare = function () {
    if ($scope.tenses === "is not") {
      $scope.tenses = "are not";
    } else {
      $scope.tenses = "is not";
    }
  };


  //get the nots array, returns empty array or nots
  var hegel = storageService.get('hegel');

    console.log(typeof hegel);

  // process the form, maybe turn to service and/or seperate controller
  $scope.processForm = function () {
    var thought = $scope.thought.trim(),
      negative = $scope.negative.trim(),
      tenses = $scope.tenses;

    if (!thought.length) {
      return;
    }

    //push Subject values to array
    hegel.push({
      thought: thought,
      negative: negative,
      tense: tenses
    });

    storageService.set('hegel', hegel);

    $http.post(apiURLFull, {thought: thought, negative: negative, tense: tenses}).success(function (data) {
      localStorage._id = data._id;
      for (d in data) {
        console.log(d + data[d]);
      }
    });

    $location.path('/isnot');
  };
});


//  IsNotController
HegelControllers.controller('IsNotController', function ($scope, $location, $http, storageService) {

  //retrieve the notnots
  var hegel = storageService.get('hegel');
  var lasthegel = hegel[hegel.length - 1];
  $scope.tenses = lasthegel.tense;
  $scope.negative = lasthegel.negative;



  //hide suggestion box until needed
  //$scope.showants = false;


  $scope.toggleisare = function () {
    if ($scope.tenses == "is not") {
      $scope.tenses = "are not";
    } else {
      $scope.tenses = "is not";
    }
  };

  $scope.processNotNot = function () {
    var lasthegel = hegel[hegel.length-1];

    hegel.push({
      thought: lasthegel.thought,
      negative: lasthegel.negative,
      tense: lasthegel.tense, //look at original comp
      doublenegative: $scope.doublenegative  //only new value pretty lazy array work
    });

    storageService.set('hegel', hegel);

    $location.path('/truth');

  };

});

//  TruthController
HegelControllers.controller('TruthController', function ($scope, $http, $location, storageService) {
  $scope.tenses = "is not";
    $scope.toggleisare = function(){
    if ($scope.tenses == "is not") {
      $scope.tenses = "are not";
    }else{
      $scope.tenses = "is not";
    }
  };

  //retrieve the notnots
  var hegel = $scope.hegel = storageService.get('hegel');

  var lasthegel = hegel[hegel.length-1];
  $scope.thought = lasthegel.thought;
  $scope.tenses = lasthegel.tense;
  $scope.negative = lasthegel.negative;
  $scope.doublenegative = lasthegel.doublenegative;


  $scope.processTruth = function(){

  $scope.hegel.push({

  thought: $scope.hegel[$scope.hegel.length-1].thought,
  negative: $scope.hegel[$scope.hegel.length-1].negative,
  tense: $scope.hegel[$scope.hegel.length-1].tense,
  doublenegative: $scope.hegel[$scope.hegel.length-1].doublenegative,
  synthesis: $scope.synthesis
  });

    storageService.set('hegel', $scope.hegel);

       $http({
           method: "POST",
           url: apiURLFull,
           data: {
                   "thought" :$scope.hegel[$scope.hegel.length-1].thought,
                   "negative": $scope.hegel[$scope.hegel.length-1].negative,
                   "doublenegative": $scope.hegel[$scope.hegel.length-1].doublenegative,
                   "synthesis": $scope.synthesis,
                   "tense" : $scope.hegel[$scope.hegel.length-1].tense
            }
        });
        
        console.log('there it is.');
        
        
    $location.path('/evolution');
  };
});



//  EvolutionController
HegelControllers.controller('EvolutionController', function ($scope, $location, storageService) {

  $scope.tenses = "is not";
          $scope.toggleisare = function(){
          if ($scope.tenses == "is not") {
            $scope.tenses = "are not";
          }else{
            $scope.tenses = "is not";
          }
        };

   //retrieve the notnots
  var hegel = $scope.hegel = storageService.get('hegel');

  var lasthegel = hegel[hegel.length-1];
  $scope.thought = lasthegel.thought;
  if (lasthegel.tense == "are not") {
    $scope.is = "are";
  } else {
    $scope.is = "is";
  }
  $scope.negative = lasthegel.negative;
  $scope.doublenegative = lasthegel.doublenegative;
  $scope.synthesis = lasthegel.synthesis

  $scope.processTruth = function(){

      $scope.notnots.push({
      thought: $scope.hegel[$scope.hegel.length-1].thought,
      negative: $scope.hegel[$scope.hegel.length-1].negative,
      tense: $scope.hegel[$scope.hegel.length-1].tense, //look at original comp
      doublenegative: $scope.hegel[$scope.hegel.length-1].doublenegative,
      synthesis: $scope.synthesis
    });

    storageService.set('hegel', $scope.hegel);

    $location.path('/evolution');
  };

});



 //-----------------------
    // IP address for future suggestions (e.g. geo lookup for nearby things)
  //$scope.IPA = function(){
    //$http.jsonp('http://jsonip.com?callback=JSON_CALLBACK')
      //.success(function(json){
        //console.log("IP is " + json.ip);
      //});
    //};
    //$scope.IPA();

  // get a random word if selected
  //$scope.GetRandomWord = function (){
      //var url = "http://randomword.setgetgo.com/get.php?callback=JSON_CALLBACK";
      //$http.jsonp(url)
      //.success(function(d){
        //for (var o in d){
          //     $scope.subject = d[o];
        //}
      //
      //}).error(function(d) {
        //console.log('error');
      //});
    //};
  //-----------------------

  // Synonyms and Antonyms API, maybe later
  // ----------------------------------------------
  //get synonms
  /*$scope.setnotnotnot = function (){
    $scope.notnotnot = $scope.suggestions.syn;
    $scope.showants = false;
  };

  $scope.SubjectIsNot = $scope.notnots[$scope.notnots.length-1].not;
  //var NotNotIsAre = $scope.NotNotIsAre = notnots[notnots.length-1].isare;

    var ants = $scope.ants = [
      {syn : "..."}
      ];

   $scope.suggestions = $scope.ants[0];


   $scope.getSyns = function(){
    var bob = null;
   };

  $scope.getAntonyms = function() {

        //thesaurus settings
    var urlbase = 'http://words.bighugelabs.com/api',
    version = '2',
    key = 'ea61abbf879c8cd605995a860703f119',
    format = 'json',
    word;


    var callback = 'JSON_CALLBACK';
    word = $scope.SubjectIsNot;
    url = urlbase + '/' +  version + '/' + key + '/' + word + '/' + format + '?callback='+callback;

    // set the lookup word, which is part of the url

    // https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=API&lang=en-ru&text=time&callback=myCallback
    //api key


  //http://words.bighugelabs.com/apisample.php?v=2&format=json

    var superants = [];
    $http.jsonp(url)
      .success(function(d){
        //show suggestion box until needed
        $scope.showants = true;



        for (var o in d){console.log('d0: ' + d[o].ant);
        superants = d[o].ant;
        for (var a in superants){
          $scope.ants.push({
            syn: superants[a]
          });
          console.log(superants[a]);
          //document.getElementById("antonymfor").innerHTML += "<button class='btn btn-success' onclick='fillnotnot(&quot;"+ants[a]+"&quot;);return false;' id='antbutton"+a+"'>"+(ants[a])+"</button>";
        }
      }
      }).error(function(d) {
        $scope.suggest = "no results found; roll your own";

      });

  };

  // google translate AIzaSyCkzQMyNxAk4DUBFalmTrRK21Q9dK0MZKA

  //yandex api dict.1.1.20141004T051337Z.1b103fb9bc14258f.a9cce070b0b46169cf864b7e2752dba3a621492c

*/
