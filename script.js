  const taskInput=document.querySelector(".task-input input");
  filters=document.querySelectorAll(".filters span");
  const taskBox=document.querySelector(".task-box");
  const deleteAll=document.querySelector(".controls .clear-btn");
  
  // getting localstorage todo-list
  let todos=JSON.parse(localStorage.getItem("todo-list"));
  
  //filters is a array of spans in hmtl and btn will represent each span as botton having         
 filters.forEach((btn)=>{
     btn.addEventListener("click",()=>{
         document.querySelector("span.active").classList.remove("active");
         btn.classList.add("active");
         showTodo(btn.id);
    })
 })

 deleteAll.addEventListener("click",()=>{
     todos.splice(0,todos.length);
     localStorage.setItem("todo-list",JSON.stringify(todos));
     showTodo("all");
 })
  
 function showTodo(filter)
 {   
     let li="";
     if(todos)
     {
      todos.forEach((todo,id)=>{ 
        let isCompleted =todo.status == "completed" ? "checked" : "";
        if(filter==todo.status || filter=="all")
        {
           li+=`<li class="task">
                  <label for="${id}">
                    <input onclick="updateStatus(this)" type="checkbox" id="${id}" ${isCompleted}>
                    <p>${todo.name}</p>
                  </label>
                  <div class="settings">
                      <button onclick="deleteTask(${id})" class="clear-btn">Delete</button>
                  </div>
              </li>`;
        }
       });
     }
     taskBox.innerHTML=li;

 }

 showTodo("all"); 

 function updateStatus(selectedTask)
 { 
  //  console.log(selectedTask);
   let taskName=selectedTask.parentElement.lastElementChild;// talking about paragraph element
   console.log(taskName);
   if(selectedTask.checked)
   { 
    
    // updating the status of selected task to completed
    todos[selectedTask.id].status="completed";
   }
   else{
    // updating the status of selected task to pending
     todos[selectedTask.id].status="pending";
   }
   localStorage.setItem("todo-list",JSON.stringify(todos));
 } 

function deleteTask(deleteId)
{
   todos.splice(deleteId,1);
   localStorage.setItem("todo-list",JSON.stringify(todos));
   showTodo("all"); 
}

  taskInput.addEventListener("keyup",e=> {
      let userTask=taskInput.value.trim();
      if(e.key == "Enter" && userTask){
        // getting localstorage todo-list
         if(!todos)
         {
          // if todos is null pass an emtpy array
          todos=[];
         }
         taskInput.value="";// to empty the input field
         let taskInfo ={name: userTask,status :"pending"};
         todos.push(taskInfo);//adding new item in todos
         localStorage.setItem("todo-list",JSON.stringify(todos));
         showTodo("all"); 
      } 
  });