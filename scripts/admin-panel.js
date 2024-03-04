import * as basic from "../helpingScripts/basicFunctions.js"
import * as specific from "../helpingScripts/appSpecific.js"
import * as call from "./calls.js"

const elementManager = basic.createBaseElement()
await call.getFromDB("users", displayUsers)

function displayUsers(usersData){
    const table = elementManager.getElementById("users-container")
    const title = elementManager.getElementById("user-title")
    
    basic.removeRowsExceptFirst(table.getElement())

    usersData.forEach(element => {
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
        const edit = elementManager.createElement("p")
        const remove = elementManager.createElement("p")
    
        userTableRow.addClass("user")
        userInfo.addClass("user-info")
        usernameLi.addClass("bold")
        namesLi.addClass("thin")
        emailLi.addClass("thin")
        userRoles.addClass("user-roles")
        role.addClass("role-user")
        userActions.addClass("user-actions")
        edit.addClass("edit")
        remove.addClass("remove")
        

    
    });
}

