# 基本命令

- `git init`：用于初始化一个 Git 仓库
- `git status`：用于查看当前 Git 状态
- `git log`：查看提交过的git历史，按q退出
- `git add`：它的使用场景有三个：1、将一个尚未被 Git 跟踪的文件纳入 Git 跟踪；2、将一个已经被 Git 跟踪的文件且这个文件处于修改状态，通过 add，可以将它纳入暂存区；3、将 merge 或者 rebase 后产生的冲突文件标记为冲突已解决。
- `git commit`：将暂存区内容纳入 Git 提交记录
- `git restore`：取消对某个文件的修改
- `git diff`：查看文件修改详情
- `git checkout`：切换分支
- `git branch`：新建分支
- `git merge`：合并分支
- `git stash`：临时保存当前分支的工作状态，方便切换到其它分支。恢复-`git stash pop`
- `git revert`：撤销某次修改，此次操作之前和之后的 commit 和 history 都会保留，并且把这次撤销，作为一次最新的提交
- `git reset`：回退版本，可以遗弃不再使用的提交
