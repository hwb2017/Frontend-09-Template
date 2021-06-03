import { Component, createElement } from './framework.js'

class Carousel extends Component {
    constructor() {
        super()
        this.attributes = Object.create(null);
    }
    setAttribute(name, value) {
        this.attributes[name] = value;
    }
    render() {
        this.root = document.createElement("div");
        this.root.classList.add("carousel");
        for (let record of this.attributes.src) {
            // img 元素默认是可拖拽的，不适用于轮播图的场景，改用div+background-img
            let child = document.createElement("div");
            child.style.backgroundImage = `url('${record}')`;
            this.root.appendChild(child);
        }
        // 图片Children的下标
        let position = 0;
        // mousemove和mouseup是在mousedown的条件下才监听，因此可以把它们的监听逻辑放在mousedown监听回调函数里
        this.root.addEventListener("mousedown", (event) => {
            let children = this.root.children;
            // 由于是左右轮播，不需要y轴坐标信息
            let startX = event.clientX;
            // 选用clientX和clientY,它们是相对viewport的坐标，比offset(相对容器)更实用，因为不受容器滚动的影响
            let move = event => {
                let x = event.clientX - startX;
                let current = position - ((x - x % 500) / 500);
                // 只关注当前图片及其前后两张图片的transform
                for (let offset of [-1, 0, 1]) {
                    let pos = current + offset;
                    pos = (pos + children.length) % children.length;
                    children[pos].style.transition = "none";
                    children[pos].style.transform = `translateX(${- pos * 500 + offset * 500 + x % 500}px)`;
                }
            }
            let up = (event) => {
                let x = event.clientX - startX;
                position = position - Math.round(x/500);
                console.log(position);
                let current = position;
                // 只关注当前图片及其前后两张图片的transform
                for (let offset of [0, -Math.sign(Math.round(x/500)-x+250*Math.sign(x))]) {
                    let pos = current + offset;
                    pos = (pos + children.length) % children.length;
                    children[pos].style.transition = "";
                    children[pos].style.transform = `translateX(${- pos * 500 + offset * 500}px)`;
                }                              
                // position = position - Math.round(x / 500);
                // for (let child of children) {
                //     child.style.transition = ""
                //     child.style.transform = `translateX(${- position * 500}px)`;
                //     console.log(- position * 500)
                // }
                for (let i = 0; i < children.length; i++) {
                    console.log(`${i}: ${children[i].style.transform}`)
                }                
                document.removeEventListener("mousemove", move);
                document.removeEventListener("mouseup", up);
            }
            document.addEventListener("mousemove", move);
            document.addEventListener("mouseup", up);
        })
        // let currentIndex = 0;
        // setInterval(() => {
        //     let children = this.root.children;
        //     let nextIndex = (currentIndex + 1) % children.length;
        //     let current = children[currentIndex];
        //     let next = children[nextIndex];

        //     // 完成两张图片拼接
        //     next.style.transition = "none";
        //     next.style.transform = `translateX(${100-nextIndex*100}%)`;

        //     // 在下一帧进行切换
        //     setTimeout(() => {
        //         next.style.transition = "";
        //         current.style.transform = `translateX(${-100 - currentIndex * 100}%)`;
        //         next.style.transform = `translateX(${- nextIndex*100}%)`
        //         currentIndex = nextIndex;
        //     }, 16)
        // }, 3000)
        return this.root;
    }
    mountTo(parent) {
        parent.appendChild(this.render());
    }
}

let d = [
    "https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg",
    "https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg",
    "https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg",
    "https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg"    
]
let a = <Carousel src={d} />
a.mountTo(document.body);