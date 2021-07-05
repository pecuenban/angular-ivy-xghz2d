import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import {
  ExtendedFirebaseUIAuthConfig,
  firebase,
  firebaseui,
  FirebaseUIModule
} from 'firebaseui-angular-i18n';
//import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';

import {
  AngularFireAuthModule,
  USE_EMULATOR as USE_AUTH_EMULATOR
} from '@angular/fire/auth';

const firebaseUiAuthConfig: ExtendedFirebaseUIAuthConfig = {
  signInFlow: 'popup',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    /*{
      scopes: ['public_profile', 'email', 'user_likes', 'user_friends'],
      customParameters: {
        auth_type: 'reauthenticate'
      },
      provider: firebase.auth.FacebookAuthProvider.PROVIDER_ID
    },*/
    //firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    firebase.auth.GithubAuthProvider.PROVIDER_ID,
    {
      requireDisplayName: false,
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID
    }
    //firebase.auth.PhoneAuthProvider.PROVIDER_ID,
    //firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID
  ],
  language: 'IT',
  tosUrl: '<your-tos-link>',
  privacyPolicyUrl: '<your-privacyPolicyUrl-link>',
  // Optional. Set it to override the default language (English)
  credentialHelper: firebaseui.auth.CredentialHelper.GOOGLE_YOLO
};

useFactory: config => {
  // build firebase UI config object using settings from `config`

  const fbUiConfig: firebaseui.auth.Config = {
    signInFlow: 'redirect',
    signInOptions: [],
    tosUrl: null,
    privacyPolicyUrl: null,
    credentialHelper: firebaseui.auth.CredentialHelper.GOOGLE_YOLO
  };

  if (config.googleAuthEnabled) {
    fbUiConfig.signInOptions.push(firebase.auth.GoogleAuthProvider.PROVIDER_ID);
  }

  if (config.emailAuthEnabled) {
    fbUiConfig.signInOptions.push({
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
      requireDisplayName: true,
      signInMethod:
        firebase.auth.EmailAuthProvider.EMAIL_PASSWORD_SIGN_IN_METHOD
    });
  }

  // other providers as needed

  return fbUiConfig;
};

@NgModule({
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    FormsModule,
    //AppRoutingModule,
    //AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    FirebaseUIModule.forRoot(firebaseUiAuthConfig)
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
