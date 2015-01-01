'use strict';

module.exports = {
  //db: 'mongodb://mongo:mongo@proximus.modulusmongo.net:27017/jytEny5s',
  db: 'mongodb',
  app: {
    title: 'Hegel App - Development Environment'
  },
  facebook: {
    clientID: process.env.FACEBOOK_ID || '325329004339288',
    clientSecret: process.env.FACEBOOK_SECRET || '1fd65712b217a176ca280e479b1e3b65',
    callbackURL: 'http://localhost:3000/auth/facebook/callback'
  },
  twitter: {
    clientID: process.env.TWITTER_KEY || 'CL00hT1rQJ1ejLaEKJKcxksHt',
    clientSecret: process.env.TWITTER_SECRET || 'HalRfyJI2HWPgb2sBkM4BtreHhffFyE51Ivja2alwVwWnYLivr',
    callbackURL: 'http://localhost:3000/auth/twitter/callback'
  },
  google: {
    clientID: process.env.GOOGLE_ID || '584820643006-nqsufdb0c9ou1o3cgfm1ed8ksgo506hg.apps.googleusercontent.com',
    clientSecret: process.env.GOOGLE_SECRET || 'LRTxF9k6Ml38OIP0cfU4-rkJ'
    //callbackURL: 'http://127.0.0.1:3000/api/auth/google/callback'
  },
  linkedin: {
    clientID: process.env.LINKEDIN_ID || 'APP_ID',
    clientSecret: process.env.LINKEDIN_SECRET || 'APP_SECRET',
    callbackURL: 'http://localhost:3000/auth/linkedin/callback'
  },
  github: {
    clientID: process.env.GITHUB_ID || 'APP_ID',
    clientSecret: process.env.GITHUB_SECRET || 'APP_SECRET',
    callbackURL: 'http://localhost:3000/auth/github/callback'
  },
  mailer: {
    from: process.env.MAILER_FROM || 'MAILER_FROM',
    options: {
      service: process.env.MAILER_SERVICE_PROVIDER || 'MAILER_SERVICE_PROVIDER',
      auth: {
        user: process.env.MAILER_EMAIL_ID || 'MAILER_EMAIL_ID',
        pass: process.env.MAILER_PASSWORD || 'MAILER_PASSWORD'
      }
    }
  }
};
