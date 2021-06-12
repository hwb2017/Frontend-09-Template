export class Listener {
    constructor(element, recognizer) {
        // 用于判断某个button是否已经加了监听函数
        let isLisentingMouse = false;

        element.addEventListener("mousedown", event => {
            let context = Object.create(null);
            contexts.set("mouse" + (1 << event.button), context);
            recognizer.start(event, context);
            const mousemove = event => {
                let button = 1;
                let key;
                while(button <= event.buttons) {
                    if (button & event.buttons) {
                        // order of buttons & button property is not same
                        if (button === 2)
                            key = 4;
                        else if (button === 4)
                            key = 2;
                        else 
                            key = button;
                        let context = contexts.get("mouse" + key);
                        recognizer.move(event, context);
                    }
                    button = button << 1;
                }        
            }
            const mouseup = () => {
                let context = contexts.get("mouse" + (1 << event.button));
                recognizer.end(event, context);
                contexts.delete("mouse" + (1 << event.button));
                // 所有button都不再监听时，才把 event listenter 完全移除
                if (event.buttons === 0) {
                    document.removeEventListener("mousemove", mousemove);
                    document.removeEventListener("mouseup", mouseup);
                    isLisentingMouse = false;
                }
            }
            if (!isLisentingMouse) {
                document.addEventListener("mousemove", mousemove);
                document.addEventListener("mouseup", mouseup);
                isLisentingMouse = true;
            }
        })

        let contexts = new Map();
        element.addEventListener("touchstart", event => {
            for(let touch of event.changedTouches) {
                let context = Object.create(null);
                contexts.set(touch.identifier, context);
                recognizer.start(touch, context);
            }
        })

        element.addEventListener("touchmove", event => {
            for(let touch of event.changedTouches) {
                let context = contexts.get(touch.identifier);
                recognizer.move(touch, context);
            }
        })

        element.addEventListener("touchend", event => {
            for(let touch of event.changedTouches) {
                let context = contexts.get(touch.identifier);
                recognizer.end(touch, context);
                contexts.delete(touch.identifier);
            }
        })

        element.addEventListener("touchcancel", event => {
            for(let touch of event.changedTouches) {
                let context = contexts.get(touch.identifier);
                recognizer.cancel(touch, context);
                contexts.delete(touch.identifier);
            }
        })
    }
}

export class Recognizer {
    constructor(dispatcher) {
        this.dispatcher = dispatcher;
    }
    start(point, context) {
        context.startX = point.clientX, context.startY = point.clientY;
        context.points = [{
            t: Date.now(),
            x: point.clientX,
            y: point.clientY
        }];
        // isTap与isPan互斥
        context.isTap = true;
        context.isPan = false;
        context.isPress = false;
        context.isFlick = false;
        context.handler = setTimeout(() => {
            context.isTap = false;
            context.isPan = false;
            context.isPress = true;
            context.handler = null;      
            this.dispatcher.dispatch("press", {

            });
        }, 1000)
    }
    end (point, context) {
        if (context.isTap) {
            this.dispatcher.dispatch("tap", {});
            clearTimeout(context.handler);
        }
        if (context.isPress) {
            this.dispatcher.dispatch("pressEnd", {});
        }
    
        let d, v;
        context.points = context.points.filter(point => Date.now() - point.t < 500);
        if (!context.points.length) {
            v = 0;
        } else {
            d = Math.sqrt(point.clientX - context.points[0].x) ** 2 +
            (point.clientY - context.points[0].y) ** 2;
            v = d / (Date.now() - context.points[0].t);
        }
        
        // 速度单位是像素/毫秒
        if (v > 1.5) {
            this.dispatcher.dispatch("flick", {
                startX: context.startX,
                startY: context.startY,
                clientX: point.clientX,
                clientY: point.clientY,
                isVertical: context.isVertical,
                isFlick: context.isFlick,
                velocity: v
            });
            context.isFlick = true;
        } else {
            context.isFlick = false;
        }
        if (context.isPan) {
            this.dispatcher.dispatch("panEnd", {
                startX: context.startX,
                startY: context.startY,
                clientX: point.clientX,
                clientY: point.clientY,
                isVertical: context.isVertical,
                isFlick: context.isFlick
            });
        }        
    }
    move (point, context) {
        let dx = point.clientX - context.startX, dy = point.clientY - context.startY;
        if (!context.isPan && dx ** 2 + dy ** 2 > 100) {
            context.isTap = false;
            context.isPan = true;
            context.isPress = false;
            context.isVertical = Math.abs(dx) < Math.abs(dy);
            this.dispatcher.dispatch("panStart", {
                startX: context.startX,
                startY: context.startY,
                clientX: point.clientX,
                clientY: point.clientY,
                isVertical: context.isVertical
            });
            clearTimeout(context.handler);
        }
        if (context.isPan) {
            this.dispatcher.dispatch("pan", {
                startX: context.startX,
                startY: context.startY,
                clientX: point.clientX,
                clientY: point.clientY
            });
        }
    
        // 只保留最近500毫秒内的位移点
        context.points = context.points.filter(point => Date.now() - point.t < 500);
        context.points.push({
            t: Date.now(),
            x: point.clientX,
            y: point.clientY
        })
    }
    cancel (point, context) {
        clearTimeout(context.handler);
        this.dispatcher.dispatch('cancel', {});
    }    
}

export class Dispatcher {
    constructor(element) {
        this.element = element;
    }
    dispatch(type, properties) {
        console.log(type);
        let event = new Event(type);
        for (let name in properties) {
            event[name] = properties[name];
        }
        this.element.dispatchEvent(event);
    }    
}

export function enableGesture(element) {
    return new Listener(element, new Recognizer(new Dispatcher(element)))
}