import { Component, STATE, ATTRIBUTE } from './framework.js'
import { enableGesture } from './gesture.js';
import { Timeline, Animation } from './animation.js';
import { ease } from './ease.js';

// 为了使继承 carousel的组件还能使用state
export { STATE, ATTRIBUTE } from './framework.js';

export class Carousel extends Component {
    constructor() {
        super()
    }
    render() {
        this.root = document.createElement("div");
        this.root.classList.add("carousel");
        for (let record of this[ATTRIBUTE].src) {
            // img 元素默认是可拖拽的，不适用于轮播图的场景，改用div+background-img
            let child = document.createElement("div");
            child.style.backgroundImage = `url('${record.img}')`;
            this.root.appendChild(child);
        }        
        
        // 图片Children的下标
        this[STATE].position = 0;
        let t = 0;
        let ax = 0;
        let handler = null;
        let children = this.root.children;      
        // 启用手势库
        enableGesture(this.root);
        // 初始化时间线实例
        let tl = new Timeline();
        tl.start();

        let nextPicture = () => {
            let nextPosition = (this[STATE].position + 1) % children.length;
            let current = children[this[STATE].position];
            let next = children[nextPosition];
            
            t = Date.now();

            tl.add(new Animation(current.style, "transform",
                - this[STATE].position * 500,
                -500 - this[STATE].position * 500,
                500, 0, ease, v => `translateX(${v}px)`))
            tl.add(new Animation(next.style, "transform",
                500 - nextPosition * 500,
                - nextPosition * 500,
                500, 0, ease, v => `translateX(${v}px)`))
  
            this[STATE].position = nextPosition;
            this.triggerEvent("change", {position: this[STATE].position});
        }
        handler = setInterval(nextPicture, 3000);   

        this.root.addEventListener("start", event => {
            tl.pause();
            clearInterval(handler);
            let progress = (Date.now() - t) / 500;
            ax = ease(progress) * 500 - 500;
        });

        this.root.addEventListener("tap", event => {
            this.triggerEvent("click", {
                position: this[STATE].position,
                data: this[ATTRIBUTE].src[this[STATE].position]
            })
        });

        this.root.addEventListener("pan", event => {
            let x = event.clientX - event.startX - ax;
            let current = this[STATE].position - ((x - x % 500) / 500);
            // 只关注当前图片及其前后两张图片的transform
            for (let offset of [-1, 0, 1]) {
                let pos = current + offset;
                pos = (pos % children.length + children.length) % children.length;
                children[pos].style.transition = "none";
                children[pos].style.transform = `translateX(${- pos * 500 + offset * 500 + x % 500}px)`;
            }            
        })
        this.root.addEventListener("end", event => {
            tl.reset();
            tl.start();
            handler = setInterval(nextPicture, 3000);

            let x = event.clientX - event.startX - ax;
            let current = this[STATE].position - ((x - x % 500) / 500);

            let direction = Math.round((x % 500) / 500);
            if (event.isFlick) {
                if (event.velocity > 0) {
                    direction = Math.ceil((x % 500) / 500);
                } else {
                    direction = Math.floor((x % 500) / 500); 
                }
            }

            // 只关注当前图片及其前后两张图片的transform
            for (let offset of [-1, 0, 1]) {
                let pos = current + offset;
                pos = (pos % children.length + children.length) % children.length;
                
                children[pos].style.transition = "none";
                tl.add(new Animation(children[pos].style, "transform",
                    - pos * 500 + offset * 500 + x % 500,
                    - pos * 500 + offset * 500 + direction * 500,
                    500, 0, ease, v => `translateX(${v}px)`))
            }       
            
            this[STATE].position = this[STATE].position - ((x - x % 500) / 500) - direction;
            this[STATE].position = (this[STATE].position % children.length + children.length) % children.length;
            
            this.triggerEvent("change", {position: this[STATE].position});
        })       

        return this.root;
    }
}