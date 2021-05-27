学习笔记

# 重学HTML
SGML是HTML的超集

## 字符实体
在 HTML 中，某些字符是预留的。 在 HTML 中不能使用小于号（<）和大于号（>），这是因为浏览器会误认为它们是标签。\
如果希望正确地显示预留字符，我们必须在 HTML 源代码中使用字符实体（character entities）

&nbsp用于产生空格，但是浏览器会把它连接的两个词认为一个词，会影响分词结果。最好的做法还是使用 

几个常用的字符实体:
- &gt 大于号
- &lt 小于号
- &amp &符号
- &quot 双引号
- &apos 单引号

## namespace
HTML5支持 html，xhtml，MathML，SVG这些namespace，选择xhtml作为namespace时，它会严格要求标签必须闭合

## 合法元素
- Element 各种标签
- Text 文本节点，被标签环绕
- Comment 注释
- DocumentType 位于html文件的第一行，说明它符合的标准
- ProcessingInstruction 预处理指令
- CDATA 另一种文本

# 浏览器API

## DOM API
主要分为节点类API、事件类API、Range API

### 节点类API
能挂载在DOM树上的，都是节点

- Element元素
  - HTMLElement
  - SVGElement
- Document文档根节点
- CharacterData字符数据
  - Text文本节点
  - Comment注释
  - ProcessingInstruction
- DocumentFragment文档片段
- DocumentType文档类型

### RangeAPI
- range.setStart(startNode, startOffset)
- range.setEnd(startNode, endOffset)
- document.getSelection().getRangeAt(0) 获取用户选择部分的range
- range.setStartBefore(referenceNode) 设置某个Node之前为Range的起始偏移位置
- range.setEndBefore(referenceNode)
- range.setStartAfter(referenceNode)
- range.setEndAfter(referenceNode)
- range.selectNode(referenceNode) 选择某个Node及其包含的其他Node为range
- range.selectNodeContents(referenceNode) 选取某个Node的所有包含的Node为range
- range.extractContents() 把range范围内的所有Node从DOM树上摘下来，得到的是一个 fragment 对象
- range.insertNode() 在range起始位置插入一个Node

#### CSSOM
包括读取和修改Rule相关的API，用途：
- 批量修改rule
- 修改伪元素的rule，DOM API无法选取伪元素
- getComputedStyle获取动画中间状态时的实时样式

包括视图/布局相关的API，如：
- window.innerHeight, window.innerWidth 浏览器的渲染区域(viewport)的高度和宽度
- window.outerHeight, window.outerWidth 浏览器的渲染区域加上工具栏的尺寸
- window.devicePixelRatio dpr，物理像素和逻辑像素的比值
- window.screen
  - window.screen.width 显示屏的宽度
  - window.screen.height 显示屏的高度
  - window.screen.availWidth 显示屏的可用宽度，常用于移动端排除虚拟按钮以后宽度
  - window.screen.availHeight 显示屏的可用宽度，常用于移动端排除虚拟按钮以后高度

scroll
- scrollTop
- scrollLeft
- scrollWidth 可滚动区域的最大宽度
- scrollHeight 可滚动区域的最大高度
- scroll(x,y) 绝对位置滚动
- scrollBy(x,y) 相对位置滚动
- scrollIntoView() 滚动到可见区域

排版相关的API
- getClientRects() 获取元素中包含的多个(行)盒
- getBoundingClientRect() 获取包裹元素所有盒的外层矩形的尺寸和位置