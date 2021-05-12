学习笔记

# CSS总论

## css 在语法上主要分为普通规则和@规则

css的@规则中需要关注的有:

- `@font-face` 它允许网页开发者为其网页指定在线字体，通过这种作者自备字体的方式，@font-face 可以消除对用户电脑字体的依赖
- `@keyframes` 定义动画序列中的关键帧，来控制动画序列的中间步骤
- `@media` 类似一个查询用户终端类型的一个函数，以此在不同的规则中切换
- `@import` 从其他样式表导入规则

## css 结构:
- selector
  - 复杂选择器
  - 复合选择器
  - operator
    - \+ 相邻选择符
    - \<space> 子孙选择符
    - ~ 兄弟选择符
    - \> 子选择符
  - simple selector
    - type
    - class
    - id
    - attribute
    - pseudo class
    - pseudo element
- declaration
  - key
    - property
    - variable CSS3引入的变量，以双减号开头，可以放在key和value中
  - value

# CSS 选择器
## 选择器的优先级:

选择器的优先级是用一个四元组表示的，英文名其实是 specifity (专用度)，
  
假设四元组是 [a,b,c,d]，则选择器中每出现一次 id选择器，b+1; 每出现一次类/属性/伪类选择器，c+1; 每出现一次 类型/伪元素选择器, d+1

最后四元组会根据N进制转为一个数，N是一个足够大的数

## 伪类

- 链接/行为型
  - hover
  - link
  - visited
  - active
  - focus
- 树结构(多用会影响性能，干扰了css的计算时机)
  - nth-child
  - nth-last-child
  - nth-type
  - nth-last-type
- 逻辑
  - not

## 伪元素
- ::before 在元素内的靠前位置创建一个不在DOM中的元素
- ::after 在元素内的靠后位置创建一个不在DOM中的元素
- ::first-letter 将元素内的文本节点的第一个字母应用样式
- ::first-line 将元素内的文本节点的第一行文字应用样式(不同的屏宽会拆分出不同长度的行盒，首行长度也会不同)