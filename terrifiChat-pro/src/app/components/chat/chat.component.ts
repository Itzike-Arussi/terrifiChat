
//⚡ This file contain 8 functions: ⚡
// 1. Open chat.
// 2. Close chat. 
// 3. When user send a new message.
// 4. on reply BT clicked
// 5. on Cancle Reply bt clicked 
// 6. Import all messages from Firebase
// 7. Check validition while user input a text
// 8. Auto scroll

//◐⊷⊷⊷⊷⊷⊷⊷⊷⊷⊷⊷⊷⊷⊷⊷⊷⊷⊷⊷⊷⊷⊷⊷⊷⊷⊷⊷⊷⊷⊷⊷⊷⊷⊷⊷⊷⊷⊷⊷⊷⊷⊷⊷⊷⊷⊷⊷◐

import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})

export class ChatComponent implements OnInit {
  @ViewChild('scrollMe')


  private myScrollContainer!: ElementRef;
  dataSource : any;
  id : any;
  message : any;
  userName: any = ''
  replyAreaName: any =""
  replyAreaMsg: any=""
  replyAreaImg:any=""
  replyAreaBG:any=""

  constructor(private store: AngularFirestore){}

  ngOnInit(){
      this.getAll();
      this.scrollToBottom();
      var name=localStorage.getItem("userName");
      var photo=localStorage.getItem("userPhoto") as string;
      this.userName=name;
      
  }

  ngAfterViewChecked() {        
      this.scrollToBottom();      
} 





//⚡ ----Open chat ----
onChatFrameOpen(elm: HTMLElement){
  elm.style.left="7.5%";
  elm.style.opacity="1";
  (document.querySelector("#open-Chat-Button") as HTMLElement).style.visibility="hidden";
  (document.querySelector("#close-Chat-Button") as HTMLElement).style.visibility="visible";
  (document.querySelector("#close-Chat-Button") as HTMLElement).style.transform="rotate(180deg)";
    this.scrollToBottom();
    setTimeout(() => {
      (document.querySelector("#chat-mainFrame-footer-sendBT") as HTMLElement).style.transform="rotateX(180deg)";
      var user = firebase.auth().currentUser;
      if(user == null){
        (document.querySelector("#logoutFrame") as HTMLElement).style.display="none";
        }else{
          (document.querySelector("#logoutFrame") as HTMLElement).style.display="initial";
      } 
    }, 800);
}



//⚡ ----- Close chat -----
  onChatFrameClose(elm: HTMLElement){
    elm.style.left="-50%";
    elm.style.opacity="0";
    (document.querySelector("#open-Chat-Button") as HTMLElement).style.visibility="visible";
    (document.querySelector("#close-Chat-Button") as HTMLElement).style.visibility="hidden";
    (document.querySelector("#close-Chat-Button") as HTMLElement).style.transform="rotate(0deg)";
    (document.querySelector("#logoutFrame") as HTMLElement).style.display="none"; 
}


//⚡ ----- When user send a new message -----
add(elm: any){
  var user = firebase.auth().currentUser;
    if(user == null){
      (document.querySelector("#loginFrame") as HTMLInputElement).style.visibility="visible";
      (document.querySelector("#loginFrame") as HTMLInputElement).style.top="18%";
    }else{

    if( elm == "") {
          (document.querySelector("#chat-mainFrame-footer-textRequired") as HTMLElement).style.visibility="visible";
    }else{
      (document.querySelector("#chat-mainFrame-footer-textRequired") as HTMLElement).style.visibility="hidden";
       var today = new Date();
       var timeForDisplay =today.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
       var name=localStorage.getItem("userName");
       var photo=localStorage.getItem("userPhoto");
       var nameReplyed = this.replyAreaName;
       var msgReplyed = this.replyAreaMsg;
       var imgReplyed = this.replyAreaImg;
       this.userName=name;
       setTimeout(() => {
         this.store.collection('list').add({message : this.message, timeAsNum : today,  timeForDisplay : timeForDisplay, name: name, photo: photo, nameReplyed: nameReplyed, msgReplyed: msgReplyed, imgReplyed: imgReplyed});
         (document.querySelector("#chat-mainFrame-footer-input") as HTMLInputElement).value="";
       }, 150);
       this.onCancleReply()
      }
    }
}



//⚡ -------- on reply BT clicked ------
onRepkyBTclicked(name: any , msg:any, img:any, elm:any){
  this.replyAreaName=name.innerHTML;
  this.replyAreaMsg=msg.innerHTML;
  this.replyAreaImg=img.src;
    (document.querySelector("#chat-mainFrame-footer") as HTMLElement).style.height="142px";
    (document.querySelector("#chat-mainFrame-footer-replyArea") as HTMLElement).style.visibility="visible";
    (document.querySelector("#chat-mainFrame-footer-replyArea") as HTMLElement).style.transform="scale(1)";
    (document.querySelector("#chat-mainFrame-footer") as HTMLElement).style.borderTopLeftRadius="14px";
    (document.querySelector("#chat-mainFrame-body") as HTMLElement).style.height="80%";
    (document.querySelector("#replyArea-msg-closeBT") as HTMLElement).style.transform="rotateX(360deg)"; 
    var userName=localStorage.getItem("userName");
    if(name.innerHTML===userName){
      this.replyAreaBG="#ef65a259"
    }else{
      this.replyAreaBG="#fad6bf"
  }
}




//⚡ ----- on Cancle Reply bt clicked -----
onCancleReply(){
  this.replyAreaName="";
  this.replyAreaMsg="";
  (document.querySelector("#replyArea-msg-closeBT") as HTMLElement).style.transform="rotateX(0deg)";
    setTimeout(() => {
      (document.querySelector("#chat-mainFrame-footer-replyArea") as HTMLElement).style.visibility="hidden";
      (document.querySelector("#chat-mainFrame-footer-replyArea") as HTMLElement).style.transform="scale(0)";
      (document.querySelector("#chat-mainFrame-footer") as HTMLElement).style.height="72px";
    }, 100);
      (document.querySelector("#chat-mainFrame-footer") as HTMLElement).style.borderTopLeftRadius="12px";
      (document.querySelector("#chat-mainFrame-body") as HTMLElement).style.height="97%"; 
}

//⚡ ------- Import all messages from Firebase --------
getAll(){
    this.store.collection('list', ref => ref.orderBy("timeAsNum","asc")).snapshotChanges().subscribe((response) => {
    this.dataSource = response.map(item => {
      return Object.assign({id : item.payload.doc.id}, item.payload.doc.data())
    });
  })
}


//⚡ ------- Check validition while user input a text ------
checkValidition(){
  (document.querySelector("#chat-mainFrame-footer-textRequired") as HTMLElement).style.visibility="hidden";
}


//⚡ ------- Auto scroll ------
  scrollToBottom(): void {
    try {
        this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) { }                 
}



}
