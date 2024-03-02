import * as basic from "../helpingScripts/basicFunctions.js"
import * as call from "../scripts/calls.js"
import * as specific from "../helpingScripts/appSpecific.js"

const elementManeger = basic.createBaseElement()
const mainColor = getComputedStyle(document.documentElement).getPropertyPriority("--main-color")

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
const imgGroup = elementManeger.getElementById("img-group")
const registerInput = elementManeger.getElementById("register-input")

// variable that stores avatar path
let imgSource
//calling function that displays all available avatars
await displayAllAvatars() 

const imagesQuery = elementManeger.querySelectorParentAll(imgGroup.getElement(), "img")

// eventListener that assigns path to imgSource and changes border color of clicked img
imgGroup.addEventListenerFnc("click", function(element){
   basic.classRemover(imagesQuery.getAllElements(), "selected")
   

    if(element.target.tagName === "IMG"){

        element.target.classList.add("selected")
        imgSource = element.target.attributes[1].value
       
    }

})

//eventListener that checks if all input fields are entered
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
})


//eventListener that validates all input fields and post new user in the database
registerInput.addEventListenerFnc("click", async function(event){
    event.preventDefault()
    
    //variables that gets value of selected option
    const selectedIndex = genderSelect.getElement().selectedIndex
    const selectedGender = genderSelect.getElement().options[selectedIndex]
    
    //Validation that checks if user has selected avatar
    if(!imgSource){
        imgSource = "images/default.jpg"
    }

    //Array that contains bools from validations 
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

    //Validation that checks if there is false bool in the array
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

async function displayAllAvatars(){
    const avatars = await call.getFromDB("avatars")

    avatars.forEach(element => {
        const img = elementManeger.createElement("img")

        img.setAttribute("src", `/${element.src}`)
        img.setAttribute("value", `/${element.src}`)
        img.addClass("default-border")

        img.appendTo(imgGroup.getElement())
    })

}


// const user = {
//     username: "SpleX",
//     firstName: "Martin",
//     lastName: "Georgiev",
//     password: "123456789a",
//     email: "georgiev632@gmail.com",
//     gender: "male",
//     img: "images/car.webp"
// }


