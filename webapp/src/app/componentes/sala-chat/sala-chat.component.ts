import { DatePipe } from '@angular/common';
import { variable } from '@angular/compiler/src/output/output_ast';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import firebase from 'firebase/app'
import 'firebase/database';
import { Usuario } from 'src/app/interfaces/Usuario';
import { GubuyService } from 'src/app/servicios/gubuy.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

export const snapshotToArray = (snapshot: any) => {
  const returnArr = [];

  snapshot.forEach((childSnapshot: any) => {
      const item = childSnapshot.val();
      item.key = childSnapshot.key;
      returnArr.push(item);
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

  constructor(private router: Router,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              public datepipe: DatePipe) {
                firebase.database().ref('chats/').on('value', resp => {
                  this.chats = [];
                  this.chats = snapshotToArray(resp);
                  setTimeout(() => this.scrolltop = this.chatcontent.nativeElement.scrollHeight, 500);
                });
              }

  ngOnInit(): void {
    if (sessionStorage['userLogged']) {
      const user = JSON.parse(sessionStorage.getItem("userLogged")) as Usuario;
      var split = user.nombre_completo.split(" "); 
      this.nickname = split[0];
      console.log(this.nickname)
    } 
    this.users.push(this.nickname);
    this.chatForm = this.formBuilder.group({
      'message' : [null, Validators.required]
    });
    
    const newRoom = firebase.database().ref('rooms/').push();
    newRoom.set({ 'roomname' : 'vacunasuy' });
  }

  ngOnDestroy() {
    this.desconectar(this.nickname);
    console.log("chau")
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

  desconectar(nickname: String): void{
    this.users = this.users.filter(item => item != nickname);
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
