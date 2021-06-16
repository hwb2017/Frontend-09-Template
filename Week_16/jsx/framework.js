// 只供模块间使用的内部状态，类似其他编程语言中的 protected 属性
export const STATE = Symbol("state");
export const ATTRIBUTE = Symbol("attribute");

class Component {
    constructor() {
        this[ATTRIBUTE] = Object.create(null);   
        this[STATE] = Object.create(null);
    }
    setAttribute(name, value) {
        this[ATTRIBUTE][name] = value;
    }  
    appendChild(child) {
        child.mountTo(this.root);
    }
    mountTo(parent) {
        if (!this.root) 
            this.render();
        parent.appendChild(this.root);
    }    
    triggerEvent(type, args) {
        this[ATTRIBUTE]["on" + type.replace(/^[\s\S]/, s => s.toUpperCase())](new CustomEvent(type, { detail: args }));
    }
    render() {
        return this.root;
    }
}
class ElementWrapper extends Component {
    constructor(type) {
        super();
        this.root = document.createElement(type);
    }
    setAttribute(name, value) {
        this.root.setAttribute(name, value);
    }
}

class TextWrapper extends Component {
    constructor(content) {
        super();
        this.root = document.createTextNode(content);
    }
}

// 这里把createElement改造为创建实体DOM
function createElement(type, attributes, ...children) {
    let element;
    if (typeof type === "string") {
        element = new ElementWrapper(type);
    } else {
        element = new type;
    }
    for (let name in attributes) {
        element.setAttribute(name, attributes[name])
    }
    let processChildren = (children) => {
        for (let child of children) {
            if ((typeof child === "object") && (child instanceof Array)) {
                processChildren(child);
            } else {
                if (typeof child === "string") {
                    child = new TextWrapper(child);
                }
                element.appendChild(child);
            }
        }
    }
    processChildren(children);
    return element;
}

export { Component, createElement }