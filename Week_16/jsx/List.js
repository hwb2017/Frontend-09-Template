import { Component, STATE, ATTRIBUTE, createElement } from './framework.js'
import { enableGesture } from './gesture.js';
export { STATE, ATTRIBUTE } from './framework.js';

export class List extends Component {
    constructor() {
        super()
    }
    render() {
        // 接受属性中传入的数据，并根据template中的函数转换为children元素的列表
        this.children = this[ATTRIBUTE].data.map(this.template);
        this.root = (<div>{this.children}</div>).render();
        return this.root;
    }
    appendChild(child) {
        // 模板型 children
        this.template = (child);
    }
}