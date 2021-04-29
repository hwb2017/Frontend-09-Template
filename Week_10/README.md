学习笔记

# 排版(layout)
第一代排版: 正常流(再加上 position, float, display)
第二代排版: flex
第三代排版: grid
第四代排版? CSS Houdini(提供 CSS layout API, 可以自定义display属性的值)

教程中选用 flex 排版来教学，在实现过程的第一步，通过 mainStat,mainEnd,mainSize,mainSigh,mainBase等属性，来封装底层的 top, bottom, width, height 等属性，使得使用者可以按照flex的主轴/交叉轴概念去设计编排，而不用去关心每一个元素的具体属性

flex在主轴上的布局分为换行和不换行两种情况，通过no-wrap属性去切换，在换行的情况下，当元素排版后超过父级容器的宽度，则会排入下一行，在不换行的情况下，子元素会超过父级容器的宽度

子元素的flex属性是 flex-basis，flex-grow，flex-shrink 三个属性的集合，在有剩余空间时会根据flex值的大小按比例瓜分剩余空间，参考 [flex: 1 详解](https://www.jianshu.com/p/57a94430dcbe)

# 渲染
渲染即将排版好的带CSS的Dom元素绘制在一个视口(viewport)范围内，绘制成一个位图，toy-browser中使用images库来模拟这种效果