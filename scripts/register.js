import * as basic from "../helpingScripts/basicFunctions.js"
import * as call from "../scripts/calls.js"

const elementManeger = basic.createBaseElement()

const allFields = elementManeger.querySelectorAll(`select, input:not([type="submit"])`)
const form = elementManeger.querySelector("form")

const userInput = elementManeger.getElementById("username-input")
const firstNameInput = elementManeger.getElementById("first-name-input")
const lastNameInput = elementManeger.getElementById("last-name-input")
const passwordInput = elementManeger.getElementById("password-input")
const confirmPasswordInput = elementManeger.getElementById("confirm-password-input")
const emailInput = elementManeger.getElementById("email-input")
const confirmEmailInput = elementManeger.getElementById("confirm-email-input")
const genderSelect = elementManeger.getElementById("gender-select")
const imgInput = elementManeger.getElementById("img-input")
const registerInput = elementManeger.getElementById("register-input")

form.getElement().addEventListener("input", function(event){
    let isAllFilled = true

    allFields.getAllElements().forEach(element => {
        if(!element.value){
            isAllFilled = false
        }
    })
 
    if(isAllFilled){
        console.log("unlocked")
    }else{
        console.log("locked")
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


