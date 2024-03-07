
import * as call from "../scripts/calls.js"
import * as basic from "./basicFunctions.js"
//  /[0-9!@#$%^&*()_+{}\[\]:<>,.?~\\/\-=|]+/

const errorRed = "rgb(255,51,51)"

//Function that checks if input match the condition
export function checkForInvalidInput(input) {
    return /[!@#$%^&*()+{}\[\]:;<>,?~\\/\-=|]+/.test(input)
}

//function that changes the element's border color to red
//sets focus effect to the border
export function makeBorderRed(element) {
    const def = errorRed
    const focus = "rgb(215, 2, 2)"

    element.style.borderColor = def

    focusBlurElement(element, "borderColor", def, focus)
}

//Function that changes border's color
export function changeBorderColor(element, color) {
    element.style.borderColor = color
}

//function that sets border's color to the default one
//sets foucs effect to the border back to the default one
export function makeBorderDefaultColor(border) {
    const def = getComputedStyle(document.documentElement).getPropertyValue("--border")
    const focus = getComputedStyle(document.documentElement).getPropertyPriority("--hover-border")

    border.style.borderColor = def

    focusBlurElement(border, "borderColor", def, focus)
}

//function that sets text, color and displays error message
export function displayErrorMsg(element, msg) {
    const color = errorRed
    element.style.display = "block"
    element.innerHTML = msg
}

//function that removes error message
export function removeErrorMsg(element) {
    element.style.display = "none"
    element.innerHTML = ""
}

// function that adds focus and blur effects to an element
function focusBlurElement(element, property, defaultColor, focusColor) {
    element.addEventListener("focus", function () {
        element.style[property] = focusColor
    })
    element.addEventListener("blur", function () {
        element.style[property] = defaultColor
    })
}

// Function that checks for entered information in inputs/ displays error messages/ returns bool
export function checkInputTextRegistration(element) {

    const value = element.getValue()
    const el = element.getElement()
    const errorEl = element.getNextSiblingById("error-msg")
    const label = element.getPreviousSibling().innerHTML.toLowerCase()

    if (checkForInvalidInput(value)) {
        displayErrorMsg(errorEl, `Please enter your ${label} correctly.`)
        makeBorderRed(el)
        return false
    }
    else if (element.getLength() === 0) {
        displayErrorMsg(errorEl, `Please enter your ${label}.`)
        makeBorderRed(el)
        return false
    }
    else if (element.getLength() <= 3) {
        displayErrorMsg(errorEl, `Please enter longer ${label}.`)
        makeBorderRed(el)
        return false
    }
    else {
        makeBorderDefaultColor(el)
        removeErrorMsg(errorEl)
        return true
    }
}

export async function checkIndividualInfo(element, type){

    const value = element.getValue()
    const el = element.getElement()
    const errorEl = element.getNextSiblingById("error-msg")
    const label = element.getPreviousSibling().innerHTML.toLowerCase()
    const data = await call.getFromDB("users")

    let isFound = false

    data.forEach(element => {
        if(element[type] === value){
            isFound = true
        }
    });

    if(isFound){
        displayErrorMsg(errorEl, `This ${label} is already taken.`)
        makeBorderRed(el)
        return false
    }

    if(type === "username"){
        return checkInputTextRegistration(element)
    }
    else{
        return checkEmailOrPasswordInputs(element)
    }
    
}

// Function that checks for entered information in inputs/ displays error messages/ returns bool
export function checkEmailOrPasswordInputs(element) {

    let checkFunction
    const type = element.getType()
    const length = element.getLength()
    const el = element.getElement()
    const errorEl = element.getNextSiblingById("error-msg")

    if (type === "email") {
        checkFunction = checkEmail
    }
    else {
        checkFunction = checkPassword
        if (length <= 8) {
            displayErrorMsg(errorEl, `Your password must be above 8 characters`)
            makeBorderRed(el)
            return false
        }
    }


    if (!checkFunction(element)) {
        displayErrorMsg(errorEl, `Please enter your ${type}.`)
        makeBorderRed(el)
        return false
    }
    else {
        makeBorderDefaultColor(el)
        removeErrorMsg(errorEl)
        return true
    }
}
//Function that checks if input match the condition
export function checkEmail(email) {
    return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email.getValue())
}
//Function that checks if input match the condition
export function checkPassword(password) {
    return /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:<>,.?~\\/-]).+$/.test(password.getValue())
}

// function that checks if two input values are equal/ displays error messages/ returns bool
export function areEqual(inputOne, inputTwo) {

    const label = inputOne.getPreviousSibling().innerHTML.toLowerCase()
    const lengthTwo = inputTwo.getLength()
    const errorElTwo = inputTwo.getNextSiblingById("error-msg")
    const elTwo = inputTwo.getElement()

    if (lengthTwo === 0) {
        displayErrorMsg(errorElTwo, `Please confirm your ${label}.`)
        makeBorderRed(elTwo)
        return false
    }
    else if (inputOne.getValue() !== inputTwo.getValue()) {
        displayErrorMsg(errorElTwo, `Entered ${label} is not correct.`)
        makeBorderRed(elTwo)
        return false
    }
    else {
        makeBorderDefaultColor(elTwo)
        removeErrorMsg(errorElTwo)
        return true
    }
}

// Function to generate a random salt
export async function generateSalt() {
    const saltBuffer = await crypto.getRandomValues(new Uint8Array(16))
    const saltArray = Array.from(saltBuffer)
    const salt = saltArray.map(byte => byte.toString(16).padStart(2, '0')).join('')
    return salt
}

// Hashing Function with Salting using Web Crypto API
export async function hashPasswordWithSalt(password) {
    const salt = await generateSalt()
    const encoder = new TextEncoder()
    const data = encoder.encode(password + salt)
    const hashBuffer = await crypto.subtle.digest('SHA-256', data)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    const hashedPassword = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('')
    return { hashedPassword, salt }
}

// Password Comparison Function with Salting 
export async function comparePasswordsWithSalt(inputPassword, hashedPassword, salt) {
    const encoder = new TextEncoder()
    const data = encoder.encode(inputPassword + salt)
    const hashBuffer = await crypto.subtle.digest('SHA-256', data)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    const inputHashedPassword = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('')
    return inputHashedPassword === hashedPassword
}

//Function that checks given information if is found in the database
export async function checkCredentials(usernameEmail, password) {
    const allUsers = await call.getFromDB("users")
    let findUser

    for (const element of allUsers) {

        const compare = await comparePasswordsWithSalt(password, element.password.hashedPassword, element.password.salt)
        if ((element.username === usernameEmail ||
            element.email === usernameEmail) && compare) {

            return element
        }
    }
   
}


//functions for encrypting and decrypting user information
export function encrypt(text, key = "superKey") {
    return [...text].map((x, i) =>
        (x.codePointAt() ^ key.charCodeAt(i % key.length) % 255)
            .toString(16)
            .padStart(2, "0")
    ).join('')
}
export function decrypt(text, key = "superKey") {
    return String.fromCharCode(...text.match(/.{1,2}/g)
        .map((e, i) =>
            parseInt(e, 16) ^ key.charCodeAt(i % key.length) % 255)
    )
}

// function that sets user to local or session storage based in remeber me checkbox is ticked
export function setUser(userData, rememberMeBool) {

    const idEncrypted = encrypt(userData.id)

    const date = new Date()
    date.getDay() + 7

    if (!rememberMeBool) {
        sessionStorage.setItem("activeUser", JSON.stringify({ user: idEncrypted }))
    }
    else {
        localStorage.setItem("activeUser", JSON.stringify({ user: idEncrypted, expiry: date }))
    }
}

export function logOutUser() {

    if (localStorage.getItem("activeUser")) {
        localStorage.removeItem("activeUser")
    } else {
        sessionStorage.removeItem("activeUser")
    }

    basic.changeWindow("../pages/login.html")
}

export function getDateNow(){
    const data = new Date()

    const day = checkIfSingleDiggit(data.getDate())
    const month = checkIfSingleDiggit(data.getMonth())
    const year = data.getFullYear()
    const hours = checkIfSingleDiggit(data.getHours())
    const minutes = checkIfSingleDiggit(data.getMinutes())
    const seconds = checkIfSingleDiggit(data.getSeconds())

    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`
}

function checkIfSingleDiggit(number){
    if(number < 10){
        return `0${number}`
    }
    else{
        return number
    }
}

export async function isUserActive(){
    const session = JSON.parse(sessionStorage.getItem("activeUser"))
    const local = JSON.parse(localStorage.getItem("activeUser"))
    const today = new Date()
 

    if(!session && !local){
        basic.changeWindow("../pages/login.html")
    }
    else if(local){
        
        if(new Date(local.expiry) >= today){
            logOutUser()
        }
        else{
            const userId = await decrypt(local.user)
            return await call.getFromDB(`users/${userId}`)
        }
            
    }
    else{
        const userId = await decrypt(session.user)
        return await call.getFromDB(`users/${userId}`)
    }
}

//Function that calculates elements per page
export async function pageDesider(elNum){
    const users = await call.getFromDB("users")
    let length = users.length

    while(length % elNum !== 0){
        length += 1
    }

    return length / elNum
    
}


