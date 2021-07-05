import { AuthConfig } from 'angular-oauth2-oidc';
import { CompCent } from './globals';
 
export const authConfig: AuthConfig = {

  issuer: 'https://auth-testing.iduruguay.gub.uy',

  redirectUri: CompCent.domino,

  loginUrl: CompCent.domino + '/gubuy/authorize',

  logoutUrl: CompCent.domino + '/gubuy/logout',

  tokenEndpoint: CompCent.domino +'/gubuy/token',

  userinfoEndpoint: CompCent.domino + '/gubuy/userinfo',

  clientId: '890192',
  
  dummyClientSecret: '457d52f181bf11804a3365b49ae4d29a2e03bbabe74997a2f510b179',

  responseType: 'code',

  scope: 'openid personal_info email document',

  showDebugInformation: true,

  requestAccessToken: true,

  oidc: false,
  
  requireHttps: false

};