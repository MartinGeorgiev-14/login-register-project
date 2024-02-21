
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
            this.element.style.color = color
        },
        setStyle(styleType, value){
            this.element.style[styleType] = value
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
        addEventListenerFnc(event, func){
            this.element.addEventListener(event, func)
        },
        getLength(){
            return this.element.value.length
        },
        getNextSibling() {
            let nextNode = this.element.nextSibling;

            while (nextNode && nextNode.nodeType !== 1) {
                nextNode = nextNode.nextSibling;
            }

            return nextNode
        },
        getNextCertainSibling(condition){
            let nextNode = this.element.nextSibling

            while (nextNode.className === "error-msg") {

                nextNode = nextNode.nextSibling;
            }
            console.log(nextNode)
        }
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
            this.elements.forEach(element => {
                func(element);
            });
        },
        addEventListenerFnc(event, func){
            this.elements.addEventListener(event, func)
        }
       
      
    }

    const querySelectorBase = {
        getElement(){
            return this.elements
        },
        forEachFnc(func){
            this.elements.forEach(element => {
                func(element);
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
                element: doc.createElement(tagName),
            });
        },

        getElementById(elementId) {
            return Object.assign(Object.create(elementBase), {
                element: doc.getElementById(elementId),
            });
        },

        querySelectorAll(condition) {
            return Object.assign(Object.create(querySelectorAllBase), {
                elements: doc.querySelectorAll(condition)
            })
        },

        querySelector(condition){
            return Object.assign(Object.create(querySelectorBase), {
                elements: doc.querySelector(condition)
            })
        }

    };
}
//Functions that removes all child elements out of a parent element
export function childRemover(parent){
    while(parent.firstChild){
        parent.removeChild(parent.firstChild)
    }
}