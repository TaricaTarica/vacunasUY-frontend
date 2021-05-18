import { AuthConfig } from 'angular-oauth2-oidc';
 
export const authConfig: AuthConfig = {

  issuer: 'https://auth-testing.iduruguay.gub.uy',

  redirectUri: 'http://localhost:8080',

  loginUrl: 'http://localhost:8080/gubuy/authorize',

  logoutUrl: 'http://localhost:8080/gubuy/logout',

  clientId: '890192',
  
  dummyClientSecret: '457d52f181bf11804a3365b49ae4d29a2e03bbabe74997a2f510b179',

  responseType: 'code',

  scope: 'openid personal_info email document',

  showDebugInformation: true,

  requestAccessToken: true,

  oidc: false,
  
  requireHttps: false

};