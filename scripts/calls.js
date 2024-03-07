import * as specific from "../helpingScripts/appSpecific.js"
import * as basic from "../helpingScripts/basicFunctions.js"


const elementManager = basic.createBaseElement()

//function that post a new user to the database
export async function postUser(obj, url = "http://localhost:3000/users"){
    try {
        
        const data = {
            username: obj.username,
            firstName: obj.firstName,
            lastName: obj.lastName,
            password: obj.password,
            email: obj.email,
            gender: obj.gender,
            img: obj.img,
            role: obj.role,
            createdOn: obj.createdOn,
            editHistory: obj.editHistory
        }

        const response = await fetch(url, {
            method: "POST",
            headers:{
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })

        if (response.ok){
            
        }
        else{
            throw new Error(response.statusText)
        }

    } catch (error) {
        console.error(error)
    }
}

//function for getting information from the database
export async function getFromDB(value, func){
    const endpoint = `http://localhost:3000/${value}`

    try{
    const response = await fetch(endpoint)
    const responseData = await response.json()

    
    if(response.ok && func){
        func(responseData)
    }
    else if(response.ok){
        return responseData
    }
    else{
        throw new Error(respones.statusText)
    }
    }
    catch(error){
        console.error(error)
    }
}

export async function deleteUser(userId, deletedUser, userDeleter){
    const url = `http://localhost:3000/users/${userId}`
    
    try {
        const response = await fetch(url, {
            method: "DELETE",
            headers:{
                "Content-Type": "application/json",
            }
        })

        if (response.ok){
            alert("User has been deleted")
            await recordDeletedUser(deletedUser, userDeleter)
        }
        else{
            throw new Error(response.statusText)
        }

    } catch (error) {
        console.error(error)
    }
}

async function recordDeletedUser(deletedUser, userDeleter){
    const url = "http://localhost:3000/deleteHistory"

    const data = {
        deletedUser: deletedUser,
        userDeleter: userDeleter,
        deletionDate: specific.getDateNow()
    }
    
    const response = await fetch(url, {
        method: "POST",
        headers:{
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })

}
