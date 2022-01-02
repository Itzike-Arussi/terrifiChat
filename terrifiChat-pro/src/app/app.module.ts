import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { ChatComponent } from './components/chat/chat.component';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [AppComponent, ChatComponent, LoginComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyDoX5J9J8riOy4rdWP79fL4Egg9_qMjphg",
      authDomain: "terrifichat-5b565.firebaseapp.com",
      databaseURL: "https://terrifichat-5b565-default-rtdb.firebaseio.com",
      projectId: "terrifichat-5b565",
      storageBucket: "terrifichat-5b565.appspot.com",
      messagingSenderId: "806842852559",
      appId: "1:806842852559:web:d408162f141f4e2d7e83ba"
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
