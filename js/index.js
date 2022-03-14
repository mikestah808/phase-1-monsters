//display monsters name, age, and description on web browser 


document.addEventListener("DOMContentLoaded", () => {
    fetchMonster();
    createMonsterForm();

    let form = document.querySelector("#monster-form")
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        let name = document.getElementById("name").value
        let age = document.getElementById('age').value
        let description = document.getElementById('description').value

        let monsterObj = {
            name: name,
            age: age,
            description: description
        }

        console.log(monsterObj)


        postNewMonster(monsterObj);
        // debugger;
    })



})



const monster_URL = "http://localhost:3000/monsters/?_limit=50&_page=1"

function fetchMonster(){

fetch(monster_URL)
.then(res => res.json())
.then(data => {
    // console.log(data)
    data.forEach(monster => {
      



        addOneMonster(monster)


        //submit event

        //grab the id of the button element 

        // const createButton = document.getElementById("create-button")
        // createButton.addEventListener('submit', createMonsterForm)

    })
})

}


function addOneMonster(monster){

    const monsterList = document.getElementById("monster-list")

    const {name, age, description} = monster

    const li = document.createElement("li")
    const h2 = document.createElement("h2")
    h2.textContent = name

    const a = document.createElement('a')
    a.textContent = `Age: ${age}`

    const p = document.createElement('p')
    p.textContent = `Bio: ${description}`

    li.append(h2, a, p)

    monsterList.append(li)
}


function createMonsterForm(){
    

let div = document.getElementById('create-monster')
let form = document.createElement('form')
form.id = "monster-form"

let nameInput = document.createElement('input')
nameInput.id = "name"
nameInput.placeholder = "name"

let ageInput = document.createElement('input')
ageInput.id = "age"
ageInput.placeholder = "age"

let descriptionInput = document.createElement('input')
descriptionInput.id = "description"
descriptionInput.placeholder = "description"

let createButton = document.createElement('button')
createButton.id = "create-button"
createButton.innerText = "MAKE MONSTER!!!"


form.append(nameInput, ageInput, descriptionInput, createButton)
div.append(form)


}


function postNewMonster({name, age, description}){
    


fetch("http://localhost:3000/monsters", { 
    method: "POST",
    headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
    body: JSON.stringify({name, age, description})
})
.then(res => res.json())
.then(monster => {
    addOneMonster(monster)
})


}