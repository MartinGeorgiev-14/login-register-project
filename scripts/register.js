import * as basic from "../helpingScripts/basicFunctions.js"
import * as call from "../scripts/calls.js"

const elementManeger = basic.createBaseElement()

const allFields = elementManeger.querySelectorAll("input, select")

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

registerInput.addEventListener("click", function(){
    

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


