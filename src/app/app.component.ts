import { Component, VERSION } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  FirebaseuiAngularLibraryService,
  FirebaseUISignInFailure,
  FirebaseUISignInSuccessWithAuthResult
} from 'firebaseui-angular-i18n';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
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
  loginStatus: boolean = false;
  constructor(
    private firebaseuiAngularLibraryService: FirebaseuiAngularLibraryService,
    private angularFireAuth: AngularFireAuth
  ) {
    console.log(this.angularFireAuth.authState);
    //firebaseuiAngularLibraryService.firebaseUiInstance.disableAutoSignIn();
    this.angularFireAuth.authState.subscribe(this.firebaseAuthChangeListener);
  }
  logout() {
    this.angularFireAuth.signOut();
  }
  firebaseAuthChangeListener(response) {
    // if needed, do a redirect in here
    if (response) {
      this.loginStatus = true;
      //alert('Logged in :)');
    } else {
      this.loginStatus = false;
      console.log('Logged out :(');
    }
  }
}
