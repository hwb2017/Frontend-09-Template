学习笔记

NodeJS的流式处理，主要在处理大文件的IO数据流读写的时候用

node http模块的request方法，就是开启了writeble的流，可以携带大型数据

http的 application/octet-stream 类型就是用于承载流式数据的

stream的pipe api可以将一个可读的流的内容导入到一个可写的流中，避免写各种 data end 事件的监听

实际工作中，多用开源的 DevOps 工具如 Nexus 和 GitLab CI 来构建发布系统