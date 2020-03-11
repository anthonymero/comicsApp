import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'bdtheque';
  constructor() {
    // Your web app's Firebase configuration
    const firebaseConfig = {
      apiKey: 'AIzaSyDO8iZ61J_m3eHh1A4G1wAHlMiNp-40OeI',
      authDomain: 'bdtheque-96ba0.firebaseapp.com',
      databaseURL: 'https://bdtheque-96ba0.firebaseio.com',
      projectId: 'bdtheque-96ba0',
      storageBucket: 'bdtheque-96ba0.appspot.com',
      messagingSenderId: '659396303259',
      appId: '1:659396303259:web:2f1ed4283091507045293e'
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  }
}
