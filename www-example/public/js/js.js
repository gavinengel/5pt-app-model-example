


//FB sdk
  window.fbAsyncInit = function() {
    FB.init({
      appId      : '325329004339288',
      xfbml      : true,
      version    : 'v2.1'
    });
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));
//FB




//thesaurus api info

//api key ea61abbf879c8cd605995a860703f119  -- the big thesaurus
//http://words.bighugelabs.com/api/2/ea61abbf879c8cd605995a860703f119/umpire/json

//http://words.bighugelabs.com/api/2/ea61abbf879c8cd605995a860703f119/bad/json


// 44f0ee84-7e1d-4e73-b78f-b75d49 MW

//when thenot changes

  function updatethenot(val){

    document.getElementById("thenot").innerHTML = val;
    document.getElementById("getantonyms").style.display="inline-block";
  }


function fillnotnot(val){
  document.getElementById("notnot").value=val;
  //alert(val);
}


function getTruth(){
  document.getElementById("thetruth").innerHTML = "It's not that " + document.getElementById("subject").value + " is <em> not</em> " + document.getElementById("notnot").value;

}

  function getAntonyms(){


  var urlbase = 'http://words.bighugelabs.com/api',
  version = '2',
  key = 'ea61abbf879c8cd605995a860703f119',
  format = 'json',
  word = '';

  word = document.getElementById("what").value;
  var callbackfunction = 'mycallback';

  url = urlbase + '/' +  version + '/' + key + '/' + word + '/' + format + '?callback=' + callbackfunction;

//http://words.bighugelabs.com/apisample.php?v=2&format=json




$.get(
    url,
    "{format=json}",
    function(d) { 
      for (o in d){
        ants = d[o].ant;
        for (a in ants){
          console.log(ants[a]);
          document.getElementById("antonymfor").innerHTML += "<button class='btn btn-success' onclick='fillnotnot(&quot;"+ants[a]+"&quot;);return false;' id='antbutton"+a+"'>"+(ants[a])+"</button>";
        }
      }
     },
    "jsonp"
);


}; 


