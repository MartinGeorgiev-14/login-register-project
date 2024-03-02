import * as specific from "../helpingScripts/appSpecific.js"
import * as basic from "../helpingScripts/basicFunctions.js"

const elementManeger = basic.createBaseElement()

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
            role: obj.role
        }

        const response = await fetch(url, {
            method: "POST",
            headers:{
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })

        if (response.ok){
            alert("You have succesfully registered")
        }
        else{
            throw new Error(response.statusText)
        }

    } catch (error) {
        console.error(error)
    }
}

//function for getting information from the database
export async function getFromDB(value){
    const endpoint = `http://localhost:3000/${value}`

    try{
    const response = await fetch(endpoint)
    const responseData = await response.json()

    if(response.ok){
        console.log(responseData)
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
