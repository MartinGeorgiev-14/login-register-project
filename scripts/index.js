import * as basic from "../helpingScripts/basicFunctions.js"
import * as specific from "../helpingScripts/appSpecific.js"

const elementManeger = basic.createBaseElement()

const session = JSON.parse(sessionStorage.getItem("activeUser"))
const local = JSON.parse(localStorage.getItem("activeUser"))
const today = new Date()

let user

const main = elementManeger.querySelector("main")
const avatar = elementManeger.getElementById("avatar")
const welcomeMsg = elementManeger.getElementById("welcome-msg")
const emailInfo = elementManeger.getElementById("email-info")
const roleInfo = elementManeger.getElementById("role-info")
const logOutButton = elementManeger.getElementById("log-out-button")

if(!session && !local){
    basic.changeWindow("../pages/login.html")
}
else if(local){
    user = JSON.parse(specific.decrypt(local.user))
    if(new Date(local.expiry) >= today){
        specific.logOutUser()
    }
    else{
        console.log("not expired")
    }
}
else{
    user = JSON.parse(specific.decrypt(session.user))
}

if(user.role === "admin"){
    const adminButton = elementManeger.createElement("button")

    adminButton.setID("admin-panel")

    adminButton.setInnerHTML("Admin panel")

    adminButton.appendTo(main.getElement())

    adminButton.addEventListenerFnc("click", function(){
        basic.changeWindow("../pages/admin-panel.html")
    })
}

avatar.setAttribute("src", `${user.img}`)
welcomeMsg.setInnerHTML(`Welcome ${user.username}`)
emailInfo.setInnerHTML(`Email: ${user.email}`)
roleInfo.setInnerHTML(`Role: ${user.role}`)

logOutButton.addEventListenerFnc("click", specific.logOutUser)