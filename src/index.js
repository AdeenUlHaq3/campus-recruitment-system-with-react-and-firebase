import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import 'font-awesome/css/font-awesome.min.css';
import * as firebase from 'firebase';

var config = {
    apiKey: "AIzaSyBKxYZmGqrWhq9C-23xp7Zr3JhEgjET7jM",
    authDomain: "https://jsproject-951e6.firebaseapp.com/",
    databaseURL: "https://jsproject-951e6.firebaseio.com/",
    projectId: "jsproject-951e6",
    storageBucket: "jsproject-951e6.appspot.com"
};
firebase.initializeApp(config);

if(module.hot){
    module.hot.accept();
}

ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
