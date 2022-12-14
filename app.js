
var mainList = document.getElementById('mainList');
var task = document.getElementById('task');

function addElem() {
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


function deleteTask(element) {
    element.parentNode.remove();

}
function editTask(element) {
    // console.log(element);
    element.parentNode.firstChild.nodeValue = prompt('Edit Task');


}
function deleteAll() {
    mainList.innerHTML = "";

}