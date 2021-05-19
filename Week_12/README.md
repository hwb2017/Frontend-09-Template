学习笔记

# CSS排版

## 盒模型
盒模型是排版和渲染时的基本单位

内边距(padding)影响的是盒内文本的排版，外边距(margin)影响的是盒模型的排版，决定了盒的周围要有多少空白边距

box-sizing有两个取值，影响width的计算：

- content-box, 默认值，width = contentWidth
- border-box, 怪异盒模型, width = contentWidth + border + padding, 更符合人的一般认知

## 排版
css排版只排两样东西，一个是盒，一个是文字，排版即把每个文字和盒排到正确的位置(位置和尺寸)

正常流排版步骤:

- 收集盒和文字进行(hang)
- 计算盒在行中的排布(每个行盒构成一个IFC)
- 计算行盒的排布(内联元素构成的行盒，和块级元素共同在一个BFC中排布)

### 正常流的行级排布
行模型中的五条线:
- baseline 基线, 所有字符默认基线对齐，即字符的下缘的垂直高度都落到基线上
- text-top、text-bottom 只要字体大小不变，text-top和text-bottom就不变，当一行中有多个字体大小的字符时，取最大的字体来设置 text-top、text-bottom
- line-top、line-bottom 行高的上缘和下缘，当行高等于字体高度时，line-top和line-bottom分别和text-top和text-bottom重合

当内联元素与块级元素(display:inline-block)混排时，line-top和line-bottom都有可能因为块元素的 vertical-align 属性而被撑开，但是 text-top 和 text-bottom 的位置是不会受影响的。

更多关于内联元素和块级元素混排的知识点可以参考 [深入理解css中的vertical-align属性](https://www.cnblogs.com/starof/p/4512284.html)

### 正常流的块级排布

#### float与clear
浮动元素是依附于正常流排版的，它浮动到某个位置后，会影响到该位置垂直高度范围内的所有行盒的尺寸计算(排除浮动元素占据的空间)

clear属性可以让浮动元素在向左或者向右移动时，可以调整自己的垂直位置(通过换行的方式)而不与先前已经存在的浮动元素发生堆叠现象

#### margin collapse
边距折叠，当一个BFC中的上下两个块级元素的边距相连时会折叠，取两个margin值中的最大者作为上下两个元素的共同边距

margin collapse 只发生在正常流的BFC中，正常流的IFC、Flex布局、Grid布局中都没有

### BFC合并
Block:
- `Block Container` 里面有BFC,即里面可以包含正常流
- `Block Level Box` 外面有BFC
- `Block Box` 等于 Block Container + Block Level Box, 里外都有BFC

Block Container 包括display为 block、inline-block、table-cell、table-caption、flex item、grid cell 的元素，这些元素内部不嵌套 display:flex、display:grid 等非正常流的排版元素的话，都可以视为在里面设立了BFC

Block Level Box 即BFC中的排版单位，包括 display:block、display:flex、display:table、display:grid 这些块级元素的盒，以及 display:inline-block、display:inline-flex、display:inline-table、display:inline-grid 这些行盒中的元素

#### (元素内部)设立BFC的条件
1. float 浮动元素
2. 绝对定位的元素 absolute, fixed等
3. Block Container
4. Block Box, 且 overflow属性不为 visible (避免和外部的BFC发生合并)

#### BFC合并的触发条件
BFC合并值得是 Block Box 的 overflow 属性为 visible 时，其内部设立的BFC和其外部所在的BFC发生合并，使得Block Box元素的盒模型边界好像不存在一样

主要的两个现象:
1. float元素撑开相邻的Block Box的边界
2. Block Box内部的元素与BlockBox外部垂直方向上的盒发生边距折叠

### Flex排版
- 收集盒进行
- 在主轴上排布元素
- 在交叉轴上排布元素

# CSS动画与绘制

css样式提供的三种控制:
- 元素的大小和尺寸
- 元素的渲染效果(颜色等)
- 元素的动画效果(transition、animation)

## 动画
@keyframe 定义关键帧 \
animation: 配置并使用关键帧

动画的animation-timing-function属性指定动画的时间曲线, 设置后所有关键帧之间过渡都会遵循这个时间曲线，一种可选的做法是在每一个关键帧定义中加上 transition属性，这样每两个关键帧之间的动画时间曲线就可以不同

时间曲线底层依赖一个叫三次贝塞尔曲线的数学模型，用于实现一些缓动的效果

## 颜色
RGB颜色由于有时候不符合人的直觉，所以w3c主张使用hsl(hue 色相、saturation 饱和度、lightness 亮度)来表示颜色

## 绘制
三种类型的绘制:
- 几何元素 border、boder-radius
- 字体 font、text-decoration
- 位图 background-image

绘制复杂图形的推荐方法 data-url + svg