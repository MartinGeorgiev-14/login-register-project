import * as basic from "../helpingScripts/basicFunctions.js"
import * as call from "../scripts/calls.js"
import * as specific from "../helpingScripts/appSpecific.js"

const elementManeger = basic.createBaseElement()

const allFields = elementManeger.querySelectorAll(`select, input:not([type="submit"],[type="file"])`)
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
        console.log("unlock")
        registerInput.removeAttribute("disabled")
    }
})

registerInput.addEventListenerFnc("click", async function(event){
    event.preventDefault()
    
    const selectedIndex = genderSelect.getElement().selectedIndex
    const selectedGender = genderSelect.getElement().options[selectedIndex]
    let imgSource
    if(imgInput.getElement().files.length > 0){
        imgSource = `images/` + imgInput.getElement().files[0].name
    }
    else{
        imgSource = "images/default.jpg"
    }

    let isAllCorrect = [
        specific.checkInputTextRegistration(usernameInput),
        specific.checkInputTextRegistration(firstNameInput),
        specific.checkInputTextRegistration(lastNameInput),
        specific.checkEmailOrPasswordInputs(passwordInput),
        specific.checkEmailOrPasswordInputs(emailInput),
        specific.areEqual(passwordInput, confirmPasswordInput),
        specific.areEqual(emailInput, confirmEmailInput),
        selectedIndex > 0 && selectedIndex <= 3
    ]

    if(!isAllCorrect.includes(false)){

        const user = {
            username: usernameInput.getValue(),
            firstName: firstNameInput.getValue(),
            lastName: lastNameInput.getValue(),
            password: await specific.hashPasswordWithSalt(passwordInput.getValue()),
            email: emailInput.getValue(),
            gender: selectedGender.value,
            img: imgSource,
            role: "user"
        }

        call.postUser(user)
        basic.changeWindow("../pages/login.html")
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


