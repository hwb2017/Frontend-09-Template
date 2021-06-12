学习笔记

# 手势与动画
JS 与 CSS 中的动画都是在处理帧，JS中跟处理帧相关的方法有 setInterval, setTimeout, requestAnimationFrame

现代浏览器中比较推荐的方法是 requestAnimationFrame，因为 setInterval 不同浏览器的实现可能不一样，比较不可控(比如出现handler函数的堆积)

CSS中的动画可以分为属性动画和帧动画，属性动画即每一帧改变元素的某些属性，实现动画效果；帧动画即每一帧更换图片(svg)来达到动画效果

## 手势
1. 统一PC端和移动端的接口(start, move, end), 隐藏鼠标移动和触摸移动的不同
2. 定义手势原语(start, tap, press, pan, end, flick)，设置一些全局变量来记录当前手势所处的状态，并写好不同手势间切换的逻辑

## 事件派发
在DOM中使用 new Event 或 new CustomEvent 的方式派发事件, 并传入一些属性。比如原生的mousedown事件有 clientX, clientY 属性，我们可以在其基础上封装一个 tap 事件，也在派发时传入 clientX, cientY 属性。整个过程即 listen(监听原生事件) => recognition(识别当前手势状态,并转化到手势原语中的状态) => dispatch(分发封装后的事件)

事件的派发需要指定目标dom元素，使用 dispatchEvent API

## 抽象与封装
归纳手势库执行的逻辑(listener => recognization => dispatch)，封装为单一职责的对象(Listener, Recognizer, Dispatch), 并进行联动(函数编程范式或者流水线)