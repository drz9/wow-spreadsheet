function getDriveService(clientid, clientsecret) {
  // Create a new service with the given name. The name will be used when
  // persisting the authorized token, so ensure it is unique within the
  // scope of the property store.
  return OAuth2.createService('blizzard-api')
      // Set the endpoint URLs, which are the same for all Google services.
      .setAuthorizationBaseUrl('https://eu.battle.net/oauth/authorize')
      .setTokenUrl('https://eu.battle.net/oauth/token')

      // Set the client ID and secret, from the Google Developers Console.
      .setClientId(clientid)
      .setClientSecret(clientsecret)

      // Set the name of the callback function in the script referenced
      // above that should be invoked to complete the OAuth flow.
      .setCallbackFunction('authCallback')

      // Set the property store where authorized tokens should be persisted.
      .setPropertyStore(PropertiesService.getUserProperties())

      // Set the scopes to request (space-separated for Google services).
      .setScope('wow.profile')

      // Below are Google-specific OAuth2 parameters.

      // Sets the login hint, which will prevent the account chooser screen
      // from being shown to users logged in with multiple accounts.
      .setParam('login_hint', Session.getEffectiveUser().getEmail())

      // Requests offline access.
      .setParam('access_type', 'offline')

      // Consent prompt is required to ensure a refresh token is always
      // returned when requesting offline access.
      .setParam('prompt', 'consent');
}

function showSidebar(clientid, clientsecret) {
  var driveService = getDriveService(clientid, clientsecret);
  if (!driveService.hasAccess()) {
    var authorizationUrl = driveService.getAuthorizationUrl({
      param1: clientid,
      param2: clientsecret
    });
    var template = HtmlService.createTemplate(
        '<a href="<?= authorizationUrl ?>" target="_blank">Authorize</a>. ' +
        'Reopen the sidebar when the authorization is complete.');
    template.authorizationUrl = authorizationUrl;
    var page = template.evaluate();
    SpreadsheetApp.getUi().showSidebar(page);
  } else {
  }
}

function authCallback(request) {
  var clientid = request.parameter.param1;
  var clientsecret = request.parameter.param2;
  var driveService = getDriveService(clientid, clientsecret);
  var isAuthorized = driveService.handleCallback(request);
  if (isAuthorized) {
    return HtmlService.createHtmlOutput('Success! You can close this tab.');
  } else {
    return HtmlService.createHtmlOutput('Denied. You can close this tab');
  }
}

function logout() {
  var service = getDriveService()
  service.reset();
}
