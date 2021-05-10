import { AuthConfig } from 'angular-oauth2-oidc';
 
export const authConfig: AuthConfig = {

  issuer: 'https://auth-testing.iduruguay.gub.uy',

  redirectUri: 'http://localhost:8080',

  tokenEndpoint: 'https://auth-testing.iduruguay.gub.uy/oidc/v1/token',

  loginUrl: 'https://auth-testing.iduruguay.gub.uy/oidc/v1/authorize',

  logoutUrl: 'https://auth-testing.iduruguay.gub.uy/oidc/v1/logout',

  userinfoEndpoint: 'https://auth-testing.iduruguay.gub.uy/oidc/v1/userinfo',

  clientId: '890192',
  
  dummyClientSecret: '457d52f181bf11804a3365b49ae4d29a2e03bbabe74997a2f510b179',

  responseType: 'code',

  scope: 'openid%20personal%20email',

  showDebugInformation: true,

  strictDiscoveryDocumentValidation: false,

};