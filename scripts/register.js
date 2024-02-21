import * as basic from "../helpingScripts/basicFunctions.js"
import * as call from "../scripts/calls.js"
import * as specific from "../helpingScripts/appSpecific.js"

const elementManeger = basic.createBaseElement()

const allFields = elementManeger.querySelectorAll(`select, input:not([type="submit"])`)
const form = elementManeger.querySelector("form")

const usernameInput = elementManeger.getElementById("username-input")
const firstNameInput = elementManeger.getElementById("first-name-input")
const lastNameInput = elementManeger.getElementById("last-name-input")
const passwordInput = elementManeger.getElementById("password-input")
const confirmPasswordInput = elementManeger.getElementById("confirm-password-input")
const emailInput = elementManeger.getElementById("email-input")
const confirmEmailInput = elementManeger.getElementById("confirm-email-input")
const genderSelect = elementManeger.getElementById("gender-select")
const imgInput = elementManeger.getElementById("img-input")
const registerInput = elementManeger.getElementById("register-input")

form.addEventListenerFnc("input", function(event){
    let isAllFilled = true

    allFields.forEachFnc(function(element){
        if(!element.value){
            isAllFilled = false
        }
    })
 
    if(isAllFilled){
        registerInput.removeAttribute("disabled")
    }
    else{
        console.log("locked")
    }
})

registerInput.addEventListenerFnc("click", function(event){
    event.preventDefault()
    
    let isAllCorrect = true
    usernameInput.getNextCertainSibling("asd")
    if(specific.checkForInvalidInput(usernameInput.getValue())){
        console.error("wrong username characters")
        specific.makeBorderRed(usernameInput.getElement())
        isAllCorrect = false
    }
    else if(usernameInput.getLength() <= 3){
        console.error("username error")
        specific.makeBorderRed(usernameInput.getElement())
        isAllCorrect = false
    }
    else{
        console.log("username satisfied")
        specific.makeBorderDefaultColor(usernameInput.getElement())
    }

    if(isAllCorrect){
        console.log("registered")
    }
    else{
        console.error("registration error")
    }
})

// const user = {
//     username: "SpleX",
//     firstName: "Martin",
//     lastName: "Georgiev",
//     password: "123456789a",
//     email: "georgiev632@gmail.com",
//     gender: "male",
//     img: "images/car.webp"
// }


