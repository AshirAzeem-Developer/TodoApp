
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-analytics.js";
import {
    getDatabase,
    ref,
    set,
    onValue,
    onChildAdded,
    update
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDv7u5I86hb-BuZKbnExkieA1Tx1tzZSEw",
    authDomain: "todoapp-52765.firebaseapp.com",
    projectId: "todoapp-52765",
    storageBucket: "todoapp-52765.appspot.com",
    messagingSenderId: "639312817516",
    appId: "1:639312817516:web:8670bda5ed1fa909315749",
    measurementId: "G-V2P4HNYMJ6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase();

// ---------------------------------------------------FireBase DB Code Starts Here---------------------------------------------------

var mytask = document.getElementById('task');
// var titleinp = document.getElementById('title')
// var parent = document.getElementById('parent');

window.addElem = function () {
    var obj = {
        task: mytask.value,
    };
    obj.id = Math.random().toString().slice(2)
    let reference = ref(database, `tasks/${obj.id}/`)
    set(reference, obj)
    console.log(obj)
    addTMyTask();
}

function getData() {
    let reference = ref(database, `tasks/`);
    let arr = [];
    onChildAdded(reference, function (dt) {
        arr.push(dt.val());
        console.log(arr);
        // parent.innerHTML = '';   
        // for (var i = 0; i < arr.length; i++) {
        //     parent.innerHTML += `<li>${arr[i].task} </li>`;
        // }
    })
}
getData();

// ---------------------------------------------------FireBase DB Code End Here---------------------------------------------------





// ---------------------------------------------------App  Code Starts Here---------------------------------------------------


// var mainList = document.getElementById('mainList');
// var task = document.getElementById('task');

function addTMyTask() {
    var a = document.createElement('li');
    var b = document.createTextNode(task.value);
    a.appendChild(b);

    // Delete Button
    var delBtn = document.createElement('button');
    var delText = document.createTextNode('Delete');
    delBtn.appendChild(delText);
    a.appendChild(delBtn);
    delBtn.setAttribute('class', 'buttonsStyles')
    delBtn.setAttribute('onClick', 'deleteTask(this)')

    // Edit Button
    var editBtn = document.createElement('button');
    var editText = document.createTextNode('Edit');
    editBtn.appendChild(editText);
    a.appendChild(editBtn);
    editBtn.setAttribute('class', 'buttonsStyles')
    editBtn.setAttribute('onClick', 'editTask(this)')

    mainList.appendChild(a);
    console.log(a);
}


window.deleteTask = function (element) {
    element.parentNode.remove();

}
window.editTask = function (element) {
    element.parentNode.firstChild.nodeValue = prompt('Edit Task');
}
window.deleteAll = function () {
    mainList.innerHTML = "";
}


// ---------------------------------------------------App  Code Ends Here---------------------------------------------------
