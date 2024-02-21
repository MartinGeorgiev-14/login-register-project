

//  /[0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/\-=|]+/

const errorRed = "rgb(255,51,51)"

export function checkForInvalidInput(input){
    const regex = /[!@#$%^&*()+{}\[\]:;<>,?~\\/\-=|]+/
    return regex.test(input)
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
}

function focusBlurElement(element, property, defaultColor, focusColor){
    element.addEventListener("focus", function(){
        element.style[property] = focusColor
    })
    element.addEventListener("blur", function(){
        element.style[property] = defaultColor
    })
}