exports.onExecutePostLogin = async (event, api) => {
  const namespace = 'http://localhost:3000';
  if (event.authorization) {
    api.idToken.setCustomClaim(`${namespace}/roles`, event.authorization.roles);
    api.accessToken.setCustomClaim(
      `${namespace}/roles`,
      event.authorization.roles
    );
  }
};
