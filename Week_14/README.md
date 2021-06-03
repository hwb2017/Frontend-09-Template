学习笔记

# 组件的基本知识
组件是跟UI强相关的，它可以视作特殊的模块/对象

对象：
- Properties 属性
- Methods 方法
- Inherit 对象之间的继承关系

组件：
- Properties 属性
- Methods 方法
- Inherit 组件之间的从属关系
- Attribute 属性(主要用于描述组件，一般用标记语言来实现)
- Config & State 组件的状态
- Event 组件往外传递的事件
- Lifecycle 组件从创建到销毁之间经历的各个阶段构成组件的生命周期
- Children 子组件

## 组件的几个“属性”

| 标签语言初始化 | JS初始化 | JS触发变更 | 用户输入触发变更 | |
| - | - | - | - | - |
| x | √ | √ | ? | property |
| √ | √ | √ | ? | attribute |
| x | x | x | √ | state |
| x | √ | x | x | config |

解释:
- property一般不会在html中描述
- state是组件状态，会因用户输入而改变
- config是组件初始化时传入的state的默认值，只会改变一次

## 组件的生命周期

created => mount(组件挂载到DOM树上) => JS change/set 和 End user input(接受JS或终端用户的输入) => render/update(重新渲染或更新组件状态) => unmount(组件从DOM树上解除挂载) => destroyed

# JSX
JSX是依赖于babel的一个插件来实现的

JSX的行为类似于语法糖，把html转化为createElement的JS函数

JSX的主要作用就是将JS中的HTMl转译为JS，并其封装DOM操作(createElement)