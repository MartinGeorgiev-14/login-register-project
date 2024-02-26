import * as basic from "../helpingScripts/basicFunctions.js"

const session = sessionStorage.getItem("activeUser")
const local = localStorage.getItem("activeUser")

console.log(session, local)

if(!session && !local){
    basic.changeWindow("../pages/login.html")
}
