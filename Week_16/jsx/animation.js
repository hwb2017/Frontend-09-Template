// 通过声明 Symbol, 使得 tick 变量及其处理函数不容易被外界访问到，避免扰乱时间线
const TICK = Symbol("tick");
const TICK_HANDLER = Symbol("tick-handler");
const ANIMATIONS = Symbol("animations");
const START_TIME = Symbol("start-time");
const PAUSE_START = Symbol("pause-start");
const PAUSE_TIME = Symbol("pause-time");

export class Timeline {
    constructor() {
        this.state = "inited";
        this[ANIMATIONS] = new Set();
        this[START_TIME] = new Map();
    }
    start() {
        if (this.state !== "inited")
            return
        this.state = "started";
        let startTime = Date.now();
        this[PAUSE_TIME] = 0;
        this[TICK] = () => {
            let now = Date.now();
            for(let animation of this[ANIMATIONS]) {
                let t;                
                if (this[START_TIME].get(animation) < startTime)
                    t = now - startTime - this[PAUSE_TIME] - animation.delay;
                else
                    t = now - this[START_TIME].get(animation) - this[PAUSE_TIME] - animation.delay;
                if (animation.duration < t) {
                    this.remove(animation);
                    t = animation.duration;
                }
                if (t > 0)
                    animation.receiveTime(t);
            }
            this[TICK_HANDLER] = requestAnimationFrame(this[TICK]);
            // console.log(this[TICK_HANDLER])
        }
        this[TICK]();
    }
    pause() {
      if (this.state !== "started")
          return
      this.state = "paused";
      this[PAUSE_START] = Date.now();
      cancelAnimationFrame(this[TICK_HANDLER]);
    }
    resume() {
      if (this.state !== "paused")
          return
      this.state = "started";
      this[PAUSE_TIME] += Date.now() - this[PAUSE_START];
      this[TICK]();
    }
    reset() {
      if (this.state === "started") {
        this.pause();
      }
      this[PAUSE_TIME] = 0;
      this[ANIMATIONS] = new Set();
      this[START_TIME] = new Map();
      this[TICK_HANDLER] = null;
      this[PAUSE_START] = 0;
      this.state = "inited";
    }
    // 将动画添加到时间线中
    add(animation, startTime=Date.now()) {
        this[ANIMATIONS].add(animation);
        this[START_TIME].set(animation, startTime);
    }
    // 将动画从时间线中移除
    remove(animation) {
        this[ANIMATIONS].delete(animation);
        this[START_TIME].delete(animation);
    }
}

export class Animation {
    constructor(object, property, startValue, endValue, duration, delay, timingFunction, template) {
        timingFunction = timingFunction || (v => v);
        template = template || (v => v);
        this.object = object;
        this.property = property;
        this.startValue = startValue;
        this.endValue = endValue;
        this.duration = duration;
        this.delay = delay;
        this.timingFunction = timingFunction;
        this.template = template;
    }
    receiveTime(time) {
        // console.log(time);
        let range = this.endValue - this.startValue;
        let progress = this.timingFunction(time / this.duration);
        this.object[this.property] = this.template(this.startValue + range * progress);
    }
}