let todoArr = JSON.parse(localStorage.getItem("todos")) || [];
todoArr = todoArr.filter((todo)=>todo.done==false);
localStorage.setItem("todos",JSON.stringify(todoArr))


let todoList = document.querySelector(".todo-list");

todoArr.forEach(todo => {
    if(todo.done == false){

        //? adding child
        let newToDo = document.createElement('li');
        newToDo.innerHTML='<div class="todo"><p>'+todo.text+'</p><input type="checkbox"></div>';

        //?giving child an event listener
        let newCheck = newToDo.firstElementChild.lastElementChild;
        newCheck.addEventListener("change",dashOut);

        todoList.appendChild(newToDo);
    }
});

function dashOut(){
    /** @type {HTMLElement} **/
    let siblingText =this.previousElementSibling ;
    console.log(siblingText);
    siblingText.classList.toggle("dashedOut");



    for (let i = 0; i < todoArr.length; i++) {
        if (todoArr[i].text.trim() == siblingText.innerText.trim()) {
            todoArr[i].done = !todoArr[i].done;
            break;
        }
    }
    localStorage.setItem("todos",JSON.stringify(todoArr));
}

//////////////////////////////////////////////////!


document.querySelector("form").addEventListener("submit",addTask);

function addTask(event){
    event.preventDefault();
    
    /** @type {HTMLFormElement} **/
    let inputField = this.firstElementChild;

    if(inputField.value == "")return;

    let newTodo = {
        text:inputField.value,
        done:false
    };

    //? adding child
    let newTodoElement = document.createElement('li');
    newTodoElement.innerHTML='<div class="todo"><p></p><input type="checkbox"></div>';
    newTodoElement.querySelector(".todo > p").innerText=newTodo.text;
    

    //?giving child an event listener
    let newCheck = newTodoElement.firstElementChild.lastElementChild;
    newCheck.addEventListener("change",dashOut);

    todoList.appendChild(newTodoElement);
    

    todoArr.push(newTodo);
    localStorage.setItem("todos",JSON.stringify(todoArr));
    
    inputField.value = "";
}