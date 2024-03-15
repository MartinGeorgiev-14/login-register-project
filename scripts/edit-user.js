import * as call from "../scripts/calls.js"
import * as specific from "../helpingScripts/appSpecific.js"
import * as basic from "../helpingScripts/basicFunctions.js"

const user = await specific.isUserActive()

if (user.role !== "admin") {
    basic.changeWindow("../index.html")
}

const elementManager = basic.createBaseElement()

const urlParams = new URLSearchParams(window.location.search)
const recievedData = urlParams.get("data")
const databaseUser = await call.getFromDB(`users/${decodeURIComponent(recievedData)}`) 
const editedUser = Object.assign({}, databaseUser)
const avatars = await call.getFromDB("avatars")
let availableAvatars = []

const adminImg = elementManager.getElementById("admin-img")
const adminUsername = elementManager.getElementById("admin-username")
const editContainer = elementManager.getElementById("edit-container")
const userImg = elementManager.getElementById("user-img")
const closeIcon = elementManager.getElementById("close-icon")
const dropDownImages = elementManager.getElementById("drop-down-images")
const usernameInput = elementManager.getElementById("username-input")
const firstNameInput = elementManager.getElementById("first-name-input")
const lastNameInput = elementManager.getElementById("last-name-input")
const emailInput = elementManager.getElementById("email-input")
const genderSelect = elementManager.getElementById("gender-select")
const createdOn = elementManager.getElementById("created-on-p")
const editedOn = elementManager.getElementById("edited-on-p")
const editedBy = elementManager.getElementById("edited-by-p")
const saveButton = elementManager.getElementById("save-input")

const allFields = elementManager.querySelectorAll(`select, img[id=user-img], input:not([type="submit"])`)

// DISPLAYING INFORMATION

adminImg.setSrc(user.img)
adminUsername.setSrc(user.username)

userImg.setSrc(databaseUser.img)

userImg.addEventListenerFnc("click", function(){
    dropDownImages.setStyle("display", "grid")
})

closeIcon.addEventListenerFnc("click", function(){
    dropDownImages.setStyle("display", "none")
})

//displays all avatars to the drop down menu and adds selected class to the selected avatar
avatars.forEach(element => {
    const img = elementManager.createElement("img")
    availableAvatars.push(img)

    if(`/${element.src}` === databaseUser.img){
        img.addClass("selected")
    }

    img.setSrc(`../${element.src}`)
    img.appendTo(dropDownImages.getElement())

    //Event listener for selecting new avatar
    img.addEventListenerFnc("click", function(){
        basic.classRemoverArray(availableAvatars, "selected")
        img.addClass("selected")
        userImg.setSrc(`../${element.src}`)
    })

});


usernameInput.setValue(databaseUser.username)
firstNameInput.setValue(databaseUser.firstName)
lastNameInput.setValue(databaseUser.lastName)
emailInput.setValue(databaseUser.email)
genderSelect.setValue(databaseUser.gender)
createdOn.setInnerHTML(`Created on: ${databaseUser.createdOn}`)

// if(databaseUser.editHistory){
//     editedOn.setInnerHTML(`Edited On: ${databaseUser.editHistory[databaseUser.editHistory.lenght - 1].date}`)
//     editedBy.setInnerHTML(`By: ${databaseUser.editHistory[databaseUser.editHistory.lenght - 1].editor}`)
// }