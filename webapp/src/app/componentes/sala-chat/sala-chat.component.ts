import { DatePipe } from '@angular/common';
import { variable } from '@angular/compiler/src/output/output_ast';
import { chainedInstruction } from '@angular/compiler/src/render3/view/util';
import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import firebase from 'firebase/app'
//import * as firebase from 'firebase/app';
//export default firebase;
import 'firebase/database';
import { Usuario } from 'src/app/interfaces/Usuario';
import { GubuyService } from 'src/app/servicios/gubuy.service';
import { VacunadorServiceService } from 'src/app/servicios/servicioVacunador/vacunador-service.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

export const snapshotToArray = (snapshot: any) => {
  const returnArr = [];

  snapshot.forEach((childSnapshot: any) => {
        if(childSnapshot.val().message != null){
          const item = childSnapshot.val();
          item.key = childSnapshot.key;
          returnArr.push(item);
        }
        else{
          const item = childSnapshot.val();
          //item.key = childSnapshot.key;
          //const item = { key: childSnapshot.key, value: snapshot.val() }
          returnArr.push(item);
        }
  });

  return returnArr;
};


@Component({
  selector: 'app-sala-chat',
  templateUrl: './sala-chat.component.html',
  styleUrls: ['./sala-chat.component.css']
})
export class SalaChatComponent implements OnInit {

  @ViewChild('chatcontent') chatcontent: ElementRef;
  scrolltop: number = null;

  chatForm: FormGroup;
  nickname = '';
  message = '';
  users = [];
  chats = [];
  matcher = new MyErrorStateMatcher();

  inChat = false;

  refer = firebase.database().ref('users/');

  constructor(private router: Router,
              private vacunadorService: VacunadorServiceService,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              public datepipe: DatePipe) {
                firebase.database().ref('chats/').on('value', resp => {
                  this.chats = [];
                  this.chats = snapshotToArray(resp);
                  setTimeout(() => this.scrolltop = this.chatcontent.nativeElement.scrollHeight, 500);
                });
                firebase.database().ref('users/').on('value', resp => {
                  console.log(snapshotToArray(resp))
                  this.users = snapshotToArray(resp);
                });
                
              }

  ngOnInit(): void {
    if (sessionStorage['userLogged']) {
      const user = JSON.parse(sessionStorage.getItem("userLogged")) as Usuario;
      this.vacunadorService.esVacunador(user.numero_documento).subscribe(data =>{
        console.log(data)
        if(data){
          var split = user.nombre_completo.split(" "); 
          this.nickname = split[0];
            firebase.database().ref('users/'+ this.nickname).set({
            'nickname': this.nickname 
          });
        }
        else{
          this.router.navigate(['/']);
        }
      });
    } 
    this.chatForm = this.formBuilder.group({
      'message' : [null, Validators.required]
    });
  }

  ngOnDestroy() {
    this.desconectar(this.nickname)
  }

  onFormSubmit(form: any) {
    const chat = form;
    chat.nickname = this.nickname;
    chat.date = this.datepipe.transform(new Date(), 'dd/MM/yyyy HH:mm:ss');
    chat.type = 'message';
    const newMessage = firebase.database().ref('chats/').push();
    newMessage.set(chat);
    this.chatForm = this.formBuilder.group({
      'message' : [null, Validators.required]
    });
  }
  desconectar(nickname: string) {
    this.exitChat();
    this.deleteUser(nickname)
    //this.users = this.users.filter(item => item.nickname !== nickname);     
  }

  deleteUser(nickname: string){
    firebase.database().ref('users/'+ this.nickname).set(null);
  }

  exitChat() {
    const chat = { nickname: '', message: '', date: '', type: '' };
    chat.nickname = this.nickname;
    chat.date = this.datepipe.transform(new Date(), 'dd/MM/yyyy HH:mm:ss');
    chat.message = `${this.nickname} abandono la sala`;
    chat.type = 'exit';
    const newMessage = firebase.database().ref('chats/').push();
    newMessage.set(chat);
  }
}
