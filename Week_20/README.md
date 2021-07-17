# 学习笔记

## 持续集成
### daily build
每天把所有模块的代码一起集成构建，确保没有构建失败

前端项目构建时间为分钟级，可以每次提交到主分支后都进行一次build

### build verification test
对构建产物进行功能验证测试，主要是 e2e 测试

前端项目进行 e2e 测试(UI测试)的成本较高，每次构建后可以做些轻量级的测试，如 lint 静态代码检查、使用无头浏览器进行DOM大小位置的检查等

### git hooks
Git hook 是git提供的由git行为触发的执行任务，一般主要用它的 pre-commit 和 pre-push 来做客户端的检查和限制.

也可以在 npm package.json 的 gitHooks 中使用，或者使用 husky 这样的工具

### eslint 结合 git hooks
在 git hook 中执行 eslint，最后是调用 eslint 的 API，而不是通过 process 直接执行命令行

eslint 本身只检查当前路径下的所有文件，但是 git 提交时应该只检查暂存区中的内容，这个时候可以通过 git stash push 和 git stash pop 命令，在提交commit时移除工作区的内容，只检查暂存区；在提交结束后，恢复工作区的内容

服务端的git检测主要通过 webhook机制，git向关联的持续集成系统如 Jenkins 发送 post 请求来触发一次持续集成(包含代码lint检查的job)

服务端检测的好处是更具有强制性，客户端的git hook可能被开发者篡改，导致检测失效