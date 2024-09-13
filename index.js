let Taskslist= []

const title_inp =document.getElementById("title_inp")
const desc_inp = document.getElementById("desc_inp")
const date_inp =document.getElementById("date_inp")
const add_btn = document.getElementById("add_btn")
const delete_btn=document.getElementById("delete_btn")
const edite_btn=document.getElementById("edite_btn")
const toast_list = document.getElementById("toast_list")
const taskModal = new bootstrap.Modal(document.getElementById('taskModal'))
let editIndex = -1; // This will track the task being edited


// displar tasks////

const display=()=>{
    let temp='';
    for(let i=0 ;i< Taskslist.length ;i++){
        const completedClass = Taskslist[i].completed ? 'line-through' : 'none';
        const completedColor =  Taskslist[i].completed ? 'gray' : 'black';
        const checked =  Taskslist[i].completed ? 'checked' : '';

        temp+=`
             <div class="col mt-5">
                        <div class="card" style="width: 18rem;" id="task-${i}">
                            <div class="card-body">
                              <h5 class="card-title" id="mytitle-${i}" style="text-decoration: ${completedClass}; color: ${completedColor};">${Taskslist[i].title}</h5>
                              <p class="card-text">${Taskslist[i].des}</p>
                              <div class="calender d-flex">
                                <p class="card-text">${Taskslist[i].date}</p>
                                <div class="icon ms-auto">
                                    <i class="fa-solid fa-calendar-days"></i>
                                </div>
                              </div>
                            </div>
                            <div class="card-footer">
                                <div class="operations d-flex justify-content-end">
                                    <div class="check-btn">
                                        <input class="form-check-input" type="checkbox" value="" id="checkbox-${i}" onclick="marktask(${i})" ${checked}>
                                    </div>
                                    <div class="delete_btn mx-2">
                                        <button id="delete_btn" onclick="deletbtn(${i})"><i class="fa-solid fa-trash"></i></button>
                                    </div>
                                    <div class="edite_btn mx-2">
                                        <button id="edite_btn" onclick="Edittask(${i})"><i class="fa-regular fa-pen-to-square"></i></button>
                                    </div>
                                </div>
                            </div>
                          </div>
                    </div>
        `
    }
    document.getElementById("my_cards").innerHTML=temp

    // Add smooth visible effect after rendering
    setTimeout(() => {
        document.querySelectorAll('.card').forEach(card => {
            card.classList.add('visible');
        });
    }, 100);
}


// Local storage initialization
Taskslist = JSON.parse(localStorage.getItem('task')) || [];
display();



// clear modal
const clearmodal=()=>{
    title_inp.value=""
    desc_inp.value=""
    date_inp.value=""
}

//Add Task from input to the card////
add_btn.addEventListener("click",()=>{
    const tasklist={
        title:title_inp.value,
        des:desc_inp.value,
        date:date_inp.value,
        completed: false
    }
    if( editIndex=== -1){
        // Add the task to the list
        Taskslist.push(tasklist)
        const addmsg=`Successfilly Added`
        show_notification( addmsg)
    }
    else{

        //Update the existing task
        Taskslist[editIndex] = tasklist;

        //Message for editting

        const editmsg = `Successfully Edited`;
        show_notification(editmsg);
             
        // Reset the editIndex to -1 after editing
        editIndex = -1;

        // Change the "Update" button text back to "Add"
        add_btn.textContent = "Add Task";
        taskModal.hide()

    }

  
   // Save the tasks list to localStorage
   localStorage.setItem("task",JSON.stringify(Taskslist))

  // Refresh the task display and clear input fields
   display()
   clearmodal()
})

// Delet Task//

const deletbtn=(index)=>{
    const taskElement = document.getElementById(`task-${index}`);
    
    // Add removing class for transition
    taskElement.classList.add('removing');
    
    setTimeout(() => {
        Taskslist.splice(index, 1);
        localStorage.setItem("task", JSON.stringify(Taskslist));
        display();
        const delmsg = `Successfully Deleted`;
        show_notification(delmsg);
    }, 300);  // Delay to allow the animation to play
}

// Mark tasks as completed.
 marktask=(checkid)=>{
  const checkbox =document.getElementById(`checkbox-${checkid}`);
  const titletask = document.getElementById(`mytitle-${checkid}`)

  // Update the task's completed status in Taskslist
  Taskslist[checkid].completed = checkbox.checked;

 //  checked the box 
  if(checkbox.checked){
    titletask.style.textDecoration = "line-through";
    titletask.style.color = "gray";
 }
 else{
    titletask.style.textDecoration = "none";
    titletask.style.color = "black";
 }
 // Save the updated task status to localStorage
 localStorage.setItem("task",JSON.stringify(Taskslist))

}
//Edit Task///

 Edittask=(index)=>{
    // Set the input fields with the current task data
    title_inp.value=  Taskslist[index].title;
    desc_inp.value = Taskslist[index].des;
    date_inp.value=Taskslist[index].date;
    // Set the global `editIndex` to the current task's index
    editIndex = index;

    // Change the "Add" button text to "Update"
    add_btn.textContent = "Update Task";

    taskModal.show()
}

//show notification///
 show_notification=(msg)=>{
 let toast = document.createElement('div')
 toast.classList.add('noti')
 toast.textContent=msg
 toast_list.appendChild(toast)
 toast_list.classList.remove("hidden")

 setTimeout(() => {
    toast_list.classList.add('hidden');
    setTimeout(() => {
        toast.remove(); // إزالة من الـ DOM بعد انتهاء التدرج
    }, 400);
  }, 2000);

}