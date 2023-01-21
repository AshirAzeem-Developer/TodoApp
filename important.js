// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
    getDatabase,
    ref,
    set,
    remove,
    update,
    onChildAdded,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Initialize Firebase
const app = initializeApp(firebaseConfig);

const database = getDatabase();

var input = document.getElementById("input");
var mainList = document.getElementById("mainList");
var loader = document.getElementById("loader");
var container = document.getElementById("container");
var addBtn = document.getElementById("add-btn");


function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

window.addBtn = function () {
    if (!input.value) {
        alert("Enter Something");
    } else {
        var obj = {
            todo: input.value,
        };
        obj.id = makeid(9);
        let reference = ref(database, `list/${obj.id}/`);
        set(reference, obj)
            .then(() => {
                input.value = "";
            })
            .catch((error) => {
                alert(error);
            });
    }
};

function getData() {
    let reference = ref(database, "list/");
    let arr = [];
    onChildAdded(reference, function (dt) {
        arr.push(dt.val());
        container.style.display = "block";
        loader.style.display = "none";
        mainList.innerHTML = "";
        for (var i = 0; i < arr.length; i++) {
            mainList.innerHTML += `<li class="shadow-sm p-2 mt-3 d-flex justify-content-between align-items-center fs-5 text-break" id="li">
                                ${arr[i].todo}
                                <div>
                                    <button onclick="deleteElem('${arr[i].id}')" class="btn btn-danger"><i class="fa-solid fa-trash"></i></button>
                                    <button data-bs-toggle="modal" data-bs-target="#${arr[i].id}" class="btn btn-primary"><i class="fa-solid fa-pen"></i></button>
                                </div>
                                <div class="modal fade" id="${arr[i].id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div class="modal-dialog">
                                  <div class="modal-content">
                                    <div class="modal-header">
                                      <h5 class="modal-title">Edit Todo</h5>
                                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                      <input type="text" id="editor" onchange="addStorage(this.value)" placeholder="Enter Edit Text" class="w-100">
                                    </div>
                                    <div class="modal-footer">
                                      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                      <button type="button" onclick="editElem('${arr[i].id}')" class="btn btn-primary">Save changes</button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </li>`;

        }
    });
}

getData();

window.addStorage = function (txt) {
    sessionStorage.setItem("txt", txt);
};

window.deleteElem = function (elem) {
    let reference = ref(database, `list/${elem}`);
    remove(reference)
        .then(() => {
            alert("Deleted Successfully");
            location.reload();
        })
        .catch((error) => {
            alert(error);
        });
};

window.editElem = function (elem) {
    if (!sessionStorage.txt) {
        alert("Enter Something to Update!");
    } else {
        var obj = {
            todo: sessionStorage.txt,
        };
        let reference = ref(database, `list/${elem}`);
        update(reference, obj)
            .then(() => {
                alert("Updated Successfully");
                location.reload();
                sessionStorage.clear();
            })
            .catch((error) => {
                alert(error);
            });
    }
};

window.deleteAll = function () {
    let reference = ref(database, `list/`);
    remove(reference)
        .then(() => {
            alert("All List Deleted Successfully");
            mainList.innerHTML = "";
        })
        .catch((error) => {
            alert(error);
        });
};