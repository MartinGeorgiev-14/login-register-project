import * as basic from "../helpingScripts/basicFunctions.js"
import * as specific from "../helpingScripts/appSpecific.js"
import * as call from "./calls.js"

let selectedPage = 7

const elementManager = basic.createBaseElement()
const user = await specific.isUserActive()

const adminImg = elementManager.getElementById("admin-img")
const adminUsername = elementManager.getElementById("admin-username")
const usernameSort = elementManager.getElementById("username-sort")
const roleSort = elementManager.getElementById("role-sort")
const resetBtn = elementManager.getElementById("reset")

let isUsernameSorted = false
let isRoleSorted = false
//Checks if the logged person is admin
if (user.role !== "admin") {
    basic.changeWindow("../index.html")
}

resetBtn.addEventListenerFnc("click", async function () {
    await call.getFromDB("users", displayUsers)
    usernameSort.setInnerHTML("Username")
    roleSort.setInnerHTML("User Role")
})

usernameSort.addEventListenerFnc("click", async function () {
    if (isUsernameSorted) {
        await call.getFromDB("users?_sort=username", displayUsers)
        usernameSort.setInnerHTML(usernameSort.getInnerText() + ` <i class="fa-solid fa-sort-up"></i>`)
        isUsernameSorted = false
    }
    else {
        await call.getFromDB("users?_sort=-username", displayUsers)
        usernameSort.setInnerHTML(usernameSort.getInnerText() + ` <i class="fa-solid fa-sort-down"></i>`)
        isUsernameSorted = true
    }
})

roleSort.addEventListenerFnc("click", async function () {
    if (isRoleSorted) {
        await call.getFromDB("users?_sort=role", displayUsers)
        roleSort.setInnerHTML(roleSort.getInnerText() + ` <i class="fa-solid fa-sort-up"></i>`)
        isRoleSorted = false
    }
    else {
        await call.getFromDB("users?_sort=-role", displayUsers)
        roleSort.setInnerHTML(roleSort.getInnerText() + ` <i class="fa-solid fa-sort-down"></i>`)
        isRoleSorted = true
    }
})

await call.getFromDB("users?_page=14&_per_page=10", displayUsers, 10)

async function displayUsers(usersData, numOfEls) {
    const table = elementManager.getElementById("users-container")
    const title = elementManager.getElementById("user-title")
    const pages = await specific.pageDesider(numOfEls)
    // if(!usersData)

    const currentPage = usersData.next - 1

    const buttonsLength = currentPage > 4 ? 11 : 9

    
    if (currentPage < 4) {

        await displayNineButtons(usersData)
    }
    else if (currentPage > usersData.last - 4) {
        await displayNineButtonsReverse(usersData)
    }
    else {
        await displayElevenButtons(usersData)
    }

    adminImg.setSrc(user.img)
    adminUsername.setInnerHTML(user.username)

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
// The last 3 functions needs to be remade 
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
            if (li.getValue()) {
                selectedPage = li.getValue()
                await call.getFromDB(`users?_page=${li.getValue()}&_per_page=10`, displayUsers)
            }
        })
    }
}

async function displayElevenButtons(usersData) {
    const buttonContainer = elementManager.querySelectorAll(".buttons-container")
    basic.childRemover(buttonContainer.getCertainElement(0))

    for (let i = 1; i <= 11; i++) {
        const li = elementManager.createElement("li")
        console.log(selectedPage)
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
            if (li.getValue()) {
                selectedPage = li.getValue()
                await call.getFromDB(`users?_page=${li.getValue()}&_per_page=10`, displayUsers)
            }
        })
    }
}

async function displayNineButtonsReverse(usersData) {
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
                li.setValue(usersData.last - 3)
                li.setInnerHTML(usersData.last - 3)
                break
            case 6:
                li.setValue(usersData.last - 2)
                li.setInnerHTML(usersData.last - 2)
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
            if (li.getValue()) {
                selectedPage = li.getValue()
                await call.getFromDB(`users?_page=${li.getValue()}&_per_page=10`, displayUsers)
            }
        })
    }
}