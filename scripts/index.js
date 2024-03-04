import * as basic from "../helpingScripts/basicFunctions.js"
import * as specific from "../helpingScripts/appSpecific.js"

const elementManager = basic.createBaseElement()

let user = await specific.isUserActive()

const main = elementManager.querySelector("main")
const avatar = elementManager.getElementById("avatar")
const welcomeMsg = elementManager.getElementById("welcome-msg")
const emailInfo = elementManager.getElementById("email-info")
const roleInfo = elementManager.getElementById("role-info")
const logOutButton = elementManager.getElementById("log-out-button")

if(user.role === "admin"){
    const adminButton = elementManager.createElement("button")

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