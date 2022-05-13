function(user, context, callback) {

  var CLIENTS_WITH_MFA = ['YOUR_CLIENT_ID'];
  // run only for the specified clients
  if (CLIENTS_WITH_MFA.indexOf(context.clientID) !== -1) {
    // ask for MFA only if scope transfer:funds was requested
    if (context.request.query.scope.indexOf('read:contacts') > -1) {
      context.multifactor = {
        provider: 'any',
        allowRememberBrowser: false
      };
    }
  }

  callback(null, user, context);
}