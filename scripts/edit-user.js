import * as call from "../scripts/calls.js"
import * as specific from "../helpingScripts/appSpecific.js"
import * as basic from "../helpingScripts/basicFunctions.js"

const user = await specific.isUserActive()
// Checks if current user has role Admin
if (user.role !== "Admin") {
    basic.changeWindow("../index.html")
}

const elementManager = basic.createBaseElement()

//Gets given information from url
const urlParams = new URLSearchParams(window.location.search)
const recievedData = urlParams.get("data")

//Gets user from database based on id
const databaseUser = await call.getFromDB(`users/${decodeURIComponent(recievedData)}`)

//Checks if user is found. Found -> displaysInformation  Not Found -> redirects to admin panel
if (databaseUser) {
    //If the found user has admin role it disabled all inputs
    const allFields = elementManager.querySelectorAll(`select, img[id=user-img], input:not([type="submit"])`)
    if (databaseUser.role === "Admin") {
        specific.addDisabler(allFields.getAllElements())
    }

    await displayInformation(databaseUser)
}
else {
    basic.changeWindow('./admin-panel.html')
}

//Creates copy of the databaseUser
const editedUser = Object.assign({}, {
    username: databaseUser.username,
    firstName: databaseUser.firstName,
    lastName: databaseUser.lastName,
    email: databaseUser.email,
    img: ".." + databaseUser.img,
    role: databaseUser.role,
    gender: databaseUser.gender
})

// DISPLAYING INFORMATION

async function displayInformation(data) {

    const adminImg = elementManager.getElementById("admin-img")
    const adminUsername = elementManager.getElementById("admin-username")
    const backBtn = elementManager.getElementById("back-button")
    const editContainer = elementManager.getElementById("edit-container")
    const userImg = elementManager.getElementById("user-img")
    const closeIcon = elementManager.getElementById("close-icon")
    const dropDownImages = elementManager.getElementById("drop-down-images")
    const usernameInput = elementManager.getElementById("username-input")
    const firstNameInput = elementManager.getElementById("first-name-input")
    const lastNameInput = elementManager.getElementById("last-name-input")
    const emailInput = elementManager.getElementById("email-input")
    const genderSelect = elementManager.getElementById("gender-select")
    const roleSelect = elementManager.getElementById("role-select")
    const createdOn = elementManager.getElementById("created-on-p")
    const editedOn = elementManager.getElementById("edited-on-p")
    const editedBy = elementManager.getElementById("edited-by-p")
    const saveButton = elementManager.getElementById("save-input")

    //Stores all displayed avatars
    let availableAvatars = []
    const avatars = await call.getFromDB("avatars")

    adminImg.setSrc(user.img)
    adminUsername.setInnerHTML(user.username)

    userImg.setSrc(databaseUser.img)

    //If edited user has admin role does not allow to show avatars on click 
    if (data.role !== "Admin") {
        userImg.addEventListenerFnc("click", function () {
            dropDownImages.setStyle("display", "grid")
        })

        closeIcon.addEventListenerFnc("click", function () {
            dropDownImages.setStyle("display", "none")
        })

    }

    backBtn.addEventListenerFnc("click", function () {
        basic.changeWindow('./admin-panel.html')
    })

    // Event listeners for dropdown menu

    //displays all avatars to the drop down menu and adds selected class to the selected avatar
    avatars.forEach(element => {
        const img = elementManager.createElement("img")
        availableAvatars.push(img)

        if (`/${element.src}` === databaseUser.img) {
            img.addClass("selected")
        }

        img.setSrc(`../${element.src}`)
        img.appendTo(dropDownImages.getElement())

        //Event listener for selecting new avatar
        img.addEventListenerFnc("click", function () {
            //Removes all selected classes from all stored avatars
            basic.classRemoverArray(availableAvatars, "selected")
            img.addClass("selected")
            userImg.setSrc(element.src)
            checkFormValidity()
        })
    });


    usernameInput.setValue(data.username)
    firstNameInput.setValue(data.firstName)
    lastNameInput.setValue(data.lastName)
    emailInput.setValue(data.email)
    genderSelect.setValue(data.gender)
    roleSelect.setValue(data.role)
    createdOn.setInnerHTML(`Created on: ${data.createdOn}`)
    // Checks if the user's information has been edited
    if (data.lastEdited.hasOwnProperty("date") && data.lastEdited.hasOwnProperty("by")) {
        editedOn.setInnerHTML(`Edited on: ${data.lastEdited.date}`)
        editedBy.setInnerHTML(`Edited by: ${data.lastEdited.by.username}`)
    }
    // Event listener that checks if input is changed
    editContainer.addEventListenerFnc("input", function (event) {
        if (event.target.tagName === "INPUT" || event.target.tagName === 'SELECT') {
            checkFormValidity()
        }
    })


    // Event listener that validates inputs information and sends patch request
    saveButton.addEventListenerFnc("click", async function (event) {
        event.preventDefault()

        if (data.role == "Admin") {
            return
        }

        //Validates if username, firstname, lastname and email inputs are entered correctly
        const isAllCorrect = [
            specific.checkInputTextRegistration(usernameInput),
            specific.checkInputTextRegistration(firstNameInput),
            specific.checkInputTextRegistration(lastNameInput),
            specific.checkEmailOrPasswordInputs(emailInput, "email"),
        ]

        //Validates if isAllCorrect contains false (wrongly entered input)
        if (!isAllCorrect.includes(false)) {

            const currentValues = {
                username: usernameInput.getValue(),
                firstName: firstNameInput.getValue(),
                lastName: lastNameInput.getValue(),
                email: emailInput.getValue(),
                img: userImg.getAttribute("src"),
                role: roleSelect.getValue(),
                gender: genderSelect.getValue(),
                date: specific.getDateNow(),
                by: {
                    id: user.id,
                    username: user.username,
                    role: user.role
                },
                lastVersion: editedUser
            }

            await call.patchUser(currentValues, databaseUser.id)

        }

    })

    // function for checking if input has been changed
    function checkFormValidity() {

        const currentValues = {
            username: usernameInput.getValue(),
            firstName: firstNameInput.getValue(),
            lastName: lastNameInput.getValue(),
            email: emailInput.getValue(),
            img: `..${userImg.getAttribute("src")}`,
            role: roleSelect.getValue(),
            gender: genderSelect.getValue()
        }
        // Check if any value has changed from initial values
        const isChanged = Object.keys(editedUser).some(key => {
            return editedUser[key] !== currentValues[key];
        })
        // Enable or disable submit button based on whether any value has changed
        if (isChanged) {
            saveButton.removeAttribute("disabled")
        } else {
            saveButton.setDisabledAttribute()
        }
    }
}