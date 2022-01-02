// ⚡ This file contain 3 functions: ⚡
// 1. Login.
// 2. Logout. 
// 3.unshow login frame.

//◐⊷⊷⊷⊷⊷⊷⊷⊷⊷⊷⊷⊷⊷⊷⊷⊷⊷⊷⊷⊷⊷⊷⊷⊷⊷⊷⊷⊷⊷⊷⊷⊷⊷⊷⊷⊷⊷⊷⊷⊷⊷⊷⊷⊷⊷⊷⊷◐


import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireModule} from '@angular/fire/compat';
import {FormBuilder} from '@angular/forms';
import 'firebase/auth';
import { getAuth, signOut } from "firebase/auth";
import firebase from 'firebase/compat/app';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})


export class LoginComponent implements OnInit {
  userImg: any = ''
  uName: any = ''
  

  constructor(
    private fb: FormBuilder,
    private auth2: AngularFireAuth,
    private store: AngularFirestore
  ) {}

  ngOnInit(): void {
    var photo=localStorage.getItem("userPhoto");
    var name=localStorage.getItem("userName");
    this.uName=name;
    this.userImg=photo;
  }

  
//⚡  ------- on Login ------
  onLoginWithGoogle() {
    this.auth2
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
        .then ((res) =>{
              const userName = res.user?.displayName as string;
              const userPhoto = res.user?.photoURL as string;
              localStorage.setItem("userName", userName as string);
              localStorage.setItem("userPhoto", userPhoto as string);
              (document.querySelector("#logoutFrame") as HTMLElement).style.display="initial";
              this.uName=userName;
              this.userImg=userPhoto;
              (document.querySelector("#logoutFrame-userImg-toolTip") as HTMLInputElement).style.visibility="visible";
              (document.querySelector("#logoutFrame-iconAnimat") as HTMLElement).style.visibility="visible";
             
              setTimeout(() => {
                (document.querySelector(".logoutFrame-userImg") as HTMLElement).style.boxShadow="0 0 0px 2px #3bb54a"; 
                (document.querySelector("#logoutFrame-iconAnimat") as HTMLElement).style.visibility="hidden"; 
                (document.querySelector("#logoutFrame-userImg-V") as HTMLElement).style.visibility="visible";
                (document.querySelector("#logoutFrame-userImg-V") as HTMLElement).style.transform="rotateX(360deg)";
              }, 6000);
              
            }).catch((error) => {
                console.log(error)
          });    
      this.onCloseLoginWithGoogle();
  }




//⚡ ------- on Logout ------
onsignOut(){
    (document.querySelector("#logoutFrame-userImg-toolTip") as HTMLInputElement).style.visibility="hidden";
    (document.querySelector("#loginFrame") as HTMLInputElement).style.visibility="visible";
    (document.querySelector(".logoutFrame-userImg") as HTMLElement).style.boxShadow="0 0 0px 2px red"; 
    (document.querySelector("#logoutFrame-userImg-V") as HTMLElement).style.visibility="hidden";
    (document.querySelector("#logoutFrame-userImg-V") as HTMLElement).style.transform="rotateX(0deg)";
    const auth = getAuth();

    signOut(auth).then(() => {
      (document.querySelector("#logoutFrame-iconAnimat2") as HTMLElement).style.visibility="visible";
        setTimeout(() => {
          (document.querySelector("#logoutFrame-iconAnimat2") as HTMLElement).style.visibility="hidden"; 
          (document.querySelector("#loginFrame") as HTMLInputElement).style.visibility="visible";
          (document.querySelector("#loginFrame") as HTMLInputElement).style.top="18%";
          (document.querySelector("#logoutFrame") as HTMLElement).style.display="none";
        }, 3000);
  }).catch((error) => {
    alert("An error has occurred, please try again.")
  });
}




//⚡ ------ on Close Login frame ------
  onCloseLoginWithGoogle(){
    (document.querySelector("#loginFrame") as HTMLInputElement).style.visibility="hidden";
    (document.querySelector("#loginFrame") as HTMLInputElement).style.top="58px";
  }


}
