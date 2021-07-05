import { Component, VERSION } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  FirebaseuiAngularLibraryService,
  FirebaseUISignInFailure,
  FirebaseUISignInSuccessWithAuthResult
} from 'firebaseui-angular';
import * as firebase from 'firebase';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  //ref = firebase.database().ref('messages/');
  name = 'Angular ' + VERSION.major;

  successCallback(signInSuccessData: FirebaseUISignInSuccessWithAuthResult) {
    console.log('successCallback');
  }

  errorCallback(errorData: FirebaseUISignInFailure) {
    console.log('errorCallback');
  }

  uiShownCallback() {
    console.log('uiShownCallback');
  }
  user: any = null;
  constructor(
    private firebaseuiAngularLibraryService: FirebaseuiAngularLibraryService,
    private angularFireAuth: AngularFireAuth
  ) {
    this.angularFireAuth.authState.subscribe(
      data => {
        // Success
        this.user = data;
        console.log(data);
      },
      error => {
        console.error(error);
      }
    );
    //firebaseuiAngularLibraryService.firebaseUiInstance.disableAutoSignIn();
    console.log(this.angularFireAuth.authState);
    this.angularFireAuth.authState.subscribe(this.firebaseAuthChangeListener);
  }
  logout() {
    this.angularFireAuth.signOut();
  }
  firebaseAuthChangeListener(response) {
    // if needed, do a redirect in here
    if (response) {
      //alert('Logged in :)');
    } else {
      console.log('Logged out :(');
    }
  }
}
