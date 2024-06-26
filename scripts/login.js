import * as call from "../scripts/calls.js"
import * as specific from "../helpingScripts/appSpecific.js"
import * as basic from "../helpingScripts/basicFunctions.js"

const session = JSON.parse(sessionStorage.getItem("activeUser"))
const local = JSON.parse(localStorage.getItem("activeUser"))

await specific.checkIsUserActive(undefined, initializeLogin, "../index.html")

function initializeLogin() {
    const elementManager = basic.createBaseElement()

    const form = elementManager.getElementById("login-container")
    const inputs = elementManager.querySelectorAll(`input:not([type="submit"], [type="checkbox"])`)
    const emailUsernameInput = elementManager.getElementById("email-username-input")
    const passwordInput = elementManager.getElementById("password-input")
    const logInInput = elementManager.getElementById("log-in-input")
    const errorMsg = elementManager.getElementById("error-msg")
    const rememberInput = elementManager.getElementById("remember-checkbox")
    // variable for checking if user is remembered for next login
    let rememberMeBool = false

    // eventListener for checking if all inputs fields are e entered
    form.addEventListenerFnc("input", function () {
        let isAllFilled = true

        inputs.forEachFnc(function (element) {
            if (!element.value) {
                isAllFilled = false
            }
        })
        // removes the disabled attribute out of the log in input
        if (isAllFilled) {
            logInInput.removeAttribute("disabled")
        }

    })

    // eventListener that changes value based on ticked remember me box
    rememberInput.addEventListenerFnc('change', function () {

        if (rememberInput.getElement().checked) {
            rememberMeBool = true
        } else {
            rememberMeBool = false
        }
    })

    //eventListener that checks given username/password
    logInInput.addEventListenerFnc("click", async function (event) {
        event.preventDefault()
        let user
        //Validations that checks if given infomration is correctly given
        if (emailUsernameInput.getValue() && passwordInput.getValue()) {
            user = await specific.checkCredentials(emailUsernameInput.getValue(), passwordInput.getValue())
            errorMsg.changeDisplay("none")
        }
        else {
            errorMsg.changeDisplay("block")
            return
        }

        //Validation if user is found 
        if (user) {
            specific.setUser(user, rememberMeBool)
            basic.changeWindow("../index.html")
        }
        else {
            errorMsg.changeDisplay("block")
        }
    })
}