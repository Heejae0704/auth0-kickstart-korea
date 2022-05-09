function (user, context, callback) {
  user.user_metadata = user.user_metadata || {};
  user.app_metadata = user.app_metadata || {};

  if (context.protocol === 'redirect-callback') {
    // user came back from the redirect
    user.app_metadata.consent = true;
    auth0.users
      .updateAppMetadata(user.user_id, user.app_metadata)
      .then(function () {
        callback(null, user, context);
      })
      .catch(function (err) {
        callback(err);
      });
  } else {
    // user is logged in directly
    if (user.app_metadata.consent !== true) {
      context.redirect = {
        url: 'http://localhost:3000/consent',
      };
    }
  }
  return callback(null, user, context);
}
