import * as call from "../scripts/calls.js"
import * as specific from "../helpingScripts/appSpecific.js"
import * as basic from "../helpingScripts/basicFunctions.js"

const elementManeger = basic.createBaseElement()

const form = elementManeger.getElementById("login-container")
const inputs = elementManeger.querySelectorAll(`input:not([type="submit"], [type="checkbox"])`)
const emailUsernameInput = elementManeger.getElementById("email-username-input")
const passwordInput = elementManeger.getElementById("password-input")
const logInInput = elementManeger.getElementById("log-in-input")
const errorMsg = elementManeger.getElementById("error-msg")
const rememberInput = elementManeger.getElementById("remember-checkbox")

let rememberMeBool = false

form.addEventListenerFnc("input", function(){
    let isAllFilled = true

    inputs.forEachFnc(function(element){
        if(!element.value){
            isAllFilled = false
        }
    })

    if(isAllFilled){
        logInInput.removeAttribute("disabled")
    }
   
})

rememberInput.addEventListenerFnc('change', function() {

    if (rememberInput.getElement().checked) {
        rememberMeBool = true
    } else {
        rememberMeBool = false
    }
})

logInInput.addEventListenerFnc("click", async function(event){
    event.preventDefault()
    let user

    if(emailUsernameInput.getValue() && passwordInput.getValue()){
        user = await specific.checkCredentials(emailUsernameInput.getValue(), passwordInput.getValue())
        errorMsg.changeDisplay("none")
    }
    else{
        errorMsg.changeDisplay("block")
        return
    }

    if(user){
        specific.setUser(user, rememberMeBool)
    }
    else{
        errorMsg.changeDisplay("block")
    }

   
})