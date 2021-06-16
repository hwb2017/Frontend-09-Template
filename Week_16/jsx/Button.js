import { Component, STATE, ATTRIBUTE, createElement } from './framework.js'
import { enableGesture } from './gesture.js';
export { STATE, ATTRIBUTE } from './framework.js';

export class Button extends Component {
    constructor() {
        super()
    }
    render() {
        this.childContainer = <span />;
        this.root = (<div>{this.childContainer}</div>).render();
        return this.root;
    }
    appendChild(child) {
        if (!this.childContainer) {
            this.render()
        }
        // 内容型 children， 所有append的child(文本节点)都会放在 <span> 标签里
        this.childContainer.appendChild(child);
    }
}