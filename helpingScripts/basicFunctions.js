
const doc = document

export function createBaseElement() {
    //Common functions for individual elements
    const elementBase = {
        getElement() {
            return this.element;
        },
        addClass(val) {
            this.element.classList.add(val);
        },
        removeClass(val) {
            this.element.classList.remove(val);
        },
        setInnerHTML(val) {
            this.element.innerHTML = val;
        },
        appendTo(parent) {
            parent.append(this.element);
        },        
        changeColor(color){
            this.setStyle("color", color)
        },
        setStyle(styleType, value){
            this.element.style[styleType] = value
        },
        changeDisplay(value){
            this.setStyle("display", value)
        },
        setAttribute(attribute, value){
            this.element.setAttribute(attribute, value)
        },
        removeAttribute(attribute){
            this.element.removeAttribute(attribute)
        },
        getValue(){
            return this.element.value
        },
        setValue(value){
            this.element.value = value
        },
        getType(){
            return this.element.type
        },
        addEventListenerFnc(event, func){
            this.element.addEventListener(event, func)
        },
        getLength(){
            return this.element.value.length
        },
        forEachFnc(func){
            this.elements.forEach(element => {
                func(element);
            });
        },
        getNextSibling() {
            let nextNode = this.element.nextSibling;

            while (nextNode && nextNode.nodeType !== 1) {
                nextNode = nextNode.nextSibling
            }

            return nextNode
        },
        getNextSiblingById(condition){
            let nextNode = this.element.nextSibling

            while (!nextNode.className && nextNode.className !== condition) {

                nextNode = nextNode.nextSibling
                
            }
            
            if(nextNode.className === condition){
                return nextNode
            }
            else{
                console.error("Searched sibling is not found")
            }
        },
        getPreviousSibling(){
            let previousNode = this.element.previousSibling

            while(previousNode && previousNode.nodeType !== 1){
                previousNode = previousNode.previousSibling
            }

            return previousNode
        },
        getCertainElement(index){
            return this.elements[index]
        },
        forEachFnc(func){
            this.elements.forEach(element => {
                func(element);
            });
        },
    }

    //Common functions for working with arrays
    const querySelectorAllBase = {
        getAllElements(){
            return this.elements
        },
        getCertainElement(index){
            return this.elements[index]
        },
        forEachFnc(func){
            this.elements.forEach((element, index) => {
                func(element, index);
            });
        },
        addEventListenerFnc(event, func){
            this.elements.addEventListener(event, func)
        }
       
      
    }
    
    //Functions for creating, getting and manipulating elements
    return {
        createElement(tagName) {
            return Object.assign(Object.create(elementBase), {
                element: doc.createElement(tagName)
            });
        },

        getElementById(elementId) {
            return Object.assign(Object.create(elementBase), {
                element: doc.getElementById(elementId)
            });
        },

        querySelectorAll(condition) {
            return Object.assign(Object.create(querySelectorAllBase), {
                elements: doc.querySelectorAll(condition)
            })
        },

        querySelectorParentAll(parent, condition){
            return Object.assign(Object.create(querySelectorAllBase), {
                elements: parent.querySelectorAll(condition)
            })
        },

        querySelector(condition){
            return Object.assign(Object.create(elementBase), {
                element: doc.querySelector(condition)
            })
        },

        convertElement(element){
            return Object.assign(Object.create(elementBase), {
                element: element
            })
        }

    };
}
//Functions that removes all child elements out of a parent element
export function childRemover(parent){
    while(parent.childs){
        parent.removeChild(parent.firstChild)
    }
}

export function changeWindow(url){
    window.location.href = url
}

export function styleChanger(query, value){

    query.forEach(element => {
        element.style.borderColor = ""
  
    })
}

//function that removes all classes of given nodeList
export function classRemover(query, elClass){
    console.log(query)
    query.forEach(element => {
        element.classList.remove(elClass)
    });
}