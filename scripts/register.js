import * as basic from "../helpingScripts/basicFunctions.js"
import * as call from "../scripts/calls.js"
import * as specific from "../helpingScripts/appSpecific.js"

const elementManager = basic.createBaseElement()
const mainColor = getComputedStyle(document.documentElement).getPropertyPriority("--main-color")

const allFields = elementManager.querySelectorAll(`select, input:not([type="submit"],[type="file"])`)
const form = elementManager.querySelector("form")

const session = JSON.parse(sessionStorage.getItem("activeUser"))
const local = JSON.parse(localStorage.getItem("activeUser"))

if (session || local) {
    basic.changeWindow("../index.html")
}
else {
    registerHandler()
}

function registerHandler() {

    const usernameInput = elementManager.getElementById("username-input")
    const firstNameInput = elementManager.getElementById("first-name-input")
    const lastNameInput = elementManager.getElementById("last-name-input")
    const passwordInput = elementManager.getElementById("password-input")
    const confirmPasswordInput = elementManager.getElementById("confirm-password-input")
    const emailInput = elementManager.getElementById("email-input")
    const confirmEmailInput = elementManager.getElementById("confirm-email-input")
    const genderSelect = elementManager.getElementById("gender-select")
    const imgGroup = elementManager.getElementById("img-group")
    const registerInput = elementManager.getElementById("register-input")

    // variable that stores avatar path
    let imgSource
    //calling function that displays all available avatars
    await displayAllAvatars()

    const imagesQuery = elementManager.querySelectorParentAll(imgGroup.getElement(), "img")

    // eventListener that assigns path to imgSource and changes border color of clicked img
    imgGroup.addEventListenerFnc("click", function (element) {
        basic.classRemover(imagesQuery.getAllElements(), "selected")


        if (element.target.tagName === "IMG") {

            element.target.classList.add("selected")
            imgSource = element.target.attributes[1].value

        }

    })

    //eventListener that checks if all input fields are entered
    form.addEventListenerFnc("input", function (event) {
        let isAllFilled = true

        allFields.forEachFnc(function (element) {
            if (!element.value) {
                isAllFilled = false
            }
        })

        if (isAllFilled) {
            registerInput.removeAttribute("disabled")
        }
    })


    //eventListener that validates all input fields and post new user in the database
    registerInput.addEventListenerFnc("click", async function (event) {
        event.preventDefault()

        //variables that gets value of selected option
        const selectedIndex = genderSelect.getElement().selectedIndex
        const selectedGender = genderSelect.getElement().options[selectedIndex]

        //Validation that checks if user has selected avatar
        if (!imgSource) {
            imgSource = "images/default.jpg"
        }

        //Array that contains bools from validations 
        const isAllCorrect = [
            await specific.checkIndividualInfo(usernameInput, "username"),
            specific.checkInputTextRegistration(firstNameInput),
            specific.checkInputTextRegistration(lastNameInput),
            specific.checkEmailOrPasswordInputs(passwordInput),
            await specific.checkIndividualInfo(emailInput, "email"),
            specific.areEqual(passwordInput, confirmPasswordInput),
            specific.areEqual(emailInput, confirmEmailInput),
            selectedIndex > 0 && selectedIndex <= 3
        ]

        //Validation that checks if there is false bool in the array
        if (!isAllCorrect.includes(false)) {

            const user = {
                username: usernameInput.getValue(),
                firstName: firstNameInput.getValue(),
                lastName: lastNameInput.getValue(),
                password: await specific.hashPasswordWithSalt(passwordInput.getValue()),
                email: emailInput.getValue(),
                gender: selectedGender.value,
                img: imgSource,
                role: "User",
                createdOn: specific.getDateNow(),
                editHistory: []
            }

            call.postUser(user)
            basic.changeWindow("../pages/login.html")
        }
    })

    async function displayAllAvatars() {
        const avatars = await call.getFromDB("avatars")

        avatars.forEach(element => {
            const img = elementManager.createElement("img")

            img.setAttribute("src", `/${element.src}`)
            img.setAttribute("value", `/${element.src}`)
            img.addClass("default-border")

            img.appendTo(imgGroup.getElement())
        })

    }
}

