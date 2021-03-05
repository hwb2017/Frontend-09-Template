学习笔记
1. 在for循环中创建事件监听函数时，循环变量的声明要使用 let 而不是 var, 因为 var 声明是函数作用域，对于监听函数来说是全局作用域，监听函数只能获得循环变量最后的赋值，而 let 声明变量是块级作用域，即花括号内，每次循环中相当于重新声明，监听函数获取的是循环变量迭代中的不同赋值，参考 [for循环绑定事件时，var和let声明循环变量的区别](https://blog.csdn.net/wlk2064819994/article/details/79772388)
2. 深度/广度优先搜索算法的区别在于数据结构，广度优先使用的是队列，深度优先使用的是栈。广度优先算法的逻辑是: 获取起始结点的所有相邻节点 => 如果相邻节点没有被访问过且不是终点则插入队列，如果是终点则寻找结束 => 每次从队列头部取出节点，继续第一步。对于确定起点和终点之间的最短路径，一种方法是在插入结点时在另一个数据结构中记录它的前驱结点，然后从终点依次找到每个结点的前驱结点，最后可以得到一条路径。伪代码是
```
var frontier = new Array();
frontier.put(start);
var visited = new Array();
visited[start] = true;
while (frontier.length > 0) {
  current = frontier.get();
  if (current == end) {
    console.log("found");
    break;
  }
  for (net in graph.neighbors(current)) {
    var notInVisited = visited.indexOf(next) == -1;
    if (notInVisited) {
      frontier.put(next);
      visited[next] == true;
    }
  }
}
```
3. A* 算法是启发式的寻路算法，它和深度/广度搜索优先算法的区别是它用了可排序的数据结构，每次取数据时取优先级最高(离终点更近)的结点，提高寻路效率