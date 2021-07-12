import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs/dist/types';

@Injectable({
  providedIn: 'root'
})
export class TestService {
  constructor(private firestore: AngularFirestore) {}
  obtenerInfo(): Observable<any> {
    return this.firestore.collection('messages').snapshotChanges();
  }
}
