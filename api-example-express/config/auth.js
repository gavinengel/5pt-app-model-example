// expose our config directly to our application using module.exports
module.exports = {

  'facebookAuth' : {
    'clientID'    : '823631677658921', // your App ID
    'clientSecret'  : '8011420a7b0b33aa1d80af645f145b74', // your App Secret
    'callbackURL'   : 'http://kethle.com:8080/auth/facebook/callback'
  },

  'twitterAuth' : {
    'consumerKey'     : 'Z5Ognryrjw1PIw3y3avAyP36J',
    'consumerSecret'  : 'eQvwCyectrvyHapsNXLpE22kmJceVwJ8k1insDBO6O6b2Tu8bZ',
    'callbackURL'     : 'http://kethle.com:8080/auth/twitter/callback'
  },

  'googleAuth' : {
    'clientID'    : '581320313455-3qjgtaqg5p3eepgm5ijf2qfjnckncjqu.apps.googleusercontent.com',
    'clientSecret'  : 'ZpzUcyDCjDAkZ_jklu7iUnal',
    'callbackURL'   : 'http://kethle.com:8080/auth/google/callback'
  }

};
