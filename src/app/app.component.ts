import { Component, OnInit, VERSION } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  FirebaseuiAngularLibraryService,
  FirebaseUISignInFailure,
  FirebaseUISignInSuccessWithAuthResult
} from 'firebaseui-angular-i18n';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
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
  listado: Observable<any>;
  user: any = null;
  constructor(
    private db: AngularFireDatabase,
    private firebaseuiAngularLibraryService: FirebaseuiAngularLibraryService,
    private angularFireAuth: AngularFireAuth
  ) {
    this.listado = db.list(this.path.messages).valueChanges();
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
  reference: any;
  path = {
    messages: 'messages'
  };

  ngOnInit(): void {}
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

  itemValue = '';
  onSubmit() {
    this.db.list('messages').push({ content: this.itemValue });
    this.itemValue = '';
  }
}
