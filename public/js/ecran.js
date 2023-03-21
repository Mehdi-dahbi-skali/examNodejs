const url="http://localhost:3000/"
const AddBtn=document.getElementById("addBtn")
const resetBtn=document.getElementById("resetBtn")
const TiteleInput=document.getElementById("TiteleInput")
const refBtn=document.getElementById("refBtn")

AddBtn.addEventListener("click",()=>{
    let title=TiteleInput.value

    if(!title )
        return alert ("all fields are required")
    let dataToSend={
        name:title,
    }
    fetch(url+"create",{
        method:"POST",
        body:JSON.stringify(dataToSend),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(response=>response.json())
    .then(data=>{
     addTodoToTable(data)
    
       reset()
    })
    .catch(err=>alert("error on inserting"))

})

refBtn.addEventListener("click",()=>{
    
    fetch(url+"refrech",{
        method:"GET",
        headers:{
            "Content-Type":"application/json"
        }
    })

})

const addTodoToTable=(todo )=>{

    const tr=document.createElement("tr")
    const td1=document.createElement("td")
    const button=document.createElement("button")

    tr.appendChild(td1)
    td5.appendChild(button)

    td1.innerText=todo;
    button.innerText="delete";

    // button.addEventListener('click',()=>{
    //     // call of fetch to delete
    //     fetch(url+todo.id,{
    //         method:"DELETE"
    //     }).then(response=>{
    //         if(response.ok)
    //         {
    //             tr.remove();
    //         }
    //         else
    //             throw "error"
    //     })
    //     .catch(err=>alert("error on deleting"))
    //     //suppression de l element(table)
    // })

    document.getElementById("data").appendChild(tr)
}
            