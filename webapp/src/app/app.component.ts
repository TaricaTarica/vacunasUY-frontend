import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, NgModule, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Token } from './interfaces/token';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  code: string;
  state: string;
  token: Token;
  
  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        this.code = params.code;
        this.state = params.state;
      }
    );
  }
  sendReqToken(){
    this.http.post<any>('https://auth-testing.iduruguay.gub.uy/oidc/v1/token/', {
      headers: new HttpHeaders({
        'Authorization': 'Basic '+btoa('890192:457d52f181bf11804a3365b49ae4d29a2e03bbabe74997a2f510b179'),
        'Content-Type': 'application/x-www-form-urlencoded'
      }),
      observe: 'body',
      params: new HttpParams()
        .set('code', this.code)
        .set('grant_type', 'authorization_code')
        .set('redirect_uri', 'http://localhost:8080/')
      ,
      responseType: 'json',
      withCredentials: false
    }).subscribe(token => this.token = {
      access_token: token.access_token,
      token_type: token.token_type,
      refresh_token: token.refresh_token,
      expires_in: token.expires_in,
      id_token: token.id_token
    });
    console.log(this.token);
    console.log("hola humano");
  }
  getToken(){
    console.log(this.token);
  }
}
//https://auth-testing.iduruguay.gub.uy/oidc/v1/token?grant_type=authorization_code&client_id=890192&client_secret=457d52f181bf11804a3365b49ae4d29a2e03bbabe74997a2f510b179&code=1eccc603a69b424b9989bc3d57b1ea30&redirect_uri=http://localhost:8080 */