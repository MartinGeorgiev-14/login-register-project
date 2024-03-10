import * as basic from "../helpingScripts/basicFunctions.js"
import * as specific from "../helpingScripts/appSpecific.js"
import * as call from "./calls.js"


let selectedPage = 1
const elementsPerPage = 10
const defaultEndpoint = `users?_page=${selectedPage}&_per_page=${elementsPerPage}`
let activeURL = ["users?_page=", "&_per_page="]

 
const elementManager = basic.createBaseElement()
const user = await specific.isUserActive()

const adminImg = elementManager.getElementById("admin-img")
const adminUsername = elementManager.getElementById("admin-username")
const searchInput = elementManager.getElementById("search-input")
const submitInput = elementManager.getElementById("submit-input")
const usernameSort = elementManager.getElementById("username-sort")
const roleSort = elementManager.getElementById("role-sort")
const resetBtn = elementManager.getElementById("reset")

let isUsernameSorted = false
let isRoleSorted = false

//Checks if the logged person is admin
if (user.role !== "admin") {
    basic.changeWindow("../index.html")
}

searchInput.addEventListenerFnc("keyup", async function(event){
    event.preventDefault()
    
    if(event.key === "Enter"){
        searchPage()
    }

})

submitInput.addEventListenerFnc("click", async function(event){
    event.preventDefault()
    searchPage()
})

//Event listener that resets to the first page
resetBtn.addEventListenerFnc("click", async function () {

    let targets = elementManager.querySelectorAll(".buttons-container li")
    let targetLi = elementManager.querySelector('.buttons-container li[value="1"]');

    await call.getFromDB(defaultEndpoint, displayUsers)
    await displayNineButtons(await call.getFromDB(defaultEndpoint))

    activeURL = ["users?_page=", "&_per_page="]
    selectedPage = 1

    usernameSort.setInnerHTML("Username")
    roleSort.setInnerHTML("User Role")
    basic.classRemover(targets.getAllElements(), "selected")
    targetLi.addClass("selected")
})

//Event listener that sorts users by name
usernameSort.addEventListenerFnc("click", async function () {
    if (isUsernameSorted) {
        await call.getFromDB(`users?_sort=username&_page=${selectedPage}&_per_page${elementsPerPage}`, displayUsers)
        usernameSort.setInnerHTML(usernameSort.getInnerText() + ` <i class="fa-solid fa-sort-up"></i>`)
        isUsernameSorted = false
        activeURL = ["users?_sort=username&_page=", "&_per_page="]
    }
    else {
        await call.getFromDB(`users?_sort=-username&_page=${selectedPage}&_per_page${elementsPerPage}`, displayUsers)
        usernameSort.setInnerHTML(usernameSort.getInnerText() + ` <i class="fa-solid fa-sort-down"></i>`)
        isUsernameSorted = true
        activeURL = ["users?_sort=-username&_page=", "&_per_page="]
    }
})

//Event listener that sorts by role
roleSort.addEventListenerFnc("click", async function () {
    if (isRoleSorted) {
        await call.getFromDB("users?_sort=role", displayUsers)
        roleSort.setInnerHTML(roleSort.getInnerText() + ` <i class="fa-solid fa-sort-up"></i>`)
        isRoleSorted = false
        activeURL = ["users?_sort=role&_page=", "&_per_page="]
    }
    else {
        await call.getFromDB("users?_sort=-role", displayUsers)
        roleSort.setInnerHTML(roleSort.getInnerText() + ` <i class="fa-solid fa-sort-down"></i>`)
        isRoleSorted = true
        activeURL = ["users?_sort=-role&_page=", "&_per_page="]
    }
})

//Initial call to display users data
await call.getFromDB(defaultEndpoint, displayUsers, 10)

//Function that displays users data
async function displayUsers(usersData, numOfEls) {
    const table = elementManager.getElementById("users-container")

    await buttonsDisplayer(selectedPage, usersData)

    //setting img and innerHtml of the logged admin on the header
    adminImg.setSrc(user.img)
    adminUsername.setInnerHTML(user.username)

    //Removes all elements in the table exept 
    basic.removeRowsExceptFirst(table.getElement())

    usersData.data.forEach(element => {
        const userTableRow = elementManager.createElement("tr")
        const userInfo = elementManager.createElement("td")
        const img = elementManager.createElement("img")
        const ul = elementManager.createElement("ul")
        const usernameLi = elementManager.createElement("li")
        const namesLi = elementManager.createElement("li")
        const emailLi = elementManager.createElement("li")
        const userRoles = elementManager.createElement("td")
        const userRolesDiv = elementManager.createElement("div")
        const role = elementManager.createElement("p")
        const userActions = elementManager.createElement("td")
        const userActionsDiv = elementManager.createElement("div")
        const edit = elementManager.createElement("button")
        const remove = elementManager.createElement("button")

        userTableRow.addClass("user")
        userInfo.addClass("user-info")
        usernameLi.addClass("bold")
        namesLi.addClass("thin")
        emailLi.addClass("thin")
        userRoles.addClass("user-roles")
        userActions.addClass("user-actions")
        edit.addClass("edit")
        remove.addClass("remove")

        //Validation if element is user or admin
        if (element.role === "user") {
            role.addClass("role-user")
            edit.setInnerHTML(`<i class="fa-solid fa-gear"></i> Modify User`)
        }
        else if (element.role === "admin") {
            role.addClass("role-admin")
            remove.setDisabledAttribute()
            edit.setInnerHTML(`<i class="fa-solid fa-gear"></i> See Info`)
        }

        img.setSrc(element.img)
        usernameLi.setInnerHTML(element.username)
        namesLi.setInnerHTML(`${element.firstName} ${element.lastName}`)
        emailLi.setInnerHTML(element.email)
        role.setInnerHTML(element.role)
        remove.setInnerHTML(`<i class="fa-solid fa-xmark"></i> Delete User`)

        userTableRow.appendTo(table.getElement())
        userInfo.appendTo(userTableRow.getElement())
        img.appendTo(userInfo.getElement())
        ul.appendTo(userInfo.getElement())
        usernameLi.appendTo(ul.getElement())
        namesLi.appendTo(ul.getElement())
        emailLi.appendTo(ul.getElement())
        userRoles.appendTo(userTableRow.getElement())
        userRolesDiv.appendTo(userRoles.getElement())
        role.appendTo(userRolesDiv.getElement())
        userActions.appendTo(userTableRow.getElement())
        userActionsDiv.appendTo(userActions.getElement())
        edit.appendTo(userActionsDiv.getElement())
        remove.appendTo(userActionsDiv.getElement())

        remove.addEventListenerFnc("click", async function () {
            if (user.role !== "admin") {
                basic.changeWindow("../index.html")
                return
            }

            if (element.role === "admin") {
                alert("You can not delete other admins")
                return
            }

            await call.deleteUser(element.id, element, user)
            await call.getFromDB("users", displayUsers)
        })

    });
}
// Function that displays the first configuration of buttons
// example          Previous 1 2 3 4 ... 14 15 Next
async function displayNineButtons(usersData) {
    const buttonContainer = elementManager.querySelectorAll(".buttons-container")
    basic.childRemover(buttonContainer.getCertainElement(0))
    for (let i = 1; i <= 9; i++) {
        const li = elementManager.createElement("li")
        switch (i) {
            case 1:
                li.setInnerHTML("Previous")
                if (!usersData.prev) {
                    li.setDisabledAttribute()
                }
                else {
                    li.setValue(usersData.prev)
                }
                break
            case 6:
                li.addClass("dots")
                li.setInnerHTML("...")
                break
            case 7:
                li.setValue(usersData.last - 1)
                li.setInnerHTML(usersData.last - 1)
                break
            case 8:
                li.setValue(usersData.last)
                li.setInnerHTML(usersData.last)
                break
            case 9:
                if (!usersData.next) {
                    li.setDisabledAttribute()
                }
                else {
                    li.setValue(usersData.next)
                }
                li.setInnerHTML("Next")
                break
            case selectedPage + 1:
                li.addClass("selected")
                li.setValue(i - 1)
                li.setInnerHTML(i - 1)
                break
            default:
                li.setValue(i - 1)
                li.setInnerHTML(i - 1)
                break
        }

        li.appendTo(buttonContainer.getCertainElement(0))

        li.addEventListenerFnc("click", async function () {
            await pageSwitcher(li)
        })
    }
}
//Function that displays the second configuration of buttons
//example           Previous 1 2 ... 5 6 7 ... 14 15 Next
async function displayElevenButtons(usersData) {
    const buttonContainer = elementManager.querySelectorAll(".buttons-container")
    basic.childRemover(buttonContainer.getCertainElement(0))

    for (let i = 1; i <= 11; i++) {
        const li = elementManager.createElement("li")

        switch (i) {
            case 1:
                li.setInnerHTML("Previous")
                if (!usersData.prev) {
                    li.setDisabledAttribute()
                }
                else {
                    li.setValue(usersData.prev)
                }
                break
            case 2:
                li.setValue(usersData.first)
                li.setInnerHTML(usersData.first)
                break
            case 3:
                li.setValue(usersData.first + 1)
                li.setInnerHTML(usersData.first + 1)
                break
            case 4:
                li.addClass("dots")
                li.setInnerHTML("...")
                break
            case 5:
                li.setValue(selectedPage - 1)
                li.setInnerHTML(selectedPage - 1)
                break
            case 6:
                li.setValue(selectedPage)
                li.setInnerHTML(selectedPage)
                li.addClass("selected")
                break
            case 7:
                li.setValue(selectedPage + 1)
                li.setInnerHTML(selectedPage + 1)
                break
            case 8:
                li.addClass("dots")
                li.setInnerHTML("...")
                break
            case 9:
                li.setValue(usersData.last - 1)
                li.setInnerHTML(usersData.last - 1)
                break
            case 10:
                li.setValue(usersData.last)
                li.setInnerHTML(usersData.last)
                break
            case 11:
                if (!usersData.next) {
                    li.setDisabledAttribute()
                }
                else {
                    li.setValue(usersData.next)
                }
                li.setInnerHTML("Next")
                break

        }

        li.appendTo(buttonContainer.getCertainElement(0))


        li.addEventListenerFnc("click", async function () {
            await pageSwitcher(li)
        })
    }
}
//Function that displays the third configuration of buttons
// example          Previous 1 2 ... 4 12 13 14 15 Next
async function displayNineButtonsReverse(usersData) {
    const buttonContainer = elementManager.querySelectorAll(".buttons-container")
    basic.childRemover(buttonContainer.getCertainElement(0))

    const end = usersData.last
    const begin = end - 8

    for (let i = begin; i <= end; i++) {
        const li = elementManager.createElement("li")

        switch (i) {
            case end - 8: //1
                li.setInnerHTML("Previous")
                if (!usersData.prev) {
                    li.setDisabledAttribute()
                }
                else {
                    li.setValue(usersData.prev)
                }
                break
            case end - 7: //2
                li.setValue(usersData.first)
                li.setInnerHTML(usersData.first)
                break
            case end - 6: //3
                li.setValue(usersData.first + 1)
                li.setInnerHTML(usersData.first + 1)
                break
            case end - 5: //4
                li.addClass("dots")
                li.setInnerHTML("...")
                break
            case selectedPage - 1:
                li.addClass("selected")
                li.setValue(i + 1)
                li.setInnerHTML(i + 1)
                break
            case end:
                if (!usersData.next) {
                    li.setDisabledAttribute()
                }
                else {
                    li.setValue(usersData.next)
                }
                li.setInnerHTML("Next")
                break

            default:
                li.setValue(i + 1)
                li.setInnerHTML(i + 1)
                break
        }

        li.appendTo(buttonContainer.getCertainElement(0))

        li.addEventListenerFnc("click", async function () {
            await pageSwitcher(li)
        })
    }
}

async function pageSwitcher(page){
    if (page.getValue()) {
        selectedPage = page.getValue()
        await call.getFromDB(activeURL[0] + selectedPage + activeURL[1] + elementsPerPage, displayUsers)
    }
}

async function buttonsDisplayer(selPage, data){
        //Validation that checks which button configutation to display
        if (selPage < 4) {
            //First configuration
            await displayNineButtons(data)
        }
        else if (selPage > data.last - 3) {
            //Third configuration
            await displayNineButtonsReverse(data)
        }
        else {
            //Second configuration
            await displayElevenButtons(data)
        }
}

async function searchPage(){
    const users = await call.getFromDB(activeURL[0] + selectedPage + activeURL[1] + elementsPerPage)
    const totalPages = users.last


    if(searchInput.getValue() <= totalPages){
        await call.getFromDB(activeURL[0] + searchInput.getValue() + activeURL[1] + elementsPerPage, displayUsers)
        selectedPage = parseInt(searchInput.getValue())
        await buttonsDisplayer(searchInput.getValue(), users)
        searchInput.setValue("")
    }
    else{
        alert(`You cannot exceed the total amount of pages. Total pages: ${totalPages}`)
    }
}