


// //<button id="settings-btn">Settings</button>  
// {/* <script> const settingsBtn = document.getElementById("settings-btn");  if (!loggedIn) {   settingsBtn.style.display = "none"; } </script> */}

const knighterForm = document.getElementById("knighter-form");
const knighterButton = document.getElementById("knighter-button");
const knighterInput = document.getElementById("knighter-input");
const knighterList= document.getElementById("knighter-list");
const followButton = document.getElementById("followButton");
const honorButton = document.querySelector(".knighter-footer.honor-button")
let newFollowButton = document.querySelector(".knighter-footer.followButton");


// localStorage.getItem("press")
// press = JSON.stringify("press")
// if (press == true) {
//  followButton.innerHTML = "Following!";
// } else {
//   followButton.innerHTML = "Follow!";
// }


// variable to indicate if the user is logged in or not 
let loggedIn = true 



//OCULTAR PARTES CUANDO ESTEMOS LOGUEADOS
if (!loggedIn) {
  knighterForm.style.display = "none"; 
  // followButton.style.display = "none";//problema se ocultan todos los tweets
  // honorButton.style.display = "none";//problema se ocultan todos los tweets
}


//DRAW THE KNIGHTERS FROM THE API
const url = 'http://127.0.0.1:3000/api/listadeposts' 
fetch(url)
.then(response => response.json())
.then(data => {
  let postHTML = [];
  for (const i of data.listado) {
    postHTML += `
    <div class="knighter-container">
    <div class="knighter-header">
    <img src="/caballera404.png" alt="avatar">
    <h3>${i.usuario}</h3>
    <br>
    <p class="knighter-date">${i.fecha}</p>
    </div>
    <p class="knighter-text">${i.texto}</p>
    <div class="knighter-footer">
    <button class="honor-button" data-id="${i._id}">Honor</button>
        <span class="honor-count">0</span>
        <button class="followButton">Follow</button>
      </div>
      </div>` 
      document.getElementById('knighter-list').innerHTML = postHTML;
    }})
    

    //PUBLISH A KNIGHTER
    //adding an event to the button for publishing a knighter and conecting with the API
    knighterButton.addEventListener("click", function(){
      const knighter = knighterInput.value ;
      const li = document.createElement("li");
  const usuario = "Gabriela"; //IMPORTANTE!!!!cambiar el usuario por el usuario logueado
  li.innerHTML = `
  <div class="knighter-container">
  <div class="knighter-header">
  <h3>${usuario}</h3> //hay que poner el usuario
  </div>
  <p class="knighter-text">${knighter}</p>
  <button class="honor-button">Honor</button>
  <span class="honor-count">0</span>
  <button class="followButton">Follow</button>
  </div>
  `;
  knighterList.prepend(li);
  const url = 'http://127.0.0.1:3000/api/listadeposts?' + new URLSearchParams({usuario:usuario,texto:knighter,imagen:"img"});
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    }})
  .then((resp) => resp.json())
  .then((data) => console.log(data))
  .catch((error) => {
    console.error("Error connecting to the server");
  });
})



//ADING AN EVENT FOR THE FOLLOW BUTTON
knighterList.addEventListener("click", function(event) {
    if (event.target.className === "followButton") {
      const followButton = event.target;
      if (followButton.innerHTML === "Following!")
       {
        followButton.innerHTML = "Follow";
        followButton.disabled = false;
        // localStorage.setItem ("press",false);
      } else {
        followButton.innerHTML = "Following!";
        followButton.disabled = false;
        // localStorage.setItem ("press",true);

        const url= 'http://127.0.0.1:3000/api/seguidores/empezaraseguir?' + new URLSearchParams({usuario:"benito",user_to_follow:'Gabriela'}) ;
        fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' 
        }})
          .then((resp) => resp.json())
          .then((data) => console.log(data))
          .catch((error) => {
            console.error("Error connecting to the server");
          });
        }}
})

// añado otro evento que refresh 

//ADDING AN EVENT FOR THE HONOR BUTTON
knighterList.addEventListener("click", function(event) {
  if (event.target.className === "honor-button") {
    const knighter = event.target.parentNode.parentNode;
    const honorCount = knighter.querySelector(".honor-count");
    let count = parseInt(honorCount.innerHTML);
    if (event.target.innerHTML === "Honor") {
      count++;
      event.target.innerHTML = "HONOR!";
      const usuario = 'laurita'
      const idKnighter = knighter._id
      const url= 'http://localhost:3000/api/honors?'  + new URLSearchParams({publishing_id:'63e7b6ae94fbe9107f80e70c',user:usuario });  ;
  fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' 
      }})
        .then((resp) => resp.json())
        .then((data) => console.log(data))
        .catch((error) => {
        console.error("Error connecting to the server");
        });
}}})