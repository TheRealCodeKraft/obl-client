'use strict';

// Grab NODE_ENV and REACT_APP_* environment variables and prepare them to be
// injected into the application via DefinePlugin in Webpack configuration.

var REACT_APP = /^REACT_APP_/i;

function getClientEnvironment(publicUrl) {
  var raw = Object
    .keys(process.env)
    .filter(key => REACT_APP.test(key))
    .reduce((env, key) => {
      env[key] = process.env[key];
      return env;
    }, {
      // Useful for determining whether we’re running in production mode.
      // Most importantly, it switches React into the correct mode.
      'NODE_ENV': process.env.NODE_ENV || 'development',
      'DEV_MODE': process.env.DEV_MODE || 'cloud',
      'CLIENT_ID': process.env.CLIENT_ID || '',
      'CLIENT_SECRET': process.env.CLIENT_SECRET || '',
      'APP_TOKEN': process.env.APP_TOKEN || '',
      'API_URL': process.env.API_URL || '',
      'CLIENT_GRANT_TYPE': process.env.CLIENT_GRANT_TYPE || '',
      'CABLE_URL': process.env.CABLE_URL || '',
      // Useful for resolving the correct path to static assets in `public`.
      // For example, <img src={process.env.PUBLIC_URL + '/img/logo.png'} />.
      // This should only be used as an escape hatch. Normally you would put
      // images into the `src` and `import` them in code to get their paths.
      'PUBLIC_URL': publicUrl
    });
  // Stringify all values so we can feed into Webpack DefinePlugin
  var stringified = {
    'process.env': Object
      .keys(raw)
      .reduce((env, key) => {
        env[key] = JSON.stringify(raw[key]);
        return env;
      }, {})
  };

  return { raw, stringified };
}

module.exports = getClientEnvironment;
