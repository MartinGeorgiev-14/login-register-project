

//  /[0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/\-=|]+/

const errorRed = "rgb(255,51,51)"

export function checkForInvalidInput(input){
    return /[!@#$%^&*()+{}\[\]:;<>,?~\\/\-=|]+/.test(input)
}

export function makeBorderRed(border){
    const def = errorRed
    const focus = "rgb(215, 2, 2)"

    border.style.borderColor = def

    focusBlurElement(border, "borderColor", def, focus)
}

export function makeBorderDefaultColor(border){
    const def = getComputedStyle(document.documentElement).getPropertyValue("--border")
    const focus = getComputedStyle(document.documentElement).getPropertyPriority("--hover-border")

    border.style.borderColor = def

    focusBlurElement(border, "borderColor", def, focus)
}

export function displayErrorMsg(element, msg){
    const color = errorRed
    element.style.display = "block"
    element.innerHTML = msg
}

export function removeErrorMsg(element){
    element.style.display = "none"
    element.innerHTML = ""
}

function focusBlurElement(element, property, defaultColor, focusColor){
    element.addEventListener("focus", function(){
        element.style[property] = focusColor
    })
    element.addEventListener("blur", function(){
        element.style[property] = defaultColor
    })
}

export function checkInputTextRegistration(element){

    const value = element.getValue()
    const el = element.getElement()
    const errorEl = element.getNextSiblingById("error-msg")
    const label = element.getPreviousSibling().innerHTML.toLowerCase()
    
    if(checkForInvalidInput(value)){
        displayErrorMsg(errorEl, `Please enter your ${label} correctly.`)
        makeBorderRed(el)
        return false
    }
    else if(element.getLength() === 0){
        displayErrorMsg(errorEl, `Please enter your ${label}.`)
        makeBorderRed(el)
        return false
    }
    else if(element.getLength() <= 3){
        displayErrorMsg(errorEl, `Please enter longer ${label}.`)
        makeBorderRed(el)
        return false
    }
    else{
        makeBorderDefaultColor(el)
        removeErrorMsg(errorEl)
        return true
    }
}

export function checkEmailOrPasswordInputs(element){

    let checkFunction
    const type = element.getType()
    const length = element.getLength()
    const el = element.getElement()
    const errorEl = element.getNextSiblingById("error-msg")

    if(type === "email"){
        checkFunction = checkEmail
    }
    else{
        checkFunction = checkPassword
        if(length <= 8){
            displayErrorMsg(errorEl, `Your password must be above 8 characters`)
            makeBorderRed(el)
            return false
        }
    }

    
    if(!checkFunction(element)){
        displayErrorMsg(errorEl, `Please enter your ${type}.`)
        makeBorderRed(el)
        return false
    }
    else{
        makeBorderDefaultColor(el)
        removeErrorMsg(errorEl)
        return true
    }
}

export function checkEmail(email){
    return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email.getValue())
}

export function checkPassword(password){
    return /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).+$/.test(password.getValue())
}

export function areEqual(inputOne, inputTwo){

    const label = inputOne.getPreviousSibling().innerHTML.toLowerCase()
    const lengthTwo = inputTwo.getLength()
    const errorElTwo = inputTwo.getNextSiblingById("error-msg") 
    const elTwo = inputTwo.getElement()
    
    if(lengthTwo === 0){
        displayErrorMsg(errorElTwo, `Please confirm your ${label}.`)
        makeBorderRed(elTwo)
        return false 
    }
    else if(inputOne.getValue() !== inputTwo.getValue()){
        displayErrorMsg(errorElTwo, `Entered ${label} is not correct.`)
        makeBorderRed(elTwo)
        return false
    }
    else{
        makeBorderDefaultColor(elTwo)
        removeErrorMsg(errorElTwo)
        return true
    }
}