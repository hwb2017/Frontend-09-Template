学习笔记

### Tic Tac Toe(AI实现)

总结:

1. vertical-align 属性用来对齐一行的内联元素，默认是基线对齐，对于 inline-block 类型的元素，基线的确定规则是：当元素无文本内容，或者 overflow 属性不为 visible 时，基线为元素的 bottom margin；当元素包含文本内容时，基线为文本的基线位置。因此当一群 inline-block 元素中有的有文本，有的没有文本时，会出现“上蹿下跳”的现象，解决办法之一是将元素的 vertical-align 属性设置为 middle，即按照基线 + x-height 的位置来对齐，参考 [深入理解css中的vertical-align属性](https://www.cnblogs.com/starof/p/4512284.html)
2. Object.create(某个对象) 方法，即以某个对象为原型创建新的对象，可以作为克隆对象/数组的一种方法，好处是方法和数据都保存在原型中，当需要多次克隆时，这种克隆方法可以减少内存占用

### 异步编程Demo

总结:

1. Promise的引入解决了回调地狱影响代码可读性的问题，async/await的引入使得可以像书写同步代码一样写异步代码
2. async和generator配合可以实现一些无限时序流的效果